import React, { useEffect, useRef } from 'react';
import { Course } from '../types';
import { CloseIcon, LinkIcon } from './Icons';

interface CourseModalProps {
  course: Course;
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const renderChatContent = () => {
    // Since the API is removed from the frontend, the chat feature is unavailable.
    return (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-4 text-slate-500">
            <h3 className="font-bold text-lg text-slate-700">AI Assistant is Unavailable</h3>
            <p>This interactive feature is not available at the moment. Please check back later.</p>
        </div>
    );
  }


  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex justify-center items-center p-4 animate-fade-in">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col overflow-hidden transition-colors duration-300"
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-slate-900">{course.title}</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </header>

        <div className="flex-grow flex flex-col lg:flex-row min-h-0">
          {/* Left Column: Video and Resources */}
          <div className="w-full lg:w-3/5 p-4 flex flex-col space-y-4 flex-shrink-0">
            <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src={course.videoEmbedUrl}
                title="Course video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <a
              href={course.notebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LinkIcon className="h-5 w-5 mr-2" />
              <span>View Learning Material</span>
            </a>
          </div>

          {/* Right Column: AI Chat Panel */}
          <div className="w-full lg:w-2/5 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col min-h-0">
            {renderChatContent()}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CourseModal;