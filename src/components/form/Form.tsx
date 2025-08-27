'use client' 
import React, { useCallback, useState ,useTransition,useEffect, KeyboardEvent, FormEvent, useRef} from 'react'
import { useError } from '@/hooks/useError';
import useLocalStorage from '@/hooks/useLocalStorage'
import {useRateLimit} from '@/hooks/useRateLimit'
import ChatInput from './chatInput/ChatInput';
import MessageList from './messageList/MessageList';
import Sidebar from '../sidebar/Sidebar';
import {ErrorContainer} from '../errorContainer/ErrorContainer';



interface MessageType {
  type: 'human' | 'ai';
  text: string;
}

const sanitize = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");

const Form = () => {
    const controller = new AbortController()
    const [input, setInput] = useState('')

    const {activeConversationId,messages,setMessages,startNewConversation,loadConversation,isLoaded} = useLocalStorage()
    const [isPending, startTransition] = useTransition()
    const currentControllerRef = useRef<AbortController | null>(null)
    const { canSend, recordMessage } = useRateLimit(); 
    const { showError, clearError } = useError();
    const [conversationList, setConversationList] = useState<string[]>([]);

    async function sendMessage(message:string) {
      if (!canSend()) {
        showError("Too many messages. Please wait before sending another.", 'validation');
        return;
      }
      let safeMessage = sanitize(message);
      try {
        const response = await fetch(`/api/bot/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ safeMessage,messages }),
          signal: controller.signal
        });
        if(!response.ok){
          showError(`Failed to send because of ${response.status}`, 'network');
          return 
        }

        const res = await response.json();
        recordMessage();
        return `${res.response }`  
      }catch(err){
        if (err instanceof Error) {
          showError(err.message, 'network');
        } else {
          showError('An unexpected error occurred', 'network');
        }
      }
      

    }


    const handleAbort = useCallback(() => {
      if (currentControllerRef.current) {
        currentControllerRef.current.abort()
        currentControllerRef.current = null
      }
    }, [])



    const handleSubmit =useCallback(async (e: FormEvent<HTMLFormElement> | KeyboardEvent ) => {
      e.preventDefault();
      if(isPending)return
      const text = input.trim()
      if (!text) return
      const humanMsg = { 
        id: Date.now().toString(), 
        content: text, 
        timestamp: Date.now(), 
        sender: 'user' as const 
      }
      setMessages(prev => [...prev, humanMsg])
      setInput('')
      if (currentControllerRef.current) {
        currentControllerRef.current.abort()
      }
      currentControllerRef.current = controller

      startTransition(async () => {
        try {
            const aiText = await sendMessage(text)
            const aiMsg = { 
              id: (Date.now() + 1).toString(), 
              content: aiText || '', 
              timestamp: Date.now(), 
              sender: 'ai' as const 
            }
            setMessages(prev => [...prev, aiMsg]) 
            currentControllerRef.current = null
        } catch (err:any) {
            console.error( err)
            if(err !== 'AbortError'){
              const errorMsg = `Sorry, something went wrong :  ${err}. Please try again.` ;
              showError(errorMsg, 'network error')
            }
            
        }

        clearError()
      })
    },[input, isPending])
  
    const convertedMessages: MessageType[] = messages.map(msg => ({
      type: msg.sender === 'user' ? 'human' : 'ai',
      text: msg.content
    }));


    useEffect(() => {
      const allKeys = Object.keys(localStorage);
      const convIds: string[] = allKeys
        .filter(key => key.startsWith('chat_conv_'))
        .map(key => key.replace('chat_', ``));
        setConversationList(convIds);
      
    }, [activeConversationId]); // Update when new conversation is created
  
    // Auto-start first conversation if none exists
    useEffect(() => {
      if (conversationList.length === 0 && !activeConversationId) {
        startNewConversation();
      }
    }, [conversationList, activeConversationId, startNewConversation]);

    return (
      <>
      
         <Sidebar conversationList={conversationList} activeConversationId={activeConversationId} startNewConversation={startNewConversation} loadConversation={loadConversation}/>
          <MessageList messages={convertedMessages}  isPending ={isPending}/>
          <form onSubmit={handleSubmit} className='form-container'>


            
            <div className='chatbot-input-container'>
              <ChatInput value={input} onChange={setInput} onSubmit={handleSubmit}/>
            <button className='button' type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z"></path></svg>
            </button>
            <button 
              type="button" 
              onClick={handleAbort}
              className='button abort'
            >
              X
            </button>
            </div>
            
          </form>
          <ErrorContainer/>
         
      </>
    )
  }

export default Form