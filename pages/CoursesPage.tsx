import React from 'react';
import CourseGrid from '../components/CourseGrid';
import { COURSES } from '../constants';
import { Course, View } from '../types';
import { useProgress } from '../hooks/useProgress';

const CoursesPage: React.FC<{ navigateTo: (view: View) => void }> = ({ navigateTo }) => {

    const { getCourseProgress } = useProgress();

    const handleSelectCourse = (course: Course) => {
        navigateTo({ page: 'courseDetail', courseId: course.id });
    };

    const coursesWithProgress = COURSES.map(course => ({
        ...course,
        progress: getCourseProgress(course),
    }));

    return (
        <div className="container mx-auto p-8">
            <div className="text-center mb-12 soft-outset p-8">
                <h1 className="text-4xl font-bold text-[var(--fg)]">Training & Development</h1>
                <p className="text-lg text-[var(--fg-muted)] mt-2">Enhance your skills with our expert-led courses.</p>
            </div>
            <CourseGrid courses={coursesWithProgress} onSelectCourse={handleSelectCourse} />
        </div>
    );
};

export default CoursesPage;