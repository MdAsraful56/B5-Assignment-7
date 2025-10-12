'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import me from '../../../../public/assetes/me.png';
import TextWrite from '../../shared/TextWrite';

const Hero = () => {
    return (
        <section className='w-full py-16 md:py-24'>
            <div className='container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10'>
                {/* Text Section */}
                <div className='flex-1 text-center md:text-left space-y-5'>
                    <h1 className='font-schoolbell text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100'>
                        Hi, I am{' '}
                        <span className='font-schoolbell text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300'>
                            Asraful
                        </span>
                        <span className=''>
                            <TextWrite />
                        </span>
                    </h1>
                    <p className='text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-xl mx-auto md:mx-0'>
                        I am a passionate web developer specializing in building
                        and designing exceptional digital experiences.
                        Currently, I focus on developing responsive,
                        high-performance full-stack web applications.
                    </p>

                    <div>
                        <Button
                            size='lg'
                            className='mt-3 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-all'
                        >
                            Hire Me
                        </Button>
                    </div>
                </div>

                {/* Image Section */}
                <div className='flex-1 flex justify-center'>
                    <div className='relative w-96 h-96 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-4 border-blue-500/20 shadow-2xl'>
                        <Image
                            src={me}
                            alt='Asraful portrait'
                            fill
                            className='object-cover'
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
