import React from 'react'

interface SidebarType {
  startNewConversation: () => void;
  conversationList: string[];
  loadConversation: (conversationId: string) => void;
  activeConversationId: string;
}

const styles = {
    sidebar: {
      width: '256px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e5e7eb',
      padding: '16px',
      height: '100vh',
      overflowY: 'auto' as const
    },
    newChatButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginBottom: '16px',
      fontSize: '14px',
      fontWeight: '500'
    },
    newChatButtonHover: {
      backgroundColor: '#2563eb'
    },
    conversationsSection: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px'
    },
    conversationsTitle: {
      fontWeight: '600',
      color: '#374151',
      fontSize: '14px',
      marginBottom: '8px'
    },
    conversationButton: {
      width: '100%',
      textAlign: 'left' as const,
      padding: '8px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '12px',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: '#374151'
    },
    conversationButtonActive: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    conversationButtonHover: {
      backgroundColor: '#f3f4f6'
    }
  };

function Sidebar({startNewConversation, conversationList, loadConversation, activeConversationId}: SidebarType) {
  return (
    <div style={styles.sidebar}>
    <button
      onClick={startNewConversation}
      style={styles.newChatButton}
      onMouseEnter={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = styles.newChatButtonHover.backgroundColor;
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = styles.newChatButton.backgroundColor;
      }}
    >
      New Chat
    </button>
    
    <div style={styles.conversationsSection}>
      <h3 style={styles.conversationsTitle}>Conversations</h3>
      {conversationList.map((convId: string) => (
        <button
          key={convId}
          onClick={() => loadConversation(convId)}
          style={{
            ...styles.conversationButton,
            ...(activeConversationId === convId ? styles.conversationButtonActive : {})
          }}
          onMouseEnter={(e) => {
            if (activeConversationId !== convId) {
              (e.target as HTMLButtonElement).style.backgroundColor = styles.conversationButtonHover.backgroundColor;
            }
          }}
          onMouseLeave={(e) => {
            if (activeConversationId !== convId) {
              (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
            }
          }}
        >
          {convId.slice(5, 15)}...
        </button>
      ))}
    </div>
  </div>
  )
}

export default Sidebar