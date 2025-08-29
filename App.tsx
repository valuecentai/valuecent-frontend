import React, { useState, useCallback, useEffect } from 'react';
import { View } from './types';
import LandingPage from './pages/LandingPage';
import CoursesPage from './pages/CoursesPage';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from './components/Icons';
import CourseDetailPage from './pages/CourseDetailPage';
import { COURSES } from './constants';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ChapterVideoPage from './pages/ChapterVideoPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import { useUserProfile } from './hooks/useUserProfile';
import WelcomeModal from './components/WelcomeModal';

const TopBar: React.FC<{
  onBack: () => void;
  onForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}> = ({ onBack, onForward, canGoBack, canGoForward, onToggleSidebar, isSidebarOpen }) => (
    <div className="flex-shrink-0 h-16 flex items-center px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="flex items-center space-x-2">
            <button
                onClick={onToggleSidebar}
                className="text-[var(--fg)] hover:text-[var(--primary)] transition-colors mr-2"
                aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
                {isSidebarOpen ? <ChevronDoubleLeftIcon className="h-6 w-6" /> : <ChevronDoubleRightIcon className="h-6 w-6" />}
            </button>
            <button
                onClick={onBack}
                disabled={!canGoBack}
                className="text-[var(--fg)] hover:text-[var(--primary)] disabled:text-[var(--fg-disabled)] disabled:cursor-not-allowed transition-colors"
                aria-label="Go back"
                title="Go back"
            >
                <ArrowLeftCircleIcon className="h-8 w-8" />
            </button>
            <button
                onClick={onForward}
                disabled={!canGoForward}
                className="text-[var(--fg)] hover:text-[var(--primary)] disabled:text-[var(--fg-disabled)] disabled:cursor-not-allowed transition-colors"
                aria-label="Go forward"
                title="Go forward"
            >
                <ArrowRightCircleIcon className="h-8 w-8" />
            </button>
        </div>
    </div>
);

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [history, setHistory] = useState<View[]>([{ page: 'home' }]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const { saveUserProfile, isProfileSet } = useUserProfile();

    // PWA Service Worker Registration
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                const swUrl = `${window.location.origin}/sw.js`;
                navigator.serviceWorker.register(swUrl, { scope: '/' }).then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }).catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }
    }, []);

    const currentView = history[historyIndex];

    const handleNavigate = useCallback((view: View) => {
        // If navigating to the same page, do nothing
        if (JSON.stringify(view) === JSON.stringify(currentView)) return;

        window.scrollTo(0, 0);
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(view);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    }, [history, historyIndex, currentView]);

    const handleBack = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
        }
    };
    
    const handleForward = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex - 1);
        }
    };

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setHistory([{ page: 'home' }]);
        setHistoryIndex(0);
    };
    
    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const renderPage = () => {
        switch(currentView.page) {
            case 'home':
                return <LandingPage navigateTo={handleNavigate} />;
            case 'courses':
                return <CoursesPage navigateTo={handleNavigate} />;
            case 'courseDetail':
                const course = COURSES.find(c => c.id === currentView.courseId);
                if (course) {
                    return <CourseDetailPage course={course} navigateTo={handleNavigate} />;
                }
                // Fallback if course not found
                return <CoursesPage navigateTo={handleNavigate} />;
            case 'chapterVideo':
                const courseForVideo = COURSES.find(c => c.id === currentView.courseId);
                const chapterForVideo = courseForVideo?.chapters?.find(ch => ch.title === currentView.chapterTitle);
                if (courseForVideo && chapterForVideo) {
                    return <ChapterVideoPage course={courseForVideo} chapter={chapterForVideo} navigateTo={handleNavigate} />;
                }
                 // Fallback if course/chapter not found
                 return <CoursesPage navigateTo={handleNavigate} />;
            case 'community':
                return <CommunityPage />;
            case 'profile':
                return <ProfilePage navigateTo={handleNavigate} />;
            case 'settings':
                return <SettingsPage />;
            default:
                return <LandingPage navigateTo={handleNavigate} />;
        }
    };
    
    if (!isAuthenticated) {
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }
    
    if (!isProfileSet) {
        return <WelcomeModal onSave={saveUserProfile} />;
    }

    return (
        <div className="min-h-screen font-sans flex transition-colors duration-300">
            <Sidebar 
              isOpen={isSidebarOpen}
              currentView={currentView} 
              navigateTo={handleNavigate} 
              onLogout={handleLogout} 
            />
            <div className="flex-1 flex flex-col min-w-0">
                <TopBar 
                  onBack={handleBack} 
                  onForward={handleForward} 
                  canGoBack={historyIndex > 0} 
                  canGoForward={historyIndex < history.length - 1}
                  onToggleSidebar={toggleSidebar}
                  isSidebarOpen={isSidebarOpen}
                />
                <main className="flex-1 overflow-y-auto">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default App;