import { Calendar, Code2, ExternalLink, Folder, Github } from 'lucide-react';
import Image from 'next/image';

interface ProjectType {
    id: number;
    name: string;
    description: string;
    liveLink: string;
    repoLink: string;
    techStack: string[];
    image: string | null;
    createdAt: string;
    updatedAt: string;
}

const Project = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/all`, {
        cache: 'no-store',
    });

    const data = await res.json();
    console.log('Project Data:', data);

    const projects: ProjectType[] = data.data || [];

    return (
        <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-16'>
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-lg'>
                        <Folder className='w-8 h-8 text-white' />
                    </div>
                    <h2 className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4'>
                        My Projects
                    </h2>
                    <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                        A collection of my recent work and personal projects
                    </p>
                </div>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <div className='text-center py-20'>
                        <div className='w-20 h-20 bg-gray-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <Folder className='w-10 h-10 text-gray-400 dark:text-gray-600' />
                        </div>
                        <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                            No Projects Yet
                        </h3>
                        <p className='text-gray-600 dark:text-gray-400'>
                            Start by creating your first project
                        </p>
                    </div>
                ) : (
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className='group bg-white dark:bg-slate-900 rounded-2xl border-2 border-gray-200 dark:border-slate-800 overflow-hidden hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-2xl transition-all duration-300 hover:scale-105'
                            >
                                {/* Project Image */}
                                <div className='relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 overflow-hidden'>
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.name}
                                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                                        />
                                    ) : (
                                        <div className='w-full h-full flex items-center justify-center'>
                                            <Code2 className='w-20 h-20 text-indigo-300 dark:text-indigo-700' />
                                        </div>
                                    )}
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                                </div>

                                {/* Project Content */}
                                <div className='p-6'>
                                    {/* Project Name */}
                                    <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1'>
                                        {project.name}
                                    </h3>

                                    {/* Description */}
                                    <p className='text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed'>
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className='flex flex-wrap gap-2 mb-4'>
                                        {project.techStack
                                            .slice(0, 4)
                                            .map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className='px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 rounded-full'
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        {project.techStack.length > 4 && (
                                            <span className='px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-full'>
                                                +{project.techStack.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Date */}
                                    <div className='flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4'>
                                        <Calendar className='w-3.5 h-3.5 mr-1.5' />
                                        <span>
                                            {new Date(
                                                project.createdAt
                                            ).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className='flex gap-3'>
                                        <a
                                            href={project.liveLink}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg'
                                        >
                                            <ExternalLink className='w-4 h-4' />
                                            <span className='text-sm'>
                                                Live Demo
                                            </span>
                                        </a>
                                        <a
                                            href={project.repoLink}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg'
                                            aria-label='GitHub Repository'
                                        >
                                            <Github className='w-5 h-5' />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Project;
