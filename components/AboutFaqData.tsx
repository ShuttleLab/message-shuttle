export type Bilingual = { zh: string; en: string };
export type Step = Bilingual;
export type FaqItem = { q: Bilingual; a: Bilingual };
export type HowTo = { id: string; name: Bilingual; steps: Step[] };

export const WHO_FOR: Bilingual[] = [
  {
    zh: "需要把密码、token、凭证发给同事，又不想留在 IM 历史里的工程师",
    en: "Engineers who need to send passwords, tokens, or credentials to colleagues without leaving them in chat history",
  },
  {
    zh: "临时给朋友发一段隐私文本（地址、电话）想阅后即焚的普通用户",
    en: "Casual users who want to share private text (addresses, phone numbers) that self-destructs after reading",
  },
  {
    zh: "跨公司的法务 / 合规人员，需要传输一次性敏感字段",
    en: "Legal or compliance staff transferring one-time sensitive fields across organizations",
  },
  {
    zh: "教师需要传单次答题码或链接给学生",
    en: "Teachers sending one-time answer codes or links to students",
  },
];

export const WHEN_USE: Bilingual[] = [
  {
    zh: "同事忘了 Wi-Fi 密码，你想发给他但不想留在群聊记录里",
    en: "A colleague forgot the Wi-Fi password and you don't want it sitting in the group chat",
  },
  {
    zh: "临时把 API key 发给协作开发者，用完即焚",
    en: "Temporarily share an API key with a co-developer — gone after they read it",
  },
  {
    zh: "给客户传一段需要他单次查看的验证码（如 OTP）",
    en: "Send a client a one-time code (e.g. OTP) they only need to see once",
  },
  {
    zh: "给朋友发地址或电话号码，不想留在云端聊天记录",
    en: "Share an address or phone number with a friend without cloud chat history",
  },
  {
    zh: "把银行账号信息一次性传给家人",
    en: "Send bank account details to a family member — one-time pickup, then auto-deleted",
  },
];

export const HOWTOS: HowTo[] = [
  {
    id: "send",
    name: { zh: "如何发送一条消息", en: "How to send a message" },
    steps: [
      { zh: "打开 Message Shuttle 首页，点击「开始发送」", en: "Open the Message Shuttle homepage and click 'Start Sending'" },
      { zh: "在文本框中输入要传递的消息内容", en: "Type your message into the text box" },
      { zh: "点击「发送消息」，系统生成一个 4 位取件码", en: "Click 'Send Message' — the system generates a 4-character pickup code" },
      { zh: "复制取件码或使用「一键转发」分享给接收者", en: "Copy the code or use the share button to send it to the recipient" },
    ],
  },
  {
    id: "receive",
    name: { zh: "如何收取消息", en: "How to receive a message" },
    steps: [
      { zh: "打开 Message Shuttle 首页，点击「开始接收」", en: "Open the Message Shuttle homepage and click 'Start Receiving'" },
      { zh: "输入 4 位取件码", en: "Enter the 4-character pickup code" },
      { zh: "点击「确认收取」，消息内容自动复制到剪贴板", en: "Click 'Confirm' — the message content is copied to your clipboard automatically" },
    ],
  },
  {
    id: "burn",
    name: { zh: "如何确保消息阅后即焚", en: "How burn-after-reading works" },
    steps: [
      { zh: "发送消息时，默认启用 24 小时过期（TTL = 86400 秒）", en: "When sending, the default 24-hour TTL (86,400 s) is applied automatically" },
      { zh: "接收者点击「确认收取」后，消息立即从服务器删除", en: "When the recipient clicks 'Confirm', the message is deleted from the server immediately" },
      { zh: "同一个取件码无法重复使用——第二次收取会提示「取件码不存在」", en: "The same code cannot be reused — a second attempt returns 'Pickup code not found'" },
    ],
  },
];

export const FAQS: FaqItem[] = [
  {
    q: { zh: "Message Shuttle 免费吗？", en: "Is Message Shuttle free?" },
    a: { zh: "完全免费。无需注册账号，无广告，无内购。由 ShuttleLab 个人维护。", en: "Completely free — no signup, no ads, no in-app purchases. Maintained independently by ShuttleLab." },
  },
  {
    q: { zh: "消息阅后即焚是怎么实现的？取件码是一次性的吗？", en: "How does burn-after-reading work? Is the pickup code one-time?" },
    a: { zh: "是。接收者输入取件码后，服务器调用 getAndDelete 读取并立即删除该消息。同一个取件码第二次使用会返回 404。此外，消息默认 24 小时（86400 秒）后自动过期。", en: "Yes. When the recipient enters the code, the server calls getAndDelete — read and immediate delete in one operation. A second attempt returns 404. Additionally, every message expires after 24 hours (86,400 seconds) by default." },
  },
  {
    q: { zh: "消息加密吗？是端到端加密还是仅服务器加密？", en: "Is the message encrypted? End-to-end or server-side only?" },
    a: { zh: "消息在 Cloudflare KV 存储中由基础设施层加密（encryption at rest），但不是端到端加密。服务器技术上可以读取消息内容。我们不记录消息内容，且消息阅后即焚、超时自动删除。", en: "Messages are encrypted at rest by Cloudflare KV infrastructure, but this is NOT end-to-end encryption. The server can technically read message content. We do not log message content, and messages are deleted on read or after 24 hours." },
  },
  {
    q: { zh: "消息最长多少字符？", en: "What is the maximum message length?" },
    a: { zh: "应用层没有设置字符上限。实际限制来自 Cloudflare KV 单个值最大 25 MB。超出此限制的提交会被 KV 拒绝。", en: "There is no application-level character limit. The practical ceiling is Cloudflare KV's 25 MB per-value maximum. Submissions exceeding that will be rejected by KV." },
  },
  {
    q: { zh: "取件码多长？被猜到的概率有多大？", en: "How long is the pickup code? Can it be guessed?" },
    a: { zh: "取件码为 4 位大写十六进制字符（0-9, A-F），共 65,536 种可能。由 crypto.randomUUID() 的前 4 位生成。单次随机猜中的概率约 0.0015%。", en: "The pickup code is 4 uppercase hex characters (0–9, A–F), giving 65,536 possible combinations. Generated from the first 4 characters of crypto.randomUUID(). The probability of a single random guess is about 0.0015%." },
  },
  {
    q: { zh: "如果对方没有及时取件，消息保留多久？", en: "How long does a message last if the recipient doesn't pick it up?" },
    a: { zh: "默认保留 24 小时。到期后 Cloudflare KV 自动删除消息，无需人工清理。", en: "24 hours by default. After that, Cloudflare KV automatically deletes the message — no manual cleanup needed." },
  },
  {
    q: { zh: "我能撤回已发送但未被取的消息吗？", en: "Can I recall a message that hasn't been picked up yet?" },
    a: { zh: "API 层支持 DELETE /api/messages/{id}，可以通过取件码删除未读消息。当前版本没有提供撤回按钮的前端界面。", en: "The API supports DELETE /api/messages/{id} — you can delete an unread message by its pickup code. The current version does not expose a recall button in the UI." },
  },
  {
    q: { zh: "Message Shuttle 和 PrivNote / OneTimeSecret 有什么区别？", en: "How is Message Shuttle different from PrivNote or OneTimeSecret?" },
    a: { zh: "PrivNote 和 OneTimeSecret 是老牌一次性消息工具，部分功能需付费。Message Shuttle 完全免费、无需注册、支持中英双语，且部署在 Cloudflare 全球边缘网络上，延迟更低。三者均不是端到端加密。", en: "PrivNote and OneTimeSecret are established one-time message tools; some features require payment. Message Shuttle is entirely free, needs no signup, supports Chinese/English, and runs on Cloudflare's global edge network for lower latency. None of the three offer end-to-end encryption." },
  },
  {
    q: { zh: "服务器会存我的消息日志吗？", en: "Does the server store message logs?" },
    a: { zh: "不存储。代码中仅在发生错误时调用 console.error，不记录消息内容。消息在 KV 中以原始文本存储，阅后即焚，过期自动清除。", en: "No. The code only calls console.error on errors — message content is never logged. Messages are stored as raw text in KV, deleted on read, and auto-expired." },
  },
  {
    q: { zh: "适合传密码或凭证吗？", en: "Is it suitable for sharing passwords or credentials?" },
    a: { zh: "适合一次性传递场景。密码不会留在聊天记录中，24 小时后自动过期，取件后立即销毁。但请注意：这不是端到端加密，服务器技术上可读取内容。高安全需求请结合 GPG 等工具使用。", en: "Yes for one-time sharing. The password won't sit in chat history, auto-expires in 24 hours, and is destroyed on pickup. Caveat: this is not end-to-end encrypted — the server can technically read content. For high-security needs, combine with tools like GPG." },
  },
];

export const COMPARISON = {
  zh: {
    heading: "Message Shuttle 与同类工具对比",
    columns: ["工具", "无需账号", "阅后即焚", "设置过期时长", "跨平台", "免费", "端到端加密"],
    rows: [
      ["Message Shuttle", "✓", "✓", "✓ (默认24h)", "✓ (Web)", "✓", "—"],
      ["PrivNote", "✓", "✓", "✓", "✓ (Web)", "部分", "—"],
      ["OneTimeSecret", "✓", "✓", "✓", "✓ (Web)", "部分", "—"],
      ["Signal 阅后即焚", "— (需注册)", "✓", "✓", "✓ (App)", "✓", "✓"],
      ["微信撤回", "— (需注册)", "不可靠", "—", "✓ (App)", "✓", "—"],
    ],
  },
  en: {
    heading: "Message Shuttle vs alternatives",
    columns: ["Tool", "No Account", "Burn After Read", "Custom TTL", "Cross-Platform", "Free", "End-to-End Encrypted"],
    rows: [
      ["Message Shuttle", "✓", "✓", "✓ (24h default)", "✓ (Web)", "✓", "—"],
      ["PrivNote", "✓", "✓", "✓", "✓ (Web)", "Partial", "—"],
      ["OneTimeSecret", "✓", "✓", "✓", "✓ (Web)", "Partial", "—"],
      ["Signal Disappearing", "— (signup)", "✓", "✓", "✓ (App)", "✓", "✓"],
      ["WeChat Recall", "— (signup)", "Unreliable", "—", "✓ (App)", "✓", "—"],
    ],
  },
};

export const HEADINGS = {
  whoFor: { zh: "Message Shuttle 适合谁？", en: "Who is Message Shuttle for?" },
  whenUse: { zh: "什么时候用 Message Shuttle？", en: "When should I use Message Shuttle?" },
  howTo: { zh: "操作步骤", en: "How to use" },
  faq: { zh: "常见问题", en: "Frequently Asked Questions" },
};

export const aboutFaqData = { FAQS, HOWTOS, COMPARISON };
