import React from 'react';

interface TypingIndicatorProps {
  text?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ text = "AI is typing" }) => (
  <div className="flex items-center space-x-1 p-2">
    <span className="text-slate-500">{text}</span>
    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse-fast"></div>
    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse-fast" style={{animationDelay: '0.2s'}}></div>
    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse-fast" style={{animationDelay: '0.4s'}}></div>
    <style>{`
      @keyframes pulse-fast {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
      .animate-pulse-fast {
        animation: pulse-fast 1.2s infinite ease-in-out;
      }
    `}</style>
  </div>
);

export default TypingIndicator;