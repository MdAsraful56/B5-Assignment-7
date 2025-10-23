'use client';

import {
    ArrowUp,
    Briefcase,
    Code,
    Facebook,
    Github,
    Heart,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Twitter,
    User,
    Youtube,
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', href: '/', icon: User },
        { name: 'Blog', href: '/blog', icon: MessageSquare },
        { name: 'Project', href: '/project', icon: Briefcase },
        { name: 'About', href: '/about', icon: User },
        { name: 'Dashboard', href: '/dashboard', icon: Code },
    ];

    const socialLinks = [
        {
            icon: Linkedin,
            href: 'https://linkedin.com/in/yourprofile',
            name: 'LinkedIn',
        },
        {
            icon: Github,
            href: 'https://github.com/yourprofile',
            name: 'GitHub',
        },
        {
            icon: Twitter,
            href: 'https://twitter.com/yourprofile',
            name: 'Twitter',
        },
        {
            icon: Facebook,
            href: 'https://facebook.com/yourprofile',
            name: 'Facebook',
        },
        {
            icon: Instagram,
            href: 'https://instagram.com/yourprofile',
            name: 'Instagram',
        },
        {
            icon: Youtube,
            href: 'https://youtube.com/@yourprofile',
            name: 'YouTube',
        },
    ];

    return (
        <footer className='relative mt-10 bg-slate-900 text-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                {/* Main Footer Content */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-12'>
                    {/* Brand Section */}
                    <div>
                        <div className='flex items-center space-x-2 mb-6'>
                            <div className='w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center'>
                                <Code className='w-7 h-7 text-white' />
                            </div>
                            <h3 className='text-2xl font-bold text-white'>
                                Md Asraful
                            </h3>
                        </div>
                        <p className='text-gray-400 mb-6 leading-relaxed'>
                            Crafting digital experiences with passion and
                            precision. Transforming ideas into elegant
                            solutions.
                        </p>
                        <div className='space-y-3'>
                            <div className='flex items-center space-x-3 text-gray-400'>
                                <Mail className='w-5 h-5 text-indigo-400' />
                                <span className='text-sm'>
                                    work.mdasraful56@gmail.com
                                </span>
                            </div>
                            <div className='flex items-center space-x-3 text-gray-400'>
                                <Phone className='w-5 h-5 text-indigo-400' />
                                <span className='text-sm'>+880 1889245756</span>
                            </div>
                            <div className='flex items-center space-x-3 text-gray-400'>
                                <MapPin className='w-5 h-5 text-indigo-400' />
                                <span className='text-sm'>
                                    Dhaka, Bangladesh
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className='text-xl font-bold mb-6 text-white'>
                            Quick Links
                        </h4>
                        <ul className='space-y-3'>
                            {quickLinks.map((link, index) => {
                                const Icon = link.icon;
                                return (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className='flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200'
                                        >
                                            <Icon className='w-4 h-4' />
                                            <span>{link.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className='text-xl font-bold mb-6 text-white'>
                            Stay Updated
                        </h4>
                        <p className='text-gray-400 mb-4 text-sm'>
                            Subscribe to get the latest updates and news.
                        </p>
                        <div className='flex flex-col space-y-3'>
                            <input
                                type='email'
                                placeholder='Enter your email'
                                className='px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors'
                            />
                            <button className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300'>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Social Links & Scroll Button */}
                <div className='border-t border-slate-800 pt-8 mb-8'>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-3'>
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='w-11 h-11 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-600 transition-all duration-300'
                                        aria-label={social.name}
                                    >
                                        <Icon className='w-5 h-5 text-gray-400 hover:text-white' />
                                    </a>
                                );
                            })}
                        </div>

                        {/* Scroll to Top Button */}
                        <button
                            onClick={scrollToTop}
                            className='w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-300'
                            aria-label='Scroll to top'
                        >
                            <ArrowUp className='w-6 h-6 text-white' />
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className='border-t border-slate-800 pt-8'>
                    <div className='flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-sm text-gray-400'>
                        <p>© {currentYear} YourName. All rights reserved.</p>
                        <p className='flex items-center space-x-1'>
                            <span>Made with</span>
                            <Heart className='w-4 h-4 text-red-500 fill-red-500' />
                            <span>in Bangladesh</span>
                        </p>
                        <div className='flex space-x-6'>
                            <a
                                href='#'
                                className='hover:text-white transition-colors'
                            >
                                Privacy Policy
                            </a>
                            <a
                                href='#'
                                className='hover:text-white transition-colors'
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
