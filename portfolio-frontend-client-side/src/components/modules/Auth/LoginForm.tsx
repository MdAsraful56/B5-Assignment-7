'use client';

import Lottie from 'lottie-react';
import { Eye, EyeOff, Github } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import loginLottieData from '../../../../public/assetes/login.json';

const LoginForm = () => {
    // Local state for inputs
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Password visibility toggle
    const [showPassword, setShowPassword] = useState(false);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // This is where your data will go (example: send to backend API)
        console.log('Form Data:', formData);

        // Example:
        // await fetch('/api/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData),
        // });
    };

    const handleGoogleLogin = () => {
        console.log('Login with Google');
    };

    const handleGithubLogin = () => {
        console.log('Login with GitHub');
    };

    return (
        <div className='min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50 dark:bg-gray-950 px-6 py-10 transition-colors duration-300'>
            {/* Left Side — Lottie (now also visible on small screens) */}
            <div className='flex justify-center items-center w-full lg:w-1/2 mb-8 lg:mb-0'>
                <div className='max-w-xs sm:max-w-sm md:max-w-md w-full'>
                    <Lottie animationData={loginLottieData} loop={true} />
                </div>
            </div>

            {/* Right Side — Form */}
            <div className='w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 transition-all duration-300'>
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
                    {/* Email */}
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
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder='you@example.com'
                            className='w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition'
                        />
                    </div>

                    {/* Password + Eye icon */}
                    <div className='relative'>
                        <label
                            htmlFor='password'
                            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder='••••••••'
                            className='w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition pr-10'
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-3 top-9 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition'
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    {/* Submit button */}
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

                {/* Social Login */}
                <div className='flex flex-col sm:flex-row gap-4'>
                    <button
                        type='button'
                        onClick={handleGoogleLogin}
                        className='flex items-center justify-center flex-1 gap-2 border border-gray-300 dark:border-gray-700 rounded-lg py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300'
                    >
                        <FcGoogle size={20} />
                        <span className='text-gray-700 dark:text-gray-200 text-sm font-medium'>
                            Google
                        </span>
                    </button>

                    <button
                        type='button'
                        onClick={handleGithubLogin}
                        className='flex items-center justify-center flex-1 gap-2 border border-gray-300 dark:border-gray-700 rounded-lg py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300'
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
