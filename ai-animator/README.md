# AI-Animator

## 项目介绍

AI-Animator 是一个创新的网页动画生成工具，旨在通过大模型将通用语言转化为专业的GSAP动画代码。本项目降低了创建网页动画的门槛，让非专业人士也能通过简单的语言描述生成专业级别的动画效果。

## 功能特点

- **自然语言生成动画**：输入如"让logo从左侧飞入并旋转360度"等描述，自动生成对应的动画效果
- **多种大模型支持**：集成多种大模型API（千问、OpenAI、豆包、DeepSeek），默认使用千问
- **实时预览**：在编辑动画参数时，实时查看动画效果的变化
- **动画模板库**：提供常见动画效果的模板，如淡入淡出、弹跳、滑动等
- **代码导出**：支持将动画导出为GSAP代码，方便集成到实际项目中
- **动画历史记录**：保存生成的动画历史，方便对比和重用
- **参数微调**：支持对生成的动画进行参数调整和自定义

## 技术栈

- **前端框架**：React 19 + TypeScript
- **状态管理**：Zustand
- **UI组件库**：Material UI 6
- **动画引擎**：GSAP (GreenSock Animation Platform)
- **大模型集成**：千问API、OpenAI API、豆包API、DeepSeek API
- **构建工具**：Vite 6

## 项目结构

```
ai-animator/
├── public/            # 静态资源
│   └── templates/     # 动画模板预览图
├── src/
│   ├── components/    # 组件
│   │   ├── AnimationEditor/    # 动画编辑器
│   │   ├── AnimationPreview/   # 动画预览
│   │   ├── TemplateLibrary/    # 模板库
│   │   └── common/             # 通用组件
│   ├── services/      # 服务
│   │   ├── aiModelService.ts   # AI模型服务
│   │   └── templateService.ts  # 模板服务
│   ├── store/         # 状态管理
│   ├── types/         # 类型定义
│   └── utils/         # 工具函数
└── package.json       # 项目依赖
```

## 安装与使用

### 环境要求

- Node.js 18.0 或更高版本
- npm 9.0 或更高版本

### 安装步骤

1. 克隆项目到本地

```bash
git clone https://github.com/RicardoUU/ai-animator.git
cd ai-animator
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 在浏览器中访问 `http://localhost:5173`

### 使用方法

1. 在动画编辑器中输入你想要的动画描述，如"让元素从顶部滑入并放大
