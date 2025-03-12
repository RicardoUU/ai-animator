import { AnimationTemplate } from '../types';

// 预定义的动画模板集合
const templates: AnimationTemplate[] = [
  {
    id: 'fade-in',
    name: '淡入',
    description: '元素从透明到不透明的渐变效果',
    category: '基础',
    code: `
gsap.to(element, {
  opacity: 1,
  duration: 1,
  ease: "power2.out"
});
    `,
    previewImageUrl: '/templates/fade-in.png'
  },
  {
    id: 'fade-out',
    name: '淡出',
    description: '元素从不透明到透明的渐变效果',
    category: '基础',
    code: `
gsap.to(element, {
  opacity: 0,
  duration: 1,
  ease: "power2.in"
});
    `,
    previewImageUrl: '/templates/fade-out.png'
  },
  {
    id: 'slide-in-left',
    name: '从左滑入',
    description: '元素从左侧滑入视图',
    category: '移动',
    code: `
gsap.fromTo(element, 
  { x: -100, opacity: 0 },
  { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
);
    `,
    previewImageUrl: '/templates/slide-in-left.png'
  },
  {
    id: 'bounce',
    name: '弹跳',
    description: '元素弹跳效果',
    category: '特效',
    code: `
gsap.fromTo(element,
  { y: -50 },
  { y: 0, duration: 1, ease: "bounce.out" }
);
    `,
    previewImageUrl: '/templates/bounce.png'
  },
  {
    id: 'rotate-360',
    name: '旋转360度',
    description: '元素旋转一周',
    category: '旋转',
    code: `
gsap.to(element, {
  rotation: 360,
  duration: 2,
  ease: "power1.inOut"
});
    `,
    previewImageUrl: '/templates/rotate-360.png'
  },
  {
    id: 'scale-up',
    name: '放大',
    description: '元素从小变大',
    category: '缩放',
    code: `
gsap.fromTo(element,
  { scale: 0 },
  { scale: 1, duration: 1, ease: "back.out(1.7)" }
);
    `,
    previewImageUrl: '/templates/scale-up.png'
  },
  {
    id: 'shake',
    name: '抖动',
    description: '元素左右抖动效果',
    category: '特效',
    code: `
gsap.to(element, {
  x: 10,
  duration: 0.1,
  repeat: 5,
  yoyo: true,
  ease: "none"
});
    `,
    previewImageUrl: '/templates/shake.png'
  },
  {
    id: 'flip',
    name: '翻转',
    description: '元素3D翻转效果',
    category: '3D',
    code: `
gsap.to(element, {
  rotationY: 180,
  duration: 1.5,
  ease: "power3.inOut"
});
    `,
    previewImageUrl: '/templates/flip.png'
  }
];

// 获取所有模板
export const getAllTemplates = (): AnimationTemplate[] => {
  return templates;
};

// 按类别获取模板
export const getTemplatesByCategory = (category: string): AnimationTemplate[] => {
  return templates.filter(template => template.category === category);
};

// 获取单个模板
export const getTemplateById = (id: string): AnimationTemplate | undefined => {
  return templates.find(template => template.id === id);
};

// 获取所有可用的模板类别
export const getAllCategories = (): string[] => {
  const categories = new Set(templates.map(template => template.category));
  return Array.from(categories);
};