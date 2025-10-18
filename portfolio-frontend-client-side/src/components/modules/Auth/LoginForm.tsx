'use client';

import Lottie from 'lottie-react';
import { Eye, EyeOff, Github } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import loginLottieData from '../../../../public/assetes/login.json';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                    credentials: 'include',
                }
            );

            const data = await res.json();

            if (res.ok) {
                toast.success('Login successful 🎉');
                console.log('User Data:', data);
                // redirect user or update session here
            } else {
                toast.error(data.message || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('Something went wrong. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        toast('Redirecting to Google Login...');
        // Example: signIn('google') if using next-auth
    };

    const handleGithubLogin = () => {
        toast('Redirecting to GitHub Login...');
        // Example: signIn('github')
    };

    return (
        <div className='min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50 dark:bg-gray-950 px-6 py-10 transition-colors duration-300'>
            {/* Left side — Lottie */}
            <div className='flex justify-center items-center w-full lg:w-1/2 mb-8 lg:mb-0'>
                <div className='max-w-xs sm:max-w-sm md:max-w-md w-full'>
                    <Lottie animationData={loginLottieData} loop />
                </div>
            </div>

            {/* Right side — Form */}
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
                    {/* Email Field */}
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

                    {/* Password Field */}
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
                            onClick={() => setShowPassword((prev) => !prev)}
                            className='absolute right-3 top-9 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition'
                            aria-label='Toggle password visibility'
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        disabled={loading}
                        className={`w-full font-semibold py-2.5 rounded-lg transition duration-300 ${
                            loading
                                ? 'bg-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                {/* Divider */}
                <div className='flex items-center my-8'>
                    <div className='flex-grow border-t border-gray-200 dark:border-gray-800'></div>
                    <span className='px-3 text-sm text-gray-400'>or</span>
                    <div className='flex-grow border-t border-gray-200 dark:border-gray-800'></div>
                </div>

                {/* Social Logins */}
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
