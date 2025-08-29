import React from 'react';
import { Course, View, Chapter } from '../types';
import { ArrowLeftIcon, CheckCircleIcon, QuantumOrbIcon } from '../components/Icons';
import { useProgress } from '../hooks/useProgress';

interface ChapterVideoPageProps {
  course: Course;
  chapter: Chapter;
  navigateTo: (view: View) => void;
}

const ChapterVideoPage: React.FC<ChapterVideoPageProps> = ({ course, chapter, navigateTo }) => {
  const { isChapterComplete, toggleChapterComplete } = useProgress();
  const isComplete = isChapterComplete(course.id, chapter.title);

  return (
    <div className="h-full flex flex-col p-8">
        {/* Top section with back button, title, and description */}
        <div className="flex-shrink-0">
            <button
                onClick={() => navigateTo({ page: 'courseDetail', courseId: course.id })}
                className="group font-semibold text-[var(--fg-muted)] flex items-center space-x-2 mb-6 hover:text-[var(--fg)] transition-colors"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Back to Chapters</span>
            </button>
            <div className="text-[var(--fg)]">
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{course.title}</p>
                <h1 className="text-3xl font-bold">{chapter.title}</h1>
            </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-grow flex flex-col mt-6 min-h-0 space-y-6">
            <div className="aspect-video bg-black rounded-lg overflow-hidden ring-1 ring-[var(--border)] flex-shrink-0">
                <iframe
                    key={chapter.videoEmbedUrl}
                    className="w-full h-full"
                    src={chapter.videoEmbedUrl}
                    title="Course video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="flex-grow flex items-center justify-center space-x-4">
                 <a
                    href={course.notebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-[var(--card)] text-[var(--card-fg)] font-semibold rounded-full hover:bg-[var(--secondary-bg)] transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/20 ring-1 ring-[var(--border)]"
                >
                    <QuantumOrbIcon className="w-8 h-8 mr-3" />
                    <span>Launch AI Assistant</span>
                </a>
                 <button
                    onClick={() => toggleChapterComplete(course.id, chapter.title)}
                    className={`group relative inline-flex items-center justify-center px-6 py-4 font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg ${
                        isComplete
                            ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-500/20'
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
                    }`}
                >
                    {isComplete ? (
                        <>
                            <CheckCircleIcon className="w-6 h-6 mr-2" />
                            <span>Completed</span>
                        </>
                    ) : (
                        <span>Mark as Complete</span>
                    )}
                </button>
            </div>
        </div>
    </div>
  );
};

export default ChapterVideoPage;