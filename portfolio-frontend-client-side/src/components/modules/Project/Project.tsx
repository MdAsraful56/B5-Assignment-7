import { Folder } from 'lucide-react';
import ProjectCard from './ProjectCard';

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
    // console.log('Project Data:', data);

    const projects: ProjectType[] = data.data || [];

    return (
        <section className='rounded-xl mt-5 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-slate-900/50'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <div className='inline-flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-950 rounded-xl mb-4'>
                        <Folder className='w-6 h-6 text-indigo-600 dark:text-indigo-400' />
                    </div>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                        My Projects
                    </h2>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                        A collection of my recent work
                    </p>
                </div>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <div className='text-center py-16'>
                        <div className='w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                            <Folder className='w-8 h-8 text-gray-400 dark:text-gray-600' />
                        </div>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
                            No Projects Yet
                        </h3>
                        <p className='text-sm text-gray-500 dark:text-gray-500'>
                            Start by creating your first project
                        </p>
                    </div>
                ) : (
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Project;
