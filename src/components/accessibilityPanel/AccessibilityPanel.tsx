'use client' 

import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    fontSize, setFontSize,
    isDyslexiaFont, setIsDyslexiaFont,
    theme, setTheme
  } = useAccessibility();

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => setFontSize(size);
  const toggleDyslexiaFont = () => setIsDyslexiaFont(!isDyslexiaFont);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Helper to compose class names without external libs
  const mergeClasses = (...classes: (string | false)[]) =>
    classes.filter(Boolean).join(' ');

  return (
    <div
      className={mergeClasses(
        'accessibilityPanel',
        isOpen && 'open'
      )}
      data-theme={theme}
    >
      <button
        className={'accessibilityToggle'}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility options"
      >
        ⚙️
      </button>

      <button
        className={'accessibilityCloseButton'}
        onClick={() => setIsOpen(false)}
        aria-label="Close accessibility panel"
      >
        ×
      </button>

      <div className={'accessibilityMenu'}>
        <h4>Accessibility Options</h4>

        <div className={'optionGroup'}>
          <label>Font Size:</label>
          <div className={'buttonGroup'}>
            {(['small', 'medium', 'large'] as const).map(size => (
              <button
                key={size}
                className={mergeClasses(
                  'buttonGroupButton',
                  fontSize === size && 'active'
                )}
                onClick={() => handleFontSizeChange(size)}
              >
                {size.charAt(0).toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className={'optionGroup'}>
          <label>
            <input
              type="checkbox"
              checked={isDyslexiaFont}
              onChange={toggleDyslexiaFont}
            />{' '}
            Dyslexia-friendly font
          </label>
        </div>

        <div className={'optionGroup'}>
          <button
            className={'themeToggle'}
            onClick={toggleTheme}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPanel;
