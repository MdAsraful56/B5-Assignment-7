import { Code2, Sparkles, Zap } from 'lucide-react';
import Image from 'next/image';
import boostrabLogo from '../../../../public/assetes/skill/boostrap.png';
import cssLogo from '../../../../public/assetes/skill/css.png';
import figmaLogo from '../../../../public/assetes/skill/figma.png';
import firebaseLogo from '../../../../public/assetes/skill/firebase.png';
import htmlLogo from '../../../../public/assetes/skill/html.png';
import jsLogo from '../../../../public/assetes/skill/javaScript.png';
import mongodbLogo from '../../../../public/assetes/skill/mongodb.png';
import nodeLogo from '../../../../public/assetes/skill/node.js.png';
import postgresLogo from '../../../../public/assetes/skill/postgress.png';
import pythonLogo from '../../../../public/assetes/skill/python.png';
import reactLogo from '../../../../public/assetes/skill/react.png';
import sqlLogo from '../../../../public/assetes/skill/sql.png';
import tailwindCssLogo from '../../../../public/assetes/skill/tailwind css.png';
import typeScriptLogo from '../../../../public/assetes/skill/typeScript.png';

const skillCategories = {
    frontend: [
        { name: 'HTML', image: htmlLogo, level: 95 },
        { name: 'CSS', image: cssLogo, level: 90 },
        { name: 'Bootstrap', image: boostrabLogo, level: 85 },
        { name: 'Tailwind', image: tailwindCssLogo, level: 92 },
        { name: 'JavaScript', image: jsLogo, level: 88 },
        { name: 'TypeScript', image: typeScriptLogo, level: 85 },
        { name: 'React', image: reactLogo, level: 90 },
    ],
    backend: [
        { name: 'Node.js', image: nodeLogo, level: 87 },
        { name: 'Python', image: pythonLogo, level: 80 },
    ],
    database: [
        { name: 'MongoDB', image: mongodbLogo, level: 85 },
        { name: 'PostgreSQL', image: postgresLogo, level: 82 },
        { name: 'SQL', image: sqlLogo, level: 88 },
        { name: 'Firebase', image: firebaseLogo, level: 83 },
    ],
    design: [{ name: 'Figma', image: figmaLogo, level: 86 }],
};

const Skill = () => {
    return (
        <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50 rounded-2xl shadow-lg'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-16'>
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-lg'>
                        <Code2 className='w-8 h-8 text-white' />
                    </div>
                    <h2 className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4'>
                        Skills & Expertise
                    </h2>
                    <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                        Technologies and tools I use to bring ideas to life
                    </p>
                </div>

                {/* Frontend Skills */}
                <div className='mb-12'>
                    <div className='flex items-center space-x-3 mb-6'>
                        <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md'>
                            <Zap className='w-5 h-5 text-white' />
                        </div>
                        <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
                            Frontend Development
                        </h3>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4'>
                        {skillCategories.frontend.map((skill, index) => (
                            <div
                                key={index}
                                className='group relative bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-2xl hover:scale-105 transition-all duration-300'
                            >
                                <div className='flex flex-col items-center space-y-3'>
                                    <div className='relative w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md'>
                                        <Image
                                            src={skill.image}
                                            alt={skill.name}
                                            width={48}
                                            height={48}
                                            className='object-contain'
                                        />
                                    </div>
                                    <div className='text-center w-full'>
                                        <span className='text-sm font-semibold text-gray-800 dark:text-gray-200 block mb-2'>
                                            {skill.name}
                                        </span>
                                        <div className='w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden'>
                                            <div
                                                className='h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-1000'
                                                style={{
                                                    width: `${skill.level}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg'>
                                    <Sparkles className='w-3 h-3 text-white' />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Backend Skills */}
                <div className='mb-12'>
                    <div className='flex items-center space-x-3 mb-6'>
                        <div className='w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md'>
                            <Code2 className='w-5 h-5 text-white' />
                        </div>
                        <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
                            Backend Development
                        </h3>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4'>
                        {skillCategories.backend.map((skill, index) => (
                            <div
                                key={index}
                                className='group relative bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl p-5 hover:border-green-500 dark:hover:border-green-500 hover:shadow-2xl hover:scale-105 transition-all duration-300'
                            >
                                <div className='flex flex-col items-center space-y-3'>
                                    <div className='relative w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md'>
                                        <Image
                                            src={skill.image}
                                            alt={skill.name}
                                            width={48}
                                            height={48}
                                            className='object-contain'
                                        />
                                    </div>
                                    <div className='text-center w-full'>
                                        <span className='text-sm font-semibold text-gray-800 dark:text-gray-200 block mb-2'>
                                            {skill.name}
                                        </span>
                                        <div className='w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden'>
                                            <div
                                                className='h-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-full transition-all duration-1000'
                                                style={{
                                                    width: `${skill.level}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Database Skills */}
                <div className='mb-12'>
                    <div className='flex items-center space-x-3 mb-6'>
                        <div className='w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md'>
                            <svg
                                className='w-5 h-5 text-white'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                            >
                                <path d='M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z' />
                                <path d='M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z' />
                                <path d='M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z' />
                            </svg>
                        </div>
                        <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
                            Database & Backend Services
                        </h3>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4'>
                        {skillCategories.database.map((skill, index) => (
                            <div
                                key={index}
                                className='group relative bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl p-5 hover:border-orange-500 dark:hover:border-orange-500 hover:shadow-2xl hover:scale-105 transition-all duration-300'
                            >
                                <div className='flex flex-col items-center space-y-3'>
                                    <div className='relative w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md'>
                                        <Image
                                            src={skill.image}
                                            alt={skill.name}
                                            width={48}
                                            height={48}
                                            className='object-contain'
                                        />
                                    </div>
                                    <div className='text-center w-full'>
                                        <span className='text-sm font-semibold text-gray-800 dark:text-gray-200 block mb-2'>
                                            {skill.name}
                                        </span>
                                        <div className='w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden'>
                                            <div
                                                className='h-full bg-gradient-to-r from-orange-600 to-red-600 rounded-full transition-all duration-1000'
                                                style={{
                                                    width: `${skill.level}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Design Tools */}
                <div>
                    <div className='flex items-center space-x-3 mb-6'>
                        <div className='w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md'>
                            <svg
                                className='w-5 h-5 text-white'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </div>
                        <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
                            Design Tools
                        </h3>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4'>
                        {skillCategories.design.map((skill, index) => (
                            <div
                                key={index}
                                className='group relative bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl p-5 hover:border-pink-500 dark:hover:border-pink-500 hover:shadow-2xl hover:scale-105 transition-all duration-300'
                            >
                                <div className='flex flex-col items-center space-y-3'>
                                    <div className='relative w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md'>
                                        <Image
                                            src={skill.image}
                                            alt={skill.name}
                                            width={48}
                                            height={48}
                                            className='object-contain'
                                        />
                                    </div>
                                    <div className='text-center w-full'>
                                        <span className='text-sm font-semibold text-gray-800 dark:text-gray-200 block mb-2'>
                                            {skill.name}
                                        </span>
                                        <div className='w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden'>
                                            <div
                                                className='h-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-full transition-all duration-1000'
                                                style={{
                                                    width: `${skill.level}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skill;
