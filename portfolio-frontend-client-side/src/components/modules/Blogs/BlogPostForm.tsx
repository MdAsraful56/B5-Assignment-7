'use client';

import { Plus, Tag, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function BlogPostForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<{
        title: string;
        content: string;
        thumbnail: string;
        tags: string[];
        authorId: number;
    }>({
        title: '',
        content: '',
        thumbnail: '',
        tags: [],
        authorId: 1,
    });
    const [tagInput, setTagInput] = useState('');

    const handleSubmit = async () => {
        if (!formData.title || !formData.content) {
            toast.error('Please fill in all required fields');
            return;
        }
        console.log('Post created:', formData);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API}/post/create`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();
            console.log('Post created:', data);
            toast.success('Post created successfully');
        } catch (error) {
            toast.error('Failed to create post');
        }

        setIsOpen(false);
        setFormData({
            title: '',
            content: '',
            thumbnail: '',
            tags: [],
            authorId: 1,
        });
    };

    const handleChange = (name: string, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()],
            }));
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleKeyPress = (e: { key: string; preventDefault: () => void }) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8'>
            <button
                onClick={() => setIsOpen(true)}
                className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2'
            >
                <Plus size={20} />
                Create New Post
            </button>

            {isOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
                    <div className='bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto'>
                        <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl'>
                            <h2 className='text-2xl font-bold text-gray-800'>
                                Create New Blog Post
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className='text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-colors'
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className='p-6 space-y-6'>
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Title{' '}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='text'
                                    value={formData.title}
                                    onChange={(e) =>
                                        handleChange('title', e.target.value)
                                    }
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                                    placeholder='Enter post title'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Content{' '}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) =>
                                        handleChange('content', e.target.value)
                                    }
                                    rows={8}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none'
                                    placeholder='Write your post content...'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Thumbnail URL
                                </label>
                                <input
                                    type='url'
                                    value={formData.thumbnail}
                                    onChange={(e) =>
                                        handleChange(
                                            'thumbnail',
                                            e.target.value
                                        )
                                    }
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                                    placeholder='https://example.com/image.jpg'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Tags
                                </label>
                                <div className='flex gap-2 mb-3'>
                                    <input
                                        type='text'
                                        value={tagInput}
                                        onChange={(e) =>
                                            setTagInput(e.target.value)
                                        }
                                        onKeyPress={handleKeyPress}
                                        className='flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                                        placeholder='Add a tag and press Enter'
                                    />
                                    <button
                                        onClick={addTag}
                                        className='bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2'
                                    >
                                        <Tag size={18} />
                                        Add
                                    </button>
                                </div>

                                <div className='flex flex-wrap gap-2'>
                                    {formData.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className='bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2'
                                        >
                                            {tag}
                                            <button
                                                onClick={() => removeTag(tag)}
                                                className='hover:bg-blue-200 rounded-full p-0.5 transition-colors'
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Author ID{' '}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='number'
                                    value={formData.authorId}
                                    onChange={(e) =>
                                        handleChange(
                                            'authorId',
                                            parseInt(e.target.value) || 1
                                        )
                                    }
                                    min='1'
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                                    placeholder='Enter author ID'
                                />
                            </div>

                            <div className='flex gap-3 pt-4'>
                                <button
                                    onClick={handleSubmit}
                                    className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200'
                                >
                                    Create Post
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className='px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors'
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
