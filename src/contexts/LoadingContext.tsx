import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  showLoader: (message?: string) => void;
  hideLoader: () => void;
  setLoadingMessage: (message: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  const showLoader = (message: string = 'Loading...') => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  const updateLoadingMessage = (message: string) => {
    setLoadingMessage(message);
  };

  const value: LoadingContextType = {
    isLoading,
    loadingMessage,
    showLoader,
    hideLoader,
    setLoadingMessage: updateLoadingMessage,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
