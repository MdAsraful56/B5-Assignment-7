'use client';

import { Typewriter } from 'react-simple-typewriter';

const TextWrite = () => {
    // const text = ['a Developer', 'a Designer', 'a Creator'];
    const text = [
        'a Full Stack Developer',
        'a React Specialist',
        'a Next.js Expert',
        'a Backend Engineer',
        'a Database Architect',
    ];

    return (
        <div className='pl-10'>
            <Typewriter
                words={text}
                loop={false}
                cursor
                cursorStyle=' |'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
            />
        </div>
    );
};

export default TextWrite;
