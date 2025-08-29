import React, { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';
import { UserIcon, BriefcaseIcon } from './Icons';
import { UserProfile } from '../types';

interface WelcomeModalProps {
  onSave: (profile: UserProfile) => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onSave }) => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && title.trim()) {
            onSave({ name, title });
        }
    };

    const isFormValid = name.trim() !== '' && title.trim() !== '';

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4">
            <div className="absolute inset-0 w-full h-full">
                <AnimatedBackground />
            </div>
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-[var(--card)]/70 dark:bg-[var(--card)]/70 backdrop-blur-md border border-[var(--border)] rounded-2xl shadow-2xl p-8 text-center">
                    <h1 className="text-3xl font-bold text-[var(--card-fg)] mb-2">Welcome to VALUECENT</h1>
                    <p className="text-[var(--fg-muted)] mb-8">Let's set up your profile to get started.</p>

                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[var(--card-fg)]">Full Name</label>
                            <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <UserIcon className="h-5 w-5 text-[var(--fg-subtle)]" />
                                </span>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-[var(--card)]/50 border-[var(--border)] text-[var(--card-fg)] placeholder-[var(--fg-subtle)] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                                    placeholder="e.g., V. S. Rajput"
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-[var(--card-fg)]">Designation / Title</label>
                            <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                     <BriefcaseIcon className="h-5 w-5 text-[var(--fg-subtle)]" />
                                </span>
                                <input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-[var(--card)]/50 border-[var(--border)] text-[var(--card-fg)] placeholder-[var(--fg-subtle)] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                                    placeholder="e.g., Senior Compliance Officer"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-[var(--bg-disabled)] disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed"
                            >
                                Save & Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WelcomeModal;