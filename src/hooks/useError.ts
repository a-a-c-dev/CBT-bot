import { useState } from "react";

interface ErrorType {
    message: string;
    type:string
  }

export const useError = () => {
    const [error, setError] = useState<ErrorType|null >(null);
    
    const showError = (errorMessage:string, errorType = 'general') => {
      setError({ message: errorMessage, type: errorType });
    };
    
    const clearError = () => setError(null);
    
    return { error, setError, showError, clearError };
  }; 