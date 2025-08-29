import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '../components/Icons';
import { Theme } from '../contexts/ThemeContext';

const SettingsPage: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const themes: { name: Theme; icon: React.ReactNode }[] = [
        { name: 'light', icon: <SunIcon className="w-6 h-6" /> },
        { name: 'dark', icon: <MoonIcon className="w-6 h-6" /> },
        { name: 'system', icon: <ComputerDesktopIcon className="w-6 h-6" /> },
    ];

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold text-[var(--fg)] mb-8">Settings</h1>
            
            <div className="soft-outset p-8">
                <h2 className="text-2xl font-bold text-[var(--fg)] mb-2">Appearance</h2>
                <p className="text-[var(--fg-muted)] mb-6">
                    Choose how the application looks. Select a theme or sync with your system.
                </p>

                <div className="flex space-x-2 rounded-xl soft-inset p-1">
                    {themes.map((t) => (
                        <button
                            key={t.name}
                            onClick={() => setTheme(t.name)}
                            className={`w-full flex justify-center items-center space-x-2 p-3 rounded-lg font-semibold capitalize transition-colors duration-300 ${
                                theme === t.name
                                ? 'soft-outset text-blue-600 dark:text-blue-400'
                                : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
                            }`}
                        >
                           {t.icon}
                           <span>{t.name}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-8 border-t border-[var(--border)] pt-6">
                    <h2 className="text-2xl font-bold text-[var(--fg)] mb-2">More Settings</h2>
                    <p className="text-[var(--fg-muted)]">
                        Additional configuration options will be available here in the future.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;