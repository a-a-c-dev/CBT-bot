import React, { createContext, useContext, useState, ReactNode} from 'react';


interface AccessibilityContextType {
    fontSize: 'small' | 'medium' | 'large';
    setFontSize: (size: 'small' | 'medium' | 'large') => void;
    isDyslexiaFont: boolean;
    setIsDyslexiaFont: (enabled: boolean) => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
  }

const AccessibilityContext = createContext<AccessibilityContextType|undefined>(undefined);

export const useAccessibility = ():AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
    children: ReactNode;
  }


export const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {
  const [fontSize, setFontSize] = useState<'small'|'medium'|'large'>('medium');
  const [isDyslexiaFont, setIsDyslexiaFont] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light'|'dark'>('light');

  const value:AccessibilityContextType = {
    fontSize,
    setFontSize,
    isDyslexiaFont,
    setIsDyslexiaFont,
    theme,
    setTheme
  };

  return (
    <AccessibilityContext.Provider value={value}>
      <div className={`app-container ${theme} font-${fontSize} ${isDyslexiaFont ? 'dyslexia-font' : ''}`}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};