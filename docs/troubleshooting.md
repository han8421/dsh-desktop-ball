# 排查

## 窗口外出现 1px 红边

Windows 11 的 DWM accent border。它会在窗口激活时重新出现，所以必须在 `Form.Activated` 和每次 `Set-ChatSurface` 时都把 `DWMWA_BORDER_COLOR` 设为 `DWMWA_COLOR_NONE (-2)`，只在创建时设置一次不够。

## 悬浮球换成 GIF / 图片后拖不动

`Ball` 网格必须有 `Background="Transparent"`，否则默认渐变隐藏后没有可命中的像素。

## 自定义图片 / GIF 四周有白边

一部分是 XAML 的 `BallBorder` / `BallInnerRing`，自定义媒体时隐藏；另一部分是图片自身圆形边缘的 1px 白环，所以 `BallMedia` 的圆形裁切从半径 30 缩到 29，把最外圈裁掉。

## 悬浮球与聊天头像裁剪区域不同

PowerShell 5.1 里 `[Math]::Max(0, [double]$crop.x)` 会选中 `int` 重载，把 0.39 截断成 0；`0.14.2` 起改用 `[Math]::Max([double]0, ...)`，原生球的 `x/y` 与网页端完全一致。

## 设置页突然没有样式、悬浮球图片巨大

旧版会在插件 dispose 时删除 `<style>`，HMR 重新 apply 复用了同一个元素时会产生清理竞态。`0.12.4` 起不再删除样式元素，只更新 `textContent`。

## 设置页提示「当前 Host 还是旧外观接口」

DSH 主进程还没加载 0.12.x 的 schema，重启一次 DSH 后再点「应用」。

## 悬浮球被安全软件 / 策略拦截

原生小球依赖 PowerShell 脚本与进程创建。被拦截时可用 `Alt + Q` 的应用内面板作为回退入口。

## 首次打开白屏

悬浮球启动后会预加载隐藏的聊天 WebView，并把 WebView2 的初始背景设成聊天背景色。如果仍然白屏，检查 WebView2 Runtime 是否安装；缺失时会退回 Edge / Chrome `--app=` 窗口。
