import React, { useEffect, useState } from 'react';

// Define the Chrome Memory Performance API extension
interface MemoryInfo {
  totalJSHeapSize: number;
  usedJSHeapSize: number;
  jsHeapSizeLimit: number;
}

// Define the legacy timing API properties we need
interface LegacyTiming {
  navigationStart?: number;
  loadEventEnd?: number;
}

// Extend the Performance interface to include Chrome's memory property
interface ExtendedPerformance extends Omit<Performance, 'timing'> {
  memory?: MemoryInfo;
  timing?: LegacyTiming;
}

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  loadTime: number;
  renderTime: number;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    loadTime: 0,
    renderTime: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Cast performance to our extended interface
        const perf = performance as ExtendedPerformance;
        
        setMetrics(prev => ({
          ...prev,
          fps,
          memoryUsage: perf.memory ? 
            Math.round(perf.memory.usedJSHeapSize / 1048576) : 0,
          loadTime: Math.round(performance.timing?.loadEventEnd - performance.timing?.navigationStart) || 0,
          renderTime: Math.round(performance.now())
        }));
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    // Toggle visibility with Ctrl+Shift+P
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg font-mono text-sm z-50 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Performance Monitor</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/60 hover:text-white"
        >
          ×
        </button>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={metrics.fps < 30 ? "text-red-400" : metrics.fps < 50 ? "text-yellow-400" : "text-green-400"}>
            {metrics.fps}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Memory:</span>
          <span className={metrics.memoryUsage > 100 ? "text-red-400" : "text-green-400"}>
            {metrics.memoryUsage}MB
          </span>
        </div>
        <div className="flex justify-between">
          <span>Load Time:</span>
          <span>{metrics.loadTime}ms</span>
        </div>
        <div className="flex justify-between">
          <span>Render Time:</span>
          <span>{metrics.renderTime}ms</span>
        </div>
      </div>
      <div className="mt-2 text-xs text-white/60">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
};

export default PerformanceMonitor;
