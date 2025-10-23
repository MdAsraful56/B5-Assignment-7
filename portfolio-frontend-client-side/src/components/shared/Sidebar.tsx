'use client';

import { Button } from '@/components/ui/button';
import { Home, LogOut, Menu, PlusCircle, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { ModeToggle } from '../ModeToggle';

export default function Sidebar() {
    const session = useSession();
    const userRole = session?.data?.user?.role;
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={toggleSidebar}
                className='fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-800 lg:hidden'
                aria-label='Toggle menu'
            >
                {isOpen ? (
                    <X className='h-6 w-6 text-black dark:text-white' />
                ) : (
                    <Menu className='h-6 w-6 text-black dark:text-white' />
                )}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className='fixed inset-0 bg-black/50 z-40 lg:hidden'
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static
                    top-0 left-0
                    h-screen w-64
                    flex flex-col
                    border-r border-gray-200 dark:border-gray-800
                    dark:bg-black bg-white
                    text-black dark:text-white
                    z-40
                    transition-transform duration-300 ease-in-out
                    ${
                        isOpen
                            ? 'translate-x-0'
                            : '-translate-x-full lg:translate-x-0'
                    }
                `}
            >
                {/* Top navigation */}
                <nav className='flex-1 space-y-2 p-4 mt-16 lg:mt-0'>
                    <Link
                        href='/'
                        onClick={closeSidebar}
                        className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white transition-colors'
                    >
                        <Home className='h-4 w-4' />
                        Home
                    </Link>

                    <Link
                        href='/dashboard/create-blog'
                        onClick={closeSidebar}
                        className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white transition-colors'
                    >
                        <PlusCircle className='h-4 w-4' />
                        Create Blog
                    </Link>

                    {userRole === 'ADMIN' && (
                        <Link
                            href='/dashboard/create-project'
                            onClick={closeSidebar}
                            className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white transition-colors'
                        >
                            <PlusCircle className='h-4 w-4' />
                            Create Project
                        </Link>
                    )}
                    {userRole === 'ADMIN' && (
                        <Link
                            href='/dashboard/massage'
                            onClick={closeSidebar}
                            className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white transition-colors'
                        >
                            <PlusCircle className='h-4 w-4' />
                            Massage
                        </Link>
                    )}
                </nav>
                <div className=''>
                    <ModeToggle />
                </div>

                {/* Bottom action */}
                <div className='p-4 border-t border-gray-200 dark:border-gray-800'>
                    {session.status === 'authenticated' && (
                        <Button
                            variant='destructive'
                            className='w-full justify-start gap-2 cursor-pointer'
                            onClick={() => {
                                closeSidebar();
                                signOut({ callbackUrl: '/' });
                            }}
                        >
                            <LogOut className='h-4 w-4' />
                            Logout
                        </Button>
                    )}
                </div>
            </aside>
        </>
    );
}
