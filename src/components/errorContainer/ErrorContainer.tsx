'use client' 


import {useError} from '../../hooks/useError' 

export const ErrorContainer: React.FC<{ className?: string }> = ({ 
    className = "" 
  }) => {
    const { error, clearError } = useError();
    
    if (!error) return null;
    
    return (
      <div className={`error-display ${error.type} ${className}`}>
        <span>{error.message}</span>
        <button onClick={clearError} aria-label="Clear error">
          ×
        </button>
      </div>
    );
  };