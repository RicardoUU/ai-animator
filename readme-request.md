# AI-Animator

## Description

使用大模型将通用语言转化为动画，基于大模型API生成gsap动画或语法。AI-Animator 旨在降低创建网页动画的门槛，让非专业人士也能通过简单的语言描述生成专业级别的动画效果。

## Features
 - 使用大模型创建动画
 - 支持多种大模型API（如OpenAI、千问，豆包，DeepSeek),默认千问
 - 基于大模型API生成gsap动画或语法
 - 提供直观的用户界面，支持动画预览和编辑
 - 支持导出动画为JavaScript代码或HTML文件
 - 提供动画模板库，方便用户快速创建常见动画效果
 - 支持自然语言描述转换为动画效果
 - 实时渲染动画预览
 - 支持动画参数微调和自定义
 - 提供动画历史记录和版本对比
 - 支持动画组合和序列化

## 技术栈

- 前端：React + TypeScript + GSAP
- 状态管理：Redux/Zustand
- UI组件库：Material UI
- 大模型集成：千问API、OpenAI API、豆包API、DeepSeek API
- 动画引擎：GSAP (GreenSock Animation Platform)
- 构建工具：Vite
- 测试框架：Jest + React Testing Library
- 部署：Docker + Nginx

## 使用场景

- 网页设计师快速创建交互动画
- 前端开发者生成复杂动画代码
- 教育工作者创建教学演示动画
- 内容创作者为演示文稿添加动态效果
- 产品经理制作交互原型
- 营销人员创建吸引人的广告动画
- 学生学习动画原理和编程

## 项目规划

### 第一阶段（MVP）
- 搭建基础项目框架
- 集成OpenAI API
- 实现基本的文本到GSAP代码转换
- 开发简单的动画预览功能
- 实现基础用户界面
- 支持简单动画导出

### 第二阶段（增强功能）
- 集成更多大模型API（千问、豆包、DeepSeek）
- 优化用户界面和交互体验
- 添加动画模板库
- 完善动画导出功能
- 添加动画参数调整界面
- 实现动画历史记录

### 第三阶段（高级功能）
- 添加高级动画编辑功能
- 优化自然语言理解能力
- 支持更复杂的动画效果
- 性能优化和用户体验改进
- 添加动画组合功能

## 核心功能详解

### 自然语言转动画
用户可以通过输入如"让logo从左侧飞入并旋转360度"等描述，系统自动生成对应的动画效果。

### 模板库
提供常见动画效果的模板，如淡入淡出、弹跳、滑动等，用户可以直接选用并进行自定义调整。

### 实时预览
用户在编辑动画参数时，可以实时看到动画效果的变化，无需等待重新生成。

### 代码导出
支持将动画导出为GSAP代码、React组件或完整HTML文件，方便集成到实际项目中。

## 安装与使用

待开发完成后补充...

## 贡献指南

待开发完成后补充...

## 许可证

MIT


