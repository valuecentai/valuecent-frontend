import React from 'react';
import { UsersIcon } from '../components/Icons';

const CommunityPage: React.FC = () => {
    return (
        <div className="container mx-auto p-8">
            <div className="text-center soft-outset p-12 flex flex-col items-center justify-center min-h-[70vh]">
                <div className="w-24 h-24 rounded-full bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center mb-6 ring-8 ring-blue-600/5 dark:ring-blue-400/5">
                    <UsersIcon className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                </div>
                <h1 className="text-4xl font-bold text-[var(--fg)]">Community Hub</h1>
                <p className="text-lg text-[var(--fg-muted)] mt-2 max-w-2xl">
                    Connect, collaborate, and learn with fellow professionals. Our interactive community forums are a place to ask questions, share insights, and grow your network.
                </p>
                <div className="mt-8 bg-[var(--secondary-bg)] soft-inset p-6 rounded-xl">
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Launching Soon!</h2>
                    <p className="text-[var(--secondary-fg)] mt-1">
                        We're putting the finishing touches on this exciting new space. Please check back later!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;