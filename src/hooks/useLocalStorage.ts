import { useEffect, useState } from "react";

interface Message {
    id: string;
    content: string;
    timestamp: number;
    sender: 'user' | 'ai';
  }
  
  interface StorageHook {
    activeConversationId: string;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    startNewConversation: () => void;
    loadConversation: (conversationId: string) => void;
    isLoaded: boolean;
  }
  
  const useLocalStorage = (): StorageHook => {
    const [activeConversationId, setActiveConversationId] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
    const generateConversationId = (): string => {
      let timestamp = Date.now();
      let dateObject = new Date(timestamp);
      return `conv_${dateObject.toLocaleString('en-US')}-${dateObject.getHours()}_${Math.random().toString(36)}`;
    };
  
    // Load messages for active conversation
    useEffect(() => {
      if (!activeConversationId) return;
      
      const key = `chat_${activeConversationId}`;
      const stored = localStorage.getItem(key);
      
      if (stored) {
        try {
          const parsedMessages: Message[] = JSON.parse(stored);
          setMessages(parsedMessages);
        } catch (error) {
          console.error('Failed to load messages:', error);
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
      
      setIsLoaded(true);
    }, [activeConversationId]);
  
    // Save messages when they change

    useEffect(() => {
      if (!isLoaded || !activeConversationId) return;
      
      const key = `chat_${activeConversationId}`;
      localStorage.setItem(key, JSON.stringify(messages));
    }, [messages, activeConversationId, isLoaded]);
  
    const startNewConversation = (): void => {
      const newId = generateConversationId();
      setActiveConversationId(newId);
      setMessages([]);
    };
  
    const loadConversation = (conversationId: string): void => {
      setActiveConversationId(conversationId);
    };
  
    return {
      activeConversationId,
      messages,
      setMessages,
      startNewConversation,
      loadConversation,
      isLoaded
    };
  };

export default useLocalStorage;