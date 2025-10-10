'use client';

import Link from 'next/link';

const RegisterForm = () => {
    const handleSubmit = () => {};
    console.log('Form submitted');

    return (
        <div className='min-h-screen flex items-center justify-center px-4'>
            <div className='w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 transition-all duration-300'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
                        Get Started 👋
                    </h2>
                    <p className='text-gray-500 dark:text-gray-400 mt-2 text-sm'>
                        create a new account
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label
                            htmlFor='name'
                            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                        >
                            Name
                        </label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            required
                            placeholder='John Doe'
                            className='w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition'
                        />
                    </div>

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
                            htmlFor='phone'
                            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                        >
                            Phone number
                        </label>
                        <input
                            type='text'
                            id='phone'
                            name='phone'
                            required
                            placeholder='(123) 456-7890'
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
                        Sign Up
                    </button>
                </form>

                {/* Divider */}
                <div className='flex items-center my-8'>
                    <div className='flex-grow border-t border-gray-200 dark:border-gray-800'></div>
                    <span className='px-3 text-sm text-gray-400'>or</span>
                    <div className='flex-grow border-t border-gray-200 dark:border-gray-800'></div>
                </div>

                <p className='text-center text-sm text-gray-500 dark:text-gray-400 mt-6'>
                    You have an account?{' '}
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
