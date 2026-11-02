# 架构

DSH 的渲染层插件无法直接创建 Electron `BrowserWindow`，所以这里没有改 `app.asar`，而是用了两个原生能力：一个 PowerShell + WPF 的透明小球，和一个内嵌 WebView2 的无边框窗口。

## 1. Host 半启动一个 Windows 原生小球

- `index.js` 在 Desktop + Windows 下生成带本进程认证 token 的 URL，写入 `%LOCALAPPDATA%\dsh-quick-chat\state.json`。
- 启动 `native/ball.ps1`：一个 PowerShell + WPF 的无边框、透明、`Topmost` 小窗口，不进入任务栏 / Alt-Tab。
- 小球监听 DSH Host PID，Host 退出后自动退出；位置写在本地。

## 2. 小球打开内嵌 WebView2 的桌面聊天窗口

- 认证 URL 带一个 fragment：`#dsh-quick-chat=<nonce>`。
- 小球在同一个 PowerShell 进程里创建一个无边框 WinForms 窗口，用 WebView2 控件打开这个 URL。没有第二个浏览器进程，也没有地址栏 / Edge 图标 / 翻译提示。
- Host 的 token 交换会 303 到 `/`，WebView2 会保留 fragment；Web 客户端检测到 fragment 后只渲染聊天面板，不渲染 DSH 外壳。
- 窗口使用独立 profile（`webview-profile`），与日常浏览器隔离；顶栏可拖动，右上角 ✕ 通过 `postMessage` 关闭窗口；窗口置顶。
- 如果机器上没有 WebView2 Runtime 或 SDK 文件缺失，自动退回旧的 Edge / Chrome `--app=` 窗口，功能不受影响。
- Host 退出时，小球进程随之退出，并关闭聊天窗口。

## 3. 应用内面板仍然保留

- 在 Windows Desktop 下，应用内悬浮球默认隐藏，避免和桌面球重复；DSH 侧边栏不再添加入口。
- macOS / Linux / 普通浏览器下，没有原生小球，继续使用应用内悬浮球和 PiP；`Alt + Q` 可唤起应用内面板。

## 为什么不改 app.asar

插件文件独立于 DSH 安装目录，升级 DSH 时可以直接保留；渲染层插件也没有创建原生窗口的权限，所以窗口生命周期交给 Host 启动的 PowerShell 进程。

## 会话与工作区

- 快捷窗口使用独立的 DSH Session，渲染的是同一个会话事件流，因此流式回复、停止、历史、代码块等能力与主界面一致。
- 新建会话默认创建在当前会话所在的工作区；没有工作区时使用 Host 的默认工作目录。
- 快捷窗口新建的会话统一归入名为 `ChatWindow` 的工作区；没有该目录 / 工作区时会在当前工作区旁自动创建并注册。已经存在的旧会话保留在原工作区，不会强制搬移。
- 桌面窗口和应用内面板使用不同的 profile，因此各自的快捷历史（localStorage）独立；DSH 会话本身共享。

## 认证与安全

- 认证 URL 携带本进程的短期 token，只写在当前用户的 `%LOCALAPPDATA%\dsh-quick-chat\state.json`，插件卸载时删除。
- 聊天窗口使用独立的 WebView2 profile，不共享日常浏览器的 cookie 与缓存。
- 插件代码在 Host 进程内执行，不在 workspace 沙箱里；只从可信来源安装。

## 命名与兼容

插件展示名、npm 包名已改为：

```text
桌面悬浮球 / Desktop Floating Ball
dsh-desktop-ball
```

为了升级时保留已有聊天记录、悬浮球外观和窗口位置，以下**内部标识仍沿用旧名**，属于有意兼容：

- 数据目录 `%LOCALAPPDATA%\dsh-quick-chat\`
- 外观路由 `/dsh-quick-chat-appearance`
- 认证 URL fragment `#dsh-quick-chat=`
- localStorage key `dsh-quick-chat.prefs.v1`

如果要做一次彻底的新名字迁移，需要同时迁移目录、路由、fragment、localStorage，并让旧版本停止写入；不建议在普通升级时做。
