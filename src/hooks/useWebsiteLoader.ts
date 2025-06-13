import { useLoading } from '@/contexts/LoadingContext';

/**
 * Hook to manually control the website loader
 * Useful for form submissions, data loading, etc.
 */
export const useWebsiteLoader = () => {
  const { showLoader, hideLoader, setLoadingMessage, isLoading } = useLoading();

  /**
   * Show loader with custom message and optional auto-hide duration
   */
  const showLoaderWithMessage = (message: string, autoHideDuration?: number) => {
    showLoader(message);
    
    if (autoHideDuration) {
      setTimeout(() => {
        hideLoader();
      }, autoHideDuration);
    }
  };

  /**
   * Show loader for async operations
   */
  const withLoader = async <T>(
    operation: () => Promise<T>,
    message: string = 'Processing...'
  ): Promise<T> => {
    showLoader(message);
    try {
      const result = await operation();
      return result;
    } finally {
      hideLoader();
    }
  };

  /**
   * Show loader for form submissions
   */
  const showFormLoader = (message: string = 'Submitting your request...') => {
    showLoader(message);
  };

  /**
   * Show loader for data fetching
   */
  const showDataLoader = (message: string = 'Loading data...') => {
    showLoader(message);
  };

  return {
    showLoader,
    hideLoader,
    setLoadingMessage,
    isLoading,
    showLoaderWithMessage,
    withLoader,
    showFormLoader,
    showDataLoader,
  };
};
