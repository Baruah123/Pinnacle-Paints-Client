// Performance optimization utilities

// Define a type for generic function parameters
type AnyFunction = (...args: unknown[]) => unknown;

export const debounce = <T extends AnyFunction>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends AnyFunction>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const requestIdleCallback = (callback: () => void) => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback);
  } else {
    return setTimeout(callback, 1);
  }
};

export const cancelIdleCallback = (id: number) => {
  if ('cancelIdleCallback' in window) {
    return window.cancelIdleCallback(id);
  } else {
    return clearTimeout(id);
  }
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Image optimization utilities
export const optimizeImageUrl = (url: string, width?: number, quality = 80) => {
  if (url.includes('unsplash.com')) {
    const params = new URLSearchParams();
    
    // Make sure we're requesting a large enough image for all devices
    // This ensures the image fully covers the container
    const deviceWidth = typeof window !== 'undefined' ? Math.max(window.innerWidth, 1200) : 1920;
    const imageWidth = width || deviceWidth;
    
    params.set('w', imageWidth.toString());
    params.set('q', quality.toString());
    params.set('auto', 'format');
    params.set('fit', 'crop');
    
    return `${url}&${params.toString()}`;
  }
  return url;
};

// Interface for animation objects that works with GSAP animations
export interface Animation {
  kill?: () => void;
  pause?: () => void;
  play?: () => void;
  progress?: (value?: number) => number | Animation;
  restart?: () => Animation;
  reverse?: () => Animation;
  invalidate?: () => Animation;
  isActive?: () => boolean;
  time?: (value?: number) => number | Animation;
  duration?: (value?: number) => number | Animation;
  totalDuration?: (value?: number) => number | Animation;
  [key: string]: unknown;
}

// Memory management for animations
export class AnimationManager {
  private static instance: AnimationManager;
  private animations: Set<Animation> = new Set();
  private observers: Set<IntersectionObserver> = new Set();

  static getInstance() {
    if (!AnimationManager.instance) {
      AnimationManager.instance = new AnimationManager();
    }
    return AnimationManager.instance;
  }

  addAnimation(animation: Animation) {
    this.animations.add(animation);
  }

  removeAnimation(animation: Animation) {
    this.animations.delete(animation);
    if (animation && typeof animation.kill === 'function') {
      animation.kill();
    }
  }

  addObserver(observer: IntersectionObserver) {
    this.observers.add(observer);
  }

  removeObserver(observer: IntersectionObserver) {
    this.observers.delete(observer);
    observer.disconnect();
  }

  cleanup() {
    this.animations.forEach(animation => {
      if (animation && typeof animation.kill === 'function') {
        animation.kill();
      }
    });
    this.animations.clear();

    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

// Reduce motion preference check
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Viewport size utilities
export const getViewportSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
});

export const isMobile = () => window.innerWidth < 768;
export const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;
export const isDesktop = () => window.innerWidth >= 1024;
