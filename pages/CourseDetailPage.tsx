import React from 'react';
import { Course, View, Chapter } from '../types';
import { ArrowLeftIcon, PlayIcon, BookOpenIcon, QuantumOrbIcon, PremiumIcon, ExternalLinkIcon, DocumentTextIcon, CheckCircleIcon } from '../components/Icons';
import { useProgress } from '../hooks/useProgress';
import ProgressBar from '../components/ProgressBar';

interface CourseDetailPageProps {
  course: Course;
  navigateTo: (view: View) => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course, navigateTo }) => {
  const { isChapterComplete, toggleChapterComplete, getCourseProgress } = useProgress();
  const progress = getCourseProgress(course);

  const handleChapterSelect = (chapter: Chapter) => {
      navigateTo({ page: 'chapterVideo', courseId: course.id, chapterTitle: chapter.title });
  }

  const hasChapters = course.chapters && course.chapters.length > 0;
  const hasResources = course.resources && course.resources.length > 0;
  const hasLeftPanel = hasChapters || hasResources;

  return (
    <div className="h-full flex flex-col p-8">
        {/* Top section with back button, title, and description */}
        <div className="flex-shrink-0">
            <button
                onClick={() => navigateTo({ page: 'courses' })}
                className="group font-semibold text-[var(--fg-muted)] flex items-center space-x-2 mb-6 hover:text-[var(--fg)] transition-colors"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Back to All Courses</span>
            </button>
            <div className="text-[var(--fg)]">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <span>{course.title}</span>
                    {course.isFeatured && <PremiumIcon className="w-6 h-6 text-yellow-400 flex-shrink-0" />}
                </h1>
                <p className="text-[var(--fg-muted)] mt-2">{course.description}</p>
            </div>
             {hasChapters && (
                <div className="my-6">
                    <h3 className="text-lg font-bold text-[var(--fg)] mb-2">Your Progress</h3>
                    <ProgressBar progress={progress} />
                    <p className="text-right text-sm text-[var(--fg-muted)] mt-1">{progress}% Complete</p>
                </div>
            )}
        </div>
        
        {/* Main content area */}
        <div className="flex-grow flex flex-col lg:flex-row gap-8 min-h-0">
            
            {/* Left Panel: Chapters & Resources */}
            {hasLeftPanel && (
                <div className="w-full lg:w-2/5 soft-outset flex flex-col">
                    {hasChapters && (
                        <div className="flex flex-col min-h-0">
                            <h3 className="text-xl font-bold text-[var(--fg)] flex items-center gap-2 p-4 border-b border-[var(--border)] flex-shrink-0">
                                <BookOpenIcon className="w-6 h-6"/> Chapters
                            </h3>
                            <div className="overflow-y-auto space-y-2 p-4">
                                {course.chapters!.map(chapter => {
                                    const isComplete = isChapterComplete(course.id, chapter.title);
                                    return (
                                        <div
                                            key={chapter.title}
                                            style={{ backgroundColor: isComplete ? 'var(--success-bg)' : 'var(--secondary-bg)'}}
                                            className="w-full text-left p-3 rounded-lg flex items-center justify-between gap-3 transition-colors hover:bg-slate-200/70 dark:hover:bg-slate-700/70"
                                        >
                                            <div onClick={() => handleChapterSelect(chapter)} className="flex-grow flex items-center gap-3 cursor-pointer">
                                                {isComplete ? (
                                                    <CheckCircleIcon className="w-5 h-5 flex-shrink-0 text-[var(--success-fg)]" />
                                                ) : (
                                                    <PlayIcon className="w-5 h-5 flex-shrink-0 text-[var(--fg-muted)]" />
                                                )}
                                                <span className={`transition-colors ${isComplete ? 'text-[var(--fg-muted)] line-through' : 'text-[var(--secondary-fg)]'}`}>{chapter.title}</span>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={isComplete}
                                                onChange={() => toggleChapterComplete(course.id, chapter.title)}
                                                className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-[var(--border)] cursor-pointer flex-shrink-0 bg-transparent"
                                                aria-label={`Mark ${chapter.title} as complete`}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                    
                    {hasResources && (
                        <div className={`${hasChapters ? 'mt-auto border-t border-[var(--border)]' : ''} p-4 flex-shrink-0`}>
                            <h4 className="text-lg font-bold text-[var(--fg)] mb-3">Additional Resources</h4>
                            <div className="space-y-2">
                                {course.resources!.map(resource => (
                                    <a
                                        key={resource.title}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors bg-[var(--secondary-bg)] hover:bg-slate-200 dark:hover:bg-slate-700 text-[var(--secondary-fg)]"
                                    >
                                        {resource.type === 'website' ? <ExternalLinkIcon className="w-5 h-5 flex-shrink-0" /> : <DocumentTextIcon className="w-5 h-5 flex-shrink-0" />}
                                        <span className="flex-1">{resource.title}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Right Panel: AI Virtual Assistant */}
            <div className={`w-full ${hasLeftPanel ? 'lg:w-3/5' : 'lg:w-full'} soft-outset flex flex-col overflow-hidden`}>
                <div className="flex items-center p-4 border-b border-[var(--border)] bg-[var(--secondary-bg)] flex-shrink-0">
                    <div className="w-8 h-8 mr-3"><QuantumOrbIcon /></div>
                    <div>
                        <h4 className="font-bold text-[var(--secondary-fg)]">Virtual AI Assistant</h4>
                        <p className="text-sm text-[var(--fg-muted)]">Your interactive learning partner</p>
                    </div>
                </div>
                <div className="flex-grow flex items-center justify-center p-6 bg-[rgba(241,245,249,0.5)] dark:bg-[rgba(24,24,24,0.5)]">
                    <div className="ai-assistant-tab group relative w-full h-full flex flex-col items-center justify-center bg-transparent rounded-lg overflow-hidden ring-1 ring-[var(--border)] transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10">
                        <div className="ai-grid-bg"></div>
                        <div className="ai-aurora-bg"></div>
                        <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
                            <QuantumOrbIcon className="w-32 h-32 mb-4 orb-on-hover" />
                            <p className="text-xl text-[var(--fg)] mb-6 font-semibold">
                                Ready to assist with your learning.
                            </p>
                            <a
                                href={course.notebookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/40"
                            >
                                <span>Launch Assistant</span>
                            </a>
                            <div className="mt-8 text-lg">
                                <p className="text-[var(--fg-muted)]">If you have any query, please ask me.</p>
                                <p className="mt-2 font-semibold interactive-text-gradient">you are invited with problems, questions, cases & queries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style>{`
            :root {
                --grid-line-color: rgba(100, 116, 139, 0.2);
            }
            :root.dark {
                --grid-line-color: rgba(100, 116, 139, 0.1);
            }
            /* Grid background */
            .ai-grid-bg {
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                background-image:
                    linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px),
                    linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px);
                background-size: 40px 40px;
                animation: pan-grid 20s linear infinite;
                z-index: 0;
            }
            @keyframes pan-grid {
                0% { background-position: 0 0; }
                100% { background-position: 40px 40px; }
            }
            
            /* Aurora Background */
            .ai-aurora-bg {
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: radial-gradient(ellipse at 50% 100%, rgba(99, 102, 241, 0.15), transparent 70%),
                            radial-gradient(ellipse at 0% 0%, rgba(59, 130, 246, 0.15), transparent 70%),
                            radial-gradient(ellipse at 100% 0%, rgba(139, 92, 246, 0.15), transparent 70%);
                opacity: 0.5;
                transition: opacity 0.8s ease-in-out;
                animation: aurora-shift 20s ease-in-out infinite alternate;
                z-index: 1;
            }
            .group:hover .ai-aurora-bg {
                opacity: 1;
            }
            @keyframes aurora-shift {
                0% { background-position: 0% 0%, 0% 0%, 0% 0%; }
                100% { background-position: 100% 100%, -100% 100%, 100% -100%; }
            }

            /* Quantum Orb Icon Styles */
            .quantum-group {
                transform-origin: center;
                transition: transform 0.5s ease;
            }
            .orb-ring-1, .orb-ring-2, .orb-ring-3 {
                fill: none;
                stroke: url(#quantum-gradient-def);
                stroke-width: 2;
                transform-origin: center;
            }
            .orb-ring-1 { animation: rotate-cw 10s linear infinite; }
            .orb-ring-2 { animation: rotate-ccw 8s linear infinite; }
            .orb-ring-3 { animation: rotate-cw 12s linear infinite; }
            .orb-core {
                fill: url(#quantum-gradient-def);
                transform-origin: center;
                animation: pulse-core 2.5s ease-in-out infinite;
            }
            .orb-on-hover {
                transition: transform 0.5s ease-out, filter 0.5s ease-out;
            }
            .group:hover .orb-on-hover {
                transform: scale(1.1);
                filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.6));
            }
            @keyframes rotate-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes rotate-ccw { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
            @keyframes pulse-core {
                0%, 100% { transform: scale(1); filter: brightness(1); }
                50% { transform: scale(1.15); filter: brightness(1.3); }
            }

            .interactive-text-gradient {
                background: linear-gradient(90deg, #8b5cf6, #ec4899);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                display: inline-block;
            }
        `}</style>
    </div>
  );
};

export default CourseDetailPage;