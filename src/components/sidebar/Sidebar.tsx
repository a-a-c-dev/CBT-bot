'use client'

import React, { useState, useEffect } from 'react'

interface SidebarType {
  startNewConversation: () => void;
  conversationList: string[];
  loadConversation: (conversationId: string) => void;
  activeConversationId: string;
}

function Sidebar({startNewConversation, conversationList, loadConversation, activeConversationId}: SidebarType) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    console.log(conversationList)
  },[])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={'sidebarToggle'}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
      
      <div className={`sidebarPanel ${isOpen ? 'open' : ''}`}>
        <button
          className='sidebarCloseButton'
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
        >
          ×
        </button>
        
        <div className='sidebarContent'>
          <button
            onClick={() => {
              startNewConversation();
              setIsOpen(false);
            }}
            className='sidebarNewChatButton'
          >
            <span>New Chat </span>
            <div   className='sidebarImageContainer'><img src="/icons/plus.svg" alt="plus sign" /></div>
          </button>
      
          <div className='sidebarConversations'>
            <h3 className='sidebarConversationsTitle'>Conversations</h3>
            {conversationList.map((convId: string) => (
              <button
                key={convId}
                onClick={() => {
                  loadConversation(convId);
                  setIsOpen(false);
                }}
                className={`sidebarConversationButton ${activeConversationId === convId ? 'active' : ''}`}
              >
                {convId.slice(5, 24)}...
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar