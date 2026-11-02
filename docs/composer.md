# 输入区

聊天窗口的 composer 与 DSH 主输入区对齐，模型、权限、推理等级都在这一行里切换。

## 附件

- 左侧 `+` 选择图片或附件。图片走 DSH 图片附件，其他文件（md / doc / pdf / zip 等）走 `ctx.fileUpload` 暂存凭证，再随 prompt 提交。
- 附件先显示为输入框上方的图片缩略图 / 文件卡片，可单独移除；上传中显示进度，失败可以重试发送。
- 只有附件、没有文字也可以发送。
- 图片支持 PNG / JPEG / WebP / GIF；其他任意文件按原字节上传，单次最多 50 个附件。
- 可以直接把文件从资源管理器拖进聊天窗口，窗口会显示「在此处拖放文件」遮罩，松手后加入附件栏。
- 发送后的用户消息显示图片缩略图和文件卡片（文件名 / 扩展名 / 大小），不是 `[图片]` 占位。

## 权限

「仅可查看 / 工作区内修改 / 完全权限」三档，切换当前会话调用 `/permission <preset>`。

## 模型

- 每次打开先读 Host 的 `/dsh-quick-chat-appearance/models`，由 `ctx.llm.listProviders()` / `listModels()` / `resolveModelInfo()` 生成与 DSH 模型选择器一致的分组和 1017 徽标。
- 选择后优先 `POST /dsh-quick-chat-appearance/select-model`，由 Host `ctx.sessionController.selectModel()` 执行；失败再回退 `remote.session.selectModel()`。
- 模型或推理等级切换失败时，界面回到切换前的值并提示。

## 推理等级

使用模型 catalog 中的 `reasoning.efforts`。「关闭思考模式」在推理等级下面，开启时把 `reasoningEffort` 设为 `off`，关闭时恢复之前的等级。

> 客户端依赖 `remote` 服务注入，Host 依赖 `llm` 注入和 `/models` 路由；从旧版本升级后需要重启一次 DSH。
