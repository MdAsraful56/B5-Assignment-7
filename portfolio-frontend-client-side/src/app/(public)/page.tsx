import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import BlogCard from '../../components/modules/Blogs/BlogCard';
import Contact from '../../components/modules/Contact/Contact';
import Hero from '../../components/modules/Home/Hero';
import ProjectCard from '../../components/modules/Project/ProjectCard';

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

export default async function HomePage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/all`, {
        cache: 'no-store',
    });

    const result = await res.json();
    const blogs = result.data.data;

    const res2 = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/project/all`,
        {
            cache: 'no-store',
        }
    );

    const data = await res2.json();
    const projects: ProjectType[] = data.data || [];

    return (
        <div>
            <Hero />
            <div className='py-10 border-2 rounded-2xl border-dashed border-gray-300 dark:border-slate-700 '>
                <h2 className='text-center text-4xl mb-8'>Latest Blogs</h2>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 max-w-6xl mx-auto my-5'>
                    {blogs.slice(0, 3).map((blog: any) => (
                        <BlogCard key={blog?.id} post={blog} />
                    ))}
                </div>
                <Link
                    href='/blog'
                    className='text-center flex items-center justify-center mt-6'
                >
                    <button className='relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 overflow-hidden'>
                        <span className='relative z-10'>See More Blogs</span>
                        <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10' />
                        <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    </button>
                </Link>
            </div>
            <div className='py-10 border-2 rounded-2xl border-dotted border-gray-300 dark:border-slate-700 '>
                <h2 className='text-center text-4xl mb-8'>New Projects</h2>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 max-w-6xl mx-auto my-5'>
                    {projects.slice(0, 3).map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
                <Link
                    href='/project'
                    className='text-center flex items-center justify-center mt-6'
                >
                    <button className='relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 overflow-hidden'>
                        <span className='relative z-10'>See All Projects</span>
                        <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10' />
                        <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    </button>
                </Link>
            </div>

            <Contact />
        </div>
    );
}
