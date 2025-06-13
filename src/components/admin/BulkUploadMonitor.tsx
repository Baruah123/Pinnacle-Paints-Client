import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Clock, 
  Zap, 
  Database, 
  Image,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface PerformanceMetrics {
  totalProducts: number;
  processedProducts: number;
  totalImages: number;
  uploadedImages: number;
  startTime: number;
  estimatedTimeRemaining: number;
  averageProcessingTime: number;
  uploadSpeed: number; // products per minute
  errorRate: number;
  memoryUsage?: number;
}

interface BulkUploadMonitorProps {
  isActive: boolean;
  metrics: PerformanceMetrics;
  onOptimizationSuggestion?: (suggestion: string) => void;
}

const BulkUploadMonitor: React.FC<BulkUploadMonitorProps> = ({
  isActive,
  metrics,
  onOptimizationSuggestion
}) => {
  const [realTimeMetrics, setRealTimeMetrics] = useState(metrics);
  const [performanceHistory, setPerformanceHistory] = useState<number[]>([]);

  useEffect(() => {
    setRealTimeMetrics(metrics);
    
    // Track performance history for trend analysis
    if (isActive && metrics.uploadSpeed > 0) {
      setPerformanceHistory(prev => [...prev.slice(-19), metrics.uploadSpeed]);
    }
  }, [metrics, isActive]);

  useEffect(() => {
    // Performance optimization suggestions
    if (isActive && onOptimizationSuggestion) {
      if (metrics.errorRate > 0.1) {
        onOptimizationSuggestion('High error rate detected. Consider reducing batch size or checking network connection.');
      }
      
      if (metrics.uploadSpeed < 10) {
        onOptimizationSuggestion('Slow upload speed detected. Consider optimizing image sizes or checking internet connection.');
      }
      
      if (metrics.memoryUsage && metrics.memoryUsage > 0.8) {
        onOptimizationSuggestion('High memory usage detected. Consider processing smaller batches.');
      }
    }
  }, [metrics, isActive, onOptimizationSuggestion]);

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m ${Math.round(seconds % 60)}s`;
    return `${Math.round(seconds / 3600)}h ${Math.round((seconds % 3600) / 60)}m`;
  };

  const formatSpeed = (speed: number): string => {
    if (speed < 1) return `${(speed * 60).toFixed(1)}/min`;
    return `${speed.toFixed(1)}/min`;
  };

  const getPerformanceStatus = (): { status: string; color: string; icon: React.ReactNode } => {
    if (!isActive) {
      return { status: 'Idle', color: 'text-gray-500', icon: <Clock className="w-4 h-4" /> };
    }
    
    if (metrics.errorRate > 0.2) {
      return { status: 'Issues Detected', color: 'text-red-500', icon: <AlertCircle className="w-4 h-4" /> };
    }
    
    if (metrics.uploadSpeed > 20) {
      return { status: 'Excellent', color: 'text-green-500', icon: <Zap className="w-4 h-4" /> };
    }
    
    if (metrics.uploadSpeed > 10) {
      return { status: 'Good', color: 'text-blue-500', icon: <TrendingUp className="w-4 h-4" /> };
    }
    
    return { status: 'Slow', color: 'text-orange-500', icon: <Activity className="w-4 h-4" /> };
  };

  const performanceStatus = getPerformanceStatus();
  const progressPercentage = metrics.totalProducts > 0 
    ? (metrics.processedProducts / metrics.totalProducts) * 100 
    : 0;
  
  const imageProgressPercentage = metrics.totalImages > 0 
    ? (metrics.uploadedImages / metrics.totalImages) * 100 
    : 0;

  const elapsedTime = isActive ? (Date.now() - metrics.startTime) / 1000 : 0;

  return (
    <Card className="border-charcoal/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-500" />
            <span>Performance Monitor</span>
          </div>
          <Badge 
            variant="outline" 
            className={`${performanceStatus.color} border-current`}
          >
            <div className="flex items-center space-x-1">
              {performanceStatus.icon}
              <span>{performanceStatus.status}</span>
            </div>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-charcoal">Products Progress</span>
              <span className="text-sm text-charcoal/60">
                {metrics.processedProducts} / {metrics.totalProducts}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="text-xs text-charcoal/60 mt-1">
              {progressPercentage.toFixed(1)}% Complete
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-charcoal">Images Progress</span>
              <span className="text-sm text-charcoal/60">
                {metrics.uploadedImages} / {metrics.totalImages}
              </span>
            </div>
            <Progress value={imageProgressPercentage} className="h-2" />
            <div className="text-xs text-charcoal/60 mt-1">
              {imageProgressPercentage.toFixed(1)}% Uploaded
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Zap className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-lg font-bold text-blue-600">
              {formatSpeed(metrics.uploadSpeed)}
            </div>
            <div className="text-xs text-blue-700">Upload Speed</div>
          </div>

          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-lg font-bold text-green-600">
              {formatTime(elapsedTime)}
            </div>
            <div className="text-xs text-green-700">Elapsed Time</div>
          </div>

          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-lg font-bold text-purple-600">
              {formatTime(metrics.estimatedTimeRemaining)}
            </div>
            <div className="text-xs text-purple-700">Time Remaining</div>
          </div>

          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <AlertCircle className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-lg font-bold text-orange-600">
              {(metrics.errorRate * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-orange-700">Error Rate</div>
          </div>
        </div>

        {/* Performance Trend */}
        {performanceHistory.length > 5 && (
          <div>
            <h4 className="text-sm font-medium text-charcoal mb-2">Performance Trend</h4>
            <div className="h-16 bg-gray-50 rounded-lg p-2 flex items-end space-x-1">
              {performanceHistory.map((speed, index) => {
                const height = Math.max((speed / Math.max(...performanceHistory)) * 100, 5);
                return (
                  <div
                    key={index}
                    className="bg-blue-400 rounded-sm flex-1 transition-all duration-300"
                    style={{ height: `${height}%` }}
                    title={`${speed.toFixed(1)} products/min`}
                  />
                );
              })}
            </div>
            <div className="text-xs text-charcoal/60 mt-1 text-center">
              Upload speed over time
            </div>
          </div>
        )}

        {/* System Resources */}
        {metrics.memoryUsage && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-charcoal">Memory Usage</span>
              <span className="text-sm text-charcoal/60">
                {(metrics.memoryUsage * 100).toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={metrics.memoryUsage * 100} 
              className={`h-2 ${metrics.memoryUsage > 0.8 ? 'bg-red-100' : 'bg-gray-100'}`} 
            />
            {metrics.memoryUsage > 0.8 && (
              <div className="text-xs text-red-600 mt-1">
                High memory usage - consider reducing batch size
              </div>
            )}
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-charcoal/10">
          <div className="text-center">
            <div className="text-sm font-medium text-charcoal">Avg Processing</div>
            <div className="text-lg font-bold text-blue-600">
              {metrics.averageProcessingTime.toFixed(1)}s
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-charcoal">Success Rate</div>
            <div className="text-lg font-bold text-green-600">
              {((1 - metrics.errorRate) * 100).toFixed(1)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-charcoal">Images/Product</div>
            <div className="text-lg font-bold text-purple-600">
              {metrics.totalProducts > 0 ? (metrics.totalImages / metrics.totalProducts).toFixed(1) : '0'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkUploadMonitor;
