import React from 'react';
import { UserCircleIcon } from '../components/Icons';
import { COURSES } from '../constants';
import { useProgress } from '../hooks/useProgress';
import ProgressBar from '../components/ProgressBar';
import { View } from '../types';
import { useUserProfile } from '../hooks/useUserProfile';

interface ProfilePageProps {
  navigateTo: (view: View) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ navigateTo }) => {
    const { getCourseProgress } = useProgress();
    const { userProfile } = useUserProfile();
    
    const coursesWithProgress = COURSES
        .map(course => ({
            ...course,
            progress: getCourseProgress(course),
        }))
        .filter(course => course.progress > 0)
        .sort((a, b) => b.progress - a.progress);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold text-[var(--fg)] mb-8">Profile & Progress</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1 soft-outset p-8 flex flex-col items-center text-center h-fit">
                    <div className="relative mb-4">
                        <UserCircleIcon className="w-32 h-32 text-[var(--fg-subtle)]" />
                    </div>
                    {userProfile ? (
                        <>
                            <h2 className="text-2xl font-bold text-[var(--fg)]">{userProfile.name}</h2>
                            <p className="text-[var(--fg-muted)]">{userProfile.title}</p>
                        </>
                    ) : (
                        <p className="text-[var(--fg-muted)]">Loading profile...</p>
                    )}
                </div>

                {/* Courses in Progress Card */}
                <div className="lg:col-span-2 soft-outset p-8">
                    <h2 className="text-2xl font-bold text-[var(--fg)] mb-6">Learning Progress</h2>
                    {coursesWithProgress.length > 0 ? (
                        <div className="space-y-6">
                            {coursesWithProgress.map(course => (
                                <div 
                                    key={course.id} 
                                    className="p-4 bg-[var(--secondary-bg)] rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" 
                                    onClick={() => navigateTo({ page: 'courseDetail', courseId: course.id })}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => { if (e.key === 'Enter') navigateTo({ page: 'courseDetail', courseId: course.id })}}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold text-[var(--secondary-fg)]">{course.title}</h3>
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">{course.progress}%</span>
                                    </div>
                                    <ProgressBar progress={course.progress} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-[var(--fg-muted)] py-8">
                            <p>You haven't started any courses yet.</p>
                            <button 
                                onClick={() => navigateTo({ page: 'courses' })} 
                                className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Explore Courses
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;