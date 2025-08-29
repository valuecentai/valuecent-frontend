
import React from 'react';
import { Course } from '../types';
import CourseCard from './CourseCard';

interface CourseWithProgress extends Course {
  progress: number;
}

interface CourseGridProps {
  courses: CourseWithProgress[];
  onSelectCourse: (course: Course) => void;
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses, onSelectCourse }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} onSelect={onSelectCourse} progress={course.progress} />
      ))}
    </div>
  );
};

export default CourseGrid;
