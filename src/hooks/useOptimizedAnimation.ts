import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { AnimationManager, prefersReducedMotion, createIntersectionObserver, Animation } from '@/lib/performance';

gsap.registerPlugin(ScrollTrigger, CSSPlugin);

// Type assertion function to convert GSAP animation to our Animation interface
function asAnimation(animation: gsap.core.Timeline | gsap.core.Tween): Animation {
  return animation as unknown as Animation;
}

interface AnimationConfig {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  toggleActions?: string;
  onUpdate?: (self: ScrollTrigger) => void;
  markers?: boolean;
}

interface UseOptimizedAnimationOptions {
  disabled?: boolean;
  respectReducedMotion?: boolean;
  useIntersectionObserver?: boolean;
  threshold?: number;
}

export const useOptimizedAnimation = (
  animationFn: () => gsap.core.Timeline | gsap.core.Tween | void,
  deps: React.DependencyList = [],
  options: UseOptimizedAnimationOptions = {}
) => {
  const {
    disabled = false,
    respectReducedMotion = true,
    useIntersectionObserver = true,
    threshold = 0.1
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasAnimated = useRef(false);
  const animationManager = AnimationManager.getInstance();

  const runAnimation = useCallback(() => {
    if (disabled || (respectReducedMotion && prefersReducedMotion()) || hasAnimated.current) {
      return;
    }

    // Clean up previous animation
    if (animationRef.current) {
      animationManager.removeAnimation(asAnimation(animationRef.current));
    }

    // Run the animation
    const animation = animationFn();
    if (animation) {
      animationRef.current = animation;
      animationManager.addAnimation(asAnimation(animation));
      hasAnimated.current = true;
    }
  }, [animationFn, disabled, respectReducedMotion, animationManager]);

  useEffect(() => {
    if (!elementRef.current || disabled) return;

    if (useIntersectionObserver) {
      // Use Intersection Observer for better performance
      const observer = createIntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated.current) {
              runAnimation();
            }
          });
        },
        { threshold }
      );

      observer.observe(elementRef.current);
      observerRef.current = observer;
      animationManager.addObserver(observer);

      return () => {
        observer.disconnect();
        animationManager.removeObserver(observer);
      };
    } else {
      // Run animation immediately
      runAnimation();
    }
  }, [runAnimation, useIntersectionObserver, threshold, disabled, animationManager]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationManager.removeAnimation(asAnimation(animationRef.current));
      }
      if (observerRef.current) {
        animationManager.removeObserver(observerRef.current);
      }
    };
  }, [animationManager]);

  return elementRef;
};

export const useScrollTriggerAnimation = (
  animationFn: () => gsap.core.Timeline | gsap.core.Tween,
  config: AnimationConfig = {},
  deps: React.DependencyList = [],
  options: UseOptimizedAnimationOptions = {}
) => {
  const {
    disabled = false,
    respectReducedMotion = true
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const animationManager = AnimationManager.getInstance();

  useEffect(() => {
    if (!elementRef.current || disabled || (respectReducedMotion && prefersReducedMotion())) {
      return;
    }

    // Clean up previous animation and scroll trigger
    if (animationRef.current) {
      animationManager.removeAnimation(asAnimation(animationRef.current));
    }
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    // Create new animation with ScrollTrigger
    const animation = animationFn();
    if (animation) {
      const scrollTrigger = ScrollTrigger.create({
        trigger: config.trigger || elementRef.current,
        start: config.start || "top 80%",
        end: config.end,
        scrub: config.scrub,
        toggleActions: config.toggleActions,
        onUpdate: config.onUpdate,
        markers: config.markers,
        animation: animation,
        invalidateOnRefresh: true
      });

      animationRef.current = animation;
      scrollTriggerRef.current = scrollTrigger;
      animationManager.addAnimation(asAnimation(animation));
    }

    return () => {
      if (animationRef.current) {
        animationManager.removeAnimation(asAnimation(animationRef.current));
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [animationFn, config, disabled, respectReducedMotion, animationManager]);

  return elementRef;
};

// Batch ScrollTrigger refresh for better performance
export const useBatchedScrollTriggerRefresh = () => {
  const refreshTimeoutRef = useRef<NodeJS.Timeout>();

  const batchRefresh = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    refreshTimeoutRef.current = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  return batchRefresh;
};
