import { useState, useCallback, useEffect } from 'react';
import { Course } from '../types';

const PROGRESS_STORAGE_KEY = 'valuecent-course-progress';

type ProgressData = Record<string, string[]>; // { [courseId]: [completedChapterTitle, ...] }

const getStoredProgress = (): ProgressData => {
  try {
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to parse progress from localStorage', error);
    return {};
  }
};

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressData>(getStoredProgress);

  // This effect will sync the hook's state with localStorage if another tab changes it.
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === PROGRESS_STORAGE_KEY) {
        setProgress(getStoredProgress());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const saveProgress = (newProgress: ProgressData) => {
    try {
      const oldProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      const newProgressJSON = JSON.stringify(newProgress);

      if(oldProgress !== newProgressJSON) {
        localStorage.setItem(PROGRESS_STORAGE_KEY, newProgressJSON);
        setProgress(newProgress);
        // Dispatch a storage event to sync other tabs
        window.dispatchEvent(new StorageEvent('storage', {
          key: PROGRESS_STORAGE_KEY,
          newValue: newProgressJSON,
          oldValue: oldProgress,
          storageArea: localStorage,
        }));
      }

    } catch (error) {
      console.error('Failed to save progress to localStorage', error);
    }
  };

  const isChapterComplete = useCallback((courseId: string, chapterTitle: string): boolean => {
    return !!progress[courseId]?.includes(chapterTitle);
  }, [progress]);

  const toggleChapterComplete = useCallback((courseId: string, chapterTitle: string) => {
    const currentProgress = getStoredProgress(); // Get latest from storage to prevent race conditions
    const courseProgress = currentProgress[courseId] || [];
    const isCompleted = courseProgress.includes(chapterTitle);
    
    let updatedCourseProgress: string[];
    if (isCompleted) {
      updatedCourseProgress = courseProgress.filter(title => title !== chapterTitle);
    } else {
      updatedCourseProgress = [...courseProgress, chapterTitle];
    }

    const newProgress = {
      ...currentProgress,
      [courseId]: updatedCourseProgress,
    };

    // If a course has no completed chapters, remove it from the object to keep storage clean
    if (updatedCourseProgress.length === 0) {
      delete newProgress[courseId];
    }

    saveProgress(newProgress);
  }, []);

  const getCourseProgress = useCallback((course: Course): number => {
    if (!course.chapters || course.chapters.length === 0) {
      return 0;
    }
    const completedChapters = progress[course.id] || [];
    const progressPercentage = (completedChapters.length / course.chapters.length) * 100;
    return Math.round(progressPercentage);
  }, [progress]);

  return {
    progress,
    isChapterComplete,
    toggleChapterComplete,
    getCourseProgress,
  };
};
