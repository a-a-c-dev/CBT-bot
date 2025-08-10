'use client'

import {
    useRef,
    useLayoutEffect,
    useState,
    ChangeEvent,
    KeyboardEvent,
    FC,
  } from "react";
  
  const isSpammy = (s: string): boolean => {
    const repeatedChars = /(.)\1{10,}/.test(s); // Same char 10+ times
    const tooManyEmojis = (s.match(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu) || []).length > 5;
    return repeatedChars || tooManyEmojis;
  };
  const containsHtmlTags = (s: string): boolean => /<[^>]*>/g.test(s);

  
  const validate = (s: string): string | null => {
    const HEBREW_ONLY_REGEX = /^[\u0590-\u05FF\s\.\!\?\,\:\;\-\(\)\[\]\{\}\"\'\d\n]*$/;
    if (!HEBREW_ONLY_REGEX.test(s)) return "Only Hebrew characters are allowed.";
    if (!s.trim()) return "Message can’t be empty.";
    if (s.length >= 2500) return `The Message should be less than ${s.length, 1000} chars.`;
    if (isSpammy(s)) return "Message appears to be spam.";
    if (containsHtmlTags(s)) return "HTML tags are not allowed.";

    return null;
  };
  
  interface ChatInputProps {
    value: string;
    onChange: (val: string) => void;
    onSubmit: (e: KeyboardEvent) => void;
  }
  
  const ChatInput: FC<ChatInputProps> = ({ value, onChange, onSubmit }) => {
    const taRef = useRef<HTMLTextAreaElement>(null);
    const [error, setError] = useState<string | null>(null);
  
    // Auto-resize
    useLayoutEffect(() => {
      const ta = taRef.current;
      if (!ta) return;
      ta.style.height = "auto";
      ta.style.height = `${ta.scrollHeight}px`;
    }, [value]);
  
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const userValue = e.target.value;
      onChange(userValue);
      const err = validate(userValue);
      setError(err);
      if (taRef.current) {
        taRef.current.setCustomValidity(err || "");
      }
    };
  
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); 
        if(error) return 
        onSubmit(e)
      }
    };



    return (
      <textarea
        ref={taRef}
        className={ `chatTextarea  ${error ? ` ${error}` : ''}`}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="רשום את ההודעה שלך"
        rows={1}
        required
      />
    );
  };
  
  export default ChatInput;
  