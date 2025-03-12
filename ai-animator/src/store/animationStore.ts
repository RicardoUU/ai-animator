import { create } from 'zustand';
import { AnimationHistory, AnimationParams, AIModelType } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface AnimationState {
  // 当前动画代码
  currentCode: string;
  // 当前动画参数
  currentParams: AnimationParams;
  // 动画历史记录
  history: AnimationHistory[];
  // 当前选中的模板ID
  selectedTemplateId: string | null;
  // 当前使用的AI模型类型
  currentModelType: AIModelType;
  // 用户输入的提示词
  userPrompt: string;
  // 是否正在生成动画
  isGenerating: boolean;
  // 错误信息
  error: string | null;
  
  // 动作
  setCurrentCode: (code: string) => void;
  setCurrentParams: (params: AnimationParams) => void;
  addToHistory: (description: string) => void;
  clearHistory: () => void;
  setSelectedTemplateId: (id: string | null) => void;
  setCurrentModelType: (modelType: AIModelType) => void;
  setUserPrompt: (prompt: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setError: (error: string | null) => void;
  resetState: () => void; // 重置所有状态到初始值
}

// 初始状态定义
const initialState = {
  currentCode: '',
  currentParams: {
    duration: 1,
    ease: 'power2.out',
    delay: 0
  },
  history: [],
  selectedTemplateId: null,
  currentModelType: 'qianwen', // 默认使用千问模型
  userPrompt: '',
  isGenerating: false,
  error: null,
};

// 创建状态存储
export const useAnimationStore = create<AnimationState>((set) => ({
  // 使用初始状态
  ...initialState,
  
  // 动作实现
  setCurrentCode: (code) => set({ currentCode: code }),
  
  setCurrentParams: (params) => set({ currentParams: params }),
  
  addToHistory: (description) => set((state) => ({
    history: [
      ...state.history,
      {
        id: uuidv4(),
        timestamp: Date.now(),
        description,
        code: state.currentCode,
        params: state.currentParams
      }
    ]
  })),
  
  clearHistory: () => set({ history: [] }),
  
  setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),
  
  setCurrentModelType: (modelType) => set({ currentModelType: modelType }),
  
  setUserPrompt: (prompt) => set({ userPrompt: prompt }),
  
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  
  setError: (error) => set({ error }),
  
  // 重置所有状态到初始值
  resetState: () => set(initialState)
}));