import { useState } from 'react';
import { useImmer } from 'use-immer';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import api from './api';

function Chatbot(greeting = null) {
  const [messages, setMessages] = useImmer([]);
  const [newMessage, setNewMessage] = useState('');

  const isLoading = messages.length && messages[messages.length - 1].loading;

  // Default greeting.
  if (!greeting) {
    greeting = "<strong>Hello!</strong>  I am a chatbot.  I have been trained on the blog content of Koplowicz & Sons.  (Technically I am a RAG.)  Ask me anything about web development, and I'll answer based on Jordan's knowledge.";
  }

  async function submitNewMessage() {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isLoading) return;

    setMessages(draft => [...draft,
      { role: 'user', content: trimmedMessage },
      { role: 'assistant', content: '', sources: [], loading: true }
    ]);
    setNewMessage('');

    try {
      const stream = await api.sendChatMessage(trimmedMessage);
      setMessages(draft => {
        draft[draft.length - 1].content += stream;
      });

      setMessages(draft => {
        draft[draft.length - 1].loading = false;
      });
    } catch (err) {
      console.log(err);
      setMessages(draft => {
        draft[draft.length - 1].loading = false;
        draft[draft.length - 1].error = true;
      });
    }
  }

  return (
    <div className="chatbot">
      {messages.length === 0 && (<div>{greeting}</div>)}
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
      />
      <ChatInput
        newMessage={newMessage}
        isLoading={isLoading}
        setNewMessage={setNewMessage}
        submitNewMessage={submitNewMessage}
      />
    </div>
  );
}

export default Chatbot;
