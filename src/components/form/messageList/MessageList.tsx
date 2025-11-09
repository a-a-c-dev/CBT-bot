'use client'

import React,{JSX} from 'react';
import Message from '../message/Message';
import TypingIndicator from '../../typingIndicator/TypingIndicator';
 



interface MessageListType {
    messages: MessageType[];
    isPending:boolean;
  }


interface MessageType {
    type: string |undefined;
    text:string | undefined;
  }

const MessageList = React.memo( ({messages , isPending }: MessageListType): JSX.Element => {

    return (
        <div id="chatbot-conversation-container" className='chatbot-conversation-container'>
        {messages && messages.map((m:MessageType, i:number) => (              
          <Message key={`${i}-${m}`}  m={m} />
          ))}
        
        {isPending && <TypingIndicator/>}
      </div>
    )
  }
  )
export default MessageList