import React from 'react';
import { Course } from '../types';
import { PlayIcon, PremiumIcon, SparklesIcon } from './Icons';
import ProgressBar from './ProgressBar';

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
  progress: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect, progress }) => {
  if (course.isFeatured) {
    return (
      <div
        className="relative rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer group col-span-1 md:col-span-2"
        style={{ background: 'var(--featured-gradient)' }}
        onClick={() => onSelect(course)}
      >
        <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 font-bold text-xs uppercase px-3 py-1 rounded-bl-lg">
          Featured
        </div>
        <div className="p-8 text-white">
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <span>{course.title}</span>
            <PremiumIcon className="w-6 h-6 text-yellow-300" />
          </h3>
          <p className="text-blue-100 text-base">{course.description}</p>
          <div className="mt-6 flex items-center justify-between text-yellow-300 font-semibold">
            <div className='flex items-center'>
              <span>Explore AI Now</span>
              <SparklesIcon className="ml-2 h-5 w-5" />
            </div>
             {progress > 0 && <span className="text-sm font-medium">{progress}% Complete</span>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="soft-outset soft-outset-hover soft-inset-press p-8 transform cursor-pointer group"
      onClick={() => onSelect(course)}
    >
      <h3 className="text-xl font-bold text-[var(--fg)] mb-2">{course.title}</h3>
      <p className="text-[var(--fg-muted)] text-base">{course.description}</p>
      <div className="mt-6">
        <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold">
          <span>Start Learning</span>
          <PlayIcon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
        {progress > 0 && <div className="mt-4">
            <ProgressBar progress={progress} />
            <p className="text-right text-sm text-[var(--fg-muted)] mt-1">{progress}% Complete</p>
        </div>}
      </div>
    </div>
  );
};

export default CourseCard;