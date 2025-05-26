import Markdown from 'react-markdown';
import useAutoScroll from './useAutoScroll';
import Loader from '../Loader';

function ChatMessages({ messages, isLoading }) {
  const scrollContentRef = useAutoScroll(isLoading);

  return (
    <div ref={scrollContentRef}>
      {messages.map(({ role, content, loading, error }, idx) => (
        <div key={idx}>
          <div>
            <div>
              {(loading && !content) ? <Loader />
                : (role === 'assistant')
                  ? <Markdown>{content}</Markdown>
                  : <div>{content}</div>
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
