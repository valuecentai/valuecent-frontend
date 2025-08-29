import React, { useState } from 'react';
import { View } from '../types';
import { ArrowLeftIcon } from '../components/Icons';
import TypingIndicator from '../components/TypingIndicator';

interface AiExpertPageProps {
  navigateTo: (view: View) => void;
}

const AI_EXPERT_URL = "https://notebooklm.google.com/notebook/f0ce5b70-bdb6-4879-8313-0f64f2498130";

const AiExpertPage: React.FC<AiExpertPageProps> = ({ navigateTo }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8">
      <div className="flex-shrink-0">
        <button
          onClick={() => navigateTo({ page: 'home' })}
          className="group font-semibold text-slate-600 flex items-center space-x-2 mb-6 hover:text-slate-900 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to Home</span>
        </button>
        <div className="text-slate-900">
          <h1 className="text-3xl font-bold">AI-Expert for Experts</h1>
          <p className="text-slate-600 mt-2">
            An integrated workspace with your advanced AI assistant.
          </p>
        </div>
      </div>

      <div className="flex-grow mt-6 soft-outset flex flex-col overflow-hidden">
        {isLoading && (
          <div className="flex-grow flex items-center justify-center bg-slate-100 rounded-lg">
            <TypingIndicator text="Loading AI Expert..." />
          </div>
        )}
        <iframe
          src={AI_EXPERT_URL}
          title="AI-Expert for Experts"
          className={`w-full h-full border-0 rounded-b-lg ${isLoading ? 'hidden' : 'block'}`}
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </div>
    </div>
  );
};

export default AiExpertPage;