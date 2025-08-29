import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, Course } from '../types';
import { SendIcon, BotIcon } from './Icons';
import TypingIndicator from './TypingIndicator';

// The 'Chat' type from '@google/genai' is no longer needed as the API is removed.
interface ChatPanelProps {
  chat: any; // Using 'any' as the original 'Chat' type is no longer available.
  course: Course;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ chat, course }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
        { role: 'model', content: `Hello! I'm your AI tutor for the "${course.title}" course. How can I help you today?` }
    ]);
  }, [course]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chat) return;

    const newUserMessage: ChatMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const stream = await chat.sendMessageStream({ message: userInput });
      
      let aiResponse = '';
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      for await (const chunk of stream) {
        aiResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', content: aiResponse };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      setMessages(prev => [...prev, { role: 'model', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--secondary-bg)] transition-colors duration-300">
      <div className="flex items-center p-4 border-b border-[var(--border)] bg-[var(--bg)]">
        <BotIcon className="h-8 w-8 text-blue-500 mr-3" />
        <div>
          <h4 className="font-bold text-[var(--fg)]">AI Learning Assistant</h4>
          <p className="text-sm text-[var(--fg-muted)]">Ask me anything about this course!</p>
        </div>
      </div>
      <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'model' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">AI</div>}
            <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-base ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-[var(--card)] text-[var(--card-fg)] shadow-sm rounded-bl-none'
            }`}>
              <p style={{whiteSpace: 'pre-wrap'}}>{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">AI</div>
              <div className="max-w-[80%] rounded-xl px-4 py-2.5 bg-[var(--card)] text-[var(--card-fg)] shadow-sm rounded-bl-none">
                 <TypingIndicator text="AI is typing" />
              </div>
            </div>
        )}
      </div>
      <div className="p-4 bg-[var(--bg)] border-t border-[var(--border)]">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your question..."
            className="w-full px-4 py-2 bg-[var(--card)] border-[var(--border)] text-[var(--card-fg)] placeholder-[var(--fg-muted)] border rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !userInput.trim()}
            className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center disabled:bg-[var(--bg-disabled)] disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;