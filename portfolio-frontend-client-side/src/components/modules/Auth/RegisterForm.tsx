'use client';
import Lottie from 'lottie-react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import registerLottieData from '../../../../public/assetes/register.json';

const RegisterForm = () => {
    // State for form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    // Show/hide password
    const [showPassword, setShowPassword] = useState(false);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log('Form Submitted:', formData);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API}/user/create`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await res.json();
            if (data?.id) {
                toast.success('User Registered successfully');
            } else {
                toast.error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='min-h-screen flex flex-col lg:flex-row-reverse items-center justify-center bg-gray-50 dark:bg-gray-950 px-6 py-10 transition-colors duration-300'>
            {/* Left Side - Lottie Animation (Visible on all devices) */}
            <div className='flex justify-center items-center w-full lg:w-1/2 mb-8 lg:mb-0'>
                <div className='max-w-xs sm:max-w-sm md:max-w-md w-full'>
                    <Lottie animationData={registerLottieData} loop={true} />
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className='w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 transition-all duration-300'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
                        Get Started 👋
                    </h2>
                    <p className='text-gray-500 dark:text-gray-400 mt-2 text-sm'>
                        Create a new account
                    </p>
                </div>

                {/* Register Form */}
                <form onSubmit={handleSubmit} className='space-y-5'>
                    {/* Name */}
                    <div>
                        <label
                            htmlFor='name'
                            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                        >
                            Full Name
                        </label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder='John Doe'
                            className='w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition'
                        />
                    </div>

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

                    {/* Phone */}
                    <div>
                        <label
                            htmlFor='phone'
                            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                        >
                            Phone number
                        </label>
                        <input
                            type='text'
                            id='phone'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder='(123) 456-7890'
                            className='w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition'
                        />
                    </div>

                    {/* Password + Eye toggle */}
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
                            className='w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition'
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
                        Sign Up
                    </button>
                </form>

                {/* Divider */}
                <div className='flex items-center my-8'>
                    <div className='flex-grow border-t border-gray-200 dark:border-gray-800'></div>
                    <span className='px-3 text-sm text-gray-400'>or</span>
                    <div className='flex-grow border-t border-gray-200 dark:border-gray-800'></div>
                </div>

                {/* Footer */}
                <p className='text-center text-sm text-gray-500 dark:text-gray-400 mt-6'>
                    Already have an account?{' '}
                    <Link
                        href='/login'
                        className='text-indigo-600 dark:text-indigo-400 font-medium hover:underline'
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
