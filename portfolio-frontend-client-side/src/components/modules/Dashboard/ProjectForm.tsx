'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

const ProjectForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        liveLink: '',
        repoLink: '',
        techStack: '',
        image: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Project name is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Project description is required';
        }

        if (!formData.liveLink.trim()) {
            newErrors.liveLink = 'Live link is required';
        } else if (!/^https?:\/\/.+/.test(formData.liveLink)) {
            newErrors.liveLink = 'Please enter a valid URL';
        }

        if (!formData.repoLink.trim()) {
            newErrors.repoLink = 'Repository link is required';
        } else if (!/^https?:\/\/.+/.test(formData.repoLink)) {
            newErrors.repoLink = 'Please enter a valid URL';
        }

        if (!formData.techStack.trim()) {
            newErrors.techStack = 'Tech stack is required';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        const techStackArray = formData.techStack
            .split(',')
            .map((tech) => tech.trim())
            .filter((tech) => tech.length > 0);

        const submitData = {
            ...formData,
            techStack: techStackArray,
            image: formData.image || null,
        };

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/project/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            }
        );
        const result = await res.json();
        console.log(result);

        if (result?.data?.id) {
            toast.success('Project created successfully!');
            setFormData({
                name: '',
                description: '',
                liveLink: '',
                repoLink: '',
                techStack: '',
                image: '',
            });
        } else {
            toast.error('Failed to create project. Please try again.');
        }

        setIsSubmitting(false);
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-4xl mx-auto'>
                <div className='bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-100/20 dark:border-purple-500/20 overflow-hidden'>
                    <div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 sm:p-10'>
                        <h2 className='text-4xl font-bold text-white mb-3'>
                            Create New Project
                        </h2>
                        <p className='text-indigo-100 text-lg'>
                            Showcase your amazing work to the world
                        </p>
                    </div>

                    <div className='p-8 sm:p-10 space-y-8'>
                        <div className='flex flex-col'>
                            <label
                                htmlFor='name'
                                className='text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2'
                            >
                                <span className='text-purple-600 dark:text-purple-400'>
                                    ●
                                </span>
                                Project Name
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                className={`px-5 py-4 border-2 rounded-xl bg-white dark:bg-slate-700 dark:text-white focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all duration-200 ${
                                    errors.name
                                        ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                                        : 'border-gray-200 dark:border-slate-600 hover:border-purple-300'
                                }`}
                                placeholder='My Awesome Project'
                            />
                            {errors.name && (
                                <span className='text-red-600 dark:text-red-400 text-sm mt-2 font-medium'>
                                    ⚠ {errors.name}
                                </span>
                            )}
                        </div>

                        <div className='flex flex-col'>
                            <label
                                htmlFor='description'
                                className='text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2'
                            >
                                <span className='text-purple-600 dark:text-purple-400'>
                                    ●
                                </span>
                                Project Description
                                <span className='text-red-500'>*</span>
                            </label>
                            <textarea
                                id='description'
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                rows={6}
                                className={`px-5 py-4 border-2 rounded-xl bg-white dark:bg-slate-700 dark:text-white focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all duration-200 resize-none ${
                                    errors.description
                                        ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                                        : 'border-gray-200 dark:border-slate-600 hover:border-purple-300'
                                }`}
                                placeholder='Describe your project, its features, and what makes it unique...'
                            />
                            {errors.description && (
                                <span className='text-red-600 dark:text-red-400 text-sm mt-2 font-medium'>
                                    ⚠ {errors.description}
                                </span>
                            )}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='flex flex-col'>
                                <label
                                    htmlFor='liveLink'
                                    className='text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2'
                                >
                                    <span className='text-indigo-600 dark:text-indigo-400'>
                                        ●
                                    </span>
                                    Live Link
                                    <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='url'
                                    id='liveLink'
                                    name='liveLink'
                                    value={formData.liveLink}
                                    onChange={handleChange}
                                    className={`px-5 py-4 border-2 rounded-xl bg-white dark:bg-slate-700 dark:text-white focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all duration-200 ${
                                        errors.liveLink
                                            ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                                            : 'border-gray-200 dark:border-slate-600 hover:border-indigo-300'
                                    }`}
                                    placeholder='https://example.com'
                                />
                                {errors.liveLink && (
                                    <span className='text-red-600 dark:text-red-400 text-sm mt-2 font-medium'>
                                        ⚠ {errors.liveLink}
                                    </span>
                                )}
                            </div>

                            <div className='flex flex-col'>
                                <label
                                    htmlFor='repoLink'
                                    className='text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2'
                                >
                                    <span className='text-pink-600 dark:text-pink-400'>
                                        ●
                                    </span>
                                    Repository Link
                                    <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='url'
                                    id='repoLink'
                                    name='repoLink'
                                    value={formData.repoLink}
                                    onChange={handleChange}
                                    className={`px-5 py-4 border-2 rounded-xl bg-white dark:bg-slate-700 dark:text-white focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all duration-200 ${
                                        errors.repoLink
                                            ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                                            : 'border-gray-200 dark:border-slate-600 hover:border-pink-300'
                                    }`}
                                    placeholder='https://github.com/username/repo'
                                />
                                {errors.repoLink && (
                                    <span className='text-red-600 dark:text-red-400 text-sm mt-2 font-medium'>
                                        ⚠ {errors.repoLink}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <label
                                htmlFor='techStack'
                                className='text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2'
                            >
                                <span className='text-purple-600 dark:text-purple-400'>
                                    ●
                                </span>
                                Tech Stack
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                id='techStack'
                                name='techStack'
                                value={formData.techStack}
                                onChange={handleChange}
                                className={`px-5 py-4 border-2 rounded-xl bg-white dark:bg-slate-700 dark:text-white focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all duration-200 ${
                                    errors.techStack
                                        ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                                        : 'border-gray-200 dark:border-slate-600 hover:border-purple-300'
                                }`}
                                placeholder='React, Node.js, MongoDB, Tailwind CSS'
                            />
                            {errors.techStack && (
                                <span className='text-red-600 dark:text-red-400 text-sm mt-2 font-medium'>
                                    ⚠ {errors.techStack}
                                </span>
                            )}
                            <span className='text-gray-500 dark:text-gray-400 text-sm mt-2'>
                                💡 Enter technologies separated by commas
                            </span>
                        </div>

                        <div className='flex flex-col'>
                            <label
                                htmlFor='image'
                                className='text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2'
                            >
                                <span className='text-gray-400'>○</span>
                                Project Image URL
                                <span className='text-gray-500 dark:text-gray-400 text-xs font-normal'>
                                    (optional)
                                </span>
                            </label>
                            <input
                                type='url'
                                id='image'
                                name='image'
                                value={formData.image}
                                onChange={handleChange}
                                className='px-5 py-4 border-2 border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 dark:text-white hover:border-purple-300 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all duration-200'
                                placeholder='https://example.com/image.jpg'
                            />
                        </div>

                        <div className='pt-6'>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className='w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-500/50 transition-all duration-200 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            >
                                {isSubmitting
                                    ? '✨ Creating Project...'
                                    : '🚀 Create Project'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectForm;
