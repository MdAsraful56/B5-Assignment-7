import { Metadata } from 'next';
import BlogCard from '../../../components/modules/Blogs/BlogCard';

export const metadata: Metadata = {
    title: 'All Blogs | Web Development Articles & Tutorials',
    description:
        'Browse all blog posts on web development, Next.js, React, and more. Stay updated with the latest tutorials and articles.',
};

interface Author {
    id: number;
    name: string;
    email: string;
    picture?: string | null;
}

interface BlogPost {
    id: number;
    title: string;
    content: string;
    thumbnail?: string | null;
    tags: string[];
    author: Author;
    createdAt: string;
    views: number;
}

const AllBlogsPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/all`, {
        cache: 'no-store',
    });

    const result = await res.json();
    const blogs = result.data.data;
    // console.log(blogs);
    return (
        <div className='py-30 px-4 max-w-7xl mx-auto'>
            <h2 className='text-center text-4xl mb-8'>All Blogs</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-6xl my-5 auto-rows-fr'>
                {blogs.length === 0 ? (
                    <p className='text-center col-span-3'>No blogs found.</p>
                ) : (
                    blogs.map((post: { id: number; post: BlogPost }) => (
                        <BlogCard key={post.id} post={post.post} />
                    ))
                )}
            </div>
        </div>
    );
};

export default AllBlogsPage;
