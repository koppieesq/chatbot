import React from 'react';
import Markdown from 'react-markdown';
import useAutoScroll from './useAutoScroll';

function renderSafely(input) {
  if (typeof input === 'string') return input;
  if (input && typeof input.text === 'string') return input.text;
  if (input) return JSON.stringify(input);
  return '';
}

function ChatMessages({ messages, isLoading }) {
  const scrollContentRef = useAutoScroll(isLoading);

  return (
    <div ref={scrollContentRef}>
      {messages.map(({ role, content, loading, error }, idx) => (
        <div key={idx}>
          <div>
            <div>
              {(loading && !content) ? <div className="loader">Loading...</div>
                : (role === 'assistant')
                  ? <Markdown>{renderSafely(content)}</Markdown>
                  : <div>{renderSafely(content)}</div>
              }
            </div>
            {error && (
              <div>
                <p>Error generating the response:</p>
                <pre>{error}</pre>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
