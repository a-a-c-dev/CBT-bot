import {useState} from 'react'


export const useRateLimit = (maxMessages =10 ,timeWindow = 60000) => {
    const [timestamps, setTimestamps] = useState<number[]>([]);
    
    const canSend = () => {
      const now = Date.now();
      const recentMessages = timestamps.filter(t => now - t < timeWindow);
      return recentMessages.length < maxMessages;
    };
    
    const recordMessage = () => {
      setTimestamps(prev => [...prev.slice(-maxMessages + 1), Date.now()]);
    };
    
    return { canSend, recordMessage };
  };