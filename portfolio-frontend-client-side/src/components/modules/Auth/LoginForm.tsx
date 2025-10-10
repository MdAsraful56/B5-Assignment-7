'use client';

import { Github } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const LoginForm = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted');
    };

    const handleGoogleLogin = () => {
        console.log('Login with Google');
    };

    const handleGithubLogin = () => {
        console.log('Login with GitHub');
    };

    return (
        <div className='min-h-screen flex items-center justify-center px-4'>
            <div className='w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 transition-all duration-300'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
                        Welcome Back 👋
                    </h2>
                    <p className='text-gray-500 dark:text-gray-400 mt-2 text-sm'>
                        Sign in to your account
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                        >
                            Email address
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            required
                            placeholder='you@example.com'
                            className='w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition'
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='password'
                            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                        >
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            required
                            placeholder='••••••••'
                            className='w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition'
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-300'
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className='flex items-center my-8'>
                    <div className='flex-grow border-t border-gray-200 dark:border-gray-800'></div>
                    <span className='px-3 text-sm text-gray-400'>or</span>
                    <div className='flex-grow border-t border-gray-200 dark:border-gray-800'></div>
                </div>

                {/* Social Buttons (side by side) */}
                <div className='flex gap-4'>
                    <button
                        type='button'
                        onClick={handleGoogleLogin}
                        className='flex items-center justify-center w-1/2 gap-2 border border-gray-300 dark:border-gray-700 rounded-lg py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300'
                    >
                        <FcGoogle size={20} />
                        <span className='text-gray-700 dark:text-gray-200 text-sm font-medium'>
                            Google
                        </span>
                    </button>

                    <button
                        type='button'
                        onClick={handleGithubLogin}
                        className='flex items-center justify-center w-1/2 gap-2 border border-gray-300 dark:border-gray-700 rounded-lg py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300'
                    >
                        <Github
                            size={20}
                            className='text-gray-700 dark:text-gray-200'
                        />
                        <span className='text-gray-700 dark:text-gray-200 text-sm font-medium'>
                            GitHub
                        </span>
                    </button>
                </div>

                {/* Footer */}
                <p className='text-center text-sm text-gray-500 dark:text-gray-400 mt-6'>
                    Don’t have an account?{' '}
                    <Link
                        href='/register'
                        className='text-indigo-600 dark:text-indigo-400 font-medium hover:underline'
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
