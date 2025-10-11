'use client';

import Lottie from 'lottie-react';
import React, { useState } from 'react';
import contactAnimationData from '../../../public/assetes/Contact Us.json';

const Contact = () => {
    // Local state for form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Contact Form Submitted:', formData);

        // Example API call
        // await fetch('/api/contact', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData),
        // });
    };

    return (
        <div className='min-h-screen flex flex-col lg:flex-row items-center justify-center  px-6 py-10 transition-colors duration-300'>
            {/* Left side - Lottie Animation */}
            <div className='flex justify-center items-center w-full lg:w-1/2 mb-8 lg:mb-0'>
                <div className='max-w-xs sm:max-w-sm md:max-w-md w-full'>
                    <Lottie animationData={contactAnimationData} loop={true} />
                </div>
            </div>

            {/* Right side - Contact Form */}
            <div className='w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 transition-all duration-300'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
                        Contact Us 📩
                    </h2>
                    <p className='text-gray-500 dark:text-gray-400 mt-2 text-sm'>
                        We’d love to hear from you!
                    </p>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className='space-y-5'>
                    {/* Name */}
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
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder='Your full name'
                            className='w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition'
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                        >
                            Email
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

                    {/* Message */}
                    <div>
                        <label
                            htmlFor='message'
                            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                        >
                            Message
                        </label>
                        <textarea
                            id='message'
                            name='message'
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder='Write your message...'
                            className='w-full h-40 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition resize-none'
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-300'
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
