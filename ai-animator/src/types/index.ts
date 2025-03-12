// 定义动画模板类型
export interface AnimationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
  previewImageUrl?: string;
}

// 定义动画参数类型
export interface AnimationParams {
  duration: number;
  ease: string;
  delay: number;
  [key: string]: any; // 允许其他自定义参数
}

// 定义动画历史记录类型
export interface AnimationHistory {
  id: string;
  timestamp: number;
  description: string;
  code: string;
  params: AnimationParams;
}

// 定义大模型API类型
export type AIModelType = 'qianwen' | 'openai' | 'doubao' | 'deepseek';

// 定义大模型API请求参数
export interface AIModelRequestParams {
  prompt: string;
  modelType: AIModelType;
  apiKey?: string;
  temperature?: number;
  maxTokens?: number;
}

// 定义大模型API响应
export interface AIModelResponse {
  code: string;
  explanation?: string;
  error?: string;
}

// 定义动画导出格式
export type ExportFormat = 'js' | 'html' | 'react';