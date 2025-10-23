'use client';

import { ArrowLeft, Home } from 'lucide-react';
import { Metadata } from 'next';
import { useEffect, useState } from 'react';

export const metadata: Metadata = {
    title: 'Not Found - Dashboard - Portfolio',
    description: 'The requested page could not be found.',
};

const NotFound = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className='min-h-screen flex items-center justify-center px-4'>
            <div
                className={`text-center transition-all duration-500 ${
                    isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                }`}
            >
                {/* 404 Number */}
                <h1 className='text-8xl md:text-9xl font-bold mb-4'>
                    <span className='bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent'>
                        404
                    </span>
                </h1>

                {/* Heading */}
                <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                    Page Not Found
                </h2>

                {/* Buttons */}
                <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                    <button
                        onClick={() => window.history.back()}
                        className='flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                    >
                        <ArrowLeft className='w-4 h-4' />
                        Go Back
                    </button>

                    <button
                        onClick={() => (window.location.href = '/')}
                        className='flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors'
                    >
                        <Home className='w-4 h-4' />
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
