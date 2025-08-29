import React, { useState } from 'react';
import { View } from '../types';
import { HomeIcon, LayoutGridIcon, BrainCircuitIcon, ChevronDownIcon, LogoutIcon, SettingsIcon, PremiumIcon, ExternalLinkIcon, UsersIcon, UserCircleIcon } from './Icons';
import { COURSES } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  currentView: View;
  navigateTo: (view: View) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isPro?: boolean;
}> = ({ icon, label, isActive, onClick, isPro }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 text-[var(--fg)] font-medium ${
      isActive
        ? 'soft-inset-active text-blue-600 dark:text-blue-400'
        : 'hover:bg-slate-300/50 dark:hover:bg-slate-700/50'
    }`}
  >
    <div className="flex items-center space-x-3">
        {icon}
        <span>{label}</span>
    </div>
    {isPro && <span className="text-xs font-bold bg-purple-500/50 text-purple-200 px-2 py-0.5 rounded-md ring-1 ring-purple-400/50">PRO</span>}
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentView, navigateTo, onLogout }) => {
  const isCoursesActive = currentView.page === 'courses' || currentView.page === 'courseDetail' || currentView.page === 'chapterVideo';
  const [isCoursesOpen, setIsCoursesOpen] = useState(isCoursesActive);

  return (
    <aside className={`flex-shrink-0 bg-transparent flex flex-col z-20 transition-all duration-300 ease-in-out ${isOpen ? 'w-64 p-4' : 'w-0 p-0'}`}>
      <div className={`w-full h-full overflow-hidden transition-opacity duration-200 flex flex-col ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div 
          className="flex items-center mb-10 px-2 cursor-pointer"
          onClick={() => navigateTo({ page: 'home' })}
        >
          <h4 className="text-4xl font-extrabold tracking-tighter valuecent-brand-font">
            VALUECENT
          </h4>
        </div>
        
        <nav className="flex flex-col space-y-2">
          <NavItem
            icon={<HomeIcon className="h-6 w-6" />}
            label="Home"
            isActive={currentView.page === 'home'}
            onClick={() => navigateTo({ page: 'home' })}
          />
          
          {/* Expandable Courses Section */}
          <div>
            <button
              onClick={() => setIsCoursesOpen(prev => !prev)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 text-[var(--fg)] font-medium ${
                isCoursesActive && !isCoursesOpen
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-300/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <LayoutGridIcon className="h-6 w-6" />
                <span>Courses</span>
              </div>
              <ChevronDownIcon 
                className={`h-5 w-5 transition-transform duration-300 ${isCoursesOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            <div 
              className={`mt-1 pl-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                isCoursesOpen ? 'max-h-[40rem]' : 'max-h-0'
              }`}
            >
              <button
                onClick={() => navigateTo({ page: 'courses' })}
                className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                  currentView.page === 'courses'
                    ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-100 dark:bg-blue-500/20'
                    : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
              >
                All Courses
              </button>
              {COURSES.map(course => {
                  const isActive = (currentView.page === 'courseDetail' || currentView.page === 'chapterVideo') && currentView.courseId === course.id;
                  
                  if (course.isFeatured) {
                      return (
                          <button
                              key={course.id}
                              onClick={() => navigateTo({ page: 'courseDetail', courseId: course.id })}
                              className="w-full text-left pl-4 pr-2 py-3 rounded-md text-sm transition-all duration-200 flex items-start justify-between text-white font-medium shadow-lg"
                              style={{ background: 'var(--featured-gradient)'}}
                              title={course.title}
                          >
                              <span className="flex-1 mr-2">{course.title}</span>
                              <PremiumIcon className="w-4 h-4 text-yellow-300 flex-shrink-0 mt-0.5" />
                          </button>
                      );
                  }

                  return (
                      <button
                          key={course.id}
                          onClick={() => navigateTo({ page: 'courseDetail', courseId: course.id })}
                          className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors truncate ${
                          isActive
                              ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-100 dark:bg-blue-500/20'
                              : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                          }`}
                          title={course.title}
                      >
                          {course.title}
                      </button>
                  );
              })}
            </div>
          </div>

          <NavItem
            icon={<UsersIcon className="h-6 w-6" />}
            label="Community"
            isActive={currentView.page === 'community'}
            onClick={() => navigateTo({ page: 'community' })}
          />

          <a
            href="https://notebooklm.google.com/notebook/f0ce5b70-bdb6-4879-8313-0f64f2498130"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 text-[var(--fg)] font-medium hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
          >
            <div className="flex items-center space-x-3">
                <BrainCircuitIcon className="h-6 w-6 text-purple-400" />
                <span>AI-Expert for Experts</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold bg-purple-500/50 text-purple-200 px-2 py-0.5 rounded-md ring-1 ring-purple-400/50">PRO</span>
              <ExternalLinkIcon className="h-4 w-4 text-[var(--fg-subtle)]"/>
            </div>
          </a>

          <NavItem
              icon={<UserCircleIcon className="h-6 w-6" />}
              label="Profile"
              isActive={currentView.page === 'profile'}
              onClick={() => navigateTo({ page: 'profile' })}
          />

          <NavItem
              icon={<SettingsIcon className="h-6 w-6" />}
              label="Settings"
              isActive={currentView.page === 'settings'}
              onClick={() => navigateTo({ page: 'settings' })}
          />
        </nav>

        <div className="mt-auto">
          <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-[var(--fg-muted)] hover:bg-red-100/50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors duration-200"
          >
              <LogoutIcon className="h-6 w-6" />
              <span>Log Out</span>
          </button>

          <div className="text-center text-[var(--fg-subtle)] text-sm pt-6">
              <p>&copy; {new Date().getFullYear()} VALUECENT.</p>
              <p>All rights reserved.</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;