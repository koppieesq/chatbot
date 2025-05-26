import { useState, useLayoutEffect, useRef } from 'react';

function useAutosize(value) {
  const ref = useRef(null);
  const [borderWidth, setBorderWidth] = useState(0);

  useLayoutEffect(() => {
    const style = window.getComputedStyle(ref.current);
    setBorderWidth(parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth));
  }, []);

  useLayoutEffect(() => {
    ref.current.style.height = 'inherit';
    ref.current.style.height = `${ref.current.scrollHeight + borderWidth}px`;
  }, [value, borderWidth]);

  return ref;
}

function ChatInput({ newMessage, isLoading, setNewMessage, submitNewMessage }) {
  const textareaRef = useAutosize(newMessage);

  function handleKeyDown(e) {
    if(e.keyCode === 13 && !e.shiftKey && !isLoading) {
      e.preventDefault();
      submitNewMessage();
    }
  }

  return(
    <div className="chat-input">
      <textarea
        ref={textareaRef}
        rows='1'
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={submitNewMessage}>
        Go
      </button>
    </div>
  );
}

export default ChatInput;
