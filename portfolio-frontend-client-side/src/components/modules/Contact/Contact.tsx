'use client';

import {
    Facebook,
    Github,
    Globe,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Send,
    Youtube,
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API}/contact/create`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (response.ok) {
                toast.success('Message sent successfully.');
                setFormData({ name: '', email: '', message: '' });
            } else {
                toast.error(data?.message || 'Failed to send message.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while sending your message.');
        }
    };

    const contactInfo = [
        { icon: MapPin, label: 'Address', value: 'Dhaka, Bangladesh' },
        { icon: Mail, label: 'Email', value: 'work.mdasraful56@gmail.com' },
        { icon: Phone, label: 'Phone', value: '+880 1889245756' },
        { icon: Globe, label: 'Website', value: 'www.yourportfolio.com' },
    ];

    const socialLinks = [
        {
            icon: Linkedin,
            href: 'https://www.linkedin.com/in/asraful4/',
            name: 'LinkedIn',
        },
        {
            icon: Github,
            href: 'https://github.com/MdAsraful56',
            name: 'GitHub',
        },
        {
            icon: Facebook,
            href: 'https://www.facebook.com/mdasraful4',
            name: 'Facebook',
        },
        {
            icon: Instagram,
            href: 'https://www.instagram.com/ashraful_islam_asrf_56/',
            name: 'Instagram',
        },
        {
            icon: Youtube,
            href: 'https://www.youtube.com/@MdAsraful-bf6te',
            name: 'YouTube',
        },
    ];

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 px-4 py-16 sm:px-6 lg:px-8 rounded-2xl'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-16'>
                    <h1 className='text-5xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4'>
                        Let&apos;s Connect
                    </h1>
                    <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                        Have a project in mind or just want to say hello?
                        I&apos;d love to hear from you.
                    </p>
                </div>

                <div className='grid lg:grid-cols-2 gap-8 lg:gap-12'>
                    {/* Contact Information Card */}
                    <div className='space-y-6'>
                        <div className='bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-slate-800'>
                            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
                                Get in Touch
                            </h2>

                            <div className='space-y-4'>
                                {contactInfo.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={index}
                                            className='flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 hover:shadow-md transition-all duration-300'
                                        >
                                            <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg'>
                                                <Icon className='w-6 h-6 text-white' />
                                            </div>
                                            <div>
                                                <p className='text-sm font-semibold text-gray-500 dark:text-gray-400'>
                                                    {item.label}
                                                </p>
                                                <p className='text-gray-900 dark:text-white font-medium'>
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className='bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-slate-800'>
                            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
                                Follow Me
                            </h3>
                            <div className='flex space-x-4'>
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='group w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 rounded-xl flex items-center justify-center hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-110'
                                            aria-label={social.label}
                                        >
                                            <Icon className='w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors' />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className='bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-slate-800'>
                        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                            Send a Message
                        </h2>
                        <p className='text-gray-600 dark:text-gray-400 mb-8'>
                            Fill out the form below and I&apos;ll respond as
                            soon as possible.
                        </p>

                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <div>
                                <label
                                    htmlFor='name'
                                    className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'
                                >
                                    Full Name
                                </label>
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder='John Doe'
                                    className='w-full px-5 py-3.5 border-2 border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all duration-200'
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor='email'
                                    className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'
                                >
                                    Email Address
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='john@example.com'
                                    className='w-full px-5 py-3.5 border-2 border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all duration-200'
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor='message'
                                    className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'
                                >
                                    Your Message
                                </label>
                                <textarea
                                    id='message'
                                    name='message'
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder='Tell me about your project or just say hello...'
                                    rows={5}
                                    className='w-full px-5 py-3.5 border-2 border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all duration-200 resize-none'
                                />
                            </div>

                            <button
                                type='submit'
                                className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center space-x-2'
                            >
                                <span>Send Message</span>
                                <Send className='w-5 h-5' />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
