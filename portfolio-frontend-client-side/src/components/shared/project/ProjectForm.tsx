'use client';

import {
    Calendar,
    CheckCircle,
    Code,
    Github,
    Image,
    Link,
    Plus,
    X,
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ProjectForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        liveLink: '',
        repoLink: '',
        techStack: '',
        image: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Tech stack কে array তে convert করা
        const techStackArray = formData.techStack
            .split(',')
            .map((tech) => tech.trim())
            .filter((tech) => tech !== '');

        const projectData = {
            ...formData,
            techStack: techStackArray,
        };

        console.log('Project Data:', projectData);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API}/project/create`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(projectData),
                }
            );
            const data = await response.json();
            console.log('Success:', data);
            toast.success('Project created successfully!');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to create project. Please try again.');
        }

        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setIsOpen(false);
            setFormData({
                name: '',
                description: '',
                liveLink: '',
                repoLink: '',
                techStack: '',
                image: '',
            });
        }, 2000);
    };

    return (
        <div>
            {/* Create Project Button */}
            <button
                onClick={() => setIsOpen(true)}
                className='group flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
            >
                <Plus className='w-5 h-5 group-hover:rotate-90 transition-transform duration-300' />
                <span>Create New Project</span>
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in'>
                    <div className='bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-slate-800 animate-slide-up'>
                        {/* Header */}
                        <div className='sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-8 py-6 flex items-center justify-between z-10'>
                            <div>
                                <h2 className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                                    Create New Project
                                </h2>
                                <p className='text-gray-600 dark:text-gray-400 text-sm mt-1'>
                                    Fill in the details to add a new project to
                                    your portfolio
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className='w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors'
                                aria-label='Close modal'
                            >
                                <X className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                            </button>
                        </div>

                        {/* Form Content */}
                        <div className='p-8'>
                            {isSubmitted ? (
                                <div className='flex flex-col items-center justify-center py-12 space-y-4'>
                                    <div className='w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl'>
                                        <CheckCircle className='w-10 h-10 text-white' />
                                    </div>
                                    <h3 className='text-2xl font-bold text-gray-900 dark:text-white text-center'>
                                        Project Created Successfully!
                                    </h3>
                                    <p className='text-gray-600 dark:text-gray-400 text-center'>
                                        Your project has been added to the
                                        database.
                                    </p>
                                </div>
                            ) : (
                                <div className='space-y-6'>
                                    {/* Project Name */}
                                    <div>
                                        <label
                                            htmlFor='name'
                                            className='flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'
                                        >
                                            <Code className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
                                            <span>Project Name</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='name'
                                            name='name'
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder='E.g., E-commerce Website'
                                            className='w-full px-5 py-3.5 border-2 border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all duration-200'
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label
                                            htmlFor='description'
                                            className='flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'
                                        >
                                            <Calendar className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
                                            <span>Description</span>
                                        </label>
                                        <textarea
                                            id='description'
                                            name='description'
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder='Describe your project...'
                                            rows={4}
                                            className='w-full px-5 py-3.5 border-2 border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all duration-200 resize-none'
                                        />
                                    </div>

                                    {/* Links Grid */}
                                    <div className='grid md:grid-cols-2 gap-6'>
                                        {/* Live Link */}
                                        <div>
                                            <label
                                                htmlFor='liveLink'
                                                className='flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'
                                            >
                                                <Link className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
                                                <span>Live Link</span>
                                            </label>
                                            <input
                                                type='url'
                                                id='liveLink'
                                                name='liveLink'
                                                value={formData.liveLink}
                                                onChange={handleChange}
                                                placeholder='https://example.com'
                                                className='w-full px-5 py-3.5 border-2 border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all duration-200'
                                            />
                                        </div>

                                        {/* Repo Link */}
                                        <div>
                                            <label
                                                htmlFor='repoLink'
                                                className='flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'
                                            >
                                                <Github className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
                                                <span>Repository Link</span>
                                            </label>
                                            <input
                                                type='url'
                                                id='repoLink'
                                                name='repoLink'
                                                value={formData.repoLink}
                                                onChange={handleChange}
                                                placeholder='https://github.com/...'
                                                className='w-full px-5 py-3.5 border-2 border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all duration-200'
                                            />
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <label
                                            htmlFor='techStack'
                                            className='flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'
                                        >
                                            <Code className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
                                            <span>Tech Stack</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='techStack'
                                            name='techStack'
                                            value={formData.techStack}
                                            onChange={handleChange}
                                            placeholder='React, Node.js, MongoDB, TypeScript (comma separated)'
                                            className='w-full px-5 py-3.5 border-2 border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all duration-200'
                                        />
                                        <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>
                                            Separate technologies with commas
                                        </p>
                                    </div>

                                    {/* Image URL */}
                                    <div>
                                        <label
                                            htmlFor='image'
                                            className='flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'
                                        >
                                            <Image className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
                                            <span>Image URL (Optional)</span>
                                        </label>
                                        <input
                                            type='url'
                                            id='image'
                                            name='image'
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder='https://example.com/image.jpg'
                                            className='w-full px-5 py-3.5 border-2 border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all duration-200'
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className='flex flex-col sm:flex-row gap-4 pt-6'>
                                        <button
                                            type='button'
                                            onClick={() => setIsOpen(false)}
                                            className='flex-1 px-6 py-3.5 border-2 border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200'
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type='button'
                                            onClick={handleSubmit}
                                            className='flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center space-x-2'
                                        >
                                            <Plus className='w-5 h-5' />
                                            <span>Create Project</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slide-up {
                    from {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }

                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ProjectForm;
