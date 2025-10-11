const Education = () => {
    const educationData = [
        {
            institution: 'Char Mal Ghon High School',
            degree: 'Secondary School Certificate (SSC)',
            year: '2019 - 2021',
            grade: 'GPA: 5.00',
            description:
                'Built a strong academic foundation in general science and mathematics with excellent performance.',
        },
        {
            institution: 'Shariatpur Govt College',
            degree: 'Higher Secondary Certificate (HSC)',
            year: '2021 - 2023',
            group: 'Science',
            grade: 'GPA: 4.80',
            description:
                'Focused on core science subjects and actively participated in science fairs and academic projects.',
        },
        {
            institution: 'Daffodil International University',
            degree: 'B.Sc. in Computer Science and Engineering',
            year: '2023 - Present',
            grade: 'Current CGPA: 3.85',
            description:
                'Learning advanced concepts in software development, AI, and data-driven technologies.',
        },
    ];

    return (
        <section id='education' className='py-20  text-gray-100'>
            <div className='max-w-5xl mx-auto px-6'>
                <h2 className='font-schoolbell text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>
                    Education Journey
                </h2>

                <div className='relative border-l border-gray-700'>
                    {educationData.map((edu, index) => (
                        <div key={index} className='mb-12 ml-6 relative group'>
                            {/* Timeline circle */}
                            <span className='absolute -left-3.5 flex items-center justify-center w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ring-4 ring-gray-900 group-hover:scale-110 transition-transform duration-300'></span>

                            {/* Content Card */}
                            <div className='bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1'>
                                <div className='flex justify-between items-center mb-2'>
                                    <h3 className='text-xl font-semibold text-blue-400'>
                                        {edu.institution}
                                    </h3>
                                    <span className='text-sm text-gray-400'>
                                        {edu.year}
                                    </span>
                                </div>
                                <p className='text-sm text-gray-300 mb-1'>
                                    {edu.degree}{' '}
                                    {edu.group && <span> | {edu.group}</span>}
                                </p>
                                <p className='text-sm text-gray-400 mb-3'>
                                    {edu.grade}
                                </p>
                                <p className='text-gray-300 text-sm leading-relaxed'>
                                    {edu.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
