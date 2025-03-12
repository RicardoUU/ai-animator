import gsap from 'gsap';

// 将GSAP挂载到window对象上
declare global {
  interface Window {
    gsap: typeof gsap;
  }
}

window.gsap = gsap;