'use client';

import { Typewriter } from 'react-simple-typewriter';

const TextWrite = () => {
    const text = ['a Developer', 'a Designer', 'a Creator'];

    return (
        <div>
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
