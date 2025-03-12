import { AIModelRequestParams, AIModelResponse, AIModelType } from '../types';

// 获取模型的显示名称
const getModelDisplayName = (modelType: AIModelType): string => {
  switch (modelType) {
    case 'qianwen':
      return '千问';
    case 'openai':
      return 'OpenAI';
    case 'doubao':
      return '豆包';
    case 'deepseek':
      return 'DeepSeek';
    default:
      return modelType;
  }
};

// 模拟API调用的延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 默认提示词模板
const DEFAULT_PROMPT_TEMPLATE = `
请根据以下描述生成GSAP动画代码：

{userPrompt}

请只返回可执行的GSAP代码，不要包含任何解释或其他内容。代码应该可以直接应用于ID为"animationTarget"的HTML元素。
`;

// 处理不同大模型API的请求
export const generateAnimationCode = async (params: AIModelRequestParams): Promise<AIModelResponse> => {
  try {
    // 在实际项目中，这里会根据不同的modelType调用不同的API
    // 目前使用模拟数据进行演示
    
    // 模拟API调用延迟
    await delay(1500);
    
    const { prompt, modelType, apiKey } = params;
    
    // 检查API Key是否存在
    if (!apiKey) {
      return {
        code: '',
        error: `请先设置${getModelDisplayName(modelType)} API Key`
      };
    }
    
    // 根据不同的模型类型返回不同的模拟响应
    switch (modelType) {
      case 'qianwen':
        return mockQianwenResponse(prompt);
      case 'openai':
        return mockOpenAIResponse(prompt);
      case 'doubao':
        return mockDoubaoResponse(prompt);
      case 'deepseek':
        return mockDeepseekResponse(prompt);
      default:
        return mockQianwenResponse(prompt); // 默认使用千问
    }
  } catch (error) {
    return {
      code: '',
      error: `生成动画代码时出错: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

// 格式化用户提示
export const formatPrompt = (userPrompt: string): string => {
  return DEFAULT_PROMPT_TEMPLATE.replace('{userPrompt}', userPrompt);
};

// 以下是模拟各个大模型API的响应
// 在实际项目中，这些函数会被替换为真实的API调用

const mockQianwenResponse = (prompt: string): AIModelResponse => {
  // 简单解析提示中的关键词来生成相应的动画代码
  const code = generateMockCodeFromPrompt(prompt);
  
  return {
    code,
    explanation: '基于千问大模型生成的动画代码'
  };
};

const mockOpenAIResponse = (prompt: string): AIModelResponse => {
  const code = generateMockCodeFromPrompt(prompt);
  
  return {
    code,
    explanation: '基于OpenAI大模型生成的动画代码'
  };
};

const mockDoubaoResponse = (prompt: string): AIModelResponse => {
  const code = generateMockCodeFromPrompt(prompt);
  
  return {
    code,
    explanation: '基于豆包大模型生成的动画代码'
  };
};

const mockDeepseekResponse = (prompt: string): AIModelResponse => {
  const code = generateMockCodeFromPrompt(prompt);
  
  return {
    code,
    explanation: '基于DeepSeek大模型生成的动画代码'
  };
};

// 根据提示词中的关键词生成模拟动画代码
const generateMockCodeFromPrompt = (prompt: string): string => {
  const promptLower = prompt.toLowerCase();
  
  // 根据提示中的关键词生成不同的动画代码
  if (promptLower.includes('淡入') || promptLower.includes('fade in')) {
    return `
gsap.fromTo("#animationTarget", 
  { opacity: 0 }, 
  { opacity: 1, duration: 1.5, ease: "power2.out" }
);
    `;
  } else if (promptLower.includes('淡出') || promptLower.includes('fade out')) {
    return `
gsap.to("#animationTarget", { 
  opacity: 0, 
  duration: 1.5, 
  ease: "power2.in" 
});
    `;
  } else if (promptLower.includes('旋转') || promptLower.includes('rotate')) {
    const degrees = promptLower.includes('360') ? 360 : 180;
    return `
gsap.to("#animationTarget", { 
  rotation: ${degrees}, 
  duration: 2, 
  ease: "power1.inOut" 
});
    `;
  } else if (promptLower.includes('弹跳') || promptLower.includes('bounce')) {
    return `
gsap.fromTo("#animationTarget",
  { y: -50 },
  { y: 0, duration: 1.5, ease: "bounce.out" }
);
    `;
  } else if (promptLower.includes('左') || promptLower.includes('left')) {
    return `
gsap.fromTo("#animationTarget", 
  { x: -100, opacity: 0 },
  { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
);
    `;
  } else if (promptLower.includes('右') || promptLower.includes('right')) {
    return `
gsap.fromTo("#animationTarget", 
  { x: 100, opacity: 0 },
  { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
);
    `;
  } else if (promptLower.includes('上') || promptLower.includes('top')) {
    return `
gsap.fromTo("#animationTarget", 
  { y: -100, opacity: 0 },
  { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
);
    `;
  } else if (promptLower.includes('下') || promptLower.includes('bottom')) {
    return `
gsap.fromTo("#animationTarget", 
  { y: 100, opacity: 0 },
  { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
);
    `;
  } else if (promptLower.includes('放大') || promptLower.includes('scale up')) {
    return `
gsap.fromTo("#animationTarget",
  { scale: 0 },
  { scale: 1, duration: 1.2, ease: "back.out(1.7)" }
);
    `;
  } else if (promptLower.includes('缩小') || promptLower.includes('scale down')) {
    return `
gsap.fromTo("#animationTarget",
  { scale: 1.5 },
  { scale: 1, duration: 1.2, ease: "power2.out" }
);
    `;
  } else {
    // 默认动画
    return `
gsap.fromTo("#animationTarget",
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
);
    `;
  }
};