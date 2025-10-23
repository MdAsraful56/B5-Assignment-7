// 'use client';
import { Code, Menu } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import logo from '../../../public/assetes/logo/logo (1).png';
import { authOptions } from '../../helpers/authOptions';
import { ModeToggle } from '../ModeToggle';

export async function Navbar() {
    // const session = useSession();
    const session = await getServerSession(authOptions);

    return (
        <header className='sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md'>
            <div className='container flex h-16 items-center justify-between'>
                {/* Left: Logo / Name */}
                <Link
                    href='/'
                    className='flex items-center gap-2 font-semibold'
                >
                    <div className='w-5 h-5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center'>
                        <Code className='w-5 h-5 text-white' />
                    </div>
                    <h3 className='text-base font-bold dark:text-white text-gray-900'>
                        Md Asraful
                    </h3>
                    {/* <Image
                        src={logo}
                        alt='Logo'
                        className='h-7 w-7 dark:invert'
                    />
                    <span className='text-lg font-bold tracking-tight'>
                        MyWebsite
                    </span> */}
                </Link>

                {/* Desktop Menu */}
                <div className='hidden items-center gap-4 md:flex'>
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList>
                            {[
                                { title: 'Home', href: '/' },
                                { title: 'Blog', href: '/blog' },
                                { title: 'Project', href: '/project' },
                                { title: 'About', href: '/about' },
                                { title: 'Dashboard', href: '/dashboard' },
                            ].map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    <NavigationMenuLink
                                        asChild
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <Link href={item.href}>
                                            {item.title}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Mode Toggle & Login */}
                    <ModeToggle />

                    {session ? (
                        <div className='text-sm'>
                            {session.user?.image ? (
                                <img
                                    src={session.user?.image as string}
                                    alt={session.user?.name ?? 'User avatar'}
                                    width={32}
                                    height={32}
                                    className='rounded-full'
                                />
                            ) : (
                                <div className='h-7 w-7 rounded-full bg-muted' />
                            )}
                        </div>
                    ) : (
                        <Button asChild>
                            <Link href='/login'>Login</Link>
                        </Button>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className='flex items-center gap-2 md:hidden'>
                    <ModeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant='outline' size='icon'>
                                <Menu className='h-5 w-5' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side='right' className='w-64'>
                            <SheetHeader>
                                <SheetTitle>
                                    <Link
                                        href='/'
                                        className='flex items-center gap-2 font-semibold'
                                    >
                                        <Image
                                            src={logo}
                                            alt='Logo'
                                            className='h-7 w-7 dark:invert'
                                        />
                                        <span>MyWebsite</span>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className='mt-6 px-4 flex flex-col gap-4'>
                                {[
                                    { title: 'Home', href: '/' },
                                    { title: 'Blog', href: '/blog' },
                                    { title: 'Features', href: '/features' },
                                    { title: 'About', href: '/about' },
                                    { title: 'Dashboard', href: '/dashboard' },
                                ].map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className='text-base font-medium hover:text-primary'
                                    >
                                        {item.title}
                                    </Link>
                                ))}

                                <Button asChild className='mt-4 w-full'>
                                    <Link href='/login'>Login</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
