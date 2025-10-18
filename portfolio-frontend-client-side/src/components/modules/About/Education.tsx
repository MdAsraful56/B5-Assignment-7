const Education = () => {
    const educationData = [
        {
            institution: 'Shariatpur Govt College',
            degree: 'Higher Secondary Certificate (HSC)',
            year: '2021 - 2023',
            group: 'Science',
        },
        {
            institution: 'Madaripur Government College',
            degree: 'Bachelor of Science (Honors) in Chemistry',
            year: '2023 - Present',
        },
    ];

    return (
        <section id='education' className='py-20 text-white font-raleway'>
            <div className='max-w-6xl mx-auto px-6'>
                <h2 className='font-schoolbell text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>
                    Education Journey
                </h2>

                <div className='grid gap-10 sm:grid-cols-1 md:grid-cols-2'>
                    {educationData.map((edu, index) => (
                        <div key={index} className='relative group'>
                            {/* Timeline circle */}
                            <span className='absolute -left-3.5 top-3 flex items-center justify-center w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ring-4 ring-black group-hover:scale-110 transition-transform duration-300'></span>

                            {/* Content Card */}
                            <div className='dark:bg-gray-900 light:bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1'>
                                <div className='flex justify-between items-center mb-2'>
                                    <h3 className='text-xl font-semibold text-blue-400'>
                                        {edu.institution}
                                    </h3>
                                    <span className='text-sm text-gray-400'>
                                        {edu.year}
                                    </span>
                                </div>
                                <p className='text-sm text-gray-300'>
                                    {edu.degree}
                                    {edu.group && <span> | {edu.group}</span>}
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
