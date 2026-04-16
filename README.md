# AI Deduction Game

一个以聊天盘问为核心的中文推理游戏原型。玩家通过联系人面板、证物、疑点和开放式结案输入，逐步还原案件真相。

当前内置案件为 `Spring Has Come：毕业典礼广播室旧案`。玩家以鸠村雄二的视角，在十五年后的同学会上重新追查一桩校园旧案，并与旧同学、老师，以及只有自己能看见的支仓春美对话。

## 技术栈

- 前端：React 19 + Vite + TypeScript
- 后端：Express 5 + TypeScript
- AI 接口：Ark `responses` API
- 运行方式：npm workspaces

## 当前功能

- 联系人列表与系统面板
- NPC 对话与状态变化
- 证物与疑点解锁
- 开放式结案判定
- `剧情 / 证物 / 疑点` 系统页专用展示
- Ark 接口接入与本地规则回退

## 项目结构

```text
ai-deduction-game/
├─ apps/
│  ├─ server/    # Express 后端
│  └─ web/       # React 前端
├─ docs/         # 设计文档与接口说明
├─ resources/    # 美术、音频、Prompt 占位
└─ README.md
```

## 本地启动

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

服务端环境变量示例文件在 [`apps/server/.env.example`](apps/server/.env.example)。

如果只想本地跑规则版，不接真实 AI，可保持：

```env
AI_PROVIDER=mock
```

如果要接 Ark：

```env
PORT=3001
AI_PROVIDER=ark
ARK_API_KEY=your_api_key
ARK_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
ARK_MODEL=your_model_id
```

### 3. 启动开发环境

```bash
npm run dev
```

- 前端默认地址：`http://localhost:5173`
- 后端默认地址：`http://localhost:3001`

### 4. 构建

```bash
npm run build
```

## 当前案件说明

当前案件围绕以下问题展开：

- 谁在毕业典礼上播放了 `《燃北》`
- 对方是如何从锁着的广播室中脱身的
- 为什么要反锁房门
- 为什么把“自首”留到十五年后
- 这场恶作剧背后的真正动机是什么

## 开发说明

- 当前服务端是内存态 store，重启后案件进度会重置
- `剧情` 页初始信息使用栏目卡展示，后续剧情更新仍使用普通气泡
- 证物与疑点系统页不再显示历史聊天气泡

## 建议补充

如果你准备继续做成正式项目，下一步通常是：

1. 接入正式立绘和证物图片
2. 将内存态进度改为数据库存储
3. 增加存档、多案件与多结局
4. 补充测试和 CI

## License

本项目使用 MIT License，见 [`LICENSE`](LICENSE)。
