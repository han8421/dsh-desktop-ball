window.__ModuleLoader__.load({
  id: 'dsh-desktop-ball',
  factory: (require) => {
    const module = { exports: {} }
    const exports = module.exports
    const React = require('react')
    const ReactDOM = require('react-dom')
    const h = React.createElement
    const { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } = React

    const PLUGIN_ID = 'dsh-desktop-ball'
    const VERSION = '0.18.1'
    // Keep the original storage key so upgrading users retain history and preferences.
    const STORAGE_KEY = 'dsh-quick-chat.prefs.v1'
    const PANEL_MIN_WIDTH = 340
    const PANEL_MIN_HEIGHT = 420
    const PANEL_DEFAULT_WIDTH = 432
    const PANEL_DEFAULT_HEIGHT = 628

    // ---------------------------------------------------------------------
    // Copy
    // ---------------------------------------------------------------------

    const ZH = {
      appName: '桌面悬浮球',
      appSubtitle: '随时问，随手继续',
      newChat: '新对话',
      history: '历史对话',
      permission: '权限',
      readOnly: '仅可查看',
      workspaceWrite: '工作区内修改',
      fullAccess: '完全权限',
      model: '模型',
      onlyOneModel: '当前 DSH 模型目录只有 1 个可用模型',
      reasoning: '推理等级',
      thinkingOff: '关闭思考模式',
      attach: '添加图片或附件',
      uploadingAttachment: '上传中',
      removeAttachment: '移除附件',
      pin: '置顶到桌面',
      unpin: '返回应用内',
      pinWindow: '窗口置顶',
      unpinWindow: '取消窗口置顶',
      minimizeWindow: '最小化窗口',
      more: '更多',
      minimize: '收起',
      close: '关闭',
      send: '发送',
      stop: '停止生成',
      placeholder: '给 DeepSeek 发消息…',
      placeholderNamed: '给 {name} 发消息…',
      hint: 'Enter 发送 · Shift + Enter 换行',
      emptyTitle: '你好，我是 DeepSeek',
      emptyBody: '不用离开当前界面，随时问点什么。',
      suggestions: ['帮我梳理一下当前项目', '解释一段代码', '写一封简短的邮件'],
      thinking: '正在思考…',
      sending: '正在发送…',
      queued: '排队中',
      sendingLabel: '发送中',
      usingTool: '正在使用 {name}',
      openFull: '在完整界面打开',
      hideBubble: '隐藏悬浮球',
      showBubble: '显示悬浮球',
      hideBubbleHint: '之后可从桌面悬浮球重新打开',
      clearHistory: '清除聊天记录',
      historyCleared: '已清除聊天记录，会话本身仍保留在侧边栏',
      pipUnsupported: '当前窗口不支持桌面置顶，已继续使用应用内悬浮窗',
      pipFailed: '无法打开置顶小窗，已继续使用应用内悬浮窗',
      pipReturn: '返回应用内',
      pipHint: '此窗口会保持在其它窗口上方',
      copy: '复制',
      copied: '已复制',
      retry: '重试',
      newChatTitle: '新对话',
      noHistory: '还没有历史对话',
      historyEmptyHint: '发出第一条消息后，这里会出现最近的聊天。',
      justNow: '刚刚',
      minutesAgo: '{n} 分钟前',
      hoursAgo: '{n} 小时前',
      daysAgo: '{n} 天前',
      today: '今天',
      sessionError: '会话载入失败',
      createError: '无法创建会话',
      sendError: '发送失败',
      stopError: '停止失败',
      loading: '正在准备对话…',
      noSession: '还没有可用的会话',
      sessionDeleted: '这个会话已不存在，已为你新建一个',
      imageAttachment: '[图片]',
      fileAttachment: '[文件]',
      toolCommand: '命令',
      toolFile: '文件工具',
      toolSearch: '搜索',
      toolWeb: '网页',
      toolAgent: '子代理',
      toolOther: '工具',
      scrollBottom: '回到底部',
      clearConfirm: '只清除聊天历史列表，不会删除会话。继续？',
      you: '你',
      assistant: 'DeepSeek',
      online: '就绪',
      offline: '连接已断开',
      poweredBy: 'DeepSeek Harness',
      shortcutHint: 'Alt + Q 随时唤起',
      newChatMenu: '开始一段新的对话',
      closeMenu: '关闭面板',
      about: '关于桌面悬浮球',
      aboutBody: '桌面悬浮球：一个轻量的 DeepSeek Harness 桌面聊天入口。',
      version: '版本 {version}',
      openFailed: '无法切换到完整界面',
      settings: '偏好设置',
      hideBubbleDone: '悬浮球已隐藏，可从桌面重新打开',
      showBubbleDone: '已恢复悬浮球，收起小窗后即可看到',
      standaloneHint: '桌面悬浮球 · 关闭后悬浮球仍在',
      closeWindow: '关闭窗口',
      useWindowClose: '请使用窗口右上角的关闭按钮',
      desktopMode: '桌面悬浮球模式',
      pipOpening: '正在打开置顶小窗…',
      copiedCode: '已复制代码',
      copyFailed: '复制失败',
    }

    const EN = {
      appName: 'Desktop Floating Ball',
      appSubtitle: 'Ask anytime, pick up anywhere',
      newChat: 'New chat',
      history: 'History',
      permission: 'Permissions',
      readOnly: 'Read only',
      workspaceWrite: 'Workspace write',
      fullAccess: 'Full access',
      model: 'Model',
      onlyOneModel: 'The DSH model catalog exposes only 1 available model',
      reasoning: 'Reasoning',
      thinkingOff: 'Disable thinking',
      attach: 'Add images or files',
      uploadingAttachment: 'Uploading',
      removeAttachment: 'Remove attachment',
      pin: 'Pin to desktop',
      unpin: 'Return to app',
      pinWindow: 'Keep on top',
      unpinWindow: 'Stop keeping on top',
      minimizeWindow: 'Minimize window',
      more: 'More',
      minimize: 'Minimize',
      close: 'Close',
      send: 'Send',
      stop: 'Stop generating',
      placeholder: 'Message DeepSeek…',
      placeholderNamed: 'Message {name}…',
      hint: 'Enter to send · Shift + Enter for a new line',
      emptyTitle: 'Hi, I’m DeepSeek',
      emptyBody: 'Ask anything without leaving what you’re doing.',
      suggestions: ['Get me oriented in this project', 'Explain a piece of code', 'Draft a short email'],
      thinking: 'Thinking…',
      sending: 'Sending…',
      queued: 'Queued',
      sendingLabel: 'Sending',
      usingTool: 'Using {name}',
      openFull: 'Open in full view',
      hideBubble: 'Hide floating bubble',
      showBubble: 'Show floating bubble',
      hideBubbleHint: 'You can reopen it from the desktop floating ball',
      clearHistory: 'Clear chat history',
      historyCleared: 'Chat history cleared. Sessions remain in the sidebar.',
      pipUnsupported: 'This window cannot stay on top. Continuing in the in-app panel.',
      pipFailed: 'Could not open the pinned window. Continuing in the app.',
      pipReturn: 'Return to app',
      pipHint: 'This window stays above other windows',
      copy: 'Copy',
      copied: 'Copied',
      retry: 'Retry',
      newChatTitle: 'New chat',
      noHistory: 'No chats yet',
      historyEmptyHint: 'Your recent chats will appear here after the first message.',
      justNow: 'Just now',
      minutesAgo: '{n} min ago',
      hoursAgo: '{n} hr ago',
      daysAgo: '{n} d ago',
      today: 'Today',
      sessionError: 'Could not load the session',
      createError: 'Could not create a session',
      sendError: 'Send failed',
      stopError: 'Could not stop',
      loading: 'Preparing your chat…',
      noSession: 'No session is available',
      sessionDeleted: 'That session no longer exists. A new one has been created.',
      imageAttachment: '[image]',
      fileAttachment: '[file]',
      toolCommand: 'command',
      toolFile: 'file tool',
      toolSearch: 'search',
      toolWeb: 'web',
      toolAgent: 'subagent',
      toolOther: 'tool',
      scrollBottom: 'Back to bottom',
      clearConfirm: 'Only the chat history list is cleared; sessions are kept. Continue?',
      you: 'You',
      assistant: 'DeepSeek',
      online: 'Ready',
      offline: 'Disconnected',
      poweredBy: 'DeepSeek Harness',
      shortcutHint: 'Alt + Q to open',
      newChatMenu: 'Start a new conversation',
      closeMenu: 'Close panel',
      about: 'About Desktop Floating Ball',
      aboutBody: 'A lightweight desktop chat entry point for DeepSeek Harness.',
      version: 'Version {version}',
      openFailed: 'Could not switch to the full view',
      settings: 'Preferences',
      hideBubbleDone: 'Floating ball hidden. Reopen it from the desktop.',
      showBubbleDone: 'Floating ball restored. It appears when this panel is closed.',
      standaloneHint: 'Desktop Floating Ball · the ball stays after closing',
      closeWindow: 'Close window',
      useWindowClose: 'Use the close button at the top-right of the window',
      desktopMode: 'Desktop floating mode',
      pipOpening: 'Opening the pinned window…',
      copiedCode: 'Code copied',
      copyFailed: 'Copy failed',
    }

    const STRINGS = { zh: ZH, en: EN }
    const TOOL_NAMES = {
      zh: {
        command: '命令',
        file: '文件工具',
        search: '搜索',
        web: '网页',
        agent: '子代理',
        other: '工具',
      },
      en: {
        command: 'command',
        file: 'file tool',
        search: 'search',
        web: 'web',
        agent: 'subagent',
        other: 'tool',
      },
    }

    function isZh(lang) {
      return String(lang || '').toLowerCase().startsWith('zh')
    }

    function makeTranslator(lang) {
      const table = isZh(lang) ? ZH : EN
      return (key, values) => {
        const template = table[key] ?? EN[key] ?? key
        if (!values) return template
        return template.replace(/\{(\w+)\}/g, (_, name) => (values[name] == null ? '' : String(values[name])))
      }
    }

    function detectLang(ctx) {
      try {
        const service = ctx && (typeof ctx.get === 'function' ? ctx.get('locale') : ctx.locale)
        const active = service && typeof service.getLocale === 'function' ? service.getLocale().active : undefined
        if (typeof active === 'string' && active.length > 0) return active
      } catch {
        /* fall through to the browser language */
      }
      try {
        return navigator.language || 'en'
      } catch {
        return 'en'
      }
    }

    function normalizeLangPref(value) {
      return value === 'zh' || value === 'en' ? value : 'auto'
    }

    function resolveLanguage(ctx, pref) {
      const normalized = normalizeLangPref(pref)
      if (normalized === 'zh') return 'zh-CN'
      if (normalized === 'en') return 'en'
      return detectLang(ctx)
    }

    const EN_TEXT = {
      '已保存': 'Saved',
      '保存失败：': 'Save failed: ',
      '已上传': 'Uploaded',
      '上传失败：': 'Upload failed: ',
      '已应用': 'Applied',
      '已删除': 'Deleted',
      '应用失败：': 'Apply failed: ',
      '删除失败：': 'Delete failed: ',
      '视频': 'Video',
      '使用此图': 'Use this image',
      '删除': 'Delete',
      '默认': 'Default',
      '蓝': 'Blue',
      '墨': 'Ink',
      '紫': 'Purple',
      '玫': 'Rose',
      '无': 'None',
      '白': 'White',
      '浅灰': 'Light gray',
      '米白': 'Cream',
      '浅绿': 'Light green',
      '浅紫': 'Lilac',
      '设置悬浮球图标和聊天背景。不上传图片时也可以选纯色；上传的图片/GIF/视频会复制到插件数据目录。':
        'Customize the floating ball and chat background. Solid colors work without an upload; uploaded images/GIFs/videos are copied into the plugin data directory.',
      '悬浮球图标': 'Ball icon',
      '自定义': 'Custom',
      '上传图片 / GIF / 视频': 'Upload image / GIF / video',
      '裁剪': 'Crop',
      '最近使用': 'Recent',
      '大小': 'Size',
      '当前 Host 还是旧外观接口，重启 DSH 后「应用」才会保存形状和大小':
        'The Host still has the old appearance API. Restart DSH before Apply can save shape and size.',
      '形状在图标裁剪面板里选择；修改大小后点应用同步到桌面悬浮球':
        'Choose a shape in the crop panel; click Apply after changing size to sync the desktop ball.',
      '应用中…': 'Applying…',
      '应用': 'Apply',
      '聊天背景': 'Chat background',
      '上传背景图片': 'Upload background image',
      '选取显示区域': 'Choose display area',
      '助手名称': 'Assistant name',
      '保存': 'Save',
      '当前 Host 还是没有背景区域字段，重启 DSH 后才会同步到聊天窗口':
        'The Host does not provide background-area fields yet. Restart DSH to sync it to the chat window.',
      '同时修改 AI 回复气泡和输入区提示背景': 'Also updates the AI reply bubble and composer hint background',
      '图片显示': 'Image display',
      '填充': 'Fill',
      '适应': 'Fit',
      '拉伸': 'Stretch',
      '图片位置': 'Image position',
      '居中': 'Center',
      '顶部': 'Top',
      '底部': 'Bottom',
      '左侧': 'Left',
      '右侧': 'Right',
      '消息颜色': 'Message colors',
      '用户气泡': 'User bubble',
      'AI 气泡': 'AI bubble',
      '跟随主题': 'Follow theme',
      '应用颜色': 'Apply colors',
      '当前 Host 还是旧外观接口，重启 DSH 后背景区域、位置和消息颜色才会生效':
        'The Host still has the old appearance API. Restart DSH before background area, position and message colors take effect.',
      '设置聊天背景显示区域': 'Set chat background display area',
      '聊天窗口预览': 'Chat window preview',
      '恢复默认': 'Reset',
      '取消': 'Cancel',
      '应用裁剪': 'Apply crop',
      '裁剪悬浮球图标': 'Crop ball icon',
      '形状': 'Shape',
      '悬浮球预览': 'Ball preview',
      '拖动选框移动，拖动四角改变大小；滚轮缩放图片':
        'Drag the selection to move it, drag a corner to resize, and use the wheel to zoom.',
      '使用此图片': 'Use this image',
      '完成裁剪': 'Done',
      '拖放文件': 'Drop files here',
      '最大 50 MB。支持图片、Markdown、PDF、Office 文档等。':
        'Up to 50 MB. Images, Markdown, PDF, Office documents and more.',
      '最多添加 50 个附件': 'You can add at most 50 attachments',
      '当前客户端没有问答服务': 'This client has no question service',
      '回答失败': 'Answer failed',
      '这个提问正在 DSH 主窗口等待回答；请在主窗口完成。':
        'This question is waiting in the DSH main window. Please answer it there.',
      '这个提问正在 DSH 主窗口等待回答；DSH 的 answer 接口只接受已转交的 continued 提问，请在主窗口完成。':
        'This question is waiting in the DSH main window. The answer API only accepts continued questions; please answer it there.',
      '读取文件失败': 'Could not read the file',
      '当前环境没有文件上传服务': 'File upload is unavailable in this environment',
      '上传失败': 'Upload failed',
      '等待审批': 'Waiting for approval',
      '此操作需要你的授权。': 'This action needs your authorization.',
      '拒绝': 'Reject',
      '允许一次': 'Allow once',
      '回答已提交，等待助手继续': 'Answer submitted; waiting for the assistant',
      '请在 DSH 主窗口回答': 'Answer in the DSH main window',
      '助手提问（已回答）': 'Assistant question (answered)',
      '助手需要你确认': 'The assistant needs your confirmation',
      '关闭': 'Close',
      '关闭提问卡片': 'Close question card',
      '输入你的答案（可选）': 'Type your answer (optional)',
      '去主窗口回答': 'Answer in main window',
      '跳过': 'Skip',
      '提交中…': 'Submitting…',
      '提交回答': 'Submit answer',
      '圆形': 'Circle',
      '圆角方形': 'Rounded square',
      '方形': 'Square',
      '横向长方形': 'Wide',
      '纵向长方形': 'Tall',
    }

    function trText(lang, zh, en) {
      if (isZh(lang)) return zh
      return en === undefined ? EN_TEXT[zh] || zh : en
    }

    // ---------------------------------------------------------------------
    // Small helpers
    // ---------------------------------------------------------------------

    function cx(...parts) {
      return parts.filter(Boolean).join(' ')
    }

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max)
    }

    function finite(value, fallback) {
      return typeof value === 'number' && Number.isFinite(value) ? value : fallback
    }

    function isRecord(value) {
      return typeof value === 'object' && value !== null && !Array.isArray(value)
    }

    function minimumTop() {
      try {
        const root = document.documentElement
        if (root.dataset.fullscreen === 'true') return 8
        return root.dataset.platform === 'win32' || root.dataset.platform === 'darwin' ? 48 : 8
      } catch {
        return 8
      }
    }

    function normalizeGeometry(value, fallback) {
      if (!isRecord(value)) return fallback
      const width = clamp(finite(value.w, fallback.w), PANEL_MIN_WIDTH, Math.max(PANEL_MIN_WIDTH, window.innerWidth - 16))
      const height = clamp(finite(value.h, fallback.h), PANEL_MIN_HEIGHT, Math.max(PANEL_MIN_HEIGHT, window.innerHeight - 16))
      const x = clamp(finite(value.x, fallback.x), 8, Math.max(8, window.innerWidth - width - 8))
      const minY = minimumTop()
      const y = clamp(finite(value.y, fallback.y), minY, Math.max(minY, window.innerHeight - height - 8))
      return { x, y, w: width, h: height }
    }

    function loadPrefs() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return {}
        const parsed = JSON.parse(raw)
        return isRecord(parsed) ? parsed : {}
      } catch {
        return {}
      }
    }

    function savePrefs(patch) {
      try {
        const merged = { ...loadPrefs(), ...patch }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
      } catch {
        /* localStorage may be unavailable in a locked-down renderer */
      }
    }

    function cleanTitle(value) {
      if (typeof value !== 'string') return ''
      const text = value.trim()
      if (text === '') return ''
      if (/^session-[0-9a-f-]{8,}$/i.test(text)) return ''
      return text.length > 80 ? text.slice(0, 79) + '…' : text
    }

    function relativeTime(timestamp, lang, t) {
      if (!timestamp || !Number.isFinite(timestamp)) return ''
      const diff = Math.max(0, Date.now() - timestamp)
      const minute = 60_000
      const hour = 60 * minute
      const day = 24 * hour
      if (diff < minute) return t('justNow')
      if (diff < hour) return t('minutesAgo', { n: Math.floor(diff / minute) })
      if (diff < day) return t('hoursAgo', { n: Math.floor(diff / hour) })
      if (diff < 7 * day) return t('daysAgo', { n: Math.floor(diff / day) })
      try {
        return new Intl.DateTimeFormat(lang, { month: 'short', day: 'numeric' }).format(timestamp)
      } catch {
        return ''
      }
    }

    function defaultPanelGeometry() {
      const vw = Math.max(360, window.innerWidth || 1200)
      const vh = Math.max(480, window.innerHeight || 900)
      const width = Math.min(PANEL_DEFAULT_WIDTH, vw - 24)
      const height = Math.min(PANEL_DEFAULT_HEIGHT, vh - 112)
      return {
        x: Math.max(12, vw - width - 24),
        y: Math.max(minimumTop(), vh - height - 128),
        w: width,
        h: height,
      }
    }

    function defaultBubbleGeometry() {
      const vw = Math.max(320, window.innerWidth || 1200)
      const vh = Math.max(400, window.innerHeight || 900)
      return { x: vw - 78, y: vh - 112 }
    }

    function isInsideRect(point, rect) {
      return point.x >= rect.x && point.y >= rect.y && point.x <= rect.x + rect.w && point.y <= rect.y + rect.h
    }

    function formatFailure(error) {
      if (!error) return ''
      if (typeof error === 'string') return error
      if (typeof error.message === 'string' && error.message.length > 0) return error.message
      try {
        return JSON.stringify(error)
      } catch {
        return String(error)
      }
    }

    function normalizeQuestionItems(value) {
      if (!Array.isArray(value)) return []
      const result = []
      for (let index = 0; index < value.length; index += 1) {
        const item = value[index]
        if (!isRecord(item) || typeof item.question !== 'string') continue
        result.push({
          id: typeof item.id === 'string' && item.id ? item.id : `question-${index}`,
          header: typeof item.header === 'string' ? item.header : '',
          question: item.question,
          detail: typeof item.detail === 'string' ? item.detail : '',
          multiSelect: Boolean(item.multiSelect === true || item.multi_select === true),
          options: Array.isArray(item.options)
            ? item.options
                .filter((option) => isRecord(option) && typeof option.label === 'string')
                .map((option) => ({
                  label: option.label,
                  description: typeof option.description === 'string' ? option.description : '',
                }))
            : [],
        })
      }
      return result
    }

    function askQuestionsFromToolCall(data) {
      if (!data || data.name !== 'ask_user_question') return null
      let args = data.arguments
      if (typeof args === 'string') {
        try {
          args = JSON.parse(args)
        } catch {
          return null
        }
      }
      if (!isRecord(args)) return null
      const questions = normalizeQuestionItems(args.questions)
      return questions.length > 0 ? questions : null
    }

    function contentToText(content, t) {
      if (!Array.isArray(content)) return ''
      const parts = []
      for (const block of content) {
        if (!isRecord(block)) continue
        if (block.type === 'text' && typeof block.text === 'string') parts.push(block.text)
        else if (block.type === 'image') parts.push(t('imageAttachment'))
        else if (block.type === 'file') {
          const name = block.attachment && typeof block.attachment.name === 'string' ? block.attachment.name : ''
          parts.push(name ? `📎 ${name}` : t('fileAttachment'))
        }
      }
      return parts.join('\n').trim()
    }

    function attachmentsOfContent(content) {
      if (!Array.isArray(content)) return []
      const attachments = []
      for (const block of content) {
        if (!isRecord(block)) continue
        if (block.type === 'image' && isRecord(block.attachment)) {
          attachments.push({ kind: 'image', attachment: block.attachment })
        } else if (block.type === 'file' && isRecord(block.attachment)) {
          attachments.push({ kind: 'file', attachment: block.attachment })
        }
      }
      return attachments
    }

    function userTextOfContent(content) {
      if (!Array.isArray(content)) return ''
      const parts = []
      for (const block of content) {
        if (isRecord(block) && block.type === 'text' && typeof block.text === 'string') parts.push(block.text)
      }
      return parts.join('\n').trim()
    }

    function toolLabel(name, t) {
      const value = String(name || '').toLowerCase()
      if (/(bash|pwsh|shell|terminal|exec|command)/.test(value)) return t('toolCommand')
      if (/(file|read|write|edit|glob|grep|search\/files|directory)/.test(value)) return t('toolFile')
      if (/(search|web_search|websearch)/.test(value)) return t('toolSearch')
      if (/(web|fetch|http|browser)/.test(value)) return t('toolWeb')
      if (/(subagent|agent|workflow)/.test(value)) return t('toolAgent')
      return t('toolOther')
    }

    async function copyText(text) {
      if (typeof text !== 'string' || text.length === 0) return false
      try {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          await navigator.clipboard.writeText(text)
          return true
        }
      } catch {
        /* try the legacy path below */
      }
      try {
        const area = document.createElement('textarea')
        area.value = text
        area.setAttribute('readonly', '')
        area.style.position = 'fixed'
        area.style.opacity = '0'
        area.style.pointerEvents = 'none'
        document.body.append(area)
        area.select()
        const ok = document.execCommand('copy')
        area.remove()
        return ok
      } catch {
        return false
      }
    }

    function isPipSupported() {
      try {
        return typeof documentPictureInPicture !== 'undefined' && typeof documentPictureInPicture.requestWindow === 'function'
      } catch {
        return false
      }
    }

    /**
     * The native desktop ball opens the normal Web GUI in a dedicated browser
     * window with this hash. The fragment is inherited across the Host's
     * token-to-cookie redirect, so the quick chat can boot in standalone mode
     * without changing any Host route.
     */
    function standaloneInfo() {
      try {
        const match = /^#dsh-quick-chat(?:=([A-Za-z0-9_-]{1,64}))?$/.exec(location.hash || '')
        return match ? { nonce: match[1] || '' } : null
      } catch {
        return null
      }
    }

    /** True when the page is hosted by the plugin's own WebView2 window. */
    function isWebViewHost() {
      try {
        return Boolean(
          typeof window !== 'undefined' &&
            window.chrome &&
            window.chrome.webview &&
            typeof window.chrome.webview.postMessage === 'function',
        )
      } catch {
        return false
      }
    }

    function standaloneTitle(nonce) {
      const zh = (() => {
        try {
          return /^zh/i.test(navigator.language || '')
        } catch {
          return false
        }
      })()
      const base = zh ? '桌面悬浮球' : 'Desktop Floating Ball'
      return nonce ? `${base} · DSH ${nonce}` : `${base} · DSH`
    }

    function isNativeDesktopShell() {
      try {
        const ua = String((typeof navigator !== 'undefined' && navigator.userAgent) || '')
        const platform = String(
          (document.documentElement && document.documentElement.dataset.platform) ||
            (typeof navigator !== 'undefined' && navigator.platform) ||
            '',
        )
        const bridge = typeof window !== 'undefined' ? window.dshDesktop : undefined
        const desktopBridge = Boolean(bridge && bridge.protocolVersion)
        const desktopProtocol = location.protocol === 'dsh-app:'
        return (desktopBridge || desktopProtocol || /Electron/i.test(ua)) && /win/i.test(platform)
      } catch {
        return false
      }
    }

    // ---------------------------------------------------------------------
    // Styles
    // ---------------------------------------------------------------------

    const CSS = `
.dqc-layer{--dqc-accent:var(--dsw-alias-brand-primary,#4d6bfe);--dqc-accent-strong:var(--dsw-static-deepseek-600,#4868b2);--dqc-bg:var(--dsw-alias-bg-layer-1,#fff);--dqc-bg-base:var(--dsw-alias-bg-base,#f7f8fa);--dqc-input:var(--dsw-alias-bg-layer-2,#f2f4f7);--dqc-raised:var(--dsw-alias-bg-overlay,#fff);--dqc-fg:var(--dsw-alias-label-primary,#14161a);--dqc-muted:var(--dsw-alias-label-secondary,#69707d);--dqc-faint:var(--dsw-alias-label-tertiary,#9aa1ad);--dqc-border:var(--dsw-alias-border-l1,rgba(20,24,35,.09));--dqc-border-strong:var(--dsw-alias-border-l2,rgba(20,24,35,.14));--dqc-danger:var(--dsw-alias-state-error-primary,#d33b3b);--dqc-user:color-mix(in srgb,var(--dqc-accent) 9%,var(--dqc-bg));--dqc-shadow:0 26px 80px rgba(14,26,60,.22),0 6px 24px rgba(14,26,60,.10);--dqc-font:inherit;font-family:var(--dqc-font);color:var(--dqc-fg);pointer-events:none;position:fixed;inset:0;z-index:2147483000}
.dqc-layer *,.dqc-layer *::before,.dqc-layer *::after{box-sizing:border-box}
.dqc-layer button,.dqc-layer textarea{font-family:inherit}
.dqc-layer button{color:inherit}
.dqc-bubble{pointer-events:auto;position:fixed;z-index:2147483003;width:56px;height:56px;padding:0;border:1px solid color-mix(in srgb,#fff 72%,transparent);border-radius:50%;background:var(--dqc-bg);box-shadow:0 16px 40px rgba(35,54,120,.24),0 3px 10px rgba(35,54,120,.12),inset 0 1px 0 rgba(255,255,255,.8);display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none;transition:transform .16s ease,box-shadow .16s ease;outline:none}
.dqc-bubble::before{content:"";position:absolute;inset:-3px;border-radius:50%;background:conic-gradient(from 210deg,color-mix(in srgb,var(--dqc-accent) 60%,#fff),#fff 35%,color-mix(in srgb,var(--dqc-accent) 35%,#fff) 70%,#fff);opacity:.55;z-index:-1;filter:blur(.2px)}
.dqc-bubble:hover{transform:translateY(-2px) scale(1.025);box-shadow:0 20px 46px rgba(35,54,120,.28),0 4px 12px rgba(35,54,120,.14)}
.dqc-bubble:active{cursor:grabbing;transform:scale(.98)}
.dqc-bubble:focus-visible{box-shadow:0 0 0 3px color-mix(in srgb,var(--dqc-accent) 30%,transparent),0 16px 40px rgba(35,54,120,.24)}
.dqc-bubble[data-dragging=true]{cursor:grabbing;transition:none}
.dqc-bubble-mark{display:flex;width:34px;height:34px;align-items:center;justify-content:center;border-radius:11px;overflow:hidden;box-shadow:0 4px 10px rgba(50,80,200,.22)}
.dqc-bubble-badge{position:absolute;top:2px;right:2px;width:11px;height:11px;border-radius:50%;background:#ff5b5b;border:2px solid var(--dqc-bg);box-shadow:0 0 0 1px rgba(255,91,91,.18)}
.dqc-bubble-hint{pointer-events:none;position:fixed;z-index:2147483002;padding:5px 8px;border-radius:7px;background:color-mix(in srgb,var(--dqc-fg) 92%,transparent);color:var(--dqc-bg);font-size:10.5px;line-height:1.3;white-space:nowrap;opacity:0;transform:translateY(3px);transition:opacity .14s ease,transform .14s ease;box-shadow:0 4px 12px rgba(0,0,0,.16)}
.dqc-bubble:hover+.dqc-bubble-hint,.dqc-bubble:focus-visible+.dqc-bubble-hint{opacity:1;transform:translateY(0)}
.dqc-panel{pointer-events:auto;position:fixed;z-index:2147483001;display:flex;flex-direction:column;min-width:0;min-height:0;background:var(--dqc-bg);border:1px solid color-mix(in srgb,var(--dqc-border) 82%,transparent);border-radius:22px;box-shadow:var(--dqc-shadow);overflow:hidden;animation:dqc-panel-in .18s cubic-bezier(.2,.8,.25,1);outline:none;isolation:isolate}
.dqc-panel[data-pip=true]{position:fixed;inset:0;width:100%!important;height:100%!important;border:0;border-radius:0;box-shadow:none;animation:none}
.dqc-panel::before{content:"";pointer-events:none;position:absolute;inset:0;border-radius:inherit;background:linear-gradient(180deg,rgba(255,255,255,.55),transparent 26%);opacity:.6;z-index:0}
body[data-ds-dark-theme] .dqc-panel::before,.dqc-pip-host[data-theme=dark] .dqc-panel::before{display:none}
.dqc-panel[data-pip=true]::before{display:none}
.dqc-chat-bg{position:absolute;inset:0;z-index:0;background-size:cover;background-position:center;pointer-events:none;overflow:hidden}
.dqc-chat-bg-crop{position:absolute;display:block;max-width:none;max-height:none;object-fit:fill;pointer-events:none}
.dqc-drop-overlay{position:absolute;inset:8px;z-index:50;border:1.5px dashed color-mix(in srgb,var(--dqc-accent) 55%,transparent);border-radius:16px;background:color-mix(in srgb,var(--dqc-bg) 82%,transparent);backdrop-filter:blur(6px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;pointer-events:none;text-align:center;padding:24px;color:var(--dqc-fg)}
.dqc-drop-icon{width:74px;height:74px;border-radius:22px;background:linear-gradient(145deg,color-mix(in srgb,var(--dqc-accent) 18%,transparent),color-mix(in srgb,var(--dqc-accent) 8%,transparent));color:var(--dqc-accent);display:flex;align-items:center;justify-content:center;margin-bottom:4px}
.dqc-drop-title{font-size:16px;font-weight:600;color:var(--dqc-fg)}
.dqc-drop-hint{font-size:11px;line-height:1.5;color:var(--dqc-muted);max-width:320px}
.dqc-chat-bg::after{content:"";position:absolute;inset:0;background:transparent}
.dqc-chat-bg[data-kind=color]::after{display:none}
.dqc-chat-bg[data-kind=color]{background:linear-gradient(180deg,color-mix(in srgb,var(--dqc-chat-color,#f4f6fb) 88%,#fff),var(--dqc-chat-color,#f4f6fb) 48%,color-mix(in srgb,var(--dqc-chat-color,#f4f6fb) 93%,#000))}
.dqc-panel[data-chat-kind=color] .dqc-head{background:transparent;border-bottom-color:transparent}
.dqc-panel[data-chat-kind=color] .dqc-compose-wrap{background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--dqc-chat-color,#f4f6fb) 42%,transparent))}
.dqc-panel[data-chat-kind=color] .dqc-composer{background:color-mix(in srgb,var(--dqc-chat-color,#f4f6fb) 68%,#fff);border-color:color-mix(in srgb,var(--dqc-chat-color,#f4f6fb) 78%,#000)}
.dqc-panel[data-chat-kind=color] .dqc-ai-body{background:var(--dqc-ai-card,var(--dqc-bg));color:var(--dqc-ai-fg,var(--dqc-fg));border:1px solid color-mix(in srgb,var(--dqc-border) 60%,transparent);border-radius:14px;padding:10px 12px;box-shadow:0 8px 22px rgba(15,25,55,.06)}
.dqc-panel[data-ai-color=true] .dqc-ai-body{background:var(--dqc-ai-card);color:var(--dqc-ai-fg);border:1px solid color-mix(in srgb,var(--dqc-border) 60%,transparent);border-radius:14px;padding:10px 12px;box-shadow:0 8px 22px rgba(15,25,55,.06)}
.dqc-panel[data-ai-color=true] .dqc-ai-name,.dqc-panel[data-ai-color=true] .dqc-msg-actions{color:color-mix(in srgb,var(--dqc-ai-fg) 70%,transparent)}
.dqc-panel[data-chat-dark=true] .dqc-head .dqc-icon-btn{color:#e8ebf2}
.dqc-panel[data-chat-dark=true] .dqc-head .dqc-icon-btn:hover{background:rgba(255,255,255,.12);color:#fff}
.dqc-panel[data-chat-dark=true]{--dqc-bg:#1b1d22;--dqc-bg-base:#111318;--dqc-input:rgba(255,255,255,.08);--dqc-raised:#24262c;--dqc-fg:#f1f3f8;--dqc-muted:#b6bcc7;--dqc-faint:#8e95a3;--dqc-border:rgba(255,255,255,.13);--dqc-border-strong:rgba(255,255,255,.22);--dqc-user:rgba(255,255,255,.12)}
.dqc-panel[data-chat-dark=true] .dqc-composer{background:rgba(18,20,26,.72);border-color:rgba(255,255,255,.18);color:var(--dqc-fg)}
.dqc-panel[data-chat-dark=true] .dqc-composer[data-focus=true]{background:rgba(18,20,26,.82);border-color:rgba(255,255,255,.38);box-shadow:0 0 0 3px rgba(255,255,255,.06)}
.dqc-panel[data-chat-dark=true] .dqc-textarea{color:var(--dqc-fg)}
.dqc-panel[data-chat-dark=true] .dqc-textarea::placeholder{color:var(--dqc-muted)}
.dqc-panel[data-chat-dark=true] .dqc-send:disabled{background:linear-gradient(145deg,#7c95ff,#4d6bfe);color:#fff;opacity:.42}
.dqc-panel[data-chat-bg=true]::before{display:none}
.dqc-panel[data-chat-kind=color]::before{display:none}
.dqc-head{position:relative;z-index:2;flex:none;height:44px;display:flex;align-items:center;gap:2px;padding:0 7px;cursor:grab;user-select:none;background:var(--dqc-bg);border-bottom:1px solid color-mix(in srgb,var(--dqc-border) 55%,transparent);touch-action:none}
body[data-ds-dark-theme] .dqc-head,.dqc-pip-host[data-theme=dark] .dqc-head{background:var(--dqc-bg)}
.dqc-head:active{cursor:grabbing}
.dqc-panel[data-pip=true] .dqc-head{cursor:default}
.dqc-head button,.dqc-head .dqc-identity{user-select:none}
.dqc-icon-btn{flex:none;width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;padding:0;border:0;border-radius:9px;background:transparent;color:var(--dqc-muted);cursor:pointer;transition:background .12s ease,color .12s ease,transform .12s ease;outline:none}
.dqc-icon-btn:hover{background:var(--dqc-input);color:var(--dqc-fg)}
.dqc-icon-btn:active{transform:scale(.94)}
.dqc-icon-btn:focus-visible{box-shadow:0 0 0 2px color-mix(in srgb,var(--dqc-accent) 28%,transparent)}
.dqc-icon-btn[data-active=true]{color:var(--dqc-accent);background:transparent}
.dqc-icon-btn:disabled{opacity:.4;cursor:default}
.dqc-collapse{margin-right:-3px}
.dqc-identity{display:flex;align-items:center;gap:9px;min-width:0;flex:1;padding:2px 0}
.dqc-identity-mark{flex:none;width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 5px 12px rgba(50,80,200,.18)}
.dqc-identity-text{min-width:0;display:flex;flex-direction:column;gap:1px;line-height:1.25}
.dqc-title-row{display:flex;align-items:center;gap:5px;min-width:0}
.dqc-title{min-width:0;overflow:hidden;text-overflow:ellipsis;font-size:13.5px;font-weight:650;letter-spacing:.01em;color:var(--dqc-fg);white-space:nowrap}
.dqc-live-dot{width:5px;height:5px;border-radius:50%;background:var(--dqc-faint);flex:none;transition:background .2s ease}
.dqc-live-dot[data-running=true]{background:var(--dqc-accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--dqc-accent) 14%,transparent);animation:dqc-pulse 1.6s ease-in-out infinite}
.dqc-live-dot[data-error=true]{background:var(--dqc-danger);box-shadow:0 0 0 3px color-mix(in srgb,var(--dqc-danger) 12%,transparent)}
.dqc-subtitle{font-size:10.5px;color:var(--dqc-faint);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:165px}
.dqc-head-left{display:flex;align-items:center;gap:1px;flex:none}
.dqc-actions{display:flex;align-items:center;gap:1px;flex:none;margin-left:auto}
.dqc-body{position:relative;z-index:1;flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;padding:18px 18px 8px;scrollbar-width:thin;scrollbar-color:color-mix(in srgb,var(--dqc-muted) 25%,transparent) transparent}
.dqc-body::-webkit-scrollbar{width:7px}
.dqc-body::-webkit-scrollbar-thumb{background:color-mix(in srgb,var(--dqc-muted) 22%,transparent);border-radius:99px;border:2px solid transparent;background-clip:padding-box}
.dqc-empty{min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:12px 8px 34px;animation:dqc-fade-in .26s ease}
.dqc-loading{min-height:100%;display:flex;align-items:center;justify-content:center;gap:7px;color:var(--dqc-muted);font-size:11.5px}
.dqc-empty-mark{position:relative;width:66px;height:66px;border-radius:21px;display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 16px 36px color-mix(in srgb,var(--dqc-accent) 26%,transparent);margin-bottom:16px}
.dqc-empty-mark::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 1px 0 rgba(255,255,255,.5)}
.dqc-empty-title{font-size:19px;font-weight:650;letter-spacing:-.01em;color:var(--dqc-fg);margin:0 0 5px}
.dqc-empty-body{font-size:12.5px;line-height:1.7;color:var(--dqc-muted);max-width:290px;margin:0 0 17px}
.dqc-chips{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;max-width:332px}
.dqc-chip{appearance:none;border:1px solid var(--dqc-border);background:color-mix(in srgb,var(--dqc-bg) 72%,var(--dqc-input));color:var(--dqc-muted);border-radius:999px;padding:7px 11px;font-size:11.5px;line-height:1.3;cursor:pointer;transition:border-color .12s ease,color .12s ease,background .12s ease,transform .12s ease}
.dqc-chip:hover{border-color:color-mix(in srgb,var(--dqc-accent) 32%,var(--dqc-border));color:var(--dqc-fg);background:var(--dqc-bg);transform:translateY(-1px)}
.dqc-chip:active{transform:translateY(0)}
.dqc-chip:focus-visible{outline:2px solid color-mix(in srgb,var(--dqc-accent) 35%,transparent);outline-offset:1px}
.dqc-msg{display:flex;gap:9px;margin:0 0 15px;animation:dqc-msg-in .18s ease}
.dqc-msg[data-role=user]{justify-content:flex-end}
.dqc-msg[data-role=system]{justify-content:center;margin:3px 0 13px}
.dqc-user-bubble{position:relative;max-width:84%;background:var(--dqc-user);color:var(--dqc-user-fg,var(--dqc-fg));border:1px solid color-mix(in srgb,var(--dqc-accent) 10%,transparent);padding:9px 12px;border-radius:15px 15px 4px 15px;font-size:13px;line-height:1.65;white-space:pre-wrap;word-break:break-word;box-shadow:0 1px 2px rgba(20,35,80,.03)}
.dqc-user-text{white-space:pre-wrap;word-break:break-word}
.dqc-msg-attachments{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:6px;margin-bottom:6px}
.dqc-msg-image{width:132px;height:132px;border-radius:9px;overflow:hidden;background:color-mix(in srgb,var(--dqc-fg) 8%,transparent);display:flex;align-items:center;justify-content:center;color:var(--dqc-faint);font-size:10px}
.dqc-msg-image img{width:100%;height:100%;object-fit:cover;display:block}
.dqc-msg-file{display:flex;align-items:center;gap:7px;min-width:0;max-width:240px;height:42px;padding:4px 8px 4px 4px;border:1px solid var(--dqc-border);border-radius:9px;background:color-mix(in srgb,var(--dqc-raised) 82%,transparent);color:var(--dqc-muted)}
.dqc-msg-file-ext{width:30px;height:30px;flex:none;border-radius:6px;background:linear-gradient(145deg,color-mix(in srgb,var(--dqc-accent) 82%,#fff),var(--dqc-accent));color:#fff;font-size:8px;font-weight:700;display:flex;align-items:center;justify-content:center}
.dqc-msg-file-info{min-width:0;display:flex;flex-direction:column;gap:1px}
.dqc-msg-file-name{max-width:170px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dqc-fg);font-size:10px}
.dqc-msg-file-meta{color:var(--dqc-faint);font-size:8.5px}
.dqc-user-meta{display:flex;align-items:center;justify-content:flex-end;gap:5px;margin-top:4px;font-size:9.5px;color:var(--dqc-faint)}
.dqc-user-meta[data-state=queued]{color:color-mix(in srgb,var(--dqc-accent) 75%,var(--dqc-faint))}
.dqc-ai-avatar{flex:none;width:24px;height:24px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;margin-top:1px;box-shadow:0 3px 8px rgba(50,80,200,.15)}
.dqc-ai-avatar img,.dqc-ai-avatar video{width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit}
.dqc-ai-body{min-width:0;flex:1;font-size:13px;line-height:1.72;color:var(--dqc-fg);overflow-wrap:anywhere}
.dqc-panel[data-chat-bg=true] .dqc-ai-body{background:var(--dqc-ai-card,var(--dqc-bg));color:var(--dqc-ai-fg,var(--dqc-fg));border:1px solid color-mix(in srgb,var(--dqc-border) 60%,transparent);border-radius:14px;padding:10px 12px;box-shadow:0 8px 22px rgba(15,25,55,.06)}
.dqc-panel[data-chat-bg=true] .dqc-system-row{background:var(--dqc-bg)}
.dqc-panel[data-chat-bg=true] .dqc-empty{background:var(--dqc-bg);border-radius:14px;padding:16px}
.dqc-ai-name{font-size:10.5px;font-weight:600;letter-spacing:.02em;color:var(--dqc-faint);margin:0 0 3px;display:flex;align-items:center;gap:6px}
.dqc-msg-time{font-weight:400;color:var(--dqc-faint);opacity:.8}
.dqc-msg-actions{display:flex;gap:2px;margin-top:3px;opacity:0;transition:opacity .12s ease}
.dqc-msg:hover .dqc-msg-actions,.dqc-msg:focus-within .dqc-msg-actions{opacity:1}
.dqc-mini-btn{appearance:none;border:0;background:transparent;color:var(--dqc-faint);font-size:10px;line-height:1.4;padding:2px 5px;border-radius:5px;cursor:pointer;display:inline-flex;align-items:center;gap:4px}
.dqc-mini-btn:hover{background:var(--dqc-input);color:var(--dqc-fg)}
.dqc-cursor{display:inline-block;width:2px;height:13px;margin-left:2px;border-radius:2px;background:var(--dqc-accent);vertical-align:-2px;animation:dqc-caret 1s step-end infinite}
.dqc-thinking{display:flex;align-items:center;gap:5px;padding:5px 0 7px;color:var(--dqc-muted);font-size:11.5px}
.dqc-thinking-dot{width:4.5px;height:4.5px;border-radius:50%;background:color-mix(in srgb,var(--dqc-accent) 65%,var(--dqc-muted));animation:dqc-bounce 1.25s infinite ease-in-out}
.dqc-thinking-dot:nth-child(2){animation-delay:.13s}
.dqc-thinking-dot:nth-child(3){animation-delay:.26s}
.dqc-system-row{display:flex;align-items:center;justify-content:center;gap:6px;max-width:92%;padding:5px 10px;border-radius:999px;background:color-mix(in srgb,var(--dqc-danger) 7%,transparent);border:1px solid color-mix(in srgb,var(--dqc-danger) 14%,transparent);color:var(--dqc-danger);font-size:10.5px;line-height:1.5;text-align:center;overflow-wrap:anywhere}
.dqc-retry{appearance:none;border:0;background:transparent;color:var(--dqc-danger);font-size:10.5px;font-weight:600;cursor:pointer;padding:1px 4px;border-radius:4px;text-decoration:underline;text-underline-offset:2px}
.dqc-scroll-bottom{position:absolute;left:50%;bottom:104px;transform:translateX(-50%);z-index:3;appearance:none;border:1px solid var(--dqc-border);background:var(--dqc-raised);color:var(--dqc-muted);border-radius:999px;padding:5px 10px;font-size:10px;cursor:pointer;box-shadow:0 5px 16px rgba(20,35,80,.12);display:inline-flex;align-items:center;gap:4px}
.dqc-scroll-bottom:hover{color:var(--dqc-fg)}
.dqc-code{margin:9px 0 11px;border:1px solid var(--dqc-border);border-radius:11px;overflow:hidden;background:color-mix(in srgb,var(--dqc-bg-base) 66%,#0f172a 4%)}
.dqc-code-head{display:flex;align-items:center;justify-content:space-between;gap:8px;height:29px;padding:0 7px 0 11px;background:color-mix(in srgb,var(--dqc-input) 68%,transparent);border-bottom:1px solid color-mix(in srgb,var(--dqc-border) 76%,transparent)}
.dqc-code-lang{font-size:9.5px;letter-spacing:.04em;text-transform:uppercase;color:var(--dqc-faint);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.dqc-code-copy{appearance:none;border:0;background:transparent;color:var(--dqc-muted);font-size:9.5px;line-height:1;padding:4px 6px;border-radius:4px;cursor:pointer;display:inline-flex;align-items:center;gap:4px}
.dqc-code-copy:hover{background:var(--dqc-bg);color:var(--dqc-fg)}
.dqc-code pre{margin:0;padding:11px 12px;overflow:auto;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px;line-height:1.65;color:var(--dqc-fg);tab-size:2}
.dqc-md p{margin:0 0 10px;white-space:pre-wrap}
.dqc-md p:last-child{margin-bottom:0}
.dqc-md h1,.dqc-md h2,.dqc-md h3,.dqc-md h4{margin:2px 0 8px;line-height:1.4;font-weight:650;color:var(--dqc-fg)}
.dqc-md h1{font-size:16px}.dqc-md h2{font-size:15px}.dqc-md h3{font-size:14px}.dqc-md h4{font-size:13px}
.dqc-md ul,.dqc-md ol{margin:5px 0 10px;padding-left:20px}
.dqc-md li{margin:3px 0;padding-left:1px}
.dqc-md li::marker{color:var(--dqc-faint)}
.dqc-md blockquote{margin:8px 0 10px;padding:4px 0 4px 11px;border-left:2px solid color-mix(in srgb,var(--dqc-accent) 35%,var(--dqc-border));color:var(--dqc-muted)}
.dqc-md a{color:var(--dqc-accent);text-decoration:none;border-bottom:1px solid color-mix(in srgb,var(--dqc-accent) 32%,transparent)}
.dqc-md a:hover{border-bottom-color:var(--dqc-accent)}
.dqc-table-wrap{max-width:100%;overflow-x:auto;margin:8px 0 11px;border:1px solid var(--dqc-border);border-radius:9px;background:color-mix(in srgb,var(--dqc-raised) 55%,transparent);scrollbar-width:thin}
.dqc-md-table{width:100%;min-width:420px;border-collapse:collapse;font-size:11.5px;line-height:1.55}
.dqc-md-table th,.dqc-md-table td{padding:6px 8px;border-bottom:1px solid color-mix(in srgb,var(--dqc-border) 82%,transparent);vertical-align:top;overflow-wrap:anywhere}
.dqc-md-table th{background:color-mix(in srgb,var(--dqc-fg) 6%,transparent);color:var(--dqc-fg);font-weight:650;white-space:nowrap}
.dqc-md-table td{color:var(--dqc-fg)}
.dqc-md-table tbody tr:last-child td{border-bottom:0}
.dqc-md-table tbody tr:nth-child(even){background:color-mix(in srgb,var(--dqc-fg) 2.5%,transparent)}
.dqc-md-table code{font-size:10.5px}
.dqc-md code.dqc-inline{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px;padding:1.5px 4.5px;border-radius:4px;background:var(--dqc-input);border:1px solid color-mix(in srgb,var(--dqc-border) 80%,transparent)}
.dqc-md strong{font-weight:650}
.dqc-live-bar{flex:none;height:0;overflow:hidden;display:flex;align-items:center;gap:6px;padding:0 18px;color:var(--dqc-muted);font-size:10.5px;transition:height .16s ease,padding .16s ease;background:linear-gradient(180deg,transparent,var(--dqc-bg))}
.dqc-live-bar[data-show=true]{height:23px;padding-top:2px}
.dqc-mini-spinner{width:10px;height:10px;border:1.5px solid color-mix(in srgb,var(--dqc-accent) 22%,transparent);border-top-color:var(--dqc-accent);border-radius:50%;animation:dqc-spin .8s linear infinite;flex:none}
.dqc-question-dock{position:relative;z-index:2;flex:none;display:flex;flex-direction:column;gap:8px;max-height:min(46vh,380px);overflow-y:auto;padding:2px 13px 5px;scrollbar-width:thin}
.dqc-question-card{display:flex;flex-direction:column;flex:none;max-height:calc(min(46vh,380px) - 8px);border:1px solid var(--dqc-border);border-radius:12px;background:var(--dqc-raised);box-shadow:0 8px 24px rgba(25,40,90,.08);overflow:hidden}
.dqc-question-head{flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 11px;background:color-mix(in srgb,var(--dqc-accent) 7%,var(--dqc-raised));border-bottom:1px solid var(--dqc-border);color:var(--dqc-fg);font-size:11px;font-weight:600}
.dqc-question-head-right{display:flex;align-items:center;gap:7px;flex:none}
.dqc-question-close{width:19px;height:19px;padding:0;border:0;border-radius:50%;background:transparent;color:var(--dqc-faint);display:flex;align-items:center;justify-content:center;cursor:pointer}
.dqc-question-close:hover{background:color-mix(in srgb,var(--dqc-fg) 8%,transparent);color:var(--dqc-fg)}
.dqc-approval-reason{padding:11px;color:var(--dqc-fg);font-size:11px;line-height:1.6;white-space:pre-wrap;word-break:break-word}
.dqc-approval-card .dqc-question-head{background:color-mix(in srgb,#d97706 9%,var(--dqc-raised))}
.dqc-question-count{font-size:9px;font-weight:400;color:var(--dqc-faint)}
.dqc-question-list{flex:1 1 auto;min-height:0;max-height:none;overflow-y:auto;padding:0 11px;scrollbar-width:thin}
.dqc-question-item{padding:9px 0;border-top:1px solid color-mix(in srgb,var(--dqc-border) 70%,transparent)}
.dqc-question-item:first-child{border-top:0}
.dqc-question-label{font-size:9px;letter-spacing:.03em;color:var(--dqc-faint);margin-bottom:2px}
.dqc-question-title{font-size:12px;font-weight:600;line-height:1.5;color:var(--dqc-fg);margin-bottom:4px}
.dqc-question-detail{font-size:11px;line-height:1.55;color:var(--dqc-muted);margin-bottom:6px}
.dqc-question-detail .dqc-md p{margin-bottom:5px}
.dqc-question-options{display:flex;flex-direction:column;gap:5px;margin-bottom:6px}
.dqc-question-option{display:flex;flex-direction:column;align-items:flex-start;gap:1px;width:100%;padding:6px 8px;border:1px solid var(--dqc-border);border-radius:8px;background:var(--dqc-bg);color:var(--dqc-fg);text-align:left;cursor:pointer;font-size:11px}
.dqc-question-option:hover:not(:disabled){border-color:color-mix(in srgb,#4d6bfe 45%,var(--dqc-border));background:color-mix(in srgb,#4d6bfe 5%,var(--dqc-bg))}
.dqc-question-option[data-active=true]{border-color:#4d6bfe;background:color-mix(in srgb,#4d6bfe 10%,var(--dqc-bg));box-shadow:inset 0 0 0 1px color-mix(in srgb,#4d6bfe 22%,transparent)}
.dqc-question-option:focus-visible{outline:2px solid #4d6bfe;outline-offset:1px}
.dqc-question-option-label{font-weight:550;line-height:1.45}
.dqc-question-option-desc{font-size:9.5px;line-height:1.45;color:var(--dqc-muted)}
.dqc-question-input{width:100%;height:30px;padding:0 8px;border:1px solid var(--dqc-border);border-radius:7px;background:var(--dqc-bg);color:var(--dqc-fg);font-size:11px;outline:none}
.dqc-question-input:focus{border-color:#4d6bfe}
.dqc-question-error{flex:none;padding:6px 11px;color:var(--dqc-danger);font-size:10px;line-height:1.45;border-top:1px solid color-mix(in srgb,var(--dqc-danger) 18%,var(--dqc-border))}
.dqc-question-actions{flex:none;display:flex;justify-content:flex-end;align-items:center;gap:6px;padding:8px 11px;border-top:1px solid var(--dqc-border);background:color-mix(in srgb,var(--dqc-fg) 2%,var(--dqc-raised))}
.dqc-question-skip,.dqc-question-submit{height:28px;min-width:64px;padding:0 12px;border-radius:7px;font-size:10.5px;white-space:nowrap;cursor:pointer}
.dqc-question-skip{border:1px solid var(--dqc-border);background:transparent;color:var(--dqc-muted)}
.dqc-question-submit{border:0;background:#4d6bfe;color:#fff;box-shadow:0 2px 6px rgba(77,107,254,.2)}
.dqc-question-skip:disabled,.dqc-question-submit:disabled{opacity:.5;cursor:default}
.dqc-compose-wrap{position:relative;z-index:2;flex:none;padding:6px 13px 8px;background:linear-gradient(180deg,transparent,var(--dqc-bg) 26%)}
.dqc-panel[data-chat-bg=true] .dqc-head{background:linear-gradient(180deg,rgba(18,20,26,.58),rgba(18,20,26,0));color:#fff;border-bottom-color:transparent;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}
.dqc-panel[data-chat-bg=true] .dqc-head .dqc-icon-btn{color:#fff}
.dqc-panel[data-chat-bg=true] .dqc-head .dqc-icon-btn:hover{background:rgba(255,255,255,.12);color:#fff}
.dqc-panel[data-chat-bg=true] .dqc-head .dqc-icon-btn[data-active=true]{background:transparent;color:#a8c0ff}
.dqc-panel[data-chat-bg=true] .dqc-compose-wrap{background:linear-gradient(180deg,transparent,rgba(18,20,26,.30) 38%,rgba(18,20,26,.56));-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}
.dqc-panel[data-chat-bg=true] .dqc-composer{background:rgba(18,20,26,.44);border-color:rgba(255,255,255,.18);color:#fff;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}
.dqc-panel[data-chat-bg=true] .dqc-textarea{color:#fff}
.dqc-panel[data-chat-bg=true] .dqc-textarea::placeholder{color:rgba(255,255,255,.55)}
.dqc-panel[data-chat-bg=true] .dqc-tool-pill,.dqc-panel[data-chat-dark=true] .dqc-tool-pill{color:rgba(255,255,255,.78)}
.dqc-panel[data-chat-bg=true] .dqc-tool-pill:hover,.dqc-panel[data-chat-bg=true] .dqc-tool-pill[data-active=true],.dqc-panel[data-chat-dark=true] .dqc-tool-pill:hover,.dqc-panel[data-chat-dark=true] .dqc-tool-pill[data-active=true]{background:rgba(255,255,255,.18);color:#fff;box-shadow:inset 0 0 0 1px rgba(255,255,255,.24)}
.dqc-panel[data-chat-bg=true] .dqc-composer[data-focus=true]{border-color:rgba(255,255,255,.42);box-shadow:0 0 0 3px rgba(255,255,255,.08);background:rgba(18,20,26,.66)}
.dqc-panel[data-chat-bg=true] .dqc-send:disabled{background:linear-gradient(145deg,#7c95ff,#4d6bfe);color:#fff;opacity:.42}
.dqc-composer{display:flex;flex-direction:column;align-items:stretch;gap:5px;padding:7px 8px 7px 12px;border:1px solid var(--dqc-border-strong);border-radius:18px;background:var(--dqc-input);transition:border-color .14s ease,box-shadow .14s ease,background .14s ease;min-height:76px}
.dqc-composer[data-focus=true]{border-color:color-mix(in srgb,var(--dqc-accent) 45%,var(--dqc-border-strong));box-shadow:0 0 0 3px color-mix(in srgb,var(--dqc-accent) 8%,transparent);background:color-mix(in srgb,var(--dqc-input) 82%,var(--dqc-bg) 18%)}
.dqc-composer[data-disabled=true]{opacity:.7}
.dqc-attachments{display:flex;flex-wrap:wrap;gap:5px;min-width:0}
.dqc-attachment{display:flex;align-items:center;gap:6px;min-width:0;max-width:240px;height:34px;padding:3px 4px 3px 3px;border:1px solid var(--dqc-border);border-radius:8px;background:color-mix(in srgb,var(--dqc-raised) 82%,transparent);color:var(--dqc-muted);font-size:10px}
.dqc-attachment[data-status=error]{border-color:color-mix(in srgb,var(--dqc-danger) 40%,var(--dqc-border))}
.dqc-attachment-thumb{width:26px;height:26px;flex:none;border-radius:5px;object-fit:cover;display:block}
.dqc-attachment-ext{width:26px;height:26px;flex:none;border-radius:5px;background:linear-gradient(145deg,color-mix(in srgb,var(--dqc-accent) 82%,#fff),var(--dqc-accent));color:#fff;font-size:8px;font-weight:700;display:flex;align-items:center;justify-content:center;letter-spacing:.02em}
.dqc-attachment-info{min-width:0;display:flex;flex-direction:column;gap:1px}
.dqc-attachment-name{max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dqc-fg);font-size:10px}
.dqc-attachment-note{max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dqc-faint);font-size:8.5px}
.dqc-attachment[data-status=error] .dqc-attachment-note{color:var(--dqc-danger)}
.dqc-attachment-remove{width:18px;height:18px;flex:none;border:0;border-radius:50%;background:transparent;color:var(--dqc-faint);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0}
.dqc-attachment-remove:hover:not(:disabled){background:color-mix(in srgb,var(--dqc-danger) 12%,transparent);color:var(--dqc-danger)}
.dqc-attachment-remove:disabled{opacity:.45;cursor:default}
.dqc-textarea{flex:1;min-width:0;resize:none;border:0;outline:0;background:transparent;color:var(--dqc-fg);font-size:13px;line-height:1.55;padding:5px 0 4px;max-height:124px;min-height:24px;overflow-y:auto;scrollbar-width:thin}
.dqc-textarea::placeholder{color:var(--dqc-faint)}
.dqc-compose-actions{display:flex;align-items:center;gap:2px;flex:none;padding-bottom:1px}
.dqc-compose-bar{display:flex;align-items:center;gap:4px;min-width:0;min-height:28px}
.dqc-compose-left{display:flex;align-items:center;gap:3px;min-width:0}
.dqc-compose-right{display:flex;align-items:center;gap:3px;min-width:0;margin-left:auto}
.dqc-tool-pill{height:26px;min-width:0;padding:0 6px;border:0;border-radius:8px;background:transparent;color:var(--dqc-muted);font-size:11px;line-height:1;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;cursor:pointer;transition:background .12s ease,color .12s ease}
.dqc-tool-pill:hover,.dqc-tool-pill[data-active=true]{background:color-mix(in srgb,var(--dqc-fg) 12%,transparent);color:var(--dqc-fg);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--dqc-fg) 16%,transparent)}
.dqc-tool-pill-label{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dqc-tool-plus{width:26px;padding:0;justify-content:center}
.dqc-tool-model{max-width:132px}
.dqc-tool-model .dqc-tool-pill-label{max-width:120px}
.dqc-tool-permission{max-width:112px}
.dqc-tool-permission .dqc-tool-pill-label{max-width:78px}
.dqc-tool-menu{position:absolute;z-index:26;bottom:calc(100% + 8px);background:var(--dqc-raised);border:1px solid var(--dqc-border);border-radius:13px;box-shadow:0 16px 44px rgba(15,25,55,.18),0 3px 10px rgba(15,25,55,.08);padding:6px;animation:dqc-menu-in .13s ease;overflow:hidden}
.dqc-tool-menu-left{left:10px;width:214px;max-width:calc(100% - 20px)}
.dqc-tool-menu-right{right:10px;width:300px;max-width:calc(100% - 20px)}
.dqc-tool-title{padding:5px 7px 6px;color:var(--dqc-faint);font-size:9.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase}
.dqc-tool-scroll{max-height:214px;overflow-y:auto;scrollbar-width:thin}
.dqc-tool-group{padding:6px 7px 3px;color:var(--dqc-faint);font-size:9px;font-weight:600;letter-spacing:.05em}
.dqc-tool-option{appearance:none;border:0;background:transparent;width:100%;min-height:31px;display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:8px;color:var(--dqc-fg);font-size:12px;text-align:left;cursor:pointer}
.dqc-tool-option:hover{background:var(--dqc-input)}
.dqc-tool-option[data-active=true]{background:color-mix(in srgb,var(--dqc-accent) 10%,transparent);color:var(--dqc-accent)}
.dqc-tool-option-label{min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:flex;align-items:center;gap:6px}
.dqc-tool-badge{padding:1px 6px;border-radius:999px;background:color-mix(in srgb,var(--dqc-accent) 12%,transparent);color:var(--dqc-accent);font-size:9.5px;line-height:1.4;flex:none}
.dqc-tool-empty{padding:8px 7px;color:var(--dqc-faint);font-size:11px}
.dqc-tool-hint{padding:2px 7px 7px;color:var(--dqc-faint);font-size:10px;line-height:1.45}
.dqc-tool-divider{height:1px;margin:5px 6px;background:var(--dqc-border)}
.dqc-tool-row-title{padding:2px 7px 5px;color:var(--dqc-faint);font-size:9.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase}
.dqc-tool-chips{display:flex;flex-wrap:wrap;gap:4px;padding:0 4px 4px}
.dqc-tool-chip{height:24px;padding:0 8px;border:1px solid var(--dqc-border);border-radius:7px;background:transparent;color:var(--dqc-muted);font-size:10.5px;cursor:pointer}
.dqc-tool-chip:hover{color:var(--dqc-fg);border-color:var(--dqc-border-strong)}
.dqc-tool-chip[data-active=true]{background:var(--dqc-accent);border-color:var(--dqc-accent);color:#fff}
.dqc-tool-toggle{width:100%;min-height:32px;border:0;background:transparent;padding:5px 7px;border-radius:8px;display:flex;align-items:center;gap:8px;color:var(--dqc-fg);font-size:12px;cursor:pointer}
.dqc-tool-toggle:hover{background:var(--dqc-input)}
.dqc-tool-switch{width:30px;height:17px;border-radius:999px;background:var(--dqc-border-strong);position:relative;flex:none;transition:background .14s ease}
.dqc-tool-switch::after{content:"";position:absolute;top:2px;left:2px;width:13px;height:13px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .14s ease}
.dqc-tool-toggle[data-active=true] .dqc-tool-switch{background:var(--dqc-accent)}
.dqc-tool-toggle[data-active=true] .dqc-tool-switch::after{transform:translateX(13px)}
.dqc-stop{width:30px;height:30px;border:0;border-radius:50%;background:transparent;color:var(--dqc-muted);display:inline-flex;align-items:center;justify-content:center;cursor:pointer}
.dqc-stop:hover{background:color-mix(in srgb,var(--dqc-danger) 10%,transparent);color:var(--dqc-danger)}
.dqc-send{width:32px;height:32px;border:0;border-radius:50%;background:linear-gradient(145deg,#7c95ff,#4d6bfe);color:#fff;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 5px 14px rgba(77,107,254,.28);transition:opacity .12s ease,transform .12s ease,box-shadow .12s ease}
.dqc-send:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 7px 18px rgba(77,107,254,.34)}
.dqc-send:active:not(:disabled){transform:translateY(0) scale(.96)}
.dqc-send:disabled{background:linear-gradient(145deg,#7c95ff,#4d6bfe);color:#fff;opacity:.42;box-shadow:none;cursor:default}
.dqc-hint-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 3px 0;color:var(--dqc-faint);font-size:9.5px;line-height:1.35;user-select:none}
.dqc-hint-left{display:flex;align-items:center;gap:5px;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.dqc-hint-right{display:flex;align-items:center;gap:4px;flex:none}
.dqc-kbd{border:1px solid color-mix(in srgb,var(--dqc-border) 90%,transparent);border-bottom-color:var(--dqc-border-strong);border-radius:4px;padding:0 4px;font-size:8.5px;line-height:14px;color:var(--dqc-faint);background:color-mix(in srgb,var(--dqc-bg) 62%,transparent)}
.dqc-resize{position:absolute;right:2px;bottom:2px;width:16px;height:16px;cursor:nwse-resize;z-index:4;touch-action:none;opacity:.55}
.dqc-resize::before,.dqc-resize::after{content:"";position:absolute;right:4px;bottom:4px;border-right:1.5px solid var(--dqc-faint);border-bottom:1.5px solid var(--dqc-faint);border-radius:0 0 2px 0;width:7px;height:7px}
.dqc-resize::after{width:3.5px;height:3.5px;right:3px;bottom:3px;opacity:.65}
.dqc-resize:hover{opacity:1}
.dqc-window-edge{position:fixed;z-index:60;background:transparent;touch-action:none}
.dqc-window-edge:hover{background:color-mix(in srgb,var(--dqc-accent) 14%,transparent)}
.dqc-window-edge-n{top:0;left:16px;right:16px;height:12px;cursor:ns-resize}
.dqc-window-edge-s{bottom:0;left:16px;right:16px;height:12px;cursor:ns-resize}
.dqc-window-edge-w{left:8px;top:16px;bottom:16px;width:12px;cursor:ew-resize}
.dqc-window-edge-e{right:8px;top:16px;bottom:16px;width:12px;cursor:ew-resize}
.dqc-window-edge-nw{left:0;top:0;width:16px;height:16px;z-index:62;cursor:nwse-resize}
.dqc-window-edge-ne{right:0;top:0;width:16px;height:16px;z-index:62;cursor:nesw-resize}
.dqc-window-edge-sw{left:0;bottom:0;width:16px;height:16px;z-index:62;cursor:nesw-resize}
.dqc-window-edge-se{right:0;bottom:0;width:16px;height:16px;z-index:62;cursor:nwse-resize}
.dqc-panel[data-webview=true] .dqc-body{margin-right:20px}
.dqc-menu{position:absolute;z-index:20;top:53px;right:10px;width:268px;max-width:calc(100% - 20px);background:var(--dqc-raised);border:1px solid var(--dqc-border);border-radius:13px;box-shadow:0 16px 44px rgba(15,25,55,.18),0 3px 10px rgba(15,25,55,.08);padding:5px;animation:dqc-menu-in .13s ease;overflow:hidden}
.dqc-menu[data-wide=true]{width:292px}
.dqc-menu-title{display:flex;align-items:center;justify-content:space-between;padding:6px 8px 6px;color:var(--dqc-faint);font-size:9.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase}
.dqc-menu-list{max-height:302px;overflow-y:auto;scrollbar-width:thin}
.dqc-menu-item{appearance:none;border:0;background:transparent;width:100%;min-height:33px;display:flex;align-items:center;gap:9px;padding:6px 8px;border-radius:8px;color:var(--dqc-fg);font-size:12px;line-height:1.35;text-align:left;cursor:pointer}
.dqc-menu-item:hover{background:var(--dqc-input)}
.dqc-menu-item:disabled{opacity:.4;cursor:default;background:transparent}
.dqc-menu-item[data-danger=true]{color:var(--dqc-danger)}
.dqc-menu-item[data-danger=true] .dqc-menu-icon{color:var(--dqc-danger)}
.dqc-menu-icon{flex:none;width:15px;height:15px;display:inline-flex;align-items:center;justify-content:center;color:var(--dqc-muted)}
.dqc-menu-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dqc-menu-sub{display:block;font-size:9.5px;color:var(--dqc-faint);margin-top:1px}
.dqc-menu-sep{height:1px;margin:4px 6px;background:var(--dqc-border)}
.dqc-history-item{appearance:none;border:0;background:transparent;width:100%;display:flex;align-items:flex-start;gap:9px;padding:8px;border-radius:8px;text-align:left;cursor:pointer}
.dqc-history-item:hover{background:var(--dqc-input)}
.dqc-history-item[data-current=true]{background:color-mix(in srgb,var(--dqc-accent) 8%,transparent)}
.dqc-history-icon{flex:none;width:18px;height:18px;border-radius:6px;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--dqc-accent) 12%,transparent);color:var(--dqc-accent);margin-top:1px}
.dqc-history-text{min-width:0;flex:1;display:flex;flex-direction:column;gap:2px}
.dqc-history-title{font-size:11.5px;line-height:1.45;color:var(--dqc-fg);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dqc-history-time{font-size:9px;color:var(--dqc-faint)}
.dqc-empty-menu{padding:12px 9px 14px;text-align:center;color:var(--dqc-faint);font-size:10.5px;line-height:1.6}
.dqc-toast{position:absolute;left:50%;bottom:116px;transform:translateX(-50%);z-index:30;max-width:calc(100% - 30px);padding:7px 11px;border-radius:8px;background:color-mix(in srgb,var(--dqc-fg) 94%,transparent);color:var(--dqc-bg);font-size:10.5px;line-height:1.45;box-shadow:0 8px 26px rgba(0,0,0,.22);animation:dqc-toast-in .16s ease;text-align:center;pointer-events:none}
.dqc-pip-overlay{position:fixed;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,transparent,var(--dqc-accent),transparent);opacity:.35;z-index:50;pointer-events:none}
.dqc-pip-host{position:fixed;inset:0;display:flex;flex-direction:column;overflow:hidden;background:var(--dqc-bg)}
.dqc-pip-host .dqc-panel{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;border-radius:0!important;border:0!important;box-shadow:none!important;animation:none!important}
.dqc-pip-host .dqc-resize{display:none}
.dqc-pip-host .dqc-head{cursor:default}
.dqc-layer[data-standalone=true]{pointer-events:auto;position:fixed;inset:0;background:var(--dqc-bg-base);z-index:2147483647;display:flex}
.dqc-panel[data-standalone=true]{position:absolute;inset:0;width:100%!important;height:100%!important;border-radius:0;border:0;box-shadow:none;animation:none}
.dqc-panel[data-standalone=true]::before{display:none}
.dqc-panel[data-standalone=true] .dqc-head{cursor:default}
.dqc-panel[data-webview=true] .dqc-head{cursor:grab}
.dqc-panel[data-webview=true] .dqc-head:active{cursor:grabbing}
.dqc-close-window:hover{background:color-mix(in srgb,var(--dqc-danger) 10%,transparent);color:var(--dqc-danger)}
.dqc-panel[data-standalone=true] .dqc-resize{display:none}
html[data-dqc-standalone="1"],html[data-dqc-standalone="1"] body{overflow:hidden!important}
html[data-dqc-standalone="1"] body{background:var(--dsw-alias-bg-base,#f7f8fa)}
.dqc-sidebar{appearance:none;border:0;background:transparent;display:flex;align-items:center;gap:8px;width:100%;height:32px;padding:0 9px;border-radius:8px;color:var(--dsw-alias-label-secondary,var(--dqc-muted));font-size:13px;line-height:20px;font-family:inherit;text-align:left;cursor:pointer;white-space:nowrap;transition:background .12s ease,color .12s ease}
.dqc-sidebar:hover{background:var(--dsw-alias-bg-layer-2,var(--dqc-input));color:var(--dsw-alias-label-primary,var(--dqc-fg))}
.dqc-sidebar:focus-visible{outline:2px solid color-mix(in srgb,var(--dqc-accent) 30%,transparent);outline-offset:-2px}
.dqc-sidebar[data-wide=false]{width:32px;justify-content:center;padding:0}
.dqc-sidebar-icon{flex:none;width:18px;height:18px;border-radius:6px;overflow:hidden;display:flex;align-items:center;justify-content:center}
.dqc-sidebar-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}
.dqc-sidebar-kbd{flex:none;font-family:inherit;font-size:9px;letter-spacing:.02em;color:var(--dsw-alias-label-tertiary,var(--dqc-faint));border:1px solid var(--dsw-alias-border-l1,var(--dqc-border));border-radius:4px;padding:0 4px;line-height:15px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-1,var(--dqc-bg)) 55%,transparent)}
.dqc-sidebar[data-hasunread=true] .dqc-sidebar-icon::after{content:"";position:absolute;width:5px;height:5px;border-radius:50%;background:#ff5b5b;transform:translate(7px,-7px);box-shadow:0 0 0 1.5px var(--dsw-alias-bg-layer-1,var(--dqc-bg))}
.dqc-sidebar-icon{position:relative}
.dqc-pip-host .dqc-layer{position:static;inset:auto;pointer-events:auto;width:100%;height:100%}
@keyframes dqc-panel-in{from{opacity:0;transform:translateY(7px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes dqc-menu-in{from{opacity:0;transform:translateY(-3px)}to{opacity:1;transform:translateY(0)}}
.dqc-set{display:flex;flex-direction:column;gap:18px;color:var(--dsw-alias-label-primary,#14161a);font-size:12.5px}
.dqc-set-head h2{margin:0 0 4px;font-size:16px;font-weight:650;color:var(--dsw-alias-label-primary,#14161a)}
.dqc-set-head p{margin:0;font-size:12px;line-height:1.6;color:var(--dsw-alias-label-secondary,#69707d)}
.dqc-set-section{display:flex;flex-direction:column;gap:12px;padding:14px;border:1px solid var(--dsw-alias-border-l1,#e6e9f0);border-radius:12px;background:var(--dsw-alias-bg-layer-1,#fff)}
.dqc-set-label{font-size:12px;font-weight:600}
.dqc-set-inline{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.dqc-set-ball{width:48px;height:48px;flex:none;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#86a8ff,#4d6bfe 55%,#2d3fbe);box-shadow:0 6px 14px rgba(50,80,200,.18)}
.dqc-set-ball img,.dqc-set-ball video{width:100%;height:100%;object-fit:cover;display:block}
.dqc-set-bg{width:76px;height:48px;flex:none;border-radius:8px;border:1px solid var(--dsw-alias-border-l1,#e6e9f0);background-size:cover;background-position:center}
.dqc-set-swatches{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.dqc-set-swatch{width:28px;height:28px;padding:0;border:1px solid rgba(0,0,0,.12);border-radius:50%;cursor:pointer;transition:box-shadow .12s ease,transform .12s ease}
.dqc-set-swatch:hover{transform:translateY(-1px)}
.dqc-set-swatch[data-active=true]{box-shadow:0 0 0 2px var(--dsw-alias-bg-layer-1,#fff),0 0 0 4px var(--dsw-alias-brand-primary,#4d6bfe)}
.dqc-set-swatch:disabled{cursor:default;opacity:.6}
.dqc-set-color{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--dsw-alias-label-secondary,#69707d);cursor:pointer}
.dqc-set-color input{width:28px;height:24px;padding:0;border:0;background:none;cursor:pointer}
.dqc-set-message-colors{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:12px;padding-top:10px;border-top:1px solid var(--dsw-alias-border-l1,#e9edf5)}
.dqc-set-message-colors .dqc-set-row-label{width:60px}
.dqc-set-message-color{height:28px;padding:0 8px;border:1px solid var(--dsw-alias-border-l2,#d8dce5);border-radius:8px}
.dqc-set-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.dqc-set-btn{height:30px;padding:0 12px;border:1px solid var(--dsw-alias-border-l2,#d8dce5);border-radius:8px;background:var(--dsw-alias-bg-layer-1,#fff);color:var(--dsw-alias-label-primary,#14161a);font-size:12px;cursor:pointer}
.dqc-set-btn:hover:not(:disabled){border-color:var(--dsw-alias-brand-primary,#4d6bfe);color:var(--dsw-alias-brand-primary,#4d6bfe)}
.dqc-set-btn:disabled{opacity:.55;cursor:default}
.dqc-set-status{min-height:16px;font-size:11px;color:var(--dsw-alias-label-tertiary,#8b93a1)}
.dqc-set-status:not(:empty){color:var(--dsw-alias-brand-primary,#4d6bfe)}
.dqc-set-btn-quiet{background:transparent}
.dqc-set-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:10px}
.dqc-set-row-label{width:34px;font-size:11px;color:var(--dsw-alias-label-secondary,#5d6575);flex:none}
.dqc-set-choice{height:28px;padding:0 10px;border:1px solid var(--dsw-alias-border-l2,#d8dce5);border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary,#5d6575);font-size:11px;cursor:pointer}
.dqc-set-choice:hover:not(:disabled){border-color:var(--dsw-alias-brand-primary,#4d6bfe);color:var(--dsw-alias-brand-primary,#4d6bfe)}
.dqc-set-choice[data-active=true]{border-color:var(--dsw-alias-brand-primary,#4d6bfe);background:color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 10%,transparent);color:var(--dsw-alias-brand-primary,#4d6bfe)}
.dqc-set-choice:disabled{opacity:.55;cursor:default}
.dqc-set-range{width:150px;accent-color:var(--dsw-alias-brand-primary,#4d6bfe)}
.dqc-set-size-value{min-width:42px;font-size:11px;color:var(--dsw-alias-label-tertiary,#8b93a1)}
.dqc-set-apply-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;padding-top:10px;border-top:1px solid var(--dsw-alias-border-l1,#e9edf5)}
.dqc-set-hint{font-size:10.5px;color:var(--dsw-alias-label-tertiary,#8b93a1);line-height:1.45}
.dqc-set-hint[data-warn=true]{color:#c2410c}
.dqc-set-apply{background:var(--dsw-alias-brand-primary,#4d6bfe);border-color:var(--dsw-alias-brand-primary,#4d6bfe);color:#fff}
.dqc-set-apply:hover:not(:disabled){background:color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 88%,#000);border-color:color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 88%,#000);color:#fff}
.dqc-set-name-row{display:flex;align-items:center;gap:10px;margin-top:12px}
.dqc-set-name-row .dqc-set-row-label{width:60px}
.dqc-set-input{flex:1;min-width:0;height:30px;padding:0 10px;border:1px solid var(--dsw-alias-border-l2,#d8dce5);border-radius:8px;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#1a1f2e);font-size:12px;outline:none}
.dqc-set-input:focus{border-color:var(--dsw-alias-brand-primary,#4d6bfe);box-shadow:0 0 0 2px color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 12%,transparent)}
.dqc-set-label-sub{margin-top:14px;font-size:10px;letter-spacing:.04em;color:var(--dsw-alias-label-tertiary,#8b93a1)}
.dqc-media-history{display:flex;flex-wrap:wrap;gap:9px;margin-top:8px}
.dqc-media-history-item{position:relative;width:56px;height:56px;flex:none}
.dqc-media-history-thumb{width:56px;height:56px;padding:0;border:1px solid var(--dsw-alias-border-l2,#d8dce5);border-radius:10px;overflow:hidden;background:color-mix(in srgb,var(--dsw-alias-bg-layer-2,#f2f4f7) 80%,#fff);cursor:pointer;display:flex;align-items:center;justify-content:center}
.dqc-media-history-thumb:hover:not(:disabled){border-color:var(--dsw-alias-brand-primary,#4d6bfe);box-shadow:0 0 0 2px color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 14%,transparent)}
.dqc-media-history-thumb img{width:100%;height:100%;object-fit:cover;display:block}
.dqc-media-history-video{font-size:14px;color:var(--dsw-alias-brand-primary,#4d6bfe)}
.dqc-media-history-delete{position:absolute;top:-5px;right:-5px;width:17px;height:17px;padding:0;border:1px solid #fff;border-radius:50%;background:rgba(25,31,45,.72);color:#fff;font-size:12px;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer}
.dqc-media-history-delete:hover:not(:disabled){background:var(--dsw-alias-state-error-primary,#d33b3b)}
.dqc-media-history-delete:disabled{opacity:.45;cursor:default}
.dqc-crop-overlay{position:fixed;inset:0;z-index:120;background:rgba(20,27,45,.34);display:flex;align-items:center;justify-content:center;padding:20px}
.dqc-crop-card{width:min(360px,100%);background:var(--dsw-alias-bg-base,#fff);border:1px solid var(--dsw-alias-border-l2,#d8dce5);border-radius:16px;box-shadow:0 24px 70px rgba(15,25,55,.24);padding:16px}
.dqc-crop-title{font-size:14px;font-weight:600;margin-bottom:12px;color:var(--dsw-alias-label-primary,#1a1f2e)}
.dqc-crop-stage{width:240px;height:240px;max-width:100%;margin:0 auto 12px;border-radius:50%;overflow:hidden;background:#eef1f7;display:flex;align-items:center;justify-content:center;cursor:grab}
.dqc-crop-stage img{width:100%;height:100%;object-fit:cover;transform-origin:center;transition:transform .05s linear;user-select:none}
.dqc-crop-control{display:flex;align-items:center;gap:8px;margin:8px 0;font-size:11px;color:var(--dsw-alias-label-secondary,#5d6575)}
.dqc-crop-control span{width:28px;flex:none}
.dqc-crop-control input{flex:1;accent-color:var(--dsw-alias-brand-primary,#4d6bfe)}
.dqc-crop-actions{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:12px}
.dqc-bg-editor-overlay{position:fixed;inset:0;z-index:130;background:rgba(20,27,45,.45);display:flex;align-items:center;justify-content:center;padding:18px}
.dqc-bg-editor-card{width:min(760px,100%);max-height:calc(100vh - 36px);overflow:auto;background:var(--dsw-alias-bg-base,#fff);border:1px solid var(--dsw-alias-border-l2,#d8dce5);border-radius:16px;box-shadow:0 24px 70px rgba(15,25,55,.28);padding:16px}
.dqc-bg-editor-title{font-size:14px;font-weight:600;margin-bottom:12px;color:var(--dsw-alias-label-primary,#1a1f2e)}
.dqc-bg-editor-layout{display:flex;gap:18px;align-items:flex-start}
.dqc-bg-editor-stage{position:relative;flex:1;min-width:0;height:300px;border-radius:12px;overflow:hidden;background:#111318;touch-action:none}
.dqc-bg-editor-image{position:absolute;display:block;max-width:none;max-height:none;object-fit:fill;user-select:none;pointer-events:none}
.dqc-bg-editor-imagebox{position:absolute}
.dqc-bg-editor-box{position:absolute;border:1.5px solid #fff;box-shadow:0 0 0 9999px rgba(0,0,0,.52);cursor:move;touch-action:none}
.dqc-bg-editor-handle{position:absolute;width:10px;height:10px;background:#fff;border:1px solid rgba(0,0,0,.45);border-radius:2px;touch-action:none}
.dqc-bg-editor-handle-nw{left:-5px;top:-5px;cursor:nwse-resize}
.dqc-bg-editor-handle-n{left:50%;top:-5px;margin-left:-5px;cursor:ns-resize}
.dqc-bg-editor-handle-ne{right:-5px;top:-5px;cursor:nesw-resize}
.dqc-bg-editor-handle-e{right:-5px;top:50%;margin-top:-5px;cursor:ew-resize}
.dqc-bg-editor-handle-se{right:-5px;bottom:-5px;cursor:nwse-resize}
.dqc-bg-editor-handle-s{left:50%;bottom:-5px;margin-left:-5px;cursor:ns-resize}
.dqc-bg-editor-handle-sw{left:-5px;bottom:-5px;cursor:nesw-resize}
.dqc-bg-editor-handle-w{left:-5px;top:50%;margin-top:-5px;cursor:ew-resize}
.dqc-bg-editor-preview{width:150px;flex:none;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:10.5px;color:var(--dsw-alias-label-tertiary,#8b93a1)}
.dqc-bg-editor-preview-frame{position:relative;width:150px;height:210px;border-radius:12px;overflow:hidden;background:#111318;border:1px solid var(--dsw-alias-border-l2,#d8dce5)}
.dqc-bg-editor-preview-frame img{position:absolute;display:block;max-width:none;max-height:none;object-fit:fill}
.dqc-crop-shapes{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:2px 0 10px}
.dqc-crop-shapes .dqc-set-row-label{margin-right:4px}
.dqc-crop-preview-frame{position:relative;width:150px;height:150px;border-radius:12px;overflow:visible;background:transparent;border:0}
.dqc-crop-preview-frame img{position:absolute;display:block;max-width:none;max-height:none;object-fit:fill}
.dqc-bg-editor-hint{font-size:10px;line-height:1.4;color:var(--dsw-alias-label-tertiary,#8b93a1)}
.dqc-bg-editor-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:14px;padding-top:12px;border-top:1px solid var(--dsw-alias-border-l1,#e9edf5)}
.dqc-bg-editor-spacer{flex:1}
@media (max-width: 700px){.dqc-bg-editor-layout{flex-direction:column}.dqc-bg-editor-stage{width:100%;height:260px}.dqc-bg-editor-preview{width:100%;flex-direction:row;justify-content:center}.dqc-bg-editor-preview-frame{width:110px;height:154px}}
@media (max-width: 400px){.dqc-tool-permission .dqc-tool-pill-label{display:none}.dqc-tool-model{max-width:102px}.dqc-tool-model .dqc-tool-pill-label{max-width:94px}}
@keyframes dqc-msg-in{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}
@keyframes dqc-toast-in{from{opacity:0;transform:translate(-50%,3px)}to{opacity:1;transform:translate(-50%,0)}}
@keyframes dqc-fade-in{from{opacity:0}to{opacity:1}}
@keyframes dqc-spin{to{transform:rotate(360deg)}}
@keyframes dqc-caret{50%{opacity:0}}
@keyframes dqc-bounce{0%,60%,100%{transform:translateY(0);opacity:.42}30%{transform:translateY(-3px);opacity:1}}
@keyframes dqc-pulse{0%,100%{box-shadow:0 0 0 2px color-mix(in srgb,var(--dqc-accent) 10%,transparent)}50%{box-shadow:0 0 0 4px color-mix(in srgb,var(--dqc-accent) 18%,transparent)}}
@media (prefers-reduced-motion:reduce){.dqc-layer *,.dqc-layer *::before,.dqc-layer *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}.dqc-body{scroll-behavior:auto}}
`

    // ---------------------------------------------------------------------
    // Icons
    // ---------------------------------------------------------------------

    function Icon({ name, size = 16, strokeWidth = 1.7, className }) {
      const common = {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': 'true',
        className,
      }
      switch (name) {
        case 'minus':
          return h('svg', common, h('path', { d: 'M5 12h14' }))
        case 'plus':
          return h('svg', common, [h('path', { key: 'a', d: 'M12 5v14' }), h('path', { key: 'b', d: 'M5 12h14' })])
        case 'shield':
          return h('svg', common, [
            h('path', { key: 'a', d: 'M12 3l7 3v6c0 4.2-3 7-7 9-4-2-7-4.8-7-9V6l7-3Z' }),
            h('path', { key: 'b', d: 'm9.2 12 1.9 1.9 3.8-3.8' }),
          ])
        case 'chevron-right':
          return h('svg', common, h('path', { d: 'm9 5 7 7-7 7' }))
        case 'compose':
          return h('svg', common, [
            h('path', { key: 'a', d: 'M12 20h9' }),
            h('path', { key: 'b', d: 'M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z' }),
          ])
        case 'history':
          return h('svg', common, [
            h('path', { key: 'a', d: 'M3 12a9 9 0 1 0 3-6.7L3 8' }),
            h('path', { key: 'b', d: 'M3 3v5h5' }),
            h('path', { key: 'c', d: 'M12 7v5l3 2' }),
          ])
        case 'pin':
          return h('svg', common, [
            h('path', { key: 'a', d: 'M9 4h6l-1 6 3 2v2H7v-2l3-2-1-6Z' }),
            h('path', { key: 'b', d: 'M12 14v7' }),
          ])
        case 'pin-filled':
          return h('svg', { ...common, fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1 }, [
            h('path', { key: 'a', d: 'M8.8 3.5h6.4l-.8 6.2 3 2.3v2.5H6.6V12l3-2.3-.8-6.2Z' }),
            h('path', { key: 'b', d: 'M12 14.5v7', fill: 'none', strokeWidth: 1.8 }),
          ])
        case 'more':
          return h('svg', { ...common, fill: 'currentColor', stroke: 'none' }, [
            h('circle', { key: 'a', cx: 5, cy: 12, r: 1.35 }),
            h('circle', { key: 'b', cx: 12, cy: 12, r: 1.35 }),
            h('circle', { key: 'c', cx: 19, cy: 12, r: 1.35 }),
          ])
        case 'close':
          return h('svg', common, [h('path', { key: 'a', d: 'M6 6l12 12' }), h('path', { key: 'b', d: 'M18 6 6 18' })])
        case 'send':
          return h('svg', common, [h('path', { key: 'a', d: 'M12 19V5' }), h('path', { key: 'b', d: 'm6 11 6-6 6 6' })])
        case 'stop':
          return h('svg', { ...common, fill: 'currentColor', stroke: 'none' }, h('rect', { x: 7, y: 7, width: 10, height: 10, rx: 2 }))
        case 'copy':
          return h('svg', common, [
            h('rect', { key: 'a', x: 9, y: 9, width: 11, height: 11, rx: 2 }),
            h('path', { key: 'b', d: 'M5 15V6a2 2 0 0 1 2-2h9' }),
          ])
        case 'expand':
          return h('svg', common, [
            h('path', { key: 'a', d: 'M14 4h6v6' }),
            h('path', { key: 'b', d: 'M20 4 13 11' }),
            h('path', { key: 'c', d: 'M10 20H4v-6' }),
            h('path', { key: 'd', d: 'M4 20 11 13' }),
          ])
        case 'back':
          return h('svg', common, [
            h('path', { key: 'a', d: 'M10 4H4v6' }),
            h('path', { key: 'b', d: 'M4 4 11 11' }),
            h('path', { key: 'c', d: 'M14 20h6v-6' }),
            h('path', { key: 'd', d: 'm20 20-7-7' }),
          ])
        case 'sparkle':
          return h('svg', { ...common, fill: 'currentColor', stroke: 'none' }, [
            h('path', { key: 'a', d: 'M12 2.7c.4 3.4 2 5 5.4 5.4-3.4.4-5 2-5.4 5.4-.4-3.4-2-5-5.4-5.4 3.4-.4 5-2 5.4-5.4Z' }),
            h('path', { key: 'b', d: 'M18.2 14.2c.2 1.7 1 2.5 2.7 2.7-1.7.2-2.5 1-2.7 2.7-.2-1.7-1-2.5-2.7-2.7 1.7-.2 2.5-1 2.7-2.7Z' }),
          ])
        case 'trash':
          return h('svg', common, [
            h('path', { key: 'a', d: 'M4 7h16' }),
            h('path', { key: 'b', d: 'M9 7V5h6v2' }),
            h('path', { key: 'c', d: 'M6 7l1 13h10l1-13' }),
            h('path', { key: 'd', d: 'M10 11v5M14 11v5' }),
          ])
        case 'info':
          return h('svg', common, [
            h('circle', { key: 'a', cx: 12, cy: 12, r: 9 }),
            h('path', { key: 'b', d: 'M12 11v5' }),
            h('path', { key: 'c', d: 'M12 8h.01' }),
          ])
        case 'chevron-down':
          return h('svg', common, h('path', { d: 'm6 9 6 6 6-6' }))
        case 'arrow-down':
          return h('svg', common, [h('path', { key: 'a', d: 'M12 5v14' }), h('path', { key: 'b', d: 'm6 13 6 6 6-6' })])
        case 'check':
          return h('svg', common, h('path', { d: 'm5 12 4 4L19 6' }))
        default:
          return h('svg', common, h('circle', { cx: 12, cy: 12, r: 8 }))
      }
    }

    function BrandMark({ size = 30, className }) {
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 64 64',
          fill: 'none',
          'aria-hidden': 'true',
          className,
        },
        h(
          'defs',
          null,
          h(
            'linearGradient',
            { id: 'dqc-brand-gradient', x1: 7, y1: 5, x2: 58, y2: 61, gradientUnits: 'userSpaceOnUse' },
            h('stop', { stopColor: '#86A8FF' }),
            h('stop', { offset: '.5', stopColor: '#4D6BFE' }),
            h('stop', { offset: 1, stopColor: '#2D3FBE' }),
          ),
        ),
        h('rect', { width: 64, height: 64, rx: 17, fill: 'url(#dqc-brand-gradient)' }),
        h('path', {
          d: 'M17.5 24.7c0-4.2 3.4-7.6 7.6-7.6h13.8c4.2 0 7.6 3.4 7.6 7.6v8.6c0 4.2-3.4 7.6-7.6 7.6H30.2l-7.5 5.5c-1.2.9-2.9.1-2.9-1.4V24.7Z',
          fill: 'white',
          fillOpacity: '.97',
        }),
        h('path', {
          d: 'M40.1 18.5l1.5 3.7 3.7 1.5-3.7 1.5-1.5 3.7-1.5-3.7-3.7-1.5 3.7-1.5 1.5-3.7Z',
          fill: '#4D6BFE',
        }),
      )
    }

    // ---------------------------------------------------------------------
    // Observable store
    // ---------------------------------------------------------------------

    function createStore(initial) {
      const listeners = new Set()
      let value = initial
      return {
        getSnapshot() {
          return value
        },
        get() {
          return value
        },
        subscribe(listener) {
          listeners.add(listener)
          return () => listeners.delete(listener)
        },
        set(patch) {
          const next = typeof patch === 'function' ? patch(value) : patch
          if (!next) return
          const previous = value
          value = { ...value, ...next }
          for (const listener of [...listeners]) {
            try {
              listener()
            } catch (error) {
              console.error('[quick-chat] subscriber failed', error)
            }
          }
          return previous
        },
      }
    }

    function useStore(store) {
      return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot)
    }

    function useT(lang) {
      return useMemo(() => makeTranslator(lang), [lang])
    }

    // ---------------------------------------------------------------------
    // Session event folding
    // ---------------------------------------------------------------------

    function deriveTranscript(entries, snapshot, t) {
      const messages = []
      const toolCalls = new Map()
      const toolResults = new Set()
      const liveQuestions = new Map()
      const liveByAttempt = new Map()
      let currentLive = null

      const addToolCall = (callId, name, seq) => {
        if (!callId) return
        toolCalls.set(callId, { id: callId, name: name || '', seq: seq || 0 })
      }

      for (const entry of entries || []) {
        if (!entry) continue
        if (entry.type === 'transient') {
          const event = entry.event
          const data = event && event.data
          const chunk = data && data.chunk
          if (!chunk || !data.attemptId) continue
          let live = liveByAttempt.get(data.attemptId)
          if (!live) {
            live = { attemptId: data.attemptId, text: '', reasoning: '', seq: 0, tool: '' }
            liveByAttempt.set(data.attemptId, live)
          }
          live.seq = Math.max(live.seq, finite(event.seq, 0))
          currentLive = live
          if (chunk.type === 'text-delta' && typeof chunk.text === 'string') live.text += chunk.text
          else if (chunk.type === 'reasoning-delta' && typeof chunk.text === 'string') live.reasoning += chunk.text
          else if (chunk.type === 'tool-call-delta') {
            if (typeof chunk.name === 'string' && chunk.name.length > 0) live.tool = chunk.name
          }
          continue
        }

        const event = entry.event
        if (!event || typeof event.type !== 'string') continue
        const data = event.data || {}
        switch (event.type) {
          case 'user/message': {
            if (!data.source || data.source.kind !== 'user') break
            const text = userTextOfContent(data.content)
            const attachments = attachmentsOfContent(data.content)
            if (text || attachments.length > 0) {
              messages.push({
                key: `u-${event.seq}`,
                role: 'user',
                text,
                attachments,
                time: finite(event.time, 0),
              })
            }
            break
          }
          case 'assistant/message': {
            const text = contentToText(data.message && data.message.content, t)
            if (text) {
              const previous = messages[messages.length - 1]
              if (previous && previous.role === 'assistant' && previous.text.trim() === text.trim()) break
              messages.push({
                key: `a-${event.seq}`,
                role: 'assistant',
                text,
                time: finite(event.time, 0),
              })
            }
            break
          }
          case 'tool/call': {
            addToolCall(data.callId, data.name, event.seq)
            const asked = askQuestionsFromToolCall(data)
            if (data.callId && asked) {
              liveQuestions.set(data.callId, { callId: data.callId, questions: asked, state: 'open' })
            }
            break
          }
          case 'tool/result': {
            const block = data.message && Array.isArray(data.message.content) ? data.message.content[0] : undefined
            const id = block && block.toolCallId ? block.toolCallId : data.toolCallId || data.callId
            if (id) {
              toolResults.add(id)
              liveQuestions.delete(id)
            }
            break
          }
          default:
            break
        }
      }

      const streamingText = currentLive && currentLive.text.trim() ? currentLive.text : ''
      const reasoning = currentLive && currentLive.reasoning.trim() ? currentLive.reasoning : ''
      const questions = [...liveQuestions.values()]

      const latestPendingTool = [...toolCalls.values()]
        .filter((call) => !toolResults.has(call.id))
        .sort((a, b) => a.seq - b.seq)
        .at(-1)

      let status = ''
      if (snapshot && snapshot.running) {
        if (latestPendingTool) status = t('usingTool', { name: toolLabel(latestPendingTool.name, t) })
        else if (!streamingText) status = t('thinking')
        else if (reasoning && !streamingText) status = t('thinking')
      }

      const hasTrailingUser = (text) => {
        for (let index = messages.length - 1; index >= 0; index -= 1) {
          const message = messages[index]
          if (message.role === 'user') return message.text === text
          if (message.role === 'assistant' && message.text.trim() !== '') return false
        }
        return false
      }

      const pendingSubmissions = snapshot && Array.isArray(snapshot.pendingSubmissions) ? snapshot.pendingSubmissions : []
      for (const pending of pendingSubmissions) {
        const text = typeof pending.text === 'string' ? pending.text : ''
        if (!text || hasTrailingUser(text)) continue
        messages.push({
          key: `pending-${pending.requestId || text}`,
          role: 'user',
          text,
          time: finite(pending.time, 0),
          state: 'sending',
        })
      }

      const queue = snapshot && Array.isArray(snapshot.queue) ? snapshot.queue : []
      for (const queued of queue) {
        const text = typeof queued.text === 'string' ? queued.text : queued.preview
        if (!text || hasTrailingUser(text)) continue
        messages.push({
          key: `queue-${queued.id || text}`,
          role: 'user',
          text,
          time: 0,
          state: queued.placement === 'queued' ? 'queued' : 'sending',
        })
      }

      let error = ''
      let errorKind = ''
      if (snapshot) {
        if (snapshot.removed) {
          error = t('sessionDeleted')
          errorKind = 'session'
        }
        if (snapshot.openState === 'error') {
          error = t('sessionError')
          errorKind = 'session'
        }
        if (snapshot.promptError) {
          error = formatFailure(snapshot.promptError.error) || t('sendError')
          errorKind = 'prompt'
        } else if (snapshot.lastAgentError && !snapshot.running) {
          error = formatFailure(snapshot.lastAgentError)
          errorKind = 'agent'
        }
      }

      return {
        messages,
        streamingText,
        reasoning,
        status,
        questions,
        error,
        errorKind,
        running: Boolean(snapshot && snapshot.running),
        openState: snapshot ? snapshot.openState : 'cold',
      }
    }

    // ---------------------------------------------------------------------
    // Controller
    // ---------------------------------------------------------------------

    class QuickChatController {
      constructor(ctx) {
        this.ctx = ctx
        this.prefs = loadPrefs()
        this.started = false
        this.disposers = []
        this.session = null
        this.binding = null
        this.eventUnsub = null
        this.sessionUnsub = null
        this.questionFace = null
        this.questionUnsub = null
        this.liveQuestionRequests = new Map()
        this.approvalRequests = new Map()
        this.remoteUnsubs = []
        this.pendingRelayTimer = null
        this.delegatedPendingKeys = new Set()
        this.listUnsub = null
        this.localeUnsub = null
        this.ensurePromise = null
        this.quickWorkspacePromise = null
        this.attachToken = 0
        this.attaching = false
        this.rebuildFrame = null
        this.noticeTimer = null
        this.wasRunning = false
        this.pipWindow = null
        this.pipRoot = null
        this.pipHost = null
        this.pipKeyHandler = null
        this.pipRestore = true
        this.pipThemeObserver = null
        this.focusNonce = 0
        this.standaloneInfo = standaloneInfo()
        this.standalone = Boolean(this.standaloneInfo)
        this.nativeDesktop = !this.standalone && isNativeDesktopShell()
        this.standaloneTitle = standaloneTitle(this.standaloneInfo ? this.standaloneInfo.nonce : '')
        this.titleObserver = null

        const panelGeometry = normalizeGeometry(this.prefs.panel, defaultPanelGeometry())
        const bubbleGeometry = this.normalizeBubble(this.prefs.bubble)
        const history = Array.isArray(this.prefs.history)
          ? this.prefs.history.filter((id) => typeof id === 'string' && id.length > 0).slice(0, 12)
          : []
        const sessionId = typeof this.prefs.sessionId === 'string' && this.prefs.sessionId.length > 0 ? this.prefs.sessionId : null
        const langPref = normalizeLangPref(this.prefs.lang)

        this.store = createStore({
          open: false,
          mode: 'inline',
          standalone: this.standalone,
          nativeDesktop: this.nativeDesktop,
          hiddenBubble: this.standalone || this.nativeDesktop ? true : this.prefs.hiddenBubble === true,
          geometry: panelGeometry,
          bubble: bubbleGeometry,
          sessionId,
          history,
          title: '',
          subtitle: '',
          messages: [],
          streamingText: '',
          questions: [],
          questionDrafts: {},
          questionStates: {},
          dismissedQuestions: {},
          approvals: [],
          status: '',
          running: false,
          busy: false,
          loading: false,
          ready: false,
          error: '',
          errorKind: '',
          draft: '',
          unread: false,
          historyOpen: false,
          menuOpen: false,
          notice: null,
          lang: resolveLanguage(ctx, langPref),
          langPref,
          pipSupported: isPipSupported(),
          focusNonce: 0,
          listTick: 0,
          hasSession: false,
          attachments: [],
          permission: 'danger-full-access',
          permissionMenuOpen: false,
          modelMenuOpen: false,
          modelCatalog: null,
          modelSelection: null,
        })
      }

      normalizeBubble(value) {
        const fallback = defaultBubbleGeometry()
        if (!isRecord(value)) return fallback
        const minY = minimumTop()
        return {
          x: clamp(finite(value.x, fallback.x), 6, Math.max(6, window.innerWidth - 62)),
          y: clamp(finite(value.y, fallback.y), minY, Math.max(minY, window.innerHeight - 62)),
        }
      }

      start() {
        if (this.started) return () => {}
        this.started = true
        try {
          this.listUnsub = this.ctx.sessions.list.subscribe(() => this.syncMeta())
        } catch (error) {
          console.warn('[quick-chat] session list subscription unavailable', error)
        }
        const locale = this.localeService()
        if (locale && typeof locale.subscribe === 'function') {
          try {
            this.localeUnsub = locale.subscribe(() => {
              if (this.store.get().langPref !== 'auto') return
              this.store.set({ lang: resolveLanguage(this.ctx, 'auto') })
              this.updatePipChrome()
            })
          } catch {
            /* locale updates are a progressive enhancement */
          }
        }
        const onKeyDown = (event) => this.handleGlobalKey(event)
        const onResize = () => this.handleResize()
        const onLanguage = (event) => this.setLanguagePref(event && event.detail, true)
        window.addEventListener('keydown', onKeyDown, true)
        window.addEventListener('resize', onResize)
        window.addEventListener('dqc-language', onLanguage)
        this.disposers.push(() => window.removeEventListener('keydown', onKeyDown, true))
        this.disposers.push(() => window.removeEventListener('resize', onResize))
        this.disposers.push(() => window.removeEventListener('dqc-language', onLanguage))
        const questionPoll = setInterval(() => {
          try {
            const state = this.store.get()
            if (this.binding && Array.isArray(state.questions) && state.questions.length > 0) this.rebuild()
          } catch {
            /* the panel may be tearing down */
          }
        }, 800)
        this.disposers.push(() => clearInterval(questionPoll))
        void this.loadModelCatalog()
        this.syncMeta()
        void this.syncLanguageFromHost()
        void this.ensureQuickWorkspace().catch(() => {})
        if (this.standalone) this.registerRemoteAnswerers()
        if (this.standalone) this.startPendingRelay()
        if (this.standalone) this.prepareStandalone()
        console.info('[quick-chat] ready · Alt+Q')
        return () => this.dispose()
      }

      prepareStandalone() {
        try {
          document.documentElement.dataset.dqcStandalone = '1'
          this.applyStandaloneTitle()
          this.titleObserver = new MutationObserver(() => this.applyStandaloneTitle())
          this.titleObserver.observe(document.head || document.documentElement, {
            childList: true,
            subtree: true,
            characterData: true,
          })
        } catch {
          /* the window still works without the title guard */
        }
        this.store.set({ standalone: true, open: true, hiddenBubble: true })
        this.ensureSession().catch((error) => {
          this.store.set({ error: this.friendlyError(error, 'createError'), errorKind: 'session' })
        })
      }

      applyStandaloneTitle() {
        if (document.title !== this.standaloneTitle) document.title = this.standaloneTitle
      }

      setLanguagePref(pref, persist = true) {
        const next = normalizeLangPref(pref)
        const lang = resolveLanguage(this.ctx, next)
        this.store.set({ langPref: next, lang })
        if (persist) savePrefs({ lang: next })
        try {
          document.documentElement.lang = isZh(lang) ? 'zh-CN' : 'en'
        } catch {
          /* noop */
        }
        if (this.standalone) {
          const nonce = this.standaloneInfo ? this.standaloneInfo.nonce : ''
          const base = isZh(lang) ? '桌面悬浮球' : 'Desktop Floating Ball'
          this.standaloneTitle = nonce ? `${base} · DSH ${nonce}` : `${base} · DSH`
          this.applyStandaloneTitle()
        }
        this.updatePipChrome()
      }

      async syncLanguageFromHost() {
        try {
          const response = await fetch('/dsh-quick-chat-appearance', { cache: 'no-store' })
          if (!response.ok) return
          const body = await response.json().catch(() => null)
          if (body && (body.language === 'auto' || body.language === 'zh' || body.language === 'en')) {
            this.setLanguagePref(body.language, true)
          }
        } catch {
          /* an older Host has no language field */
        }
      }

      tr(zh, en) {
        return trText(this.store.get().lang, zh, en)
      }

      localeService() {
        try {
          if (this.ctx && typeof this.ctx.get === 'function') return this.ctx.get('locale')
          return this.ctx ? this.ctx.locale : undefined
        } catch {
          return undefined
        }
      }

      remoteService() {
        try {
          if (this.ctx && this.ctx.remote) return this.ctx.remote
          if (this.ctx && typeof this.ctx.get === 'function') return this.ctx.get('remote')
        } catch {
          /* remote is optional */
        }
        return undefined
      }

      async loadModelCatalog() {
        if (this.modelCatalogLoading) return
        this.modelCatalogLoading = true
        try {
          let catalog = null
          try {
            const response = await fetch('/dsh-quick-chat-appearance/models', { cache: 'no-store' })
            if (response.ok) {
              const body = await response.json()
              catalog = body && body.value !== undefined ? body.value : body
            }
          } catch (error) {
            console.warn('[quick-chat] host model catalog unavailable', error)
          }
          if (!catalog || !Array.isArray(catalog.groups)) {
            try {
              const remote = this.remoteService()
              const response =
                remote && remote.session && typeof remote.session.modelCatalog === 'function'
                  ? await remote.session.modelCatalog()
                  : this.ctx.sessions && typeof this.ctx.sessions.modelCatalog === 'function'
                    ? await this.ctx.sessions.modelCatalog()
                    : null
              if (response && response.ok !== false) catalog = response.value !== undefined ? response.value : response
            } catch (error) {
              console.warn('[quick-chat] remote model catalog unavailable', error)
            }
          }
          if (!catalog || !Array.isArray(catalog.groups)) return
          const current = this.store.get().modelSelection || catalog.default || null
          this.store.set({ modelCatalog: catalog, modelSelection: current })
        } catch (error) {
          console.warn('[quick-chat] model catalog unavailable', error)
        } finally {
          this.modelCatalogLoading = false
        }
      }

      async applySessionPreferences() {
        const state = this.store.get()
        const session = this.session
        if (!session) return
        try {
          if (state.permission) {
            const result = await session.command(`/permission ${state.permission}`)
            if (!result || result.ok === false || result.value?.matched === false) {
              throw new Error(this.tr('权限设置未生效', 'Permission settings were not applied'))
            }
          }
          if (state.modelSelection) {
            const result = await this.requestSelectModel(session.sessionId, state.modelSelection)
            if (!result || result.ok === false) {
              throw new Error(result?.error?.message || this.tr('模型设置未生效', 'Model settings were not applied'))
            }
          }
          if (this.session !== session) throw new Error(this.tr('会话已切换，请重新发送', 'Session changed; please send again'))
          this.preferencesPendingSession = null
        } catch (error) {
          const message = this.tr('会话设置失败，消息尚未发送：', 'Session settings failed; message not sent: ') + formatFailure(error)
          this.store.set({ error: message, errorKind: 'preferences' })
          this.notify(message)
          throw error
        }
      }

      async setPermission(permission) {
        const previous = this.store.get().permission
        this.store.set({ permission, permissionMenuOpen: false })
        const session = this.session
        if (!session) return
        try {
          const result = await session.command(`/permission ${permission}`)
          if (!result || result.ok === false || (result.value && result.value.matched === false)) {
            this.store.set({ permission: previous })
            this.notify(this.tr('权限切换失败', 'Permission switch failed'))
          }
        } catch {
          this.store.set({ permission: previous })
          this.notify(this.tr('权限切换失败', 'Permission switch failed'))
        }
      }

      async requestSelectModel(sessionId, selection) {
        try {
          const response = await fetch('/dsh-quick-chat-appearance/select-model', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ sessionId, ...selection }),
          })
          const body = await response.json().catch(() => null)
          if (response.ok && body && body.ok !== false) return body
          if (response.status !== 404 && response.status !== 503) return body || { ok: false, error: { message: `HTTP ${response.status}` } }
        } catch {
          /* fall back to the typed client remote */
        }
        const remote = this.remoteService()
        if (remote && remote.session && typeof remote.session.selectModel === 'function') {
          return remote.session.selectModel({ sessionId, ...selection })
        }
        if (this.ctx.sessions && typeof this.ctx.sessions.selectModel === 'function') {
          return this.ctx.sessions.selectModel({ sessionId, ...selection })
        }
        throw new Error('selectModel is unavailable')
      }

      async selectModel(provider, model, reasoningEffort) {
        const next = {
          provider,
          model,
          ...(typeof reasoningEffort === 'string' && reasoningEffort.length > 0 ? { reasoningEffort } : {}),
        }
        const previous = this.store.get().modelSelection
        this.store.set({ modelSelection: next, modelMenuOpen: false })
        let session = this.session
        if (!session) {
          try {
            session = await this.ensureSession()
          } catch {
            this.store.set({ modelSelection: previous })
            return
          }
        }
        try {
          const result = await this.requestSelectModel(session.sessionId, next)
          if (result && result.ok === false) {
            this.store.set({ modelSelection: previous })
            const detail = result.error && result.error.message ? `: ${result.error.message}` : ''
            this.notify(this.tr('模型切换失败', 'Model switch failed') + detail)
          } else {
            this.notify(this.tr('已切换模型：', 'Model changed: ') + this.modelLabel())
          }
        } catch (error) {
          this.store.set({ modelSelection: previous })
          this.notify(this.tr('模型切换失败：', 'Model switch failed: ') + (error instanceof Error ? error.message : String(error)))
        }
      }

      async selectReasoning(reasoningEffort) {
        const selection = this.store.get().modelSelection
        if (!selection) return
        this.thinkingRestore = reasoningEffort
        await this.selectModel(selection.provider, selection.model, reasoningEffort)
      }

      async toggleThinking() {
        const selection = this.store.get().modelSelection
        if (!selection) return
        if (selection.reasoningEffort === 'off') {
          await this.selectModel(selection.provider, selection.model, this.thinkingRestore || 'max')
        } else {
          this.thinkingRestore = selection.reasoningEffort || 'max'
          await this.selectModel(selection.provider, selection.model, 'off')
        }
      }

      toggleToolMenu(name) {
        const state = this.store.get()
        if (name === 'permission') {
          this.store.set({ permissionMenuOpen: !state.permissionMenuOpen, modelMenuOpen: false, menuOpen: false })
        } else {
          this.store.set({ modelMenuOpen: !state.modelMenuOpen, permissionMenuOpen: false, menuOpen: false })
          if (!state.modelMenuOpen) void this.loadModelCatalog()
        }
      }

      modelEntry() {
        const state = this.store.get()
        const selection = state.modelSelection
        if (!selection || !state.modelCatalog) return null
        for (const group of state.modelCatalog.groups || []) {
          for (const model of group.models || []) {
            if (model.id === selection.model) return { group, model }
          }
        }
        return null
      }

      modelLabel() {
        const selection = this.store.get().modelSelection
        const entry = this.modelEntry()
        return (entry && (entry.model.name || entry.model.id)) || (selection && selection.model) || 'DeepSeek-V4.1-Flash'
      }

      reasoningOptions() {
        const entry = this.modelEntry()
        const efforts = entry && entry.model.reasoning && Array.isArray(entry.model.reasoning.efforts)
          ? entry.model.reasoning.efforts
          : null
        if (efforts && efforts.length > 0) {
          return efforts.map((effort) =>
            typeof effort === 'string'
              ? { id: effort, label: effort[0].toUpperCase() + effort.slice(1) }
              : { id: effort.id, label: effort.name || effort.label || effort.id },
          )
        }
        return ['minimal', 'low', 'medium', 'high', 'max'].map((id) => ({ id, label: id[0].toUpperCase() + id.slice(1) }))
      }

      reasoningLabel() {
        const selection = this.store.get().modelSelection
        if (!selection || !selection.reasoningEffort) return 'Max'
        if (selection.reasoningEffort === 'off') return this.tr('关闭', 'Off')
        const option = this.reasoningOptions().find((item) => item.id === selection.reasoningEffort)
        return option ? option.label : selection.reasoningEffort
      }

      handleGlobalKey(event) {
        if (event.defaultPrevented || event.isComposing) return
        const key = typeof event.key === 'string' ? event.key.toLowerCase() : ''
        if (this.standalone) {
          if (event.key === 'Escape') {
            const state = this.store.get()
            if (state.historyOpen || state.menuOpen) {
              event.preventDefault()
              this.closeMenus()
            }
          }
          return
        }
        if (event.altKey && !event.ctrlKey && !event.metaKey && (key === 'q' || event.code === 'KeyQ')) {
          event.preventDefault()
          event.stopPropagation()
          this.toggle()
          return
        }
        if (event.key === 'Escape') {
          const state = this.store.get()
          if (state.historyOpen || state.menuOpen) {
            event.preventDefault()
            this.store.set({ historyOpen: false, menuOpen: false })
            return
          }
          if (this.pipWindow) {
            event.preventDefault()
            this.closePip(true)
            return
          }
          if (state.open) {
            event.preventDefault()
            this.close()
          }
        }
      }

      handleResize() {
        const state = this.store.get()
        const geometry = normalizeGeometry(state.geometry, defaultPanelGeometry())
        const bubble = this.normalizeBubble(state.bubble)
        this.store.set({ geometry, bubble })
        this.persist()
      }

      toggle() {
        if (this.store.get().open) this.close()
        else this.open()
      }

      open() {
        const state = this.store.get()
        if (!state.open) {
          this.store.set({ open: true, unread: false, historyOpen: false, menuOpen: false, notice: null })
          this.focusInput()
        } else {
          this.focusInput()
        }
        this.ensureSession().catch((error) => {
          this.store.set({ error: this.friendlyError(error, 'createError'), errorKind: 'session' })
        })
      }

      async openDesktopWindow() {
        if (this.standalone || !this.nativeDesktop) {
          this.open()
          return
        }
        try {
          const response = await fetch('/dsh-quick-chat-appearance/open', { method: 'POST' })
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          this.store.set({
            open: false,
            historyOpen: false,
            menuOpen: false,
            permissionMenuOpen: false,
            modelMenuOpen: false,
          })
        } catch {
          this.open()
        }
      }

      close() {
        if (this.standalone) {
          this.closeWindow()
          return
        }
        if (this.pipWindow) this.closePip(false)
        this.store.set({ open: false, historyOpen: false, menuOpen: false, notice: null })
        this.persist()
      }

      closeWindow() {
        if (isWebViewHost()) {
          try {
            window.chrome.webview.postMessage(JSON.stringify({ type: 'dqc-close' }))
            return
          } catch {
            /* fall through to window.close */
          }
        }
        try {
          window.close()
        } catch {
          /* Edge/Chrome may refuse script-close for a window it did not open. */
        }
        setTimeout(() => {
          try {
            if (!window.closed) this.notify(this.t('useWindowClose'))
          } catch {
            /* the page is already gone */
          }
        }, 280)
      }

      setWindowPinned(pinned) {
        if (!isWebViewHost()) return
        try {
          window.chrome.webview.postMessage(JSON.stringify({ type: 'dqc-pin', pinned: Boolean(pinned) }))
        } catch {
          /* noop */
        }
      }

      minimizeWindow() {
        if (!isWebViewHost()) return
        try {
          window.chrome.webview.postMessage(JSON.stringify({ type: 'dqc-minimize' }))
        } catch {
          /* noop */
        }
      }

      beginChatWindowResize(edge) {
        if (!isWebViewHost()) return
        try {
          window.chrome.webview.postMessage(JSON.stringify({ type: 'dqc-resize-start', edge }))
        } catch {
          /* noop */
        }
      }

      moveChatWindowResize(edge, dx, dy) {
        if (!isWebViewHost()) return
        try {
          window.chrome.webview.postMessage(
            JSON.stringify({ type: 'dqc-resize-move', edge, dx: Number(dx), dy: Number(dy) }),
          )
        } catch {
          /* noop */
        }
      }

      finishChatWindowResize() {
        if (!isWebViewHost()) return
        try {
          window.chrome.webview.postMessage(JSON.stringify({ type: 'dqc-resize-end' }))
        } catch {
          /* noop */
        }
      }

      focusInput() {
        const focusNonce = this.focusNonce + 1
        this.focusNonce = focusNonce
        this.store.set({ focusNonce })
      }

      setDraft(draft) {
        this.store.set({ draft, error: '', errorKind: '' })
      }

      toggleMenu(name) {
        const state = this.store.get()
        if (name === 'history') {
          this.store.set({ historyOpen: !state.historyOpen, menuOpen: false, permissionMenuOpen: false, modelMenuOpen: false })
        } else {
          this.store.set({ menuOpen: !state.menuOpen, historyOpen: false, permissionMenuOpen: false, modelMenuOpen: false })
        }
      }

      closeMenus() {
        this.store.set({ historyOpen: false, menuOpen: false, permissionMenuOpen: false, modelMenuOpen: false })
      }

      async retry() {
        const state = this.store.get()
        this.store.set({ error: '', errorKind: '', loading: true })
        try {
          if (state.sessionId && this.sessionExists(state.sessionId)) {
            await this.attach(state.sessionId)
          } else {
            this.store.set({ sessionId: null, hasSession: false })
            await this.ensureSession()
          }
        } catch (error) {
          this.store.set({ error: this.friendlyError(error, 'sessionError'), errorKind: 'session' })
        } finally {
          this.store.set({ loading: false })
        }
      }

      setGeometry(patch) {
        const state = this.store.get()
        const next = normalizeGeometry({ ...state.geometry, ...patch }, state.geometry)
        this.store.set({ geometry: next })
      }

      setBubble(patch) {
        const state = this.store.get()
        const next = this.normalizeBubble({ ...state.bubble, ...patch })
        this.store.set({ bubble: next })
      }

      persist() {
        const state = this.store.get()
        savePrefs({
          panel: state.geometry,
          bubble: state.bubble,
          hiddenBubble: state.hiddenBubble,
          sessionId: state.sessionId,
          history: state.history,
        })
      }

      rememberSession(sessionId) {
        if (typeof sessionId !== 'string' || sessionId.length === 0) return
        const history = [sessionId, ...this.store.get().history.filter((id) => id !== sessionId)].slice(0, 12)
        this.store.set({ history })
        this.persist()
      }

      sessionRow(sessionId) {
        try {
          const snapshot = this.ctx.sessions.list.getSnapshot()
          if (snapshot && snapshot.byId) return snapshot.byId[sessionId]
        } catch {
          /* the list may still be warming up */
        }
        return undefined
      }

      sessionExists(sessionId) {
        if (!sessionId) return false
        if (this.sessionRow(sessionId)) return true
        try {
          return Boolean(this.ctx.sessions.binding(sessionId))
        } catch {
          return false
        }
      }

      workspaceService() {
        try {
          if (this.ctx && typeof this.ctx.get === 'function') return this.ctx.get('workspaces')
          return this.ctx ? this.ctx.workspaces : undefined
        } catch {
          return undefined
        }
      }

      waitForWorkspacesReady(timeoutMs = 2200) {
        try {
          const service = this.workspaceService()
          if (!service || !service.list || typeof service.list.getSnapshot !== 'function') return Promise.resolve(false)
          const current = service.list.getSnapshot()
          if (!current || current.phase === 'ready') return Promise.resolve(true)
          return new Promise((resolve) => {
            let settled = false
            let unsubscribe = null
            const finish = (value) => {
              if (settled) return
              settled = true
              if (typeof unsubscribe === 'function') unsubscribe()
              clearTimeout(timer)
              resolve(value)
            }
            const timer = setTimeout(() => finish(false), timeoutMs)
            if (typeof service.list.subscribe === 'function') {
              unsubscribe = service.list.subscribe(() => {
                const snapshot = service.list.getSnapshot()
                if (snapshot && snapshot.phase === 'ready') finish(true)
              })
            } else {
              finish(false)
            }
          })
        } catch {
          return Promise.resolve(false)
        }
      }

      quickWorkspaceLeaf(path) {
        const clean = String(path || '').replace(/[\\/]+$/, '')
        return clean.split(/[\\/]/).pop() || ''
      }

      quickWorkspaceParent(path) {
        const clean = String(path || '').replace(/[\\/]+$/, '')
        const index = Math.max(clean.lastIndexOf('\\'), clean.lastIndexOf('/'))
        return index > 0 ? clean.slice(0, index) : clean
      }

      /**
       * Keep quick-chat sessions under the dedicated ChatWindow Workspace.
       * Create the directory and register the Workspace when it does not exist.
       */
      ensureQuickWorkspace() {
        if (!this.quickWorkspacePromise) {
          this.quickWorkspacePromise = this.resolveQuickWorkspace()
            .then((workspaceId) => {
              if (!workspaceId) this.quickWorkspacePromise = null
              return workspaceId
            })
            .catch((error) => {
              this.quickWorkspacePromise = null
              console.warn('[quick-chat] could not prepare ChatWindow workspace', error)
              return null
            })
        }
        return this.quickWorkspacePromise
      }

      async resolveQuickWorkspace() {
        await this.waitForWorkspacesReady()
        const service = this.workspaceService()
        const workspaceSnapshot = service && service.list && typeof service.list.getSnapshot === 'function' ? service.list.getSnapshot() : null
        const items = workspaceSnapshot && Array.isArray(workspaceSnapshot.items) ? workspaceSnapshot.items : []
        if (items.length === 0) return null
        const existing = items.find(
          (item) =>
            String(item && item.title ? item.title : '').trim().toLowerCase() === 'chatwindow' ||
            this.quickWorkspaceLeaf(item && item.path).toLowerCase() === 'chatwindow',
        )
        if (existing) return existing.workspaceId || existing.id || null

        const sessionSnapshot = this.ctx.sessions.list.getSnapshot()
        const current = sessionSnapshot && sessionSnapshot.current ? sessionSnapshot.byId[sessionSnapshot.current] : undefined
        const currentWorkspace = current && current.cwd ? items.find((item) => item.path === current.cwd) : undefined
        const legacyQuick = items.find((item) => String(item && item.title ? item.title : '').trim() === '快捷对话')
        let basePath = legacyQuick && legacyQuick.path
          ? this.quickWorkspaceParent(legacyQuick.path)
          : currentWorkspace && currentWorkspace.path
            ? currentWorkspace.path
            : items[0] && items[0].path
              ? items[0].path
              : ''
        if (!basePath) return null
        basePath = String(basePath).replace(/[\\/]+$/, '')

        const directory = this.ctx.remote && this.ctx.remote.directoryPicker
        let targetPath = ''
        if (directory && typeof directory.list === 'function') {
          try {
            const listed = await directory.list(basePath)
            const value = listed && listed.ok !== false ? listed.value : null
            const entries = value && Array.isArray(value.entries) ? value.entries : []
            const found = entries.find((entry) => String(entry && entry.name ? entry.name : '').toLowerCase() === 'chatwindow')
            if (found && found.path) targetPath = String(found.path)
          } catch {
            /* fall through to create */
          }
        }
        if (!targetPath && directory && typeof directory.createDirectory === 'function') {
          try {
            const made = await directory.createDirectory(basePath, 'ChatWindow')
            if (made && made.ok !== false) {
              targetPath = typeof made.value === 'string' ? made.value : ''
            }
          } catch {
            /* fall through to the joined path */
          }
        }
        if (!targetPath) {
          const separator = basePath.includes('\\') ? '\\' : '/'
          targetPath = `${basePath}${separator}ChatWindow`
        }

        const workspaceRemote = this.ctx.remote && this.ctx.remote.workspace
        if (!workspaceRemote || typeof workspaceRemote.create !== 'function') return null
        const result = await workspaceRemote.create({ path: targetPath })
        if (!result || result.ok === false) {
          console.warn('[quick-chat] ChatWindow workspace registration failed', result && result.error)
          return null
        }
        return result.value && result.value.workspace ? result.value.workspace.workspaceId : null
      }

      async createQuickSession() {
        try {
          const workspaceId = await this.ensureQuickWorkspace()
          if (workspaceId) {
            return await this.ctx.sessions.create({ workspaceId })
          }
        } catch (error) {
          console.warn('[quick-chat] ChatWindow session create failed, using the default workspace', error)
        }
        return this.ctx.sessions.create()
      }

      waitForListReady() {
        try {
          const snapshot = this.ctx.sessions.list.getSnapshot()
          if (snapshot && snapshot.phase === 'ready') return Promise.resolve(true)
        } catch {
          return Promise.resolve(false)
        }
        return new Promise((resolve) => {
          let settled = false
          let unsubscribe = null
          const finish = (value) => {
            if (settled) return
            settled = true
            if (typeof unsubscribe === 'function') unsubscribe()
            clearTimeout(timer)
            resolve(value)
          }
          const timer = setTimeout(() => finish(false), 2500)
          try {
            unsubscribe = this.ctx.sessions.list.subscribe(() => {
              const snapshot = this.ctx.sessions.list.getSnapshot()
              if (snapshot && snapshot.phase === 'ready') finish(true)
            })
          } catch {
            finish(false)
          }
        })
      }

      syncMeta() {
        const state = this.store.get()
        const sessionId = state.sessionId
        const row = sessionId ? this.sessionRow(sessionId) : undefined
        const title = row && !row.blank ? cleanTitle(row.title) || cleanTitle(row.displayTitle) : ''
        const patch = { listTick: (state.listTick || 0) + 1 }
        if (title !== state.title) patch.title = title
        if (sessionId && row) patch.hasSession = true
        this.store.set(patch)

        if (!sessionId || !this.session || this.attaching) return
        try {
          const binding = this.ctx.sessions.binding(sessionId)
          if (binding && binding !== this.binding) this.attach(sessionId).catch(() => {})
        } catch {
          /* reconnect in progress */
        }
      }

      async ensureSession() {
        if (this.ensurePromise) return this.ensurePromise
        if (this.session) return this.session
        this.ensurePromise = (async () => {
          const currentId = this.store.get().sessionId
          if (currentId) {
            let exists = this.sessionExists(currentId)
            if (!exists) {
              const ready = await this.waitForListReady()
              exists = ready && this.sessionExists(currentId)
            }
            if (exists) {
              await this.attach(currentId)
              return this.session
            }
            this.store.set({ sessionId: null, hasSession: false })
          }

          this.store.set({ loading: true, error: '', errorKind: '' })
          const created = await this.createQuickSession()
          this.rememberSession(created)
          this.store.set({ sessionId: created, title: '', messages: [], streamingText: '', running: false, error: '', hasSession: true })
          await this.attach(created)
          this.preferencesPendingSession = created
          await this.applySessionPreferences()
          return this.session
        })()
          .catch((error) => {
            this.store.set({ error: this.friendlyError(error, 'createError'), errorKind: 'session', loading: false })
            throw error
          })
          .finally(() => {
            this.ensurePromise = null
            this.store.set({ loading: false })
          })
        return this.ensurePromise
      }

      async attach(sessionId) {
        if (!sessionId) throw new Error('missing session id')
        this.attaching = true
        this.cleanupSession()
        const token = ++this.attachToken
        try {
          // `binding(id)` only borrows an already-retained session. A standalone
          // window has nothing open yet, so retain it first (this is also what
          // makes the quick session live without the main window).
          let reference = null
          if (typeof this.ctx.sessions.retain === 'function') {
            try {
              reference = this.ctx.sessions.retain(sessionId, { source: 'quick-chat' })
              await reference.ready
            } catch (error) {
              console.warn('[quick-chat] session retain failed', error)
              try {
                if (reference) reference.release()
              } catch {
                /* noop */
              }
              reference = null
            }
          }
          let binding = null
          try {
            binding = this.ctx.sessions.binding(sessionId)
          } catch {
            binding = null
          }
          if (!binding) {
            if (typeof this.ctx.sessions.refresh === 'function') {
              await this.ctx.sessions.refresh().catch(() => {})
            }
            binding = this.ctx.sessions.binding(sessionId)
          }
          if (!binding) {
            try {
              if (reference) reference.release()
            } catch {
              /* noop */
            }
            throw new Error('Session is not addressable')
          }
          if (token !== this.attachToken) {
            try {
              if (reference) reference.release()
            } catch {
              /* noop */
            }
            return
          }
          this.reference = reference
          this.binding = binding
          this.session = binding.session
          this.store.set({ loading: true, ready: false, error: '', errorKind: '' })
          this.eventUnsub = binding.eventSource.subscribe(() => this.scheduleRebuild())
          this.sessionUnsub = binding.session.subscribe(() => this.scheduleRebuild())
          try {
            const projections = binding.session && binding.session.projections
            this.questionFace = projections && typeof projections.faceOf === 'function' ? projections.faceOf('userQuestions') : null
            if (this.questionFace && typeof this.questionFace.subscribe === 'function') {
              this.questionUnsub = this.questionFace.subscribe(() => this.scheduleRebuild())
            }
          } catch (error) {
            console.warn('[quick-chat] userQuestions projection unavailable', error)
            this.questionFace = null
            this.questionUnsub = null
          }
          this.rebuild()
          if (typeof binding.session.open === 'function') {
            try {
              await binding.session.open()
            } catch (error) {
              console.warn('[quick-chat] session.open failed, trying stage fallback', error)
              try {
                this.ctx.sessions.open(sessionId)
              } catch {
                /* the panel will show the session error below */
              }
            }
          }
          if (token !== this.attachToken) return
          if (!this.questionFace) {
            try {
              const projections = binding.session && binding.session.projections
              this.questionFace = projections && typeof projections.faceOf === 'function' ? projections.faceOf('userQuestions') : null
              if (this.questionFace && typeof this.questionFace.subscribe === 'function') {
                this.questionUnsub = this.questionFace.subscribe(() => this.scheduleRebuild())
              }
            } catch (error) {
              console.warn('[quick-chat] userQuestions projection unavailable after open', error)
            }
          }
          this.store.set({ loading: false, ready: true, hasSession: true })
          this.rebuild()
        } catch (error) {
          if (token === this.attachToken) {
            this.store.set({
              loading: false,
              ready: false,
              error: this.friendlyError(error, 'sessionError'),
              errorKind: 'session',
            })
          }
          throw error
        } finally {
          if (token === this.attachToken) this.attaching = false
        }
      }

      cleanupSession() {
        this.attachToken += 1
        if (this.rebuildFrame !== null) {
          cancelAnimationFrame(this.rebuildFrame)
          this.rebuildFrame = null
        }
        if (typeof this.eventUnsub === 'function') this.eventUnsub()
        if (typeof this.sessionUnsub === 'function') this.sessionUnsub()
        if (typeof this.questionUnsub === 'function') this.questionUnsub()
        this.eventUnsub = null
        this.sessionUnsub = null
        this.questionFace = null
        this.questionUnsub = null
        for (const entry of this.liveQuestionRequests.values()) {
          try {
            const error = new Error('ASK_CANCELLED')
            error.code = 'ASK_CANCELLED'
            entry.reject(error)
          } catch {
            /* noop */
          }
        }
        this.liveQuestionRequests.clear()
        for (const entry of this.approvalRequests.values()) {
          try {
            entry.finish('cancelled')
          } catch {
            /* noop */
          }
        }
        this.approvalRequests.clear()
        this.store.set({ approvals: [] })
        if (this.reference && typeof this.reference.release === 'function') {
          try {
            this.reference.release()
          } catch {
            /* noop */
          }
        }
        this.reference = null
        this.session = null
        this.binding = null
      }

      scheduleRebuild() {
        if (this.rebuildFrame !== null) return
        this.rebuildFrame = requestAnimationFrame(() => {
          this.rebuildFrame = null
          this.rebuild()
        })
      }

      rebuild() {
        if (!this.binding || !this.session) return
        let entries = []
        let snapshot = null
        try {
          const windowSnapshot = this.binding.eventSource.getSnapshot()
          entries = windowSnapshot && Array.isArray(windowSnapshot.entries) ? windowSnapshot.entries : []
          snapshot = this.session.getSnapshot()
        } catch (error) {
          console.warn('[quick-chat] could not read session state', error)
          return
        }
        const state = this.store.get()
        const t = makeTranslator(state.lang)
        const derived = deriveTranscript(entries, snapshot, t)
        let activeQuestions = []
        const settledQuestionIds = new Set()
        try {
          const faceSnapshot = this.questionFace && typeof this.questionFace.getSnapshot === 'function' ? this.questionFace.getSnapshot() : null
          if (faceSnapshot && Array.isArray(faceSnapshot.active)) {
            activeQuestions = faceSnapshot.active
          } else if (faceSnapshot && faceSnapshot.questions && Array.isArray(faceSnapshot.questions.active)) {
            activeQuestions = faceSnapshot.questions.active
          }
          const settled = faceSnapshot && Array.isArray(faceSnapshot.settled)
            ? faceSnapshot.settled
            : faceSnapshot && faceSnapshot.questions && Array.isArray(faceSnapshot.questions.settled)
              ? faceSnapshot.questions.settled
              : []
          for (const row of settled) {
            if (row && typeof row.callId === 'string') settledQuestionIds.add(row.callId)
          }
        } catch (error) {
          console.warn('[quick-chat] could not read userQuestions projection', error)
        }
        const mergedQuestions = new Map()
        for (const batch of derived.questions || []) {
          if (batch && batch.callId) mergedQuestions.set(batch.callId, batch)
        }
        for (const batch of activeQuestions) {
          if (!batch || !batch.callId) continue
          const normalized = normalizeQuestionItems(batch.questions)
          if (normalized.length > 0) {
            mergedQuestions.set(batch.callId, {
              callId: batch.callId,
              questions: normalized,
              state: batch.state === 'continued' ? 'continued' : 'open',
            })
          }
        }
        for (const [key, entry] of [...this.liveQuestionRequests]) {
          if (!entry || !Array.isArray(entry.questions) || entry.questions.length === 0 || !entry.sessionId) {
            this.liveQuestionRequests.delete(key)
            continue
          }
          if (entry.sessionId && entry.sessionId !== state.sessionId) {
            this.liveQuestionRequests.delete(key)
            continue
          }
          const ids = new Set(entry.questions.map((question) => question.id).filter(Boolean))
          const match = [...mergedQuestions.values()].find(
            (batch) =>
              batch &&
              Array.isArray(batch.questions) &&
              batch.questions.some((question) => question && ids.has(question.id)),
          )
          const callId = match && match.callId ? match.callId : key
          if (callId !== key) {
            this.liveQuestionRequests.delete(key)
            entry.callId = callId
            this.liveQuestionRequests.set(callId, entry)
          }
          mergedQuestions.set(callId, { callId, questions: entry.questions, state: 'open' })
        }
        const dismissed = state.dismissedQuestions && typeof state.dismissedQuestions === 'object' ? state.dismissedQuestions : {}
        const dismissedQuestions = {}
        for (const callId of mergedQuestions.keys()) {
          if (dismissed[callId]) dismissedQuestions[callId] = true
        }
        activeQuestions = [...mergedQuestions.values()].filter(
          (batch) =>
            batch &&
            !dismissedQuestions[batch.callId] &&
            (!settledQuestionIds.has(batch.callId) || this.liveQuestionRequests.has(batch.callId)),
        )
        const questionDrafts = {}
        const questionStates = {}
        for (const batch of activeQuestions) {
          if (!batch || !batch.callId) continue
          const previousDrafts = state.questionDrafts && state.questionDrafts[batch.callId] ? state.questionDrafts[batch.callId] : {}
          const drafts = {}
          for (const question of batch.questions || []) {
            if (!question || typeof question.id !== 'string') continue
            const previous = previousDrafts[question.id]
            drafts[question.id] = previous
              ? { selected: [...previous.selected], custom: previous.custom }
              : { selected: [], custom: '' }
          }
          questionDrafts[batch.callId] = drafts
          if (batch.state === 'continued') {
            questionStates[batch.callId] = { status: 'continued' }
          } else if (this.liveQuestionRequests.has(batch.callId)) {
            questionStates[batch.callId] = { status: 'open' }
          } else if (state.questionStates && state.questionStates[batch.callId]) {
            const previous = state.questionStates[batch.callId]
            questionStates[batch.callId] =
              previous.status === 'error' || previous.status === 'submitted' || previous.status === 'blocked'
                ? previous
                : { status: 'blocked', error: trText(state.lang, '这个提问正在 DSH 主窗口等待回答；请在主窗口完成。') }
          } else {
            questionStates[batch.callId] = {
              status: 'blocked',
              error: trText(state.lang, '这个提问正在 DSH 主窗口等待回答；请在主窗口完成。'),
            }
          }
        }
        const row = this.sessionRow(state.sessionId)
        const title = row && !row.blank ? cleanTitle(row.title) || cleanTitle(row.displayTitle) : ''
        const running = derived.running
        const unread = state.unread || (this.wasRunning && !running && !state.open)
        this.wasRunning = running
        this.store.set({
          messages: derived.messages,
          streamingText: derived.streamingText,
          questions: activeQuestions,
          questionDrafts,
          questionStates,
          dismissedQuestions,
          status: derived.status,
          running,
          error: derived.error || state.error,
          errorKind: derived.error ? derived.errorKind : state.errorKind,
          title,
          unread,
        })
      }

      attachmentKind(file) {
        if (/^image\/(?:png|jpe?g|webp|gif)$/i.test(file.type || '')) return 'image'
        if (/\.(?:png|jpe?g|webp|gif)$/i.test(file.name || '')) return 'image'
        return 'file'
      }

      imageMediaType(file) {
        if (/^image\/(?:png|jpe?g|webp|gif)$/i.test(file.type || '')) {
          return String(file.type).toLowerCase() === 'image/jpg' ? 'image/jpeg' : file.type
        }
        const ext = String(file.name || '').toLowerCase().split('.').pop()
        if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
        if (ext === 'webp') return 'image/webp'
        if (ext === 'gif') return 'image/gif'
        return 'image/png'
      }

      addFiles(fileList) {
        const files = Array.from(fileList || []).filter((file) => file && file.size >= 0)
        if (files.length === 0) return
        const state = this.store.get()
        const room = Math.max(0, 50 - state.attachments.length)
        if (room === 0) {
          this.notify(this.tr('最多添加 50 个附件', 'You can add at most 50 attachments'))
          return
        }
        const next = files.slice(0, room).map((file) => {
          const kind = this.attachmentKind(file)
          return {
            id: typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            kind,
            file,
            name: file.name || (kind === 'image' ? 'image' : 'file'),
            size: file.size,
            previewUrl: kind === 'image' ? URL.createObjectURL(file) : '',
            status: 'ready',
            progress: 0,
          }
        })
        this.store.set({ attachments: [...state.attachments, ...next] })
      }

      removeAttachment(id) {
        const state = this.store.get()
        const target = state.attachments.find((attachment) => attachment.id === id)
        if (target && target.previewUrl) {
          try {
            URL.revokeObjectURL(target.previewUrl)
          } catch {
            /* noop */
          }
        }
        this.store.set({ attachments: state.attachments.filter((attachment) => attachment.id !== id) })
      }

      updateAttachment(id, patch) {
        const state = this.store.get()
        this.store.set({
          attachments: state.attachments.map((attachment) =>
            attachment.id === id ? { ...attachment, ...patch } : attachment,
          ),
        })
      }

      clearAttachments() {
        const state = this.store.get()
        for (const attachment of state.attachments) {
          if (attachment.previewUrl) {
            try {
              URL.revokeObjectURL(attachment.previewUrl)
            } catch {
              /* noop */
            }
          }
        }
        this.store.set({ attachments: [] })
      }

      readFileBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            const value = typeof reader.result === 'string' ? reader.result : ''
            resolve(value.slice(value.indexOf(',') + 1))
          }
          reader.onerror = () => reject(reader.error || new Error(this.tr('读取文件失败', 'Could not read the file')))
          reader.readAsDataURL(file)
        })
      }

      async uploadAttachment(attachment, sessionId) {
        if (!this.ctx.fileUpload || typeof this.ctx.fileUpload.upload !== 'function') {
          throw new Error(this.tr('当前环境没有文件上传服务', 'File upload is unavailable in this environment'))
        }
        this.updateAttachment(attachment.id, { status: 'uploading', progress: 0 })
        const result = await this.ctx.fileUpload.upload(
          sessionId,
          attachment.file,
          attachment.name,
          undefined,
          (progress) => {
            const total = progress && typeof progress.total === 'number' && progress.total > 0 ? progress.total : 0
            this.updateAttachment(attachment.id, {
              status: 'uploading',
              progress: total > 0 ? Math.min(100, Math.round((progress.loaded / total) * 100)) : 0,
            })
          },
        )
        if (!result || result.ok === false) {
          const message = result && result.error ? result.error.message : this.tr('上传失败', 'Upload failed')
          this.updateAttachment(attachment.id, { status: 'error', error: message })
          throw new Error(message)
        }
        this.updateAttachment(attachment.id, { status: 'ready', progress: 100 })
        return result.value.receiptId
      }

      async buildPromptContent(session, attachments) {
        const content = []
        for (const attachment of attachments) {
          if (attachment.kind === 'image') {
            const data = await this.readFileBase64(attachment.file)
            content.push({
              type: 'image',
              data,
              mediaType: this.imageMediaType(attachment.file),
              ...(attachment.name ? { name: attachment.name } : {}),
            })
          } else {
            const receiptId = await this.uploadAttachment(attachment, session.sessionId)
            content.push({ type: 'file', receiptId })
          }
        }
        return content
      }

      async send() {
        const state = this.store.get()
        const text = state.draft.trim()
        const attachments = Array.isArray(state.attachments) ? state.attachments.slice() : []
        if ((!text && attachments.length === 0) || state.busy) return
        let session = this.session
        if (!session) {
          try {
            session = await this.ensureSession()
          } catch {
            return
          }
        }
        // Wait for new-session settings before submitting, including a retry after failure.
        try {
          if (this.ensurePromise) await this.ensurePromise
          if (this.preferencesPendingSession === session.sessionId) await this.applySessionPreferences()
          if (this.session !== session) return
        } catch { return }
        if (this.store.get().busy) return
        this.store.set({ busy: true, error: '', errorKind: '' })
        let handle = null
        try {
          const content = await this.buildPromptContent(session, attachments)
          if (text) content.push({ type: 'text', text })
          if (typeof session.beginSubmission === 'function') {
            handle = session.beginSubmission({
              mode: 'queue',
              text,
              attachments: [],
            })
          }
          const result = await session.prompt(content, 'queue', undefined, handle ? handle.requestId : undefined)
          if (result && result.ok === false) {
            if (handle && typeof handle.abandon === 'function') handle.abandon()
            this.store.set({ busy: false, error: formatFailure(result.error) || this.t('sendError'), errorKind: 'send' })
            return
          }
          this.rememberSession(session.sessionId)
          const current = this.store.get()
          this.store.set({
            busy: false,
            draft: current.draft === state.draft ? '' : current.draft,
          })
          this.clearAttachments()
          this.scheduleRebuild()
        } catch (error) {
          if (handle && typeof handle.abandon === 'function') {
            try {
              handle.abandon()
            } catch {
              /* noop */
            }
          }
          this.store.set({ busy: false, error: this.friendlyError(error, 'sendError'), errorKind: 'send' })
        }
      }

      questionBatch(callId) {
        const state = this.store.get()
        return (Array.isArray(state.questions) ? state.questions : []).find((batch) => batch && batch.callId === callId)
      }

      setQuestionDraft(callId, questionId, patch) {
        const state = this.store.get()
        const drafts = state.questionDrafts && typeof state.questionDrafts === 'object' ? state.questionDrafts : {}
        const batchDrafts = drafts[callId] && typeof drafts[callId] === 'object' ? drafts[callId] : {}
        const current = batchDrafts[questionId] || { selected: [], custom: '' }
        this.store.set({
          questionDrafts: {
            ...drafts,
            [callId]: {
              ...batchDrafts,
              [questionId]: { ...current, ...patch },
            },
          },
        })
      }

      setQuestionSelection(callId, questionId, label) {
        const batch = this.questionBatch(callId)
        if (!batch) return
        const question = (batch.questions || []).find((item) => item && item.id === questionId)
        if (!question) return
        const drafts = this.store.get().questionDrafts || {}
        const batchDrafts = drafts[callId] || {}
        const draft = batchDrafts[questionId] || { selected: [], custom: '' }
        let selected
        if (question.multiSelect) {
          selected = draft.selected.includes(label)
            ? draft.selected.filter((item) => item !== label)
            : [...draft.selected, label]
        } else {
          selected = draft.selected[0] === label ? [] : [label]
        }
        const nextDrafts = {
          ...batchDrafts,
          [questionId]: { ...draft, selected },
        }
        this.store.set({ questionDrafts: { ...drafts, [callId]: nextDrafts } })
        if (batch.questions.length === 1 && !question.multiSelect && selected.length > 0) {
          void this.submitQuestionBatch(callId, false, nextDrafts)
        }
      }

      setQuestionCustom(callId, questionId, custom) {
        this.setQuestionDraft(callId, questionId, { custom })
      }

      dismissQuestion(callId) {
        if (!callId) return
        const current = this.store.get()
        const dismissed = current.dismissedQuestions || {}
        this.store.set({
          dismissedQuestions: { ...dismissed, [callId]: true },
          questions: (Array.isArray(current.questions) ? current.questions : []).filter((batch) => batch.callId !== callId),
        })
      }

      startPendingRelay() {
        if (this.pendingRelayTimer !== null) return
        this.pendingRelayTimer = setInterval(() => this.relayOfficialPending(), 300)
      }

      relayOfficialPending() {
        const uiSession = this.ctx && this.ctx.uiSession
        if (!uiSession || !Array.isArray(uiSession.pendingDomains)) return
        const currentSessionId = this.store.get().sessionId
        for (const domain of uiSession.pendingDomains) {
          if (!domain || !(domain.values instanceof Map)) continue
          for (const [key, entry] of domain.values) {
            if (!entry || typeof entry.delegate !== 'function') continue
            if (this.delegatedPendingKeys.has(key)) continue
            const sessionId = entry.interaction && entry.interaction.sessionId
            if (currentSessionId && sessionId && sessionId !== currentSessionId) continue
            this.delegatedPendingKeys.add(key)
            try {
              const result = entry.delegate()
              if (result && typeof result.catch === 'function') result.catch(() => {})
            } catch {
              /* the next reply will be presented by our own answerer */
            }
          }
        }
      }

      registerRemoteAnswerers() {
        const remote = this.ctx && this.ctx.remote
        if (!remote || typeof remote.$on !== 'function') {
          console.warn('[quick-chat] remote event answerers are unavailable')
          return
        }
        const controller = this
        try {
          const offApproval = remote.$on('approval/request', function (request, next) {
            return controller.onApprovalRequest(this, request, next)
          })
          if (typeof offApproval === 'function') this.remoteUnsubs.push(offApproval)
        } catch (error) {
          console.warn('[quick-chat] approval answerer registration failed', error)
        }
        try {
          const offQuestion = remote.$on('user-questions/request', function (request, next) {
            return controller.onQuestionRequest(this, request, next)
          })
          if (typeof offQuestion === 'function') this.remoteUnsubs.push(offQuestion)
        } catch (error) {
          console.warn('[quick-chat] question answerer registration failed', error)
        }
      }

      remoteSessionOf(owner, request) {
        try {
          if (this.ctx.sessions && typeof this.ctx.sessions.scopeOf === 'function') {
            const sessionId = this.ctx.sessions.scopeOf(owner)
            if (typeof sessionId === 'string' && sessionId) return sessionId
          }
        } catch {
          /* try the request payload below */
        }
        const agent = request && request.agent
        if (agent && agent.session && typeof agent.session.id === 'string') return agent.session.id
        if (agent && typeof agent.sessionId === 'string') return agent.sessionId
        return null
      }

      onApprovalRequest(owner, request, next) {
        const sessionId = this.remoteSessionOf(owner, request)
        const currentSessionId = this.store.get().sessionId
        if (!currentSessionId || !sessionId || sessionId !== currentSessionId) return next()
        const id = typeof request.callId === 'string' && request.callId ? request.callId : `approval-${Date.now()}-${Math.random().toString(16).slice(2)}`
        return new Promise((resolve) => {
          const entry = { id, resolve, signal: request.signal, settled: false }
          const finish = (outcome) => {
            if (entry.settled) return
            entry.settled = true
            this.approvalRequests.delete(id)
            const state = this.store.get()
            this.store.set({ approvals: (Array.isArray(state.approvals) ? state.approvals : []).filter((item) => item.id !== id) })
            resolve(outcome)
          }
          entry.finish = finish
          this.approvalRequests.set(id, entry)
          if (request.signal && typeof request.signal.addEventListener === 'function') {
            request.signal.addEventListener(
              'abort',
              () => finish('cancelled'),
              { once: true },
            )
          }
          const state = this.store.get()
          const reason =
            typeof request.displayReason === 'string'
              ? request.displayReason
              : typeof request.reason === 'string'
                ? request.reason
                : ''
          const nextApprovals = [
            ...(Array.isArray(state.approvals) ? state.approvals : []),
            {
              id,
              toolName: typeof request.toolName === 'string' ? request.toolName : '',
              callId: typeof request.callId === 'string' ? request.callId : '',
              reason,
            },
          ]
          this.store.set({ approvals: nextApprovals })
        })
      }

      decideApproval(id, outcome) {
        const entry = this.approvalRequests.get(id)
        if (!entry || typeof entry.finish !== 'function') return
        entry.finish(outcome === 'allowed-once' ? 'allowed-once' : 'rejected')
      }

      onQuestionRequest(owner, request, next) {
        const sessionId = this.remoteSessionOf(owner, request)
        const currentSessionId = this.store.get().sessionId
        if (!currentSessionId || !sessionId || sessionId !== currentSessionId) return next()
        const questions = normalizeQuestionItems(request && request.questions)
        if (questions.length === 0) return next()
        const questionIds = questions.map((question) => question.id).filter(Boolean)
        const existingBatch = (this.store.get().questions || []).find(
          (batch) =>
            batch &&
            Array.isArray(batch.questions) &&
            batch.questions.some((question) => question && questionIds.includes(question.id)),
        )
        const requestCallId =
          (request && request.wait && typeof request.wait.callId === 'string' ? request.wait.callId : '') ||
          (request && typeof request.callId === 'string' ? request.callId : '')
        const callId =
          requestCallId ||
          (existingBatch && existingBatch.callId) ||
          `live-question-${String(sessionId)}-${questionIds.join('-') || Date.now()}`
        return new Promise((resolve, reject) => {
          const entry = { callId, sessionId, questions, resolve, reject, signal: request.signal, settled: false }
          this.liveQuestionRequests.set(callId, entry)
          this.scheduleRebuild()
          if (request.signal && typeof request.signal.addEventListener === 'function') {
            request.signal.addEventListener(
              'abort',
              () => {
                if (this.liveQuestionRequests.get(callId) !== entry) return
                entry.settled = true
                this.liveQuestionRequests.delete(callId)
                this.scheduleRebuild()
                const error = new Error('ASK_CANCELLED')
                error.code = 'ASK_CANCELLED'
                reject(error)
              },
              { once: true },
            )
          }
        })
      }

      focusMainWindow() {
        try {
          if (window.chrome && window.chrome.webview) {
            window.chrome.webview.postMessage(JSON.stringify({ type: 'dqc-focus-main' }))
            return
          }
        } catch {
          /* noop */
        }
        this.openDesktopWindow()
      }

      setQuestionState(callId, status, error = '') {
        const current = this.store.get().questionStates || {}
        this.store.set({
          questionStates: {
            ...current,
            [callId]: { status, error },
          },
        })
      }

      async submitQuestionBatch(callId, skip = false, draftsOverride = null) {
        const state = this.store.get()
        const batch = this.questionBatch(callId)
        if (!batch || !callId) return
        const currentStatus = state.questionStates && state.questionStates[callId] ? state.questionStates[callId].status : 'open'
        if (currentStatus === 'submitting' || currentStatus === 'submitted' || batch.state === 'continued') return
        const sessionId = state.sessionId
        if (!sessionId) return
        const drafts = draftsOverride || (state.questionDrafts && state.questionDrafts[callId]) || {}
        const answers = (batch.questions || [])
          .filter((question) => question && typeof question.id === 'string')
          .map((question) => {
            if (skip) return { id: question.id, selected: [] }
            const draft = drafts[question.id] || { selected: [], custom: '' }
            return {
              id: question.id,
              selected: draft.selected,
              ...(draft.custom.trim() ? { custom: draft.custom.trim() } : {}),
            }
          })
        let live = this.liveQuestionRequests.get(callId)
        if (!live) {
          const ids = new Set((batch.questions || []).map((question) => question.id).filter(Boolean))
          for (const [key, entry] of this.liveQuestionRequests) {
            if (entry.questions.some((question) => question && ids.has(question.id))) {
              live = entry
              this.liveQuestionRequests.delete(key)
              break
            }
          }
        }
        if (live) {
          this.liveQuestionRequests.delete(callId)
          live.settled = true
          this.setQuestionState(callId, 'submitted')
          live.resolve({ answers })
          this.scheduleRebuild()
          this.dismissQuestion(callId)
          return
        }
        const userQuestions = this.ctx.remote && this.ctx.remote.userQuestions
        if (!userQuestions || typeof userQuestions.answer !== 'function') {
          this.setQuestionState(callId, 'error', this.tr('当前客户端没有问答服务', 'This client has no question service'))
          return
        }
        this.setQuestionState(callId, 'submitting')
        try {
          const result = await userQuestions.answer(sessionId, callId, { answers })
          if (result && result.ok === false) throw new Error(formatFailure(result.error) || this.tr('回答失败', 'Answer failed'))
          if (result && result.value === false) {
            this.setQuestionState(
              callId,
              'blocked',
              this.tr(
                '这个提问正在 DSH 主窗口等待回答；DSH 的 answer 接口只接受已转交的 continued 提问，请在主窗口完成。',
                'This question is waiting in the DSH main window. The answer API only accepts continued questions; please answer it there.',
              ),
            )
            return
          }
          this.setQuestionState(callId, 'submitted')
          this.scheduleRebuild()
        } catch (error) {
          this.setQuestionState(callId, 'error', this.friendlyError(error, 'sendError'))
        }
      }

      async stop() {
        const session = this.session
        if (!session) return
        try {
          const result = await session.cancel()
          if (result && result.ok === false) this.store.set({ error: formatFailure(result.error) || this.t('stopError'), errorKind: 'stop' })
          this.scheduleRebuild()
        } catch (error) {
          this.store.set({ error: this.friendlyError(error, 'stopError'), errorKind: 'stop' })
        }
      }

      async newChat() {
        const state = this.store.get()
        if (state.busy || state.loading) return
        if (this.session && state.messages.length === 0 && !state.running) {
          this.clearAttachments()
          this.store.set({ draft: '', error: '', errorKind: '', historyOpen: false, menuOpen: false })
          this.focusInput()
          return
        }
        this.clearAttachments()
        this.store.set({
          busy: true,
          error: '',
          errorKind: '',
          historyOpen: false,
          menuOpen: false,
          sessionId: null,
          hasSession: false,
          attachments: [],
          messages: [],
          streamingText: '',
          questions: [],
          questionDrafts: {},
          questionStates: {},
          dismissedQuestions: {},
          approvals: [],
          status: '',
          title: '',
          running: false,
          draft: '',
          loading: true,
        })
        this.cleanupSession()
        try {
          const created = await this.createQuickSession()
          this.rememberSession(created)
          this.store.set({ sessionId: created, hasSession: true })
          await this.attach(created)
          this.focusInput()
        } catch (error) {
          this.store.set({ error: this.friendlyError(error, 'createError'), errorKind: 'session' })
        } finally {
          this.store.set({ busy: false, loading: false })
        }
      }

      async selectHistory(sessionId) {
        if (typeof sessionId !== 'string' || sessionId.length === 0) return
        if (sessionId === this.store.get().sessionId) {
          this.store.set({ historyOpen: false, menuOpen: false })
          return
        }
        this.store.set({ historyOpen: false, menuOpen: false, sessionId, title: '', messages: [], streamingText: '', questions: [], questionDrafts: {}, questionStates: {}, dismissedQuestions: {}, approvals: [], error: '', errorKind: '', loading: true })
        this.rememberSession(sessionId)
        try {
          await this.attach(sessionId)
          this.focusInput()
        } catch (error) {
          this.store.set({ error: this.friendlyError(error, 'sessionError'), errorKind: 'session', loading: false })
        }
      }

      openFull() {
        const sessionId = this.store.get().sessionId
        if (!sessionId) {
          this.notify(this.t('noSession'))
          return
        }
        try {
          this.ctx.sessions.open(sessionId)
          this.close()
        } catch (error) {
          this.notify(this.friendlyError(error, 'openFailed'))
        }
      }

      hideBubble() {
        this.store.set({ hiddenBubble: true, menuOpen: false })
        this.persist()
        this.notify(this.t('hideBubbleDone'))
      }

      showBubble() {
        this.store.set({ hiddenBubble: false, menuOpen: false })
        this.persist()
        this.notify(this.t('showBubbleDone'))
      }

      clearHistory() {
        const state = this.store.get()
        this.store.set({ history: state.sessionId ? [state.sessionId] : [], menuOpen: false })
        this.persist()
        this.notify(this.t('historyCleared'))
      }

      notify(text) {
        if (!text) return
        const id = Date.now() + Math.random()
        this.store.set({ notice: { id, text } })
        if (this.noticeTimer !== null) clearTimeout(this.noticeTimer)
        this.noticeTimer = setTimeout(() => {
          this.noticeTimer = null
          const state = this.store.get()
          if (state.notice && state.notice.id === id) this.store.set({ notice: null })
        }, 3200)
      }

      t(key, values) {
        return makeTranslator(this.store.get().lang)(key, values)
      }

      friendlyError(error, fallbackKey) {
        const message = formatFailure(error)
        return message || this.t(fallbackKey)
      }

      // ---- desktop picture-in-picture -----------------------------------

      async togglePin() {
        if (this.pipWindow) {
          this.closePip(true)
          return
        }
        if (!isPipSupported()) {
          this.notify(this.t('pipUnsupported'))
          return
        }
        const state = this.store.get()
        const width = Math.round(clamp(state.geometry.w, 360, 520))
        const height = Math.round(clamp(state.geometry.h, 480, 780))
        try {
          const pip = await documentPictureInPicture.requestWindow({ width, height })
          try {
            this.mountPip(pip)
          } catch (error) {
            try {
              pip.close()
            } catch {
              /* noop */
            }
            throw error
          }
        } catch (error) {
          console.warn('[quick-chat] document picture-in-picture failed', error)
          this.notify(this.t('pipFailed'))
        }
      }

      mountPip(pip) {
        if (!pip || !pip.document) return
        this.cleanupPip()
        this.pipWindow = pip
        this.pipRestore = true
        const doc = pip.document
        doc.documentElement.lang = isZh(this.store.get().lang) ? 'zh-CN' : 'en'
        doc.title = this.t('appName')
        const style = doc.createElement('style')
        style.setAttribute('data-dqc-style', '')
        style.textContent = CSS
        doc.head.append(style)
        const host = doc.createElement('div')
        host.className = 'dqc-pip-host'
        host.setAttribute('data-dqc-pip', '')
        this.copyThemeTo(host)
        doc.body.append(host)
        doc.body.style.margin = '0'
        doc.body.style.overflow = 'hidden'
        doc.body.style.background = 'var(--dqc-bg)'
        this.pipHost = host
        this.pipRoot = ReactDOM.createRoot(host)
        this.pipRoot.render(h(PipWindow, { controller: this }))
        this.store.set({ mode: 'pip', open: true, historyOpen: false, menuOpen: false })
        this.pipKeyHandler = (event) => {
          if (event.key === 'Escape') {
            const state = this.store.get()
            if (state.historyOpen || state.menuOpen) {
              event.preventDefault()
              this.closeMenus()
              return
            }
            event.preventDefault()
            this.closePip(true)
            return
          }
          const key = typeof event.key === 'string' ? event.key.toLowerCase() : ''
          if (event.altKey && (key === 'q' || event.code === 'KeyQ')) {
            event.preventDefault()
            this.closePip(true)
          }
        }
        doc.addEventListener('keydown', this.pipKeyHandler, true)
        pip.addEventListener('pagehide', () => this.handlePipClosed(), { once: true })
        try {
          this.pipThemeObserver = new MutationObserver(() => {
            if (this.pipHost) this.copyThemeTo(this.pipHost)
          })
          this.pipThemeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme', 'style', 'class'] })
        } catch {
          this.pipThemeObserver = null
        }
      }

      copyThemeTo(host) {
        if (!host) return
        try {
          const source = getComputedStyle(document.body)
          const vars = [
            '--dsw-alias-brand-primary',
            '--dsw-static-deepseek-600',
            '--dsw-alias-bg-layer-1',
            '--dsw-alias-bg-base',
            '--dsw-alias-bg-layer-2',
            '--dsw-alias-bg-overlay',
            '--dsw-alias-label-primary',
            '--dsw-alias-label-secondary',
            '--dsw-alias-label-tertiary',
            '--dsw-alias-border-l1',
            '--dsw-alias-border-l2',
            '--dsw-alias-state-error-primary',
            '--dsh-content-font-size',
          ]
          for (const name of vars) {
            const value = source.getPropertyValue(name).trim()
            if (value) host.style.setProperty(name, value)
          }
          host.style.fontFamily = source.fontFamily
          host.style.fontSize = source.fontSize
          const dark = document.body.hasAttribute('data-ds-dark-theme')
          host.dataset.theme = dark ? 'dark' : 'light'
          host.style.colorScheme = dark ? 'dark' : 'light'
          if (this.pipWindow && this.pipWindow.document) {
            this.pipWindow.document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
            this.pipWindow.document.body.style.background = source.getPropertyValue('--dsw-alias-bg-layer-1').trim() || ''
          }
        } catch {
          /* inherit the fallbacks in CSS */
        }
      }

      updatePipChrome() {
        if (!this.pipWindow) return
        try {
          this.pipWindow.document.documentElement.lang = isZh(this.store.get().lang) ? 'zh-CN' : 'en'
          this.pipWindow.document.title = this.t('appName')
        } catch {
          /* noop */
        }
      }

      closePip(restore) {
        this.pipRestore = restore !== false
        if (!this.pipWindow) return
        try {
          this.pipWindow.close()
        } catch {
          this.handlePipClosed()
        }
      }

      handlePipClosed() {
        if (!this.pipWindow) return
        const restore = this.pipRestore
        this.cleanupPip()
        this.store.set({ mode: 'inline', open: restore, historyOpen: false, menuOpen: false })
        if (restore) this.focusInput()
      }

      cleanupPip() {
        if (this.pipKeyHandler && this.pipWindow && this.pipWindow.document) {
          try {
            this.pipWindow.document.removeEventListener('keydown', this.pipKeyHandler, true)
          } catch {
            /* noop */
          }
        }
        this.pipKeyHandler = null
        if (this.pipThemeObserver) {
          try {
            this.pipThemeObserver.disconnect()
          } catch {
            /* noop */
          }
        }
        this.pipThemeObserver = null
        if (this.pipRoot) {
          try {
            this.pipRoot.unmount()
          } catch {
            /* noop */
          }
        }
        this.pipRoot = null
        if (this.pipHost) {
          try {
            this.pipHost.remove()
          } catch {
            /* noop */
          }
        }
        this.pipHost = null
        this.pipWindow = null
      }

      dispose() {
        this.cleanupSession()
        const pip = this.pipWindow
        this.cleanupPip()
        if (pip) {
          try {
            pip.close()
          } catch {
            /* noop */
          }
        }
        if (typeof this.listUnsub === 'function') this.listUnsub()
        if (this.pendingRelayTimer !== null) {
          clearInterval(this.pendingRelayTimer)
          this.pendingRelayTimer = null
        }
        for (const off of this.remoteUnsubs) {
          try {
            if (typeof off === 'function') off()
          } catch {
            /* noop */
          }
        }
        this.remoteUnsubs = []
        if (typeof this.localeUnsub === 'function') this.localeUnsub()
        this.listUnsub = null
        this.localeUnsub = null
        for (const dispose of this.disposers) {
          try {
            dispose()
          } catch {
            /* noop */
          }
        }
        this.disposers = []
        if (this.noticeTimer !== null) {
          clearTimeout(this.noticeTimer)
          this.noticeTimer = null
        }
        if (this.titleObserver) {
          try {
            this.titleObserver.disconnect()
          } catch {
            /* noop */
          }
          this.titleObserver = null
        }
        try {
          delete document.documentElement.dataset.dqcStandalone
        } catch {
          /* noop */
        }
        this.started = false
      }
    }

    // ---------------------------------------------------------------------
    // Markdown (small, dependency-free renderer)
    // ---------------------------------------------------------------------

    function renderInline(text, prefix) {
      const input = String(text || '')
      const pattern = /(\*\*[^*]+\*\*|`[^`\n]+`|\[[^\]]+\]\((?:https?:\/\/|mailto:)[^)\s]+\))/g
      const nodes = []
      let last = 0
      let match
      let index = 0
      while ((match = pattern.exec(input)) !== null) {
        if (match.index > last) nodes.push(input.slice(last, match.index))
        const token = match[0]
        const key = `${prefix}-i-${index++}`
        if (token.startsWith('**') && token.endsWith('**')) {
          nodes.push(h('strong', { key }, token.slice(2, -2)))
        } else if (token.startsWith('`') && token.endsWith('`')) {
          nodes.push(h('code', { key, className: 'dqc-inline' }, token.slice(1, -1)))
        } else {
          const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)
          if (link) {
            nodes.push(
              h(
                'a',
                {
                  key,
                  href: link[2],
                  target: '_blank',
                  rel: 'noreferrer noopener',
                },
                link[1],
              ),
            )
          } else {
            nodes.push(token)
          }
        }
        last = match.index + token.length
      }
      if (last < input.length) nodes.push(input.slice(last))
      return nodes
    }

    function splitTableRow(line) {
      const value = String(line || '').trim().replace(/^\|/, '').replace(/\|$/, '')
      return value.split('|').map((cell) => cell.trim())
    }

    function isTableSeparator(line) {
      if (!line || !line.includes('|')) return false
      const cells = splitTableRow(line)
      return cells.length > 0 && cells.every((cell) => /^:?-{1,}:?$/.test(cell.replace(/\s+/g, '')))
    }

    function parseTable(lines, start) {
      const headerLine = lines[start]
      if (!headerLine || !headerLine.includes('|')) return null
      const separatorLine = lines[start + 1]
      if (!isTableSeparator(separatorLine)) return null
      const header = splitTableRow(headerLine)
      const separators = splitTableRow(separatorLine)
      if (header.length === 0 || separators.length !== header.length) return null
      const align = separators.map((cell) => {
        const value = cell.replace(/\s+/g, '')
        if (value.startsWith(':') && value.endsWith(':')) return 'center'
        if (value.endsWith(':')) return 'right'
        return 'left'
      })
      const rows = []
      let end = start + 2
      while (end < lines.length && lines[end] && lines[end].trim() !== '' && lines[end].includes('|')) {
        const cells = splitTableRow(lines[end])
        if (isTableSeparator(lines[end])) break
        rows.push(header.map((_, cellIndex) => cells[cellIndex] || ''))
        end += 1
      }
      return { header, align, rows, end }
    }

    function renderProse(text, prefix) {
      const lines = String(text || '').split(/\r?\n/)
      const nodes = []
      let paragraph = []
      let list = null
      let index = 0

      const flushParagraph = () => {
        if (paragraph.length === 0) return
        const value = paragraph.join('\n')
        paragraph = []
        nodes.push(h('p', { key: `${prefix}-p-${index++}` }, renderInline(value, `${prefix}-p-${index}`)))
      }

      const flushList = () => {
        if (!list) return
        const items = list.items.map((item, itemIndex) =>
          h('li', { key: `${prefix}-li-${index}-${itemIndex}` }, renderInline(item, `${prefix}-li-${itemIndex}`)),
        )
        nodes.push(h(list.type, { key: `${prefix}-list-${index++}` }, items))
        list = null
      }

      for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
        const rawLine = lines[lineIndex]
        const line = rawLine.replace(/\s+$/, '')
        if (line.trim() === '') {
          flushParagraph()
          flushList()
          continue
        }
        const table = parseTable(lines, lineIndex)
        if (table) {
          flushParagraph()
          flushList()
          const key = `${prefix}-table-${index++}`
          nodes.push(
            h(
              'div',
              { key, className: 'dqc-table-wrap' },
              h(
                'table',
                { className: 'dqc-md-table' },
                h(
                  'thead',
                  null,
                  h(
                    'tr',
                    null,
                    table.header.map((cell, cellIndex) =>
                      h(
                        'th',
                        { key: `${key}-h-${cellIndex}`, style: { textAlign: table.align[cellIndex] } },
                        renderInline(cell, `${key}-h-${cellIndex}`),
                      ),
                    ),
                  ),
                ),
                table.rows.length > 0
                  ? h(
                      'tbody',
                      null,
                      table.rows.map((cells, rowIndex) =>
                        h(
                          'tr',
                          { key: `${key}-r-${rowIndex}` },
                          cells.map((cell, cellIndex) =>
                            h(
                              'td',
                              { key: `${key}-r-${rowIndex}-c-${cellIndex}`, style: { textAlign: table.align[cellIndex] } },
                              renderInline(cell, `${key}-r-${rowIndex}-c-${cellIndex}`),
                            ),
                          ),
                        ),
                      ),
                    )
                  : null,
              ),
            ),
          )
          lineIndex = table.end - 1
          continue
        }
        const heading = /^(#{1,4})\s+(.+)$/.exec(line)
        if (heading) {
          flushParagraph()
          flushList()
          const level = Math.min(4, heading[1].length)
          nodes.push(
            h(
              `h${level}`,
              { key: `${prefix}-h-${index++}` },
              renderInline(heading[2], `${prefix}-h-${index}`),
            ),
          )
          continue
        }
        const unordered = /^\s*[-*+]\s+(.+)$/.exec(line)
        const ordered = /^\s*\d+[.)]\s+(.+)$/.exec(line)
        if (unordered || ordered) {
          flushParagraph()
          const type = unordered ? 'ul' : 'ol'
          if (!list || list.type !== type) {
            flushList()
            list = { type, items: [] }
          }
          list.items.push(unordered ? unordered[1] : ordered[1])
          continue
        }
        if (/^\s*>\s?/.test(line)) {
          flushParagraph()
          flushList()
          nodes.push(
            h(
              'blockquote',
              { key: `${prefix}-q-${index++}` },
              h('p', null, renderInline(line.replace(/^\s*>\s?/, ''), `${prefix}-q`)),
            ),
          )
          continue
        }
        flushList()
        paragraph.push(line)
      }
      flushParagraph()
      flushList()
      return nodes
    }

    function CodeBlock({ code, lang, t }) {
      const [copied, setCopied] = useState(false)
      const timerRef = useRef(null)
      useEffect(
        () => () => {
          if (timerRef.current) clearTimeout(timerRef.current)
        },
        [],
      )
      const onCopy = async () => {
        const ok = await copyText(code)
        if (!ok) return
        setCopied(true)
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setCopied(false), 1500)
      }
      return h(
        'div',
        { className: 'dqc-code' },
        h(
          'div',
          { className: 'dqc-code-head' },
          h('span', { className: 'dqc-code-lang' }, lang || 'code'),
          h(
            'button',
            {
              type: 'button',
              className: 'dqc-code-copy',
              onClick: onCopy,
              'aria-label': copied ? t('copied') : t('copy'),
            },
            h(Icon, { name: copied ? 'check' : 'copy', size: 12 }),
            copied ? t('copied') : t('copy'),
          ),
        ),
        h('pre', null, h('code', null, code)),
      )
    }

    function Markdown({ text, t }) {
      const value = String(text || '')
      const segments = []
      const pattern = /```([^\n`]*)\n?([\s\S]*?)```/g
      let last = 0
      let match
      let index = 0
      while ((match = pattern.exec(value)) !== null) {
        if (match.index > last) {
          segments.push(
            h('div', { key: `prose-${index++}` }, renderProse(value.slice(last, match.index), `p-${index}`)),
          )
        }
        segments.push(
          h(CodeBlock, {
            key: `code-${index++}`,
            code: match[2].replace(/\n$/, ''),
            lang: match[1].trim(),
            t,
          }),
        )
        last = match.index + match[0].length
      }
      const rest = value.slice(last)
      if (rest) {
        const open = rest.indexOf('```')
        if (open >= 0) {
          const before = rest.slice(0, open)
          if (before) {
            segments.push(h('div', { key: `prose-${index++}` }, renderProse(before, `partial-${index}`)))
          }
          const after = rest.slice(open + 3)
          const newline = after.indexOf('\n')
          const lang = newline >= 0 ? after.slice(0, newline).trim() : ''
          const code = newline >= 0 ? after.slice(newline + 1) : after
          segments.push(h(CodeBlock, { key: `code-${index++}`, code, lang, t }))
        } else {
          segments.push(h('div', { key: `prose-${index++}` }, renderProse(rest, `tail-${index}`)))
        }
      }
      if (segments.length === 0) return h('div', { className: 'dqc-md' })
      return h('div', { className: 'dqc-md' }, segments)
    }

    // ---------------------------------------------------------------------
    // Message presentation
    // ---------------------------------------------------------------------

    function MessageAttachments({ attachments, controller, t }) {
      const imagesKey = attachments
        .filter((item) => item.kind === 'image' && item.attachment && typeof item.attachment.attachmentId === 'string')
        .map((item) => item.attachment.attachmentId)
        .join('|')
      const [urls, setUrls] = useState({})
      useEffect(() => {
        const created = []
        let cancelled = false
        const run = async () => {
          const next = {}
          for (const item of attachments) {
            if (item.kind !== 'image' || !item.attachment) continue
            const id = item.attachment.attachmentId
            const session = controller.session
            if (typeof id !== 'string' || !session || typeof session.readAttachment !== 'function') continue
            try {
              const result = await session.readAttachment(id)
              if (!result || result.ok === false) continue
              const bytes = result.value && result.value.data
              const mediaType =
                result.value && result.value.attachment && result.value.attachment.mediaType
                  ? result.value.attachment.mediaType
                  : item.attachment.mediaType || 'image/png'
              if (!bytes) continue
              const blob = new Blob([bytes], { type: mediaType })
              const url = URL.createObjectURL(blob)
              created.push(url)
              next[id] = url
            } catch {
              /* leave a placeholder for unreadable images */
            }
          }
          if (!cancelled) setUrls(next)
        }
        void run()
        return () => {
          cancelled = true
          for (const url of created) {
            try {
              URL.revokeObjectURL(url)
            } catch {
              /* noop */
            }
          }
        }
      }, [imagesKey, controller])
      if (!Array.isArray(attachments) || attachments.length === 0) return null
      return h(
        'div',
        { className: 'dqc-msg-attachments' },
        attachments.map((item, index) => {
          const attachment = item.attachment || {}
          const name = typeof attachment.name === 'string' && attachment.name ? attachment.name : ''
          const bytes = typeof attachment.bytes === 'number' ? attachment.bytes : 0
          const ext = name ? String(name).split('.').pop().slice(0, 4).toUpperCase() : ''
          if (item.kind === 'image') {
            const url = attachment.attachmentId ? urls[attachment.attachmentId] : ''
            return h(
              'div',
              { key: `image-${index}`, className: 'dqc-msg-image' },
              url ? h('img', { src: url, alt: name || t('imageAttachment'), draggable: false }) : h('span', null, t('imageAttachment')),
            )
          }
          return h(
            'div',
            { key: `file-${index}`, className: 'dqc-msg-file', title: name },
            h('span', { className: 'dqc-msg-file-ext' }, ext || t('fileAttachment')),
            h(
              'span',
              { className: 'dqc-msg-file-info' },
              h('span', { className: 'dqc-msg-file-name' }, name || t('fileAttachment')),
              h(
                'span',
                { className: 'dqc-msg-file-meta' },
                bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`,
              ),
            ),
          )
        }),
      )
    }

    function MessageView({ message, controller, t, appearance, assistantName }) {
      const [copied, setCopied] = useState(false)
      const timerRef = useRef(null)
      useEffect(
        () => () => {
          if (timerRef.current) clearTimeout(timerRef.current)
        },
        [],
      )
      const onCopy = async () => {
        const ok = await copyText(message.text)
        if (!ok) return
        setCopied(true)
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setCopied(false), 1400)
      }

      if (message.role === 'user') {
        return h(
          'div',
          { className: 'dqc-msg', 'data-role': 'user', 'data-dqc-msg': 'user' },
          h(
            'div',
            { className: 'dqc-user-bubble' },
            message.attachments && message.attachments.length > 0
              ? h(MessageAttachments, { attachments: message.attachments, controller, t })
              : null,
            message.text ? h('div', { className: 'dqc-user-text' }, message.text) : null,
            message.state
              ? h(
                  'div',
                  { className: 'dqc-user-meta', 'data-state': message.state },
                  h(Icon, { name: message.state === 'queued' ? 'history' : 'sparkle', size: 9 }),
                  message.state === 'queued' ? t('queued') : t('sendingLabel'),
                )
              : null,
          ),
        )
      }

      return h(
        'div',
        { className: 'dqc-msg', 'data-role': 'assistant', 'data-dqc-msg': 'assistant' },
        h(PetAvatar, { appearance }),
        h(
          'div',
          { className: 'dqc-ai-body' },
          h(
            'div',
            { className: 'dqc-ai-name' },
            assistantName || t('assistant'),
            message.time
              ? h('span', { className: 'dqc-msg-time' }, new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
              : null,
          ),
          h(Markdown, { text: message.text, t }),
          h(
            'div',
            { className: 'dqc-msg-actions' },
            h(
              'button',
              {
                type: 'button',
                className: 'dqc-mini-btn',
                onClick: onCopy,
                'aria-label': copied ? t('copied') : t('copy'),
              },
              h(Icon, { name: copied ? 'check' : 'copy', size: 12 }),
              copied ? t('copied') : t('copy'),
            ),
          ),
        ),
      )
    }

    function StreamingView({ text, controller, t, appearance, assistantName }) {
      return h(
        'div',
        { className: 'dqc-msg', 'data-role': 'assistant', 'data-dqc-msg': 'streaming' },
        h(PetAvatar, { appearance }),
        h(
          'div',
          { className: 'dqc-ai-body' },
          h('div', { className: 'dqc-ai-name' }, assistantName || t('assistant')),
          h(Markdown, { text, t }),
          h('span', { className: 'dqc-cursor', 'aria-hidden': 'true' }),
        ),
      )
    }

    function SystemRow({ text, controller, t, canRetry }) {
      return h(
        'div',
        { className: 'dqc-msg', 'data-role': 'system' },
        h(
          'div',
          { className: 'dqc-system-row', role: 'alert' },
          h(Icon, { name: 'info', size: 13 }),
          h('span', null, text),
          canRetry
            ? h(
                'button',
                { type: 'button', className: 'dqc-retry', onClick: () => controller.retry() },
                t('retry'),
              )
            : null,
        ),
      )
    }

    function EmptyState() {
      // 极简：空会话不显示欢迎语、大图标和推荐问题，只保留输入框。
      return null
    }

    function LoadingState({ t }) {
      return h(
        'div',
        { className: 'dqc-loading', 'data-dqc-loading': '' },
        h('span', { className: 'dqc-mini-spinner' }),
        h('span', null, t('loading')),
      )
    }

    function ErrorState({ text, controller, t, canRetry }) {
      return h(
        'div',
        { className: 'dqc-empty', 'data-dqc-error': '' },
        h('p', { className: 'dqc-empty-body', style: { marginBottom: 14, color: 'var(--dqc-danger)' } }, text),
        canRetry
          ? h(
              'button',
              { type: 'button', className: 'dqc-chip', onClick: () => controller.retry() },
              t('retry'),
            )
          : null,
      )
    }

    // ---------------------------------------------------------------------
    // Composer
    // ---------------------------------------------------------------------

    const PERMISSION_OPTIONS = [
      { id: 'read-only', labelKey: 'readOnly' },
      { id: 'workspace-write', labelKey: 'workspaceWrite' },
      { id: 'danger-full-access', labelKey: 'fullAccess' },
    ]

    function PermissionMenu({ controller, state, t }) {
      return h(
        'div',
        { className: 'dqc-tool-menu dqc-tool-menu-left', role: 'menu', 'data-dqc-tool-menu': 'permission' },
        h('div', { className: 'dqc-tool-title' }, t('permission')),
        PERMISSION_OPTIONS.map((option) =>
          h(
            'button',
            {
              key: option.id,
              type: 'button',
              className: 'dqc-tool-option',
              'data-active': state.permission === option.id ? 'true' : 'false',
              onClick: () => controller.setPermission(option.id),
            },
            h(Icon, { name: 'shield', size: 14 }),
            h('span', { className: 'dqc-tool-option-label' }, t(option.labelKey)),
            state.permission === option.id ? h(Icon, { name: 'check', size: 14 }) : null,
          ),
        ),
      )
    }

    function ModelMenu({ controller, state, t }) {
      const groups = state.modelCatalog && Array.isArray(state.modelCatalog.groups) ? state.modelCatalog.groups : []
      const modelCount = groups.reduce((count, group) => count + (Array.isArray(group.models) ? group.models.length : 0), 0)
      const selection = state.modelSelection
      const reasoning = controller.reasoningOptions()
      const thinkingOff = Boolean(selection && selection.reasoningEffort === 'off')
      const rows = []
      for (const group of groups) {
        const models = Array.isArray(group.models) ? group.models : []
        if (models.length === 0) continue
        rows.push(h('div', { key: `g-${group.id}`, className: 'dqc-tool-group' }, group.name || group.id))
        for (const model of models) {
          rows.push(
            h(
              'button',
              {
                key: `m-${group.id}-${model.id}`,
                type: 'button',
                className: 'dqc-tool-option',
                'data-active': selection && selection.provider === group.id && selection.model === model.id ? 'true' : 'false',
                onClick: () =>
                  controller.selectModel(
                    group.id,
                    model.id,
                    selection && selection.provider === group.id && selection.model === model.id ? selection.reasoningEffort : model.reasoning && model.reasoning.defaultEffort,
                  ),
              },
              h(
                'span',
                { className: 'dqc-tool-option-label' },
                h('span', null, model.name || model.id),
                model.description && /^\d+$/.test(String(model.description))
                  ? h('span', { className: 'dqc-tool-badge' }, String(model.description))
                  : null,
              ),
              selection && selection.provider === group.id && selection.model === model.id ? h(Icon, { name: 'check', size: 14 }) : null,
            ),
          )
        }
      }
      if (rows.length === 0) {
        rows.push(
          h(
            'div',
            { className: 'dqc-tool-empty' },
            controller.modelLabel(),
          ),
        )
      }
      return h(
        'div',
        { className: 'dqc-tool-menu dqc-tool-menu-right', role: 'menu', 'data-dqc-tool-menu': 'model' },
        h('div', { className: 'dqc-tool-title' }, t('model')),
        h('div', { className: 'dqc-tool-scroll' }, rows),
        modelCount <= 1 ? h('div', { className: 'dqc-tool-hint' }, t('onlyOneModel')) : null,
        h('div', { className: 'dqc-tool-divider' }),
        h('div', { className: 'dqc-tool-row-title' }, t('reasoning')),
        h(
          'div',
          { className: 'dqc-tool-chips' },
          reasoning.map((option) =>
            h(
              'button',
              {
                key: option.id,
                type: 'button',
                className: 'dqc-tool-chip',
                'data-active': selection && selection.reasoningEffort === option.id ? 'true' : 'false',
                onClick: () => controller.selectReasoning(option.id),
              },
              option.label,
            ),
          ),
        ),
        h(
          'button',
          {
            type: 'button',
            className: 'dqc-tool-toggle',
            'data-active': thinkingOff ? 'true' : 'false',
            onClick: () => controller.toggleThinking(),
          },
          h('span', { className: 'dqc-tool-option-label' }, t('thinkingOff')),
          h('span', { className: 'dqc-tool-switch', 'aria-hidden': 'true' }),
        ),
      )
    }

    function ApprovalDock({ approvals, controller, lang }) {
      const items = Array.isArray(approvals) ? approvals : []
      if (items.length === 0) return null
      const L = (zh, en) => trText(lang, zh, en)
      return h(
        'div',
        { className: 'dqc-question-dock dqc-approval-dock' },
        items.map((item) =>
          h(
            'div',
            { key: item.id, className: 'dqc-question-card dqc-approval-card' },
            h(
              'div',
              { className: 'dqc-question-head' },
              h('span', null, L('等待审批', 'Waiting for approval')),
              item.toolName ? h('span', { className: 'dqc-question-count' }, item.toolName) : null,
            ),
            h('div', { className: 'dqc-approval-reason' }, item.reason || L('此操作需要你的授权。', 'This action needs your authorization.')),
            h(
              'div',
              { className: 'dqc-question-actions' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'dqc-question-skip',
                  onClick: () => controller.decideApproval(item.id, 'rejected'),
                },
                L('拒绝', 'Reject'),
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dqc-question-submit',
                  onClick: () => controller.decideApproval(item.id, 'allowed-once'),
                },
                L('允许一次', 'Allow once'),
              ),
            ),
          ),
        ),
      )
    }

    function QuestionBatch({ batch, drafts, status, controller, t, lang }) {
      const questions = Array.isArray(batch.questions) ? batch.questions : []
      const state = status || { status: 'open', error: '' }
      const draftValues = drafts || {}
      const L = (zh, en) => trText(lang, zh, en)
      const readOnly = state.status === 'continued' || state.status === 'submitted' || state.status === 'blocked' || !batch.callId
      const submitting = state.status === 'submitting'
      const locked = readOnly || submitting
      return h(
        'div',
        { className: 'dqc-question-card', 'data-readonly': readOnly ? 'true' : 'false' },
        h(
          'div',
          { className: 'dqc-question-head' },
          h(
            'span',
            null,
            state.status === 'submitted'
              ? L('回答已提交，等待助手继续', 'Answer submitted; waiting for the assistant')
              : state.status === 'blocked'
                ? L('请在 DSH 主窗口回答', 'Answer in the DSH main window')
                : state.status === 'continued'
                  ? L('助手提问（已回答）', 'Assistant question (answered)')
                  : L('助手需要你确认', 'The assistant needs your confirmation'),
          ),
          h(
            'div',
            { className: 'dqc-question-head-right' },
            readOnly ? null : h('span', { className: 'dqc-question-count' }, isZh(lang) ? `${questions.length} 个问题` : `${questions.length} question${questions.length === 1 ? '' : 's'}`),
            state.status === 'open'
              ? null
              : h(
                  'button',
                  {
                    type: 'button',
                    className: 'dqc-question-close',
                    title: L('关闭', 'Close'),
                    'aria-label': L('关闭提问卡片', 'Close question card'),
                    onClick: () => controller.dismissQuestion(batch.callId),
                  },
                  h(Icon, { name: 'close', size: 12 }),
                ),
          ),
        ),
        h(
          'div',
          { className: 'dqc-question-list' },
          questions.map((question, questionIndex) => {
            const draft = draftValues[question.id] || { selected: [], custom: '' }
            return h(
              'div',
              { key: question.id || questionIndex, className: 'dqc-question-item' },
              question.header ? h('div', { className: 'dqc-question-label' }, question.header) : null,
              h('div', { className: 'dqc-question-title' }, question.question),
              question.detail ? h('div', { className: 'dqc-question-detail' }, h(Markdown, { text: question.detail, t })) : null,
              Array.isArray(question.options) && question.options.length > 0
                ? h(
                    'div',
                    { className: 'dqc-question-options' },
                    question.options.map((option) =>
                      h(
                        'button',
                        {
                          key: option.label,
                          type: 'button',
                          className: 'dqc-question-option',
                          'data-active': draft.selected.includes(option.label) ? 'true' : 'false',
                          disabled: locked,
                          onClick: () => controller.setQuestionSelection(batch.callId, question.id, option.label),
                        },
                        h('span', { className: 'dqc-question-option-label' }, option.label),
                        option.description
                          ? h('span', { className: 'dqc-question-option-desc' }, option.description)
                          : null,
                      ),
                    ),
                  )
                : null,
              readOnly
                ? null
                : h('input', {
                    className: 'dqc-question-input',
                    type: 'text',
                    value: draft.custom,
                    disabled: submitting,
                    placeholder: L('输入你的答案（可选）', 'Type your answer (optional)'),
                    onChange: (event) => controller.setQuestionCustom(batch.callId, question.id, event.target.value),
                  }),
            )
          }),
        ),
        state.error ? h('div', { className: 'dqc-question-error' }, state.error) : null,
        readOnly
          ? state.status === 'blocked'
            ? h(
                'div',
                { className: 'dqc-question-actions' },
                h(
                  'button',
                  { type: 'button', className: 'dqc-question-submit', onClick: () => controller.focusMainWindow() },
                  L('去主窗口回答', 'Answer in main window'),
                ),
              )
            : null
          : h(
              'div',
              { className: 'dqc-question-actions' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'dqc-question-skip',
                  disabled: submitting,
                  onClick: () => void controller.submitQuestionBatch(batch.callId, true),
                },
                L('跳过', 'Skip'),
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dqc-question-submit',
                  disabled: submitting,
                  onClick: () => void controller.submitQuestionBatch(batch.callId, false),
                },
                submitting ? L('提交中…', 'Submitting…') : L('提交回答', 'Submit answer'),
              ),
            ),
      )
    }

    function QuestionDock({ questions, drafts, states, controller, t, lang }) {
      const batches = Array.isArray(questions) ? questions.filter((batch) => batch && Array.isArray(batch.questions)) : []
      if (batches.length === 0) return null
      return h(
        'div',
        { className: 'dqc-question-dock' },
        batches.map((batch) =>
          h(QuestionBatch, {
            key: batch.callId || batch.questions[0]?.id,
            batch,
            drafts: drafts && drafts[batch.callId],
            status: states && states[batch.callId],
            controller,
            t,
            lang,
          }),
        ),
      )
    }

    function Composer({ controller, state, t, inputRef, pip, standalone, assistantName }) {
      const [focused, setFocused] = useState(false)
      const textareaRef = inputRef
      const fileInputRef = useRef(null)
      const disabled = state.loading || !state.sessionId
      const attachments = Array.isArray(state.attachments) ? state.attachments : []
      const canSend = (state.draft.trim().length > 0 || attachments.length > 0) && !disabled && !state.busy
      const placeholder = state.loading ? t('loading') : t('placeholderNamed', { name: assistantName || t('assistant') })

      useEffect(() => {
        const element = textareaRef.current
        if (!element) return
        element.style.height = '0px'
        const next = Math.min(124, Math.max(24, element.scrollHeight))
        element.style.height = `${next}px`
      }, [state.draft, state.open, textareaRef])

      const onKeyDown = (event) => {
        if (event.key !== 'Enter' || event.shiftKey) return
        if (event.nativeEvent && event.nativeEvent.isComposing) return
        if (event.isComposing) return
        event.preventDefault()
        if (canSend) controller.send()
      }

      const permissionLabel =
        state.permission === 'read-only' ? t('readOnly') : state.permission === 'workspace-write' ? t('workspaceWrite') : t('fullAccess')

      return h(
        'div',
        { className: 'dqc-compose-wrap' },
        h(
          'div',
          {
            className: 'dqc-composer',
            'data-focus': focused ? 'true' : 'false',
            'data-disabled': disabled ? 'true' : 'false',
          },
          attachments.length > 0
            ? h(
                'div',
                { className: 'dqc-attachments' },
                attachments.map((attachment) =>
                  h(
                    'div',
                    {
                      key: attachment.id,
                      className: 'dqc-attachment',
                      'data-kind': attachment.kind,
                      'data-status': attachment.status || 'ready',
                      title: attachment.name,
                    },
                    attachment.kind === 'image' && attachment.previewUrl
                      ? h('img', { className: 'dqc-attachment-thumb', src: attachment.previewUrl, alt: '' })
                      : h(
                          'span',
                          { className: 'dqc-attachment-ext' },
                          String(attachment.name || 'file').split('.').pop().slice(0, 4).toUpperCase(),
                        ),
                    h(
                      'span',
                      { className: 'dqc-attachment-info' },
                      h('span', { className: 'dqc-attachment-name' }, attachment.name),
                      h(
                        'span',
                        { className: 'dqc-attachment-note' },
                        attachment.status === 'uploading'
                          ? `${t('uploadingAttachment')}${attachment.progress ? ` ${attachment.progress}%` : '…'}`
                          : attachment.status === 'error'
                            ? attachment.error || t('sendError')
                            : attachment.size >= 1024 * 1024
                              ? `${(attachment.size / (1024 * 1024)).toFixed(1)} MB`
                              : `${Math.max(1, Math.round(attachment.size / 1024))} KB`,
                      ),
                    ),
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'dqc-attachment-remove',
                        title: t('removeAttachment'),
                        'aria-label': t('removeAttachment'),
                        disabled: state.busy,
                        onClick: () => controller.removeAttachment(attachment.id),
                      },
                      h(Icon, { name: 'close', size: 10 }),
                    ),
                  ),
                ),
              )
            : null,
          h('textarea', {
            ref: textareaRef,
            className: 'dqc-textarea',
            value: state.draft,
            rows: 1,
            placeholder,
            'aria-label': placeholder,
            'data-dqc-input': '',
            disabled,
            onChange: (event) => controller.setDraft(event.target.value),
            onPaste: (event) => {
              const clipboard = event.clipboardData
              if (!clipboard) return
              const files = []
              for (const item of Array.from(clipboard.items || [])) {
                if (!item || item.kind !== 'file') continue
                const file = item.getAsFile()
                if (file && file.size > 0) files.push(file)
              }
              if (files.length === 0) {
                for (const file of Array.from(clipboard.files || [])) {
                  if (file && file.size > 0) files.push(file)
                }
              }
              if (files.length > 0) {
                event.preventDefault()
                controller.addFiles(files)
              }
            },
            onFocus: () => setFocused(true),
            onBlur: () => setFocused(false),
            onKeyDown,
            spellCheck: false,
          }),
          h(
            'div',
            { className: 'dqc-compose-bar' },
            h(
              'div',
              { className: 'dqc-compose-left' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'dqc-tool-pill dqc-tool-plus',
                  title: t('attach'),
                  'aria-label': t('attach'),
                  disabled: state.busy,
                  onClick: () => fileInputRef.current && fileInputRef.current.click(),
                },
                h(Icon, { name: 'plus', size: 15 }),
              ),
              h('input', {
                ref: fileInputRef,
                type: 'file',
                multiple: true,
                style: { display: 'none' },
                onChange: (event) => {
                  controller.addFiles(event.target.files)
                  event.target.value = ''
                },
              }),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dqc-tool-pill dqc-tool-permission',
                  'data-active': state.permissionMenuOpen ? 'true' : 'false',
                  onClick: () => controller.toggleToolMenu('permission'),
                },
                h(Icon, { name: 'shield', size: 14 }),
                h('span', { className: 'dqc-tool-pill-label' }, permissionLabel),
                h(Icon, { name: 'chevron-down', size: 11 }),
              ),
            ),
            h(
              'div',
              { className: 'dqc-compose-right' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'dqc-tool-pill dqc-tool-model',
                  'data-active': state.modelMenuOpen ? 'true' : 'false',
                  onClick: () => controller.toggleToolMenu('model'),
                },
                h('span', { className: 'dqc-tool-pill-label' }, controller.modelLabel()),
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dqc-tool-pill dqc-tool-reasoning',
                  'data-active': state.modelMenuOpen ? 'true' : 'false',
                  onClick: () => controller.toggleToolMenu('model'),
                },
                h('span', { className: 'dqc-tool-pill-label' }, controller.reasoningLabel()),
                h(Icon, { name: 'chevron-down', size: 11 }),
              ),
              h(
                'div',
                { className: 'dqc-compose-actions' },
                state.running
                  ? h(
                      'button',
                      {
                        type: 'button',
                        className: 'dqc-stop',
                        onClick: () => controller.stop(),
                        title: t('stop'),
                        'aria-label': t('stop'),
                        'data-dqc-stop': '',
                      },
                      h(Icon, { name: 'stop', size: 15 }),
                    )
                  : null,
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dqc-send',
                    onClick: () => controller.send(),
                    disabled: !canSend,
                    title: t('send'),
                    'aria-label': t('send'),
                    'data-dqc-send': '',
                  },
                  h(Icon, { name: 'send', size: 16, strokeWidth: 1.9 }),
                ),
              ),
            ),
          ),
        ),
        state.permissionMenuOpen ? h(PermissionMenu, { controller, state, t }) : null,
        state.modelMenuOpen ? h(ModelMenu, { controller, state, t }) : null,
      )
    }

    // ---------------------------------------------------------------------
    // Menus
    // ---------------------------------------------------------------------

    function HistoryMenu({ controller, state, t, menuRef }) {
      const rows = []
      for (const id of state.history) {
        const summary = controller.sessionRow(id)
        if (!summary) continue
        if (summary.blank && id !== state.sessionId) continue
        rows.push({ id, summary })
      }
      if (state.sessionId && !rows.some((row) => row.id === state.sessionId)) {
        const summary = controller.sessionRow(state.sessionId)
        if (summary) rows.unshift({ id: state.sessionId, summary })
      }
      return h(
        'div',
        { className: 'dqc-menu', role: 'menu', ref: menuRef, 'data-dqc-menu': 'history' },
        h('div', { className: 'dqc-menu-title' }, t('history')),
        rows.length === 0
          ? h(
              'div',
              { className: 'dqc-empty-menu' },
              h('div', null, t('noHistory')),
              h('div', null, t('historyEmptyHint')),
            )
          : h(
              'div',
              { className: 'dqc-menu-list' },
              rows.map(({ id, summary }) =>
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dqc-history-item',
                    key: id,
                    'data-current': id === state.sessionId ? 'true' : 'false',
                    onClick: () => controller.selectHistory(id),
                  },
                  h('span', { className: 'dqc-history-icon' }, h(Icon, { name: 'history', size: 12 })),
                  h(
                    'span',
                    { className: 'dqc-history-text' },
                    h(
                      'span',
                      { className: 'dqc-history-title' },
                      cleanTitle(summary.title) || cleanTitle(summary.displayTitle) || t('newChatTitle'),
                    ),
                    h('span', { className: 'dqc-history-time' }, relativeTime(summary.updatedAt, state.lang, t)),
                  ),
                ),
              ),
            ),
      )
    }

    function MoreMenu({ controller, state, t, menuRef, standalone }) {
      return h(
        'div',
        { className: 'dqc-menu', role: 'menu', ref: menuRef, 'data-dqc-menu': 'more' },
        h('div', { className: 'dqc-menu-title' }, t('more')),
        h(
          'button',
          {
            type: 'button',
            className: 'dqc-menu-item',
            onClick: () => controller.newChat(),
            disabled: state.busy || state.loading,
            role: 'menuitem',
          },
          h('span', { className: 'dqc-menu-icon' }, h(Icon, { name: 'compose', size: 14 })),
          h('span', { className: 'dqc-menu-label' }, t('newChat')),
        ),
        h(
          'button',
          {
            type: 'button',
            className: 'dqc-menu-item',
            onClick: () => controller.toggleMenu('history'),
            role: 'menuitem',
          },
          h('span', { className: 'dqc-menu-icon' }, h(Icon, { name: 'history', size: 14 })),
          h('span', { className: 'dqc-menu-label' }, t('history')),
        ),
        h('div', { className: 'dqc-menu-sep' }),
        !standalone
          ? h(
              'button',
              {
                type: 'button',
                className: 'dqc-menu-item',
                onClick: () => controller.openFull(),
                role: 'menuitem',
              },
              h('span', { className: 'dqc-menu-icon' }, h(Icon, { name: 'expand', size: 14 })),
              h('span', { className: 'dqc-menu-label' }, t('openFull')),
            )
          : null,
        !standalone && !state.nativeDesktop
          ? h(
              'button',
              {
                type: 'button',
                className: 'dqc-menu-item',
                onClick: () => (state.hiddenBubble ? controller.showBubble() : controller.hideBubble()),
                role: 'menuitem',
              },
              h('span', { className: 'dqc-menu-icon' }, h(Icon, { name: state.hiddenBubble ? 'sparkle' : 'minus', size: 14 })),
              h(
                'span',
                { className: 'dqc-menu-label' },
                state.hiddenBubble ? t('showBubble') : t('hideBubble'),
                h('span', { className: 'dqc-menu-sub' }, t('hideBubbleHint')),
              ),
            )
          : null,
        h(
          'button',
          {
            type: 'button',
            className: 'dqc-menu-item',
            onClick: () => controller.clearHistory(),
            role: 'menuitem',
          },
          h('span', { className: 'dqc-menu-icon' }, h(Icon, { name: 'trash', size: 14 })),
          h('span', { className: 'dqc-menu-label' }, t('clearHistory')),
        ),
        h(
          'button',
          {
            type: 'button',
            className: 'dqc-menu-item',
            onClick: () => (standalone ? controller.closeWindow() : controller.close()),
            role: 'menuitem',
          },
          h('span', { className: 'dqc-menu-icon' }, h(Icon, { name: 'minus', size: 14 })),
          h('span', { className: 'dqc-menu-label' }, standalone ? t('closeWindow') : t('closeMenu')),
        ),
        !standalone
          ? h(
              'button',
              {
                type: 'button',
                className: 'dqc-menu-item',
                onClick: () => controller.togglePin(),
                role: 'menuitem',
              },
              h('span', { className: 'dqc-menu-icon' }, h(Icon, { name: 'pin', size: 14 })),
              h('span', { className: 'dqc-menu-label' }, state.mode === 'pip' ? t('unpin') : t('pin')),
            )
          : null,
        h('div', { className: 'dqc-menu-sep' }),
        h(
          'div',
          { className: 'dqc-empty-menu', style: { textAlign: 'left', padding: '7px 9px 6px' } },
          h('div', { style: { color: 'var(--dqc-fg)', fontSize: 11.5, fontWeight: 600 } }, t('about')),
          h('div', { style: { marginTop: 2 } }, t('aboutBody')),
          h('div', { style: { marginTop: 3, opacity: 0.85 } }, t('version', { version: VERSION })),
        ),
      )
    }

    // ---------------------------------------------------------------------
    // Bubble / sidebar launcher
    // ---------------------------------------------------------------------

    function Bubble({ controller, state, t }) {
      const dragRef = useRef(null)
      const [dragging, setDragging] = useState(false)
      const onPointerDown = (event) => {
        if (event.button !== 0) return
        event.preventDefault()
        event.stopPropagation()
        dragRef.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          originX: state.bubble.x,
          originY: state.bubble.y,
          moved: false,
        }
        try {
          event.currentTarget.setPointerCapture(event.pointerId)
        } catch {
          /* noop */
        }
        setDragging(true)
      }
      const onPointerMove = (event) => {
        const drag = dragRef.current
        if (!drag || drag.pointerId !== event.pointerId) return
        const dx = event.clientX - drag.startX
        const dy = event.clientY - drag.startY
        if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 4) return
        drag.moved = true
        controller.setBubble({ x: drag.originX + dx, y: drag.originY + dy })
      }
      const onPointerUp = (event) => {
        const drag = dragRef.current
        if (!drag || drag.pointerId !== event.pointerId) return
        dragRef.current = null
        setDragging(false)
        try {
          event.currentTarget.releasePointerCapture(event.pointerId)
        } catch {
          /* noop */
        }
        if (drag.moved) {
          controller.persist()
        } else {
          controller.toggle()
        }
      }
      const onPointerCancel = (event) => {
        const drag = dragRef.current
        dragRef.current = null
        setDragging(false)
        if (!drag) return
        try {
          event.currentTarget.releasePointerCapture(drag.pointerId)
        } catch {
          /* noop */
        }
      }
      const onKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          controller.toggle()
        }
      }
      const hintStyle = {
        left: `${clamp(state.bubble.x - 24, 8, Math.max(8, window.innerWidth - 108))}px`,
        top: `${state.bubble.y < 42 ? state.bubble.y + 64 : state.bubble.y - 28}px`,
      }
      return h(
        Fragment,
        null,
        h(
          'button',
          {
            type: 'button',
            className: 'dqc-bubble',
            style: { left: `${state.bubble.x}px`, top: `${state.bubble.y}px` },
            'data-dragging': dragging ? 'true' : 'false',
            'data-dqc-bubble': '',
            'aria-label': `${t('appName')} (Alt + Q)`,
            'aria-expanded': state.open ? 'true' : 'false',
            title: t('appName'),
            onPointerDown,
            onPointerMove,
            onPointerUp,
            onPointerCancel,
            onKeyDown,
          },
          h('span', { className: 'dqc-bubble-mark' }, h(BrandMark, { size: 34 })),
          state.unread ? h('span', { className: 'dqc-bubble-badge', 'aria-label': t('history') }) : null,
        ),
        h('div', { className: 'dqc-bubble-hint', style: hintStyle }, isZh(state.lang) ? '桌面悬浮球 · Alt + Q' : 'Desktop Floating Ball · Alt + Q'),
      )
    }

    function SidebarLauncher({ controller, wide }) {
      const state = useStore(controller.store)
      const t = useT(state.lang)
      return h(
        Fragment,
        null,
        h(
          'button',
          {
            type: 'button',
            className: 'dqc-sidebar',
            'data-wide': wide ? 'true' : 'false',
            'data-hasunread': state.unread ? 'true' : 'false',
            'data-dqc-sidebar': '',
            onClick: () => controller.openDesktopWindow(),
            title: t('appName'),
            'aria-label': t('appName'),
          },
          h('span', { className: 'dqc-sidebar-icon' }, h(BrandMark, { size: 18 })),
          wide ? h('span', { className: 'dqc-sidebar-label' }, t('appName')) : null,
          wide ? h('span', { className: 'dqc-sidebar-kbd' }, 'Alt Q') : null,
        ),
        ReactDOM.createPortal(h(QuickChatShell, { controller }), document.body),
      )
    }

    // ---------------------------------------------------------------------
    // Panel shell
    // ---------------------------------------------------------------------

    function QuickChatShell({ controller }) {
      const state = useStore(controller.store)
      if (state.mode === 'pip') return null
      const t = makeTranslator(state.lang)
      const standalone = Boolean(state.standalone)
      return h(
        'div',
        {
          className: 'dqc-layer',
          'data-dqc-layer': '',
          'data-standalone': standalone ? 'true' : 'false',
        },
        state.open || standalone ? h(Panel, { controller, pip: false, standalone }) : null,
        !standalone && !state.open && !state.hiddenBubble && !state.nativeDesktop
          ? h(Bubble, { controller, state, t })
          : null,
      )
    }

    function StandaloneRoot({ controller }) {
      return h(QuickChatShell, { controller })
    }

    function PipWindow({ controller }) {
      const state = useStore(controller.store)
      const t = useT(state.lang)
      return h(
        'div',
        { className: 'dqc-layer', 'data-dqc-pip-layer': '' },
        h(Panel, { controller, pip: true }),
        h('div', { className: 'dqc-pip-overlay' }),
      )
    }

    /** Poll the host for the user-selected avatar + chat background. */
    function useChatAppearance() {
      const [appearance, setAppearance] = useState(null)
      useEffect(() => {
        let alive = true
        let lastLanguage = ''
        const load = async () => {
          try {
            const res = await fetch('/dsh-quick-chat-appearance', { cache: 'no-store' })
            if (!res.ok) return
            const body = await res.json().catch(() => null)
            if (!body || body.ok === false) return
            const language = body.language === 'zh' || body.language === 'en' ? body.language : 'auto'
            if (language !== lastLanguage) {
              lastLanguage = language
              try {
                window.dispatchEvent(new CustomEvent('dqc-language', { detail: language }))
              } catch {
                /* noop */
              }
            }
            const next = {
              ball: body.ball && typeof body.ball === 'object' ? body.ball : null,
              assistantName: typeof body.assistantName === 'string' ? body.assistantName : '',
              chatBackgroundFit: body.chatBackgroundFit === 'contain' || body.chatBackgroundFit === 'stretch' ? body.chatBackgroundFit : 'cover',
              chatBackgroundCrop:
                body.chatBackgroundCrop && typeof body.chatBackgroundCrop === 'object' ? body.chatBackgroundCrop : null,
              chatBackgroundPosition:
                body.chatBackgroundPosition === 'top' ||
                body.chatBackgroundPosition === 'bottom' ||
                body.chatBackgroundPosition === 'left' ||
                body.chatBackgroundPosition === 'right'
                  ? body.chatBackgroundPosition
                  : 'center',
              messageColors: {
                user: body.messageColors && typeof body.messageColors.user === 'string' ? body.messageColors.user : '',
                ai: body.messageColors && typeof body.messageColors.ai === 'string' ? body.messageColors.ai : '',
              },
              chatBackground:
                body.chatBackground && typeof body.chatBackground === 'object' ? body.chatBackground : null,
            }
            if (alive) {
              setAppearance((previous) => (JSON.stringify(previous) === JSON.stringify(next) ? previous : next))
            }
          } catch {
            /* 预览页或旧 Host 没有该路由：保持默认外观 */
          }
        }
        void load()
        const timer = setInterval(load, 3000)
        return () => {
          alive = false
          clearInterval(timer)
        }
      }, [])
      return appearance
    }

    function isDarkColor(value) {
      const match = /^#([0-9a-f]{6})$/i.exec(typeof value === 'string' ? value : '')
      if (!match) return false
      const number = Number.parseInt(match[1], 16)
      const red = (number >> 16) & 255
      const green = (number >> 8) & 255
      const blue = number & 255
      return 0.2126 * red + 0.7152 * green + 0.0722 * blue < 128
    }

    const BALL_SHAPE_OPTIONS = [
      { id: 'circle', label: '圆形', aspect: 1 },
      { id: 'rounded', label: '圆角方形', aspect: 1 },
      { id: 'square', label: '方形', aspect: 1 },
      { id: 'wide', label: '横向长方形', aspect: 1.5 },
      { id: 'tall', label: '竖向长方形', aspect: 1 / 1.5 },
    ]

    function ballShapeAspect(shape) {
      if (shape === 'wide') return 1.5
      if (shape === 'tall') return 1 / 1.5
      return 1
    }

    function ballShapeRadius(shape) {
      if (shape === 'rounded') return '24%'
      if (shape === 'square') return '12%'
      if (shape === 'wide' || shape === 'tall') return '16%'
      return '50%'
    }

    function fitCropBoxToShape(box, imageRect, aspect) {
      if (!imageRect || !imageRect.width || !imageRect.height) return box
      const imageAspect = imageRect.width / imageRect.height
      const centerX = box ? box.x + box.w / 2 : 0.5
      const centerY = box ? box.y + box.h / 2 : 0.5
      let w = box ? Math.max(0.02, box.w) : 0.8
      let h = (w * imageAspect) / Math.max(0.01, aspect)
      if (h > 0.9) {
        h = 0.9
        w = (h * aspect) / imageAspect
      }
      w = Math.min(1, Math.max(0.02, w))
      h = Math.min(1, Math.max(0.02, h))
      return {
        x: Math.max(0, Math.min(1 - w, centerX - w / 2)),
        y: Math.max(0, Math.min(1 - h, centerY - h / 2)),
        w,
        h,
      }
    }

    function BallVisual({ ball, className, style, fallback = null, alt = '' }) {
      const shape = ball && typeof ball.shape === 'string' ? ball.shape : 'circle'
      const radius = ballShapeRadius(shape)
      const crop = ball && ball.crop && typeof ball.crop === 'object' ? ball.crop : null
      const wrapperStyle = { position: 'relative', overflow: 'hidden', display: 'block', borderRadius: radius, ...style }
      if (ball && ball.kind === 'color' && typeof ball.color === 'string') {
        return h(
          'span',
          {
            className,
            style: {
              ...wrapperStyle,
              background: ball.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
          fallback,
        )
      }
      if (ball && ball.url && ball.kind === 'video') {
        return h(
          'span',
          { className, style: wrapperStyle },
          h('video', {
            className: 'dqc-avatar-media',
            src: ball.url,
            muted: true,
            autoPlay: true,
            loop: true,
            playsInline: true,
            style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
          }),
        )
      }
      if (ball && ball.url) {
        const imageStyle = crop
          ? {
              position: 'absolute',
              display: 'block',
              maxWidth: 'none',
              maxHeight: 'none',
              width: `${100 / Math.max(0.01, crop.w)}%`,
              height: `${100 / Math.max(0.01, crop.h)}%`,
              left: `${-(crop.x / Math.max(0.01, crop.w)) * 100}%`,
              top: `${-(crop.y / Math.max(0.01, crop.h)) * 100}%`,
              objectFit: 'fill',
            }
          : { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }
        return h(
          'span',
          { className, style: wrapperStyle },
          h('img', { src: ball.url, alt, draggable: false, style: imageStyle }),
        )
      }
      return h(
        'span',
        {
          className,
          style: { ...wrapperStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' },
        },
        fallback,
      )
    }

    function PetAvatar({ appearance, size = 24 }) {
      const ball = appearance && appearance.ball
      const url = ball && typeof ball.url === 'string' ? ball.url : null
      const shape = ball && typeof ball.shape === 'string' ? ball.shape : 'circle'
      const aspect = ballShapeAspect(shape)
      const avatarStyle = {
        width: `${Math.round(size * aspect)}px`,
        height: `${size}px`,
        borderRadius: ballShapeRadius(shape),
      }
      if (ball && ball.kind === 'color' && typeof ball.color === 'string') {
        return h(
          'div',
          { className: 'dqc-ai-avatar', style: { ...avatarStyle, background: ball.color } },
          h(BrandMark, { size }),
        )
      }
      if (url) {
        return h(BallVisual, { ball, className: 'dqc-ai-avatar', alt: '', style: avatarStyle })
      }
      return h('div', { className: 'dqc-ai-avatar', style: avatarStyle }, h(BrandMark, { size }))
    }

    function AppearanceSettings() {
      const [appearance, setAppearance] = useState(null)
      const [status, setStatus] = useState('')
      const [busy, setBusy] = useState(false)
      const [language, setLanguage] = useState('auto')
      const ballInputRef = useRef(null)
      const bgInputRef = useRef(null)
      const [crop, setCrop] = useState(null)
      const [bgEditor, setBgEditor] = useState(null)
      const bgStageRef = useRef(null)
      const cropStageRef = useRef(null)
      const [sizeDraft, setSizeDraft] = useState(60)
      const [shapeDraft, setShapeDraft] = useState('circle')
      const [nameDraft, setNameDraft] = useState('DeepSeek')
      const [bgFitDraft, setBgFitDraft] = useState('cover')
      const [bgPosDraft, setBgPosDraft] = useState('center')
      const [userColorDraft, setUserColorDraft] = useState('')
      const [aiColorDraft, setAiColorDraft] = useState('')
      const lang = language === 'auto' ? (typeof document !== 'undefined' && document.documentElement.lang) || navigator.language || 'zh' : language
      const L = (zh, en) => trText(lang, zh, en)

      const load = async () => {
        try {
          const res = await fetch('/dsh-quick-chat-appearance', { cache: 'no-store' })
          if (!res.ok) return null
          const body = await res.json().catch(() => null)
          if (body && body.ok !== false) {
            setAppearance(body)
            setLanguage(body.language === 'zh' || body.language === 'en' ? body.language : 'auto')
            return body
          }
        } catch {
          /* Host 尚未重启时保持空状态 */
        }
        return null
      }

      useEffect(() => {
        void load()
      }, [])

      useEffect(() => {
        const next = appearance && appearance.ball && appearance.ball.size
        if (typeof next === 'number' && Number.isFinite(next)) setSizeDraft(next)
        const shape = appearance && appearance.ball && appearance.ball.shape
        if (BALL_SHAPE_OPTIONS.some((option) => option.id === shape)) setShapeDraft(shape)
        if (appearance && typeof appearance.assistantName === 'string') setNameDraft(appearance.assistantName)
        if (appearance && (appearance.chatBackgroundFit === 'cover' || appearance.chatBackgroundFit === 'contain' || appearance.chatBackgroundFit === 'stretch')) {
          setBgFitDraft(appearance.chatBackgroundFit)
        }
        if (
          appearance &&
          (appearance.chatBackgroundPosition === 'center' ||
            appearance.chatBackgroundPosition === 'top' ||
            appearance.chatBackgroundPosition === 'bottom' ||
            appearance.chatBackgroundPosition === 'left' ||
            appearance.chatBackgroundPosition === 'right')
        ) {
          setBgPosDraft(appearance.chatBackgroundPosition)
        }
        if (appearance && appearance.messageColors) {
          setUserColorDraft(typeof appearance.messageColors.user === 'string' ? appearance.messageColors.user : '')
          setAiColorDraft(typeof appearance.messageColors.ai === 'string' ? appearance.messageColors.ai : '')
        }
      }, [appearance])

      const chooseLanguage = async (next) => {
        setLanguage(next)
        try {
          window.dispatchEvent(new CustomEvent('dqc-language', { detail: next }))
        } catch {
          /* noop */
        }
        await save({ language: next })
      }

      const save = async (payload) => {
        setBusy(true)
        setStatus('')
        try {
          const res = await fetch('/dsh-quick-chat-appearance/appearance', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload),
          })
          if (!res.ok) throw new Error('HTTP ' + res.status)
          setStatus(L('已保存'))
          await load()
        } catch (error) {
          setStatus(L('保存失败：') + (error instanceof Error ? error.message : String(error)))
        } finally {
          setBusy(false)
        }
      }

      const openCrop = (ball) => {
        if (!ball || !ball.url || ball.kind === 'video') return
        if (typeof ball.shape === 'string' && BALL_SHAPE_OPTIONS.some((option) => option.id === ball.shape)) {
          setShapeDraft(ball.shape)
        }
        const saved = ball.crop && typeof ball.crop === 'object' ? ball.crop : null
        setCrop({
          url: ball.url,
          kind: ball.kind,
          box: saved
            ? { x: saved.x, y: saved.y, w: saved.w, h: saved.h }
            : { x: 0.1, y: 0.1, w: 0.8, h: 0.8 },
          imageRect: null,
        })
      }

      const openBgEditor = (background) => {
        if (!background || !background.url) return
        const saved =
          appearance && appearance.chatBackgroundCrop && typeof appearance.chatBackgroundCrop === 'object'
            ? appearance.chatBackgroundCrop
            : null
        setBgEditor({
          url: background.url,
          box: saved
            ? { x: saved.x, y: saved.y, w: saved.w, h: saved.h }
            : { x: 0.1, y: 0.1, w: 0.8, h: 0.8 },
          imageRect: null,
        })
      }

      const startBgDrag = (event, mode) => {
        if (!bgEditor || !bgEditor.imageRect) return
        event.preventDefault()
        event.stopPropagation()
        const startX = event.clientX
        const startY = event.clientY
        const startBox = { ...bgEditor.box }
        const rect = bgEditor.imageRect
        const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
        const onMove = (moveEvent) => {
          const dx = (moveEvent.clientX - startX) / Math.max(1, rect.width)
          const dy = (moveEvent.clientY - startY) / Math.max(1, rect.height)
          const min = 0.04
          let left = startBox.x
          let top = startBox.y
          let right = startBox.x + startBox.w
          let bottom = startBox.y + startBox.h
          if (mode === 'move') {
            left = clamp(startBox.x + dx, 0, 1 - startBox.w)
            top = clamp(startBox.y + dy, 0, 1 - startBox.h)
            right = left + startBox.w
            bottom = top + startBox.h
          } else {
            if (mode.includes('w')) left = clamp(startBox.x + dx, 0, right - min)
            if (mode.includes('e')) right = clamp(startBox.x + startBox.w + dx, left + min, 1)
            if (mode.includes('n')) top = clamp(startBox.y + dy, 0, bottom - min)
            if (mode.includes('s')) bottom = clamp(startBox.y + startBox.h + dy, top + min, 1)
          }
          setBgEditor((editor) =>
            editor
              ? {
                  ...editor,
                  box: { x: left, y: top, w: Math.max(min, right - left), h: Math.max(min, bottom - top) },
                }
              : editor,
          )
        }
        const onUp = () => {
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerup', onUp)
        }
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)
      }

      const startCropDrag = (event, mode) => {
        if (!crop || !crop.imageRect) return
        event.preventDefault()
        event.stopPropagation()
        const startX = event.clientX
        const startY = event.clientY
        const startBox = { ...crop.box }
        const rect = crop.imageRect
        const aspect = ballShapeAspect(shapeDraft)
        const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
        const onMove = (moveEvent) => {
          const dx = moveEvent.clientX - startX
          const dy = moveEvent.clientY - startY
          if (mode === 'move') {
            setCrop((editor) =>
              editor
                ? {
                    ...editor,
                    box: {
                      ...startBox,
                      x: clamp(startBox.x + dx / Math.max(1, rect.width), 0, 1 - startBox.w),
                      y: clamp(startBox.y + dy / Math.max(1, rect.height), 0, 1 - startBox.h),
                    },
                  }
                : editor,
            )
            return
          }
          const startW = Math.max(2, startBox.w * rect.width)
          const startH = Math.max(2, startBox.h * rect.height)
          let scaleX = mode.includes('e') ? (startW + dx) / startW : (startW - dx) / startW
          let scaleY = mode.includes('s') ? (startH + dy) / startH : (startH - dy) / startH
          let scale = clamp((scaleX + scaleY) / 2, 0.08, 8)
          const west = mode.includes('w')
          const north = mode.includes('n')
          const anchorX = west ? startBox.x + startBox.w : startBox.x
          const anchorY = north ? startBox.y + startBox.h : startBox.y
          const maxW = west ? anchorX * rect.width : (1 - anchorX) * rect.width
          const maxH = north ? anchorY * rect.height : (1 - anchorY) * rect.height
          let widthPx = Math.min(startW * scale, maxW, maxH * aspect)
          let heightPx = widthPx / aspect
          widthPx = Math.max(8, widthPx)
          heightPx = Math.max(8, heightPx)
          if (heightPx > maxH) {
            heightPx = maxH
            widthPx = heightPx * aspect
          }
          if (widthPx > maxW) {
            widthPx = maxW
            heightPx = widthPx / aspect
          }
          const leftPx = west ? anchorX * rect.width - widthPx : anchorX * rect.width
          const topPx = north ? anchorY * rect.height - heightPx : anchorY * rect.height
          const next = {
            x: clamp(leftPx / Math.max(1, rect.width), 0, 1 - widthPx / Math.max(1, rect.width)),
            y: clamp(topPx / Math.max(1, rect.height), 0, 1 - heightPx / Math.max(1, rect.height)),
            w: widthPx / Math.max(1, rect.width),
            h: heightPx / Math.max(1, rect.height),
          }
          setCrop((editor) => (editor ? { ...editor, box: next } : editor))
        }
        const onUp = () => {
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerup', onUp)
        }
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)
      }

      const zoomCropByWheel = (event) => {
        if (!crop || !crop.imageRect) return
        event.preventDefault()
        const rect = crop.imageRect
        const aspect = ballShapeAspect(shapeDraft)
        const factor = event.deltaY < 0 ? 0.9 : 1.1
        const box = crop.box
        const centerX = box.x + box.w / 2
        const centerY = box.y + box.h / 2
        let widthPx = box.w * rect.width * factor
        let heightPx = widthPx / aspect
        widthPx = Math.max(12, Math.min(rect.width, widthPx))
        heightPx = Math.max(12, Math.min(rect.height, heightPx))
        widthPx = Math.min(widthPx, heightPx * aspect)
        heightPx = widthPx / aspect
        const w = widthPx / Math.max(1, rect.width)
        const h = heightPx / Math.max(1, rect.height)
        setCrop((editor) =>
          editor
            ? {
                ...editor,
                box: {
                  x: Math.max(0, Math.min(1 - w, centerX - w / 2)),
                  y: Math.max(0, Math.min(1 - h, centerY - h / 2)),
                  w,
                  h,
                },
              }
            : editor,
        )
      }

      const upload = async (target, file) => {
        if (!file) return
        setBusy(true)
        setStatus('')
        try {
          const res = await fetch(
            '/dsh-quick-chat-appearance/upload?target=' +
              target +
              '&name=' +
              encodeURIComponent(file.name || target),
            {
              method: 'POST',
              headers: { 'content-type': file.type || 'application/octet-stream' },
              body: file,
            },
          )
          if (!res.ok) throw new Error('HTTP ' + res.status)
          const result = await res.json().catch(() => null)
          setStatus(L('已上传', 'Uploaded'))
          const next = await load()
          if (target === 'ball') {
            if (result && result.kind && result.kind !== 'video' && result.url) {
              openCrop({ url: result.url, kind: result.kind })
            } else if (next && next.ball) {
              openCrop(next.ball)
            }
          } else if (target === 'chat') {
            const loadedBackground = next && next.chatBackground ? next.chatBackground : null
            if (loadedBackground && loadedBackground.url) openBgEditor(loadedBackground)
          }
        } catch (error) {
          setStatus(L('上传失败：', 'Upload failed: ') + (error instanceof Error ? error.message : String(error)))
        } finally {
          setBusy(false)
        }
      }

      const ball = appearance && appearance.ball ? appearance.ball : null
      const background = appearance && appearance.chatBackground ? appearance.chatBackground : null
      const ballKind = ball && ball.kind ? ball.kind : 'builtin'
      const ballColor = ball && ball.color ? ball.color : '#4d6bfe'
      const hostOutdated = Boolean(appearance && appearance.ball && !('shape' in appearance.ball) && !('size' in appearance.ball))
      const nameHostOutdated = Boolean(appearance && !Object.prototype.hasOwnProperty.call(appearance, 'assistantName'))
      const appearanceHostOutdated = Boolean(
        appearance &&
          (!Object.prototype.hasOwnProperty.call(appearance, 'chatBackgroundFit') ||
            !Object.prototype.hasOwnProperty.call(appearance, 'messageColors')),
      )
      const backgroundType = background && background.type ? background.type : 'none'
      const backgroundColor = background && background.color ? background.color : '#f4f6fb'
      const backgroundCrop =
        appearance && appearance.chatBackgroundCrop && typeof appearance.chatBackgroundCrop === 'object'
          ? appearance.chatBackgroundCrop
          : null

      const previewPx = Math.round(44 + ((Math.max(44, Math.min(84, sizeDraft)) - 44) / 40) * 16)
      const previewAspect = ballShapeAspect(shapeDraft)
      const ballPreviewStyle = {
        width: `${Math.round(previewPx * previewAspect)}px`,
        height: `${previewPx}px`,
      }

      const previewBall = {
        kind: ballKind,
        color: ballColor,
        url: ball && ball.url ? ball.url : null,
        shape: shapeDraft,
        crop: ball && ball.crop ? ball.crop : null,
      }
      const ballPreview = h(BallVisual, {
        ball: previewBall,
        className: 'dqc-set-ball',
        style: ballPreviewStyle,
        fallback: h(BrandMark, { size: 26 }),
      })

      const changeBallShape = (shape) => {
        setShapeDraft(shape)
        setCrop((editor) =>
          editor
            ? { ...editor, box: fitCropBoxToShape(editor.box, editor.imageRect, ballShapeAspect(shape)) }
            : editor,
        )
      }

      const applyCrop = async () => {
        if (!crop) return
        const box = fitCropBoxToShape(crop.box, crop.imageRect, ballShapeAspect(shapeDraft))
        await save({ ball: { kind: crop.kind, shape: shapeDraft, crop: box } })
        setCrop(null)
      }

      const applyBallSettings = () => {
        void save({ ball: { shape: shapeDraft, size: Number(sizeDraft) } })
      }

      const applyBgCrop = () => {
        if (!bgEditor) return
        void save({ chatBackgroundCrop: bgEditor.box })
        setBgEditor(null)
      }

      const resetBgCrop = () => {
        setBgFitDraft('cover')
        setBgPosDraft('center')
        void save({ chatBackgroundCrop: null, chatBackgroundFit: 'cover', chatBackgroundPosition: 'center' })
        setBgEditor(null)
      }

      const commitName = () => {
        const name = (nameDraft || '').trim() || 'DeepSeek'
        setNameDraft(name)
        void save({ assistantName: name })
      }

      const setBackgroundFit = (fit) => {
        setBgFitDraft(fit)
        void save({ chatBackgroundFit: fit, chatBackgroundPosition: bgPosDraft })
      }

      const setBackgroundPosition = (position) => {
        setBgPosDraft(position)
        void save({ chatBackgroundFit: bgFitDraft, chatBackgroundPosition: position })
      }

      const applyMessageColors = () => {
        void save({ messageColors: { user: userColorDraft, ai: aiColorDraft } })
      }

      const historyAction = async (kind, id, action) => {
        setBusy(true)
        setStatus('')
        try {
          const response = await fetch(`/dsh-quick-chat-appearance/history-${action}`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ kind, id }),
          })
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          setStatus(action === 'select' ? L('已应用', 'Applied') : L('已删除', 'Deleted'))
          await load()
        } catch (error) {
          setStatus(L(action === 'select' ? '应用失败：' : '删除失败：', action === 'select' ? 'Apply failed: ' : 'Delete failed: ') + (error instanceof Error ? error.message : String(error)))
        } finally {
          setBusy(false)
        }
      }

      const renderHistory = (kind, items) =>
        items && items.length > 0
          ? h(
              'div',
              { className: 'dqc-media-history' },
              items.map((item) =>
                h(
                  'div',
                  { key: `${kind}-${item.id}`, className: 'dqc-media-history-item' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dqc-media-history-thumb',
                      title: item.kind === 'video' ? L('视频', 'Video') : L('使用这个', 'Use this'),
                      disabled: busy,
                      onClick: () => void historyAction(kind, item.id, 'select'),
                    },
                    item.kind === 'video'
                      ? h('span', { className: 'dqc-media-history-video' }, '▶')
                      : h('img', { src: item.url, alt: '', draggable: false }),
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dqc-media-history-delete',
                      title: L('删除', 'Delete'),
                      'aria-label': L('删除', 'Delete'),
                      disabled: busy,
                      onClick: (event) => {
                        event.stopPropagation()
                        void historyAction(kind, item.id, 'delete')
                      },
                    },
                    '×',
                  ),
                ),
              ),
            )
          : null

      const backgroundPreview = h('div', {
        className: 'dqc-set-bg',
        style:
          backgroundType === 'color'
            ? { background: backgroundColor }
            : background && background.url
              ? { backgroundImage: `url("${background.url}")` }
              : { background: 'var(--dsw-alias-bg-base,#f4f6fb)' },
      })

      const ballSwatches = [
        [L('默认', 'Default'), null],
        [L('蓝', 'Blue'), '#4d6bfe'],
        [L('墨', 'Ink'), '#1f2430'],
        [L('紫', 'Purple'), '#7c3aed'],
        [L('玫', 'Rose'), '#e11d63'],
      ]
      const backgroundSwatches = [
        [L('无', 'None'), 'none', null],
        [L('白', 'White'), '#ffffff'],
        [L('雾', 'Mist'), '#f4f6fb'],
        [L('米', 'Cream'), '#fbf6ec'],
        [L('薄荷', 'Mint'), '#eaf4ef'],
        [L('淡紫', 'Lilac'), '#f3e8ff'],
      ]

      return h(
        'div',
        { className: 'dqc-set' },
        h(
          'div',
          { className: 'dqc-set-head' },
          h('h2', null, L('桌面悬浮球外观', 'Desktop floating ball appearance')),
          h('p', null, L('设置悬浮球图标和聊天背景。不上传图片时也可以选纯色；上传的图片/GIF/视频会复制到插件数据目录。')),
        ),
        h(
          'section',
          { className: 'dqc-set-section' },
          h('div', { className: 'dqc-set-label' }, L('界面语言', 'Interface language')),
          h(
            'div',
            { className: 'dqc-set-row' },
            [
              ['auto', L('跟随 DSH', 'Follow DSH')],
              ['zh', '中文'],
              ['en', 'English'],
            ].map(([value, label]) =>
              h(
                'button',
                {
                  key: value,
                  type: 'button',
                  className: 'dqc-set-choice',
                  'data-active': language === value ? 'true' : 'false',
                  disabled: busy,
                  onClick: () => void chooseLanguage(value),
                },
                label,
              ),
            ),
          ),
        ),
        h(
          'section',
          { className: 'dqc-set-section' },
          h('div', { className: 'dqc-set-label' }, L('悬浮球图标', 'Ball icon')),
          h(
            'div',
            { className: 'dqc-set-inline' },
            ballPreview,
            h(
              'div',
              { className: 'dqc-set-swatches' },
              ballSwatches.map(([label, color]) =>
                h(
                  'button',
                  {
                    key: label,
                    type: 'button',
                    className: 'dqc-set-swatch',
                    title: label,
                    'aria-label': label,
                    style: color
                      ? { background: color }
                      : { background: 'linear-gradient(135deg,#86a8ff,#4d6bfe 55%,#2d3fbe)' },
                    'data-active':
                      (color === null && ballKind === 'builtin') ||
                      (color !== null && ballKind === 'color' && ballColor.toLowerCase() === color)
                        ? 'true'
                        : 'false',
                    disabled: busy,
                    onClick: () => save({ ball: color ? { kind: 'color', color } : { kind: 'builtin' } }),
                  },
                  null,
                ),
              ),
              h(
                'label',
                { className: 'dqc-set-color' },
                L('自定义', 'Custom'),
                h('input', {
                  type: 'color',
                  value: ballColor,
                  disabled: busy,
                  onChange: (event) => save({ ball: { kind: 'color', color: event.target.value } }),
                }),
              ),
            ),
          ),
          h(
            'div',
            { className: 'dqc-set-actions' },
            h(
              'button',
              {
                type: 'button',
                className: 'dqc-set-btn',
                disabled: busy,
                onClick: () => ballInputRef.current && ballInputRef.current.click(),
              },
              L('上传图片 / GIF / 视频', 'Upload image / GIF / video'),
            ),
            ball && ball.url && ballKind !== 'video'
              ? h(
                  'button',
                  {
                    type: 'button',
                    className: 'dqc-set-btn dqc-set-btn-quiet',
                    disabled: busy,
                    onClick: () => openCrop(ball),
                  },
                  L('裁剪', 'Crop'),
                )
              : null,
            h('input', {
              ref: ballInputRef,
              type: 'file',
              accept: 'image/*,video/*',
              style: { display: 'none' },
              onChange: (event) => {
                const file = event.target.files && event.target.files[0]
                if (file) void upload('ball', file)
                event.target.value = ''
              },
            }),
          ),
          appearance && appearance.ballHistory && appearance.ballHistory.length > 0
            ? h('div', { className: 'dqc-set-label dqc-set-label-sub' }, L('最近使用', 'Recent'))
            : null,
          appearance && appearance.ballHistory ? renderHistory('ball', appearance.ballHistory) : null,
          h(
            'div',
            { className: 'dqc-set-row' },
            h('span', { className: 'dqc-set-row-label' }, L('大小', 'Size')),
            h('input', {
              className: 'dqc-set-range',
              type: 'range',
              min: 44,
              max: 84,
              step: 2,
              value: sizeDraft,
              disabled: busy,
              onChange: (event) => setSizeDraft(Number(event.target.value)),
            }),
            h('span', { className: 'dqc-set-size-value' }, sizeDraft + 'px'),
          ),
          h(
            'div',
            { className: 'dqc-set-apply-row' },
            h(
              'span',
              { className: 'dqc-set-hint', 'data-warn': hostOutdated ? 'true' : 'false' },
              hostOutdated
                ? L('当前 Host 还是旧外观接口，重启 DSH 后「应用」才会保存形状和大小')
                : L('形状在图标裁剪面板里选择；修改大小后点应用同步到桌面悬浮球'),
            ),
            h(
              'button',
              {
                type: 'button',
                className: 'dqc-set-btn dqc-set-apply',
                disabled: busy || hostOutdated,
                onClick: applyBallSettings,
              },
              busy ? L('应用中…', 'Applying…') : L('应用', 'Apply'),
            ),
          ),
        ),
        h(
          'section',
          { className: 'dqc-set-section' },
          h('div', { className: 'dqc-set-label' }, L('聊天背景', 'Chat background')),
          h(
            'div',
            { className: 'dqc-set-inline' },
            backgroundPreview,
            h(
              'div',
              { className: 'dqc-set-swatches' },
              backgroundSwatches.map(([label, color]) =>
                h(
                  'button',
                  {
                    key: label,
                    type: 'button',
                    className: 'dqc-set-swatch',
                    title: label,
                    'aria-label': label,
                    style:
                      color && color !== 'none'
                        ? { background: color }
                        : {
                            background:
                              'repeating-conic-gradient(#e9edf5 0% 25%, #ffffff 0% 50%) 50% / 10px 10px',
                          },
                    'data-active':
                      (color === 'none' && backgroundType === 'none') ||
                      (typeof color === 'string' && color !== 'none' && backgroundType === 'color' &&
                        backgroundColor.toLowerCase() === color)
                        ? 'true'
                        : 'false',
                    disabled: busy,
                    onClick: () =>
                      save({
                        chatBackground: color === 'none' ? { type: 'none' } : { type: 'color', color },
                      }),
                  },
                  null,
                ),
              ),
              h(
                'label',
                { className: 'dqc-set-color' },
                L('自定义', 'Custom'),
                h('input', {
                  type: 'color',
                  value: backgroundColor,
                  disabled: busy,
                  onChange: (event) => save({ chatBackground: { type: 'color', color: event.target.value } }),
                }),
              ),
            ),
          ),
          h(
            'div',
            { className: 'dqc-set-actions' },
            h(
              'button',
              {
                type: 'button',
                className: 'dqc-set-btn',
                disabled: busy,
                onClick: () => bgInputRef.current && bgInputRef.current.click(),
              },
              L('上传背景图片', 'Upload background image'),
            ),
            backgroundType === 'image' && background && background.url
              ? h(
                  'button',
                  {
                    type: 'button',
                    className: 'dqc-set-btn dqc-set-btn-quiet',
                    disabled: busy,
                    onClick: () => openBgEditor(background),
                  },
                  L('选取显示区域', 'Choose display area'),
                )
              : null,
            h('input', {
              ref: bgInputRef,
              type: 'file',
              accept: 'image/*',
              style: { display: 'none' },
              onChange: (event) => {
                const file = event.target.files && event.target.files[0]
                if (file) void upload('chat', file)
                event.target.value = ''
              },
            }),
          ),
          appearance && appearance.chatBackgroundHistory && appearance.chatBackgroundHistory.length > 0
            ? h('div', { className: 'dqc-set-label dqc-set-label-sub' }, L('最近使用', 'Recent'))
            : null,
          appearance && appearance.chatBackgroundHistory
            ? renderHistory('chat', appearance.chatBackgroundHistory)
            : null,
          h(
            'div',
            { className: 'dqc-set-name-row' },
            h('span', { className: 'dqc-set-row-label' }, L('助手名称', 'Assistant name')),
            h('input', {
              className: 'dqc-set-input',
              type: 'text',
              value: nameDraft,
              maxLength: 30,
              placeholder: 'DeepSeek',
              disabled: busy,
              onChange: (event) => setNameDraft(event.target.value),
              onBlur: commitName,
              onKeyDown: (event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  commitName()
                  event.currentTarget.blur()
                }
              },
            }),
            h(
              'button',
              {
                type: 'button',
                className: 'dqc-set-btn dqc-set-btn-quiet',
                disabled: busy,
                onClick: commitName,
              },
              L('保存', 'Save'),
            ),
          ),
          h(
            'div',
            { className: 'dqc-set-hint', 'data-warn': nameHostOutdated ? 'true' : 'false' },
            nameHostOutdated
              ? L('当前 Host 还没加载名称字段，重启 DSH 后这里才会同步到聊天窗口', 'The Host does not provide the name field yet. Restart DSH to sync it to the chat window.')
              : L('同时用于 AI 回复标题和输入框提示文字', 'Also used for the AI reply title and composer placeholder'),
          ),
          backgroundType === 'image' && !backgroundCrop
            ? h(
                'div',
                { className: 'dqc-set-row' },
                h('span', { className: 'dqc-set-row-label' }, L('图片显示', 'Image display')),
                [
                  ['cover', L('铺满', 'Fill')],
                  ['contain', L('完整', 'Fit')],
                  ['stretch', L('拉伸', 'Stretch')],
                ].map(([fit, label]) =>
                  h(
                    'button',
                    {
                      key: fit,
                      type: 'button',
                      className: 'dqc-set-choice',
                      'data-active': bgFitDraft === fit ? 'true' : 'false',
                      disabled: busy,
                      onClick: () => setBackgroundFit(fit),
                    },
                    label,
                  ),
                ),
              )
            : null,
          backgroundType === 'image' && !backgroundCrop
            ? h(
                'div',
                { className: 'dqc-set-row' },
                h('span', { className: 'dqc-set-row-label' }, L('图片位置', 'Image position')),
                [
                  ['center', L('居中', 'Center')],
                  ['top', L('顶部', 'Top')],
                  ['bottom', L('底部', 'Bottom')],
                  ['left', L('左侧', 'Left')],
                  ['right', L('右侧', 'Right')],
                ].map(([position, label]) =>
                  h(
                    'button',
                    {
                      key: position,
                      type: 'button',
                      className: 'dqc-set-choice',
                      'data-active': bgPosDraft === position ? 'true' : 'false',
                      disabled: busy,
                      onClick: () => setBackgroundPosition(position),
                    },
                    label,
                  ),
                ),
              )
            : null,
          h(
            'div',
            { className: 'dqc-set-message-colors' },
            h('span', { className: 'dqc-set-row-label' }, L('消息颜色', 'Message colors')),
            h(
              'label',
              { className: 'dqc-set-color dqc-set-message-color' },
              L('用户气泡', 'User bubble'),
              h('input', {
                type: 'color',
                value: userColorDraft || '#ffffff',
                disabled: busy,
                onChange: (event) => setUserColorDraft(event.target.value),
                onBlur: applyMessageColors,
              }),
            ),
            h(
              'label',
              { className: 'dqc-set-color dqc-set-message-color' },
              L('AI 卡片', 'AI card'),
              h('input', {
                type: 'color',
                value: aiColorDraft || '#ffffff',
                disabled: busy,
                onChange: (event) => setAiColorDraft(event.target.value),
                onBlur: applyMessageColors,
              }),
            ),
            h(
              'button',
              {
                type: 'button',
                className: 'dqc-set-btn dqc-set-btn-quiet',
                disabled: busy,
                onClick: () => {
                  setUserColorDraft('')
                  setAiColorDraft('')
                  void save({ messageColors: { user: '', ai: '' } })
                },
              },
              L('跟随主题', 'Follow theme'),
            ),
            h(
              'button',
              {
                type: 'button',
                className: 'dqc-set-btn',
                disabled: busy,
                onClick: applyMessageColors,
              },
              L('应用颜色', 'Apply colors'),
            ),
          ),
          appearanceHostOutdated
            ? h(
                'div',
                { className: 'dqc-set-hint', 'data-warn': 'true' },
                L('当前 Host 还是旧外观接口，重启 DSH 后背景区域、位置和消息颜色才会生效'),
              )
            : null,
        ),
        bgEditor
          ? h(
              'div',
              { className: 'dqc-bg-editor-overlay' },
              h(
                'div',
                { className: 'dqc-bg-editor-card' },
                h('div', { className: 'dqc-bg-editor-title' }, L('设置聊天背景显示区域', 'Set chat background area')),
                h(
                  'div',
                  { className: 'dqc-bg-editor-layout' },
                  h(
                    'div',
                    { className: 'dqc-bg-editor-stage', ref: bgStageRef },
                    h('img', {
                      className: 'dqc-bg-editor-image',
                      src: bgEditor.url,
                      alt: '',
                      draggable: false,
                      style: bgEditor.imageRect
                        ? {
                            left: `${bgEditor.imageRect.left}px`,
                            top: `${bgEditor.imageRect.top}px`,
                            width: `${bgEditor.imageRect.width}px`,
                            height: `${bgEditor.imageRect.height}px`,
                          }
                        : { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'contain' },
                      onLoad: (event) => {
                        const stage = bgStageRef.current
                        if (!stage) return
                        const naturalWidth = event.currentTarget.naturalWidth || 1
                        const naturalHeight = event.currentTarget.naturalHeight || 1
                        const stageWidth = stage.clientWidth || 520
                        const stageHeight = stage.clientHeight || 300
                        const scale = Math.min(stageWidth / naturalWidth, stageHeight / naturalHeight)
                        const width = naturalWidth * scale
                        const height = naturalHeight * scale
                        setBgEditor((editor) =>
                          editor
                            ? {
                                ...editor,
                                imageRect: {
                                  left: (stageWidth - width) / 2,
                                  top: (stageHeight - height) / 2,
                                  width,
                                  height,
                                },
                              }
                            : editor,
                        )
                      },
                    }),
                    bgEditor.imageRect
                      ? h(
                          'div',
                          {
                            className: 'dqc-bg-editor-imagebox',
                            style: {
                              left: `${bgEditor.imageRect.left}px`,
                              top: `${bgEditor.imageRect.top}px`,
                              width: `${bgEditor.imageRect.width}px`,
                              height: `${bgEditor.imageRect.height}px`,
                            },
                          },
                          h(
                            'div',
                            {
                              className: 'dqc-bg-editor-box',
                              style: {
                                left: `${bgEditor.box.x * 100}%`,
                                top: `${bgEditor.box.y * 100}%`,
                                width: `${bgEditor.box.w * 100}%`,
                                height: `${bgEditor.box.h * 100}%`,
                              },
                              onPointerDown: (event) => startBgDrag(event, 'move'),
                            },
                            ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].map((handle) =>
                              h('span', {
                                key: handle,
                                className: `dqc-bg-editor-handle dqc-bg-editor-handle-${handle}`,
                                onPointerDown: (event) => startBgDrag(event, handle),
                              }),
                            ),
                          ),
                        )
                      : null,
                  ),
                  h(
                    'div',
                    { className: 'dqc-bg-editor-preview' },
                    h(
                      'div',
                      { className: 'dqc-bg-editor-preview-frame' },
                      h('img', {
                        src: bgEditor.url,
                        alt: '',
                        draggable: false,
                        style: {
                          width: `${100 / Math.max(0.01, bgEditor.box.w)}%`,
                          height: `${100 / Math.max(0.01, bgEditor.box.h)}%`,
                          left: `${-(bgEditor.box.x / Math.max(0.01, bgEditor.box.w)) * 100}%`,
                          top: `${-(bgEditor.box.y / Math.max(0.01, bgEditor.box.h)) * 100}%`,
                        },
                      }),
                    ),
                    h('span', null, L('聊天窗口预览', 'Chat window preview')),
                  ),
                ),
                h(
                  'div',
                  { className: 'dqc-bg-editor-actions' },
                  h(
                    'button',
                    { type: 'button', className: 'dqc-set-btn dqc-set-btn-quiet', disabled: busy, onClick: resetBgCrop },
                    L('恢复铺满', 'Reset to fill'),
                  ),
                  h('span', { className: 'dqc-bg-editor-spacer' }),
                  h(
                    'button',
                    { type: 'button', className: 'dqc-set-btn dqc-set-btn-quiet', onClick: () => setBgEditor(null) },
                    L('取消', 'Cancel'),
                  ),
                  h(
                    'button',
                    { type: 'button', className: 'dqc-set-btn dqc-set-apply', disabled: busy, onClick: applyBgCrop },
                    L('保存区域', 'Save area'),
                  ),
                ),
              ),
            )
          : null,
        crop
          ? h(
              'div',
              { className: 'dqc-bg-editor-overlay' },
              h(
                'div',
                { className: 'dqc-bg-editor-card' },
                h('div', { className: 'dqc-bg-editor-title' }, L('裁剪悬浮球图标', 'Crop ball icon')),
                h(
                  'div',
                  { className: 'dqc-crop-shapes' },
                  h('span', { className: 'dqc-set-row-label' }, L('形状', 'Shape')),
                  BALL_SHAPE_OPTIONS.map((option) =>
                    h(
                      'button',
                      {
                        key: option.id,
                        type: 'button',
                        className: 'dqc-set-choice',
                        'data-active': shapeDraft === option.id ? 'true' : 'false',
                        disabled: busy,
                        onClick: () => changeBallShape(option.id),
                      },
                      L(option.label, { circle: 'Circle', rounded: 'Rounded square', square: 'Square', wide: 'Wide', tall: 'Tall' }[option.id] || option.label),
                    ),
                  ),
                ),
                h(
                  'div',
                  { className: 'dqc-bg-editor-layout' },
                  h(
                    'div',
                    { className: 'dqc-bg-editor-stage', ref: cropStageRef, onWheel: zoomCropByWheel },
                    h('img', {
                      className: 'dqc-bg-editor-image',
                      src: crop.url,
                      alt: '',
                      draggable: false,
                      style: crop.imageRect
                        ? {
                            left: `${crop.imageRect.left}px`,
                            top: `${crop.imageRect.top}px`,
                            width: `${crop.imageRect.width}px`,
                            height: `${crop.imageRect.height}px`,
                          }
                        : { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'contain' },
                      onLoad: (event) => {
                        const stage = cropStageRef.current
                        if (!stage) return
                        const naturalWidth = event.currentTarget.naturalWidth || 1
                        const naturalHeight = event.currentTarget.naturalHeight || 1
                        const stageWidth = stage.clientWidth || 520
                        const stageHeight = stage.clientHeight || 300
                        const scale = Math.min(stageWidth / naturalWidth, stageHeight / naturalHeight)
                        const width = naturalWidth * scale
                        const height = naturalHeight * scale
                        setCrop((editor) =>
                          editor
                            ? {
                                ...editor,
                                imageRect: {
                                  left: (stageWidth - width) / 2,
                                  top: (stageHeight - height) / 2,
                                  width,
                                  height,
                                },
                                box: fitCropBoxToShape(
                                  editor.box,
                                  { width, height },
                                  ballShapeAspect(shapeDraft),
                                ),
                              }
                            : editor,
                        )
                      },
                    }),
                    crop.imageRect
                      ? h(
                          'div',
                          {
                            className: 'dqc-bg-editor-imagebox',
                            style: {
                              left: `${crop.imageRect.left}px`,
                              top: `${crop.imageRect.top}px`,
                              width: `${crop.imageRect.width}px`,
                              height: `${crop.imageRect.height}px`,
                            },
                          },
                          h(
                            'div',
                            {
                              className: 'dqc-bg-editor-box',
                              style: {
                                left: `${crop.box.x * 100}%`,
                                top: `${crop.box.y * 100}%`,
                                width: `${crop.box.w * 100}%`,
                                height: `${crop.box.h * 100}%`,
                              },
                              onPointerDown: (event) => startCropDrag(event, 'move'),
                            },
                            ['nw', 'ne', 'se', 'sw'].map((handle) =>
                              h('span', {
                                key: handle,
                                className: `dqc-bg-editor-handle dqc-bg-editor-handle-${handle}`,
                                onPointerDown: (event) => startCropDrag(event, handle),
                              }),
                            ),
                          ),
                        )
                      : null,
                  ),
                  h(
                    'div',
                    { className: 'dqc-bg-editor-preview' },
                    h(
                      'div',
                      {
                        className: 'dqc-crop-preview-frame',
                        style: {
                          width: `${ballShapeAspect(shapeDraft) >= 1 ? 150 : Math.round(150 * ballShapeAspect(shapeDraft))}px`,
                          height: `${ballShapeAspect(shapeDraft) >= 1 ? Math.round(150 / ballShapeAspect(shapeDraft)) : 150}px`,
                        },
                      },
                      h(BallVisual, {
                        ball: {
                          kind: crop.kind,
                          url: crop.url,
                          shape: shapeDraft,
                          crop: crop.box,
                        },
                        style: { width: '100%', height: '100%' },
                      }),
                    ),
                    h('span', null, L('悬浮球预览', 'Ball preview')),
                  ),
                ),
                h(
                  'div',
                  { className: 'dqc-bg-editor-actions' },
                  h(
                    'span',
                    { className: 'dqc-bg-editor-hint' },
                    L('拖动选框移动，滚轮缩放图片，拖动四角按所选形状等比例缩放', 'Drag to move, use the wheel to zoom, and drag a corner to resize proportionally.'),
                  ),
                  h('span', { className: 'dqc-bg-editor-spacer' }),
                  h(
                    'button',
                    { type: 'button', className: 'dqc-set-btn dqc-set-btn-quiet', onClick: () => setCrop(null) },
                    L('取消', 'Cancel'),
                  ),
                  h(
                    'button',
                    { type: 'button', className: 'dqc-set-btn dqc-set-btn-quiet', disabled: busy, onClick: () => void save({ ball: { kind: crop.kind, crop: null } }).then(() => setCrop(null)) },
                    L('使用完整图片', 'Use the whole image'),
                  ),
                  h(
                    'button',
                    { type: 'button', className: 'dqc-set-btn dqc-set-apply', disabled: busy, onClick: () => void applyCrop() },
                    L('保存裁剪', 'Save crop'),
                  ),
                ),
              ),
            )
          : null,
        h('div', { className: 'dqc-set-status' }, status),
      )
    }

    function Panel({ controller, pip, standalone }) {
      const state = useStore(controller.store)
      const t = useT(state.lang)
      const appearance = useChatAppearance()
      const assistantName = (appearance && appearance.assistantName) || t('assistant')
      const backgroundFit = (appearance && appearance.chatBackgroundFit) || 'cover'
      const backgroundPosition = (appearance && appearance.chatBackgroundPosition) || 'center'
      const backgroundCrop =
        appearance && appearance.chatBackgroundCrop && typeof appearance.chatBackgroundCrop === 'object'
          ? appearance.chatBackgroundCrop
          : null
      const messageColors = (appearance && appearance.messageColors) || {}
      const userColor = messageColors.user || ''
      const aiColor = messageColors.ai || ''
      const userForeground = userColor ? (isDarkColor(userColor) ? '#ffffff' : '#14161a') : ''
      const aiForeground = aiColor ? (isDarkColor(aiColor) ? '#ffffff' : '#14161a') : ''
      const colorVars = {
        ...(userColor ? { '--dqc-user': userColor, '--dqc-user-fg': userForeground } : {}),
        ...(aiColor ? { '--dqc-ai-card': aiColor, '--dqc-ai-fg': aiForeground } : {}),
      }
      const backgroundSize = backgroundFit === 'contain' ? 'contain' : backgroundFit === 'stretch' ? '100% 100%' : 'cover'
      const backgroundPositionCss =
        backgroundPosition === 'top'
          ? 'center top'
          : backgroundPosition === 'bottom'
            ? 'center bottom'
            : backgroundPosition === 'left'
              ? 'left center'
              : backgroundPosition === 'right'
                ? 'right center'
                : 'center center'
      const chatBackground = appearance && appearance.chatBackground ? appearance.chatBackground : null
      const chatBackgroundType = chatBackground
        ? chatBackground.type || (chatBackground.url ? 'image' : chatBackground.color ? 'color' : 'none')
        : 'none'
      const chatDark = chatBackgroundType === 'color' && isDarkColor(chatBackground && chatBackground.color)
      const [windowPinned, setWindowPinned] = useState(true)
      const [dropActive, setDropActive] = useState(false)
      const full = Boolean(pip || standalone)
      const panelRef = useRef(null)
      const bodyRef = useRef(null)

      useEffect(() => {
        let depth = 0
        const hasFiles = (event) => {
          const types = event.dataTransfer && event.dataTransfer.types
          return types ? Array.from(types).includes('Files') : false
        }
        const onDragEnter = (event) => {
          if (!hasFiles(event)) return
          event.preventDefault()
          depth += 1
          setDropActive(true)
        }
        const onDragOver = (event) => {
          if (!hasFiles(event)) return
          event.preventDefault()
          if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy'
        }
        const onDragLeave = (event) => {
          if (depth === 0) return
          depth = Math.max(0, depth - 1)
          if (depth === 0) setDropActive(false)
        }
        const onDrop = (event) => {
          if (!hasFiles(event)) return
          event.preventDefault()
          depth = 0
          setDropActive(false)
          if (event.dataTransfer) controller.addFiles(event.dataTransfer.files)
        }
        document.addEventListener('dragenter', onDragEnter)
        document.addEventListener('dragover', onDragOver)
        document.addEventListener('dragleave', onDragLeave)
        document.addEventListener('drop', onDrop)
        return () => {
          document.removeEventListener('dragenter', onDragEnter)
          document.removeEventListener('dragover', onDragOver)
          document.removeEventListener('dragleave', onDragLeave)
          document.removeEventListener('drop', onDrop)
        }
      }, [controller])
      const inputRef = useRef(null)
      const menuRef = useRef(null)
      const headerDragRef = useRef(null)
      const resizeRef = useRef(null)
      const [atBottom, setAtBottom] = useState(true)
      const [isResizing, setIsResizing] = useState(false)
      const webViewHost = Boolean(standalone && isWebViewHost())
      const hostDragRef = useRef(null)
      const windowResizeRef = useRef(null)
      const [isWindowResizing, setIsWindowResizing] = useState(false)

      useEffect(() => {
        if (!webViewHost) return
        const color =
          chatBackgroundType === 'color'
            ? chatBackground && chatBackground.color
              ? chatBackground.color
              : '#f4f6fb'
            : chatBackgroundType === 'image'
              ? '#111318'
              : '#f4f6fb'
        try {
          window.chrome.webview.postMessage(JSON.stringify({ type: 'dqc-surface', color }))
        } catch {
          /* noop */
        }
      }, [webViewHost, chatBackgroundType, chatBackground && chatBackground.color])

      useEffect(() => {
        if (!state.open || state.loading) return
        const timer = setTimeout(() => {
          try {
            inputRef.current?.focus({ preventScroll: true })
          } catch {
            /* noop */
          }
        }, 60)
        return () => clearTimeout(timer)
      }, [state.focusNonce, state.open, state.loading])

      useEffect(() => {
        if (!state.open) return
        const body = bodyRef.current
        if (!body) return
        if (!atBottom) return
        const frame = requestAnimationFrame(() => {
          body.scrollTop = body.scrollHeight
        })
        return () => cancelAnimationFrame(frame)
      }, [state.open, state.messages, state.streamingText, atBottom])

      useEffect(() => {
        if (!state.historyOpen && !state.menuOpen) return
        const doc = panelRef.current?.ownerDocument || document
        const onPointerDown = (event) => {
          const target = event.target
          if (menuRef.current && target instanceof Element && menuRef.current.contains(target)) return
          if (target instanceof Element && target.closest('[data-dqc-menu-trigger]')) return
          controller.closeMenus()
        }
        doc.addEventListener('pointerdown', onPointerDown, true)
        return () => doc.removeEventListener('pointerdown', onPointerDown, true)
      }, [state.historyOpen, state.menuOpen, controller])

      useEffect(() => {
        setAtBottom(true)
      }, [state.sessionId])

      const onScroll = () => {
        const body = bodyRef.current
        if (!body) return
        const near = body.scrollHeight - body.scrollTop - body.clientHeight < 40
        setAtBottom(near)
      }

      const scrollToBottom = () => {
        const body = bodyRef.current
        if (!body) return
        body.scrollTop = body.scrollHeight
        setAtBottom(true)
      }

      const onHeaderPointerDown = (event) => {
        if (pip || event.button !== 0) return
        const target = event.target
        if (target instanceof Element && target.closest('button, a, input, textarea, .dqc-menu')) return
        event.preventDefault()
        const geometry = state.geometry
        headerDragRef.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          x: geometry.x,
          y: geometry.y,
          moved: false,
        }
        try {
          event.currentTarget.setPointerCapture(event.pointerId)
        } catch {
          /* noop */
        }
      }

      const onHeaderPointerMove = (event) => {
        const drag = headerDragRef.current
        if (!drag || drag.pointerId !== event.pointerId) return
        const dx = event.clientX - drag.startX
        const dy = event.clientY - drag.startY
        if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 3) return
        drag.moved = true
        controller.setGeometry({ x: drag.x + dx, y: drag.y + dy })
      }

      const onHeaderPointerUp = (event) => {
        const drag = headerDragRef.current
        if (!drag || drag.pointerId !== event.pointerId) return
        headerDragRef.current = null
        try {
          event.currentTarget.releasePointerCapture(event.pointerId)
        } catch {
          /* noop */
        }
        if (drag.moved) controller.persist()
      }

      const postHostMessage = (message) => {
        try {
          window.chrome.webview.postMessage(JSON.stringify(message))
        } catch {
          /* noop */
        }
      }

      const onHostPointerDown = (event) => {
        if (!webViewHost || event.button !== 0) return
        const target = event.target
        if (target instanceof Element && target.closest('button, a, input, textarea, .dqc-menu')) return
        event.preventDefault()
        hostDragRef.current = { pointerId: event.pointerId }
        postHostMessage({ type: 'dqc-drag-start' })
        try {
          event.currentTarget.setPointerCapture(event.pointerId)
        } catch {
          /* noop */
        }
      }

      const onHostPointerMove = (event) => {
        const drag = hostDragRef.current
        if (!drag || drag.pointerId !== event.pointerId) return
        postHostMessage({ type: 'dqc-drag-move' })
      }

      const onHostPointerUp = (event) => {
        const drag = hostDragRef.current
        if (!drag || drag.pointerId !== event.pointerId) return
        hostDragRef.current = null
        postHostMessage({ type: 'dqc-drag-end' })
        try {
          event.currentTarget.releasePointerCapture(event.pointerId)
        } catch {
          /* noop */
        }
      }

      const onResizePointerDown = (event) => {
        if (pip || event.button !== 0) return
        event.preventDefault()
        event.stopPropagation()
        const geometry = state.geometry
        resizeRef.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          w: geometry.w,
          h: geometry.h,
          moved: false,
        }
        setIsResizing(true)
        try {
          event.currentTarget.setPointerCapture(event.pointerId)
        } catch {
          /* noop */
        }
      }

      const onResizePointerMove = (event) => {
        const resize = resizeRef.current
        if (!resize || resize.pointerId !== event.pointerId) return
        const dx = event.clientX - resize.startX
        const dy = event.clientY - resize.startY
        if (!resize.moved && Math.abs(dx) + Math.abs(dy) < 2) return
        resize.moved = true
        controller.setGeometry({ w: resize.w + dx, h: resize.h + dy })
      }

      const onResizePointerUp = (event) => {
        const resize = resizeRef.current
        if (!resize || resize.pointerId !== event.pointerId) return
        resizeRef.current = null
        setIsResizing(false)
        try {
          event.currentTarget.releasePointerCapture(event.pointerId)
        } catch {
          /* noop */
        }
        if (resize.moved) controller.persist()
      }

      const startWindowResize = (edge, event) => {
        if (!webViewHost || event.button !== 0) return
        event.preventDefault()
        event.stopPropagation()
        windowResizeRef.current = {
          pointerId: event.pointerId,
          edge,
          startX: event.screenX,
          startY: event.screenY,
        }
        setIsWindowResizing(true)
        controller.beginChatWindowResize(edge)
        try {
          event.currentTarget.setPointerCapture(event.pointerId)
        } catch {
          /* noop */
        }
      }

      const moveWindowResize = (event) => {
        const resize = windowResizeRef.current
        if (!resize || resize.pointerId !== event.pointerId) return
        controller.moveChatWindowResize(resize.edge, event.screenX - resize.startX, event.screenY - resize.startY)
      }

      const endWindowResize = (event) => {
        const resize = windowResizeRef.current
        if (!resize || resize.pointerId !== event.pointerId) return
        windowResizeRef.current = null
        setIsWindowResizing(false)
        controller.finishChatWindowResize()
        try {
          event.currentTarget.releasePointerCapture(event.pointerId)
        } catch {
          /* noop */
        }
      }

      const hasMessages = state.messages.length > 0
      const showEmpty = !hasMessages && !state.streamingText && !state.running && !state.error
      const showErrorState = Boolean(state.error) && !hasMessages && !state.loading && !state.streamingText
      const showLoading = state.loading && !hasMessages && !state.streamingText
      const panelStyle = full
        ? { ...colorVars }
        : {
            left: `${state.geometry.x}px`,
            top: `${state.geometry.y}px`,
            width: `${state.geometry.w}px`,
            height: `${state.geometry.h}px`,
            ...colorVars,
          }

      return h(
        'section',
        {
          ref: panelRef,
          className: 'dqc-panel',
          style: panelStyle,
          'data-pip': pip ? 'true' : 'false',
          'data-standalone': standalone ? 'true' : 'false',
          'data-webview': webViewHost ? 'true' : 'false',
          'data-chat-bg': chatBackgroundType === 'image' ? 'true' : 'false',
          'data-chat-kind': chatBackgroundType,
          'data-chat-dark': chatDark ? 'true' : 'false',
          'data-user-color': userColor ? 'true' : 'false',
          'data-ai-color': aiColor ? 'true' : 'false',
          'data-dqc-panel': '',
          role: 'dialog',
          'aria-label': t('appName'),
          'aria-modal': 'false',
        },
        chatBackgroundType === 'color'
          ? h('div', {
              className: 'dqc-chat-bg',
              'data-kind': 'color',
              style: { '--dqc-chat-color': chatBackground.color || '#f4f6fb' },
            })
          : chatBackgroundType === 'image' && chatBackground && chatBackground.url
            ? h(
                'div',
                {
                  className: 'dqc-chat-bg',
                  'data-kind': 'image',
                  'data-crop': backgroundCrop ? 'true' : 'false',
                  style: backgroundCrop
                    ? undefined
                    : {
                        backgroundImage: `url("${chatBackground.url}")`,
                        backgroundSize,
                        backgroundPosition: backgroundPositionCss,
                        backgroundRepeat: 'no-repeat',
                      },
                },
                backgroundCrop
                  ? h('img', {
                      className: 'dqc-chat-bg-crop',
                      src: chatBackground.url,
                      alt: '',
                      draggable: false,
                      style: {
                        width: `${100 / Math.max(0.01, backgroundCrop.w)}%`,
                        height: `${100 / Math.max(0.01, backgroundCrop.h)}%`,
                        left: `${-(backgroundCrop.x / Math.max(0.01, backgroundCrop.w)) * 100}%`,
                        top: `${-(backgroundCrop.y / Math.max(0.01, backgroundCrop.h)) * 100}%`,
                      },
                    })
                  : null,
              )
            : null,
        dropActive
          ? h(
              'div',
              { className: 'dqc-drop-overlay', 'aria-hidden': 'true' },
              h('div', { className: 'dqc-drop-icon' }, h(Icon, { name: 'arrow-down', size: 42, strokeWidth: 1.6 })),
              h('div', { className: 'dqc-drop-title' }, trText(state.lang, '在此处拖放文件', 'Drop files here')),
              h(
                'div',
                { className: 'dqc-drop-hint' },
                trText(state.lang, '最多 50 个：图片、Markdown、PDF、Office 文档等', 'Up to 50: images, Markdown, PDF, Office documents and more'),
              ),
            )
          : null,
        h(
          'header',
          {
            className: 'dqc-head',
            onPointerDown: full ? (webViewHost ? onHostPointerDown : undefined) : onHeaderPointerDown,
            onPointerMove: full ? (webViewHost ? onHostPointerMove : undefined) : onHeaderPointerMove,
            onPointerUp: full ? (webViewHost ? onHostPointerUp : undefined) : onHeaderPointerUp,
            onPointerCancel: full ? (webViewHost ? onHostPointerUp : undefined) : onHeaderPointerUp,
            onLostPointerCapture: full ? (webViewHost ? onHostPointerUp : undefined) : onHeaderPointerUp,
            'data-dqc-drag-handle': full ? (webViewHost ? '' : undefined) : '',
          },
          h(
            'div',
            { className: 'dqc-head-left' },
            standalone
              ? null
              : h(
                  'button',
                  {
                    type: 'button',
                    className: 'dqc-icon-btn dqc-collapse',
                    onClick: () => controller.close(),
                    title: t('minimize'),
                    'aria-label': t('minimize'),
                    'data-dqc-collapse': '',
                  },
                  h(Icon, { name: 'minus', size: 16 }),
                ),
            webViewHost
              ? h(
                  'button',
                  {
                    type: 'button',
                    className: 'dqc-icon-btn',
                    onClick: () => controller.minimizeWindow(),
                    title: t('minimizeWindow'),
                    'aria-label': t('minimizeWindow'),
                    'data-dqc-window-minimize': '',
                  },
                  h(Icon, { name: 'minus', size: 16 }),
                )
              : null,
            webViewHost
              ? h(
                  'button',
                  {
                    type: 'button',
                    className: 'dqc-icon-btn',
                    onClick: () => {
                      const next = !windowPinned
                      setWindowPinned(next)
                      controller.setWindowPinned(next)
                    },
                    title: windowPinned ? t('unpinWindow') : t('pinWindow'),
                    'aria-label': windowPinned ? t('unpinWindow') : t('pinWindow'),
                    'aria-pressed': windowPinned ? 'true' : 'false',
                    'data-active': windowPinned ? 'true' : 'false',
                    'data-dqc-window-pin': '',
                  },
                  h(Icon, { name: windowPinned ? 'pin-filled' : 'pin', size: 15 }),
                )
              : null,
            h(
              'button',
              {
                type: 'button',
                className: 'dqc-icon-btn',
                onClick: () => controller.newChat(),
                title: t('newChat'),
                'aria-label': t('newChat'),
                'data-dqc-new': '',
                disabled: state.busy || state.loading,
              },
              h(Icon, { name: 'compose', size: 15 }),
            ),
          ),
          h(
            'div',
            { className: 'dqc-actions' },
            h(
              'button',
              {
                type: 'button',
                className: 'dqc-icon-btn',
                onClick: () => controller.toggleMenu('more'),
                title: t('more'),
                'aria-label': t('more'),
                'data-active': state.menuOpen ? 'true' : 'false',
                'data-dqc-menu-trigger': '',
                'data-dqc-more': '',
              },
              h(Icon, { name: 'more', size: 16 }),
            ),
            webViewHost
              ? h(
                  'button',
                  {
                    type: 'button',
                    className: 'dqc-icon-btn dqc-close-window',
                    onClick: () => controller.closeWindow(),
                    title: t('closeWindow'),
                    'aria-label': t('closeWindow'),
                    'data-dqc-close-window': '',
                  },
                  h(Icon, { name: 'close', size: 15 }),
                )
              : null,
          ),
        ),
        h(
          'div',
          { className: 'dqc-body', ref: bodyRef, onScroll },
          showLoading
            ? h(LoadingState, { t })
            : showErrorState
              ? h(ErrorState, { text: state.error, controller, t, canRetry: state.errorKind === 'session' })
              : showEmpty
                ? h(EmptyState, { controller, t })
                : h(
                    Fragment,
                    null,
                    state.messages.map((message) => h(MessageView, { key: message.key, message, controller, t, appearance, assistantName })),
                    state.streamingText ? h(StreamingView, { text: state.streamingText, controller, t, appearance, assistantName }) : null,
                    state.error ? h(SystemRow, { text: state.error, controller, t, canRetry: state.errorKind === 'session' }) : null,
                  ),
        ),
        h(
          'div',
          { className: 'dqc-live-bar', 'data-show': state.status ? 'true' : 'false', role: 'status', 'aria-live': 'polite' },
          h('span', { className: 'dqc-mini-spinner' }),
          h('span', null, state.status),
        ),
        h(ApprovalDock, { approvals: state.approvals, controller, lang: state.lang }),
        h(QuestionDock, {
          questions: state.questions,
          drafts: state.questionDrafts,
          states: state.questionStates,
          controller,
          t,
          lang: state.lang,
        }),
        h(Composer, { controller, state, t, inputRef, pip, standalone, assistantName }),
        !atBottom && (hasMessages || state.streamingText)
          ? h(
              'button',
              { type: 'button', className: 'dqc-scroll-bottom', onClick: scrollToBottom },
              h(Icon, { name: 'arrow-down', size: 11 }),
              t('scrollBottom'),
            )
          : null,
        state.notice ? h('div', { className: 'dqc-toast', role: 'status' }, state.notice.text) : null,
        state.historyOpen ? h(HistoryMenu, { controller, state, t, menuRef }) : null,
        state.menuOpen ? h(MoreMenu, { controller, state, t, menuRef, standalone }) : null,
        webViewHost
          ? ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map((edge) =>
              h('div', {
                key: edge,
                className: `dqc-window-edge dqc-window-edge-${edge}`,
                style: { background: 'transparent' },
                'data-edge': edge,
                onPointerDown: (event) => startWindowResize(edge, event),
                onPointerMove: moveWindowResize,
                onPointerUp: endWindowResize,
                onPointerCancel: endWindowResize,
                onLostPointerCapture: endWindowResize,
                'aria-hidden': 'true',
              }),
            )
          : null,
        !full
          ? h('div', {
              className: 'dqc-resize',
              style: isResizing ? { opacity: 1 } : undefined,
              onPointerDown: onResizePointerDown,
              onPointerMove: onResizePointerMove,
              onPointerUp: onResizePointerUp,
              onPointerCancel: onResizePointerUp,
              onLostPointerCapture: onResizePointerUp,
              'aria-hidden': 'true',
            })
          : null,
      )
    }

    // ---------------------------------------------------------------------
    // Plugin entry
    // ---------------------------------------------------------------------

    const inject = ['slots', 'sessions', 'remote', 'remote.userQuestions', 'remote.workspace', 'remote.directoryPicker', 'uiSession']

    function apply(ctx) {
      let style = document.getElementById('dsh-desktop-ball-style')
      if (!style) {
        style = document.createElement('style')
        style.id = 'dsh-desktop-ball-style'
        style.setAttribute('data-plugin', PLUGIN_ID)
        document.head.append(style)
      }
      style.textContent = CSS

      const controller = new QuickChatController(ctx)
      ctx.effect(() => controller.start(), 'quick-chat: lifecycle')
      ctx.effect(
        () => () => {
          // Keep the style element across HMR re-applies: removing it here can race
          // with a new apply that reuses the existing element, leaving the settings
          // page and panel completely unstyled.
          if (window.__dshQuickChat === controller) {
            try {
              delete window.__dshQuickChat
            } catch {
              /* noop */
            }
          }
        },
        'quick-chat: handle',
      )

      if (controller.standalone) {
        const host = document.createElement('div')
        host.setAttribute('data-dqc-standalone-host', '')
        document.body.append(host)
        const root = ReactDOM.createRoot(host)
        root.render(h(StandaloneRoot, { controller }))
        ctx.effect(
          () => () => {
            try {
              root.unmount()
            } catch {
              /* noop */
            }
            host.remove()
          },
          'quick-chat: standalone window',
        )
      } else {
        ctx.slots.inject('settings.section', function* () {
          yield ctx.slots.register(
            {
              name: 'settings.section',
              id: 'quick-chat-appearance',
              order: 31,
              label: () => trText(controller.store.get().lang, '悬浮球与外观', 'Ball & appearance'),
            },
            AppearanceSettings,
          )
        })
        const host = document.createElement('div')
        host.setAttribute('data-dqc-embedded-host', '')
        document.body.append(host)
        const root = ReactDOM.createRoot(host)
        root.render(h(QuickChatShell, { controller }))
        ctx.effect(
          () => () => {
            try {
              root.unmount()
            } catch {
              /* noop */
            }
            host.remove()
          },
          'quick-chat: embedded panel',
        )
      }

      try {
        window.__dshQuickChat = controller
      } catch {
        /* debugging handle is optional */
      }
    }

    exports.name = 'quick-chat'
    exports.inject = inject
    exports.apply = apply
    return module.exports
  },
})
