import { Metadata } from 'next';
import BlogCard from '../../../components/modules/Blogs/BlogCard';

export const metadata: Metadata = {
    title: 'All Blogs | Next Blog',
    description:
        'Browse all blog posts on web development, Next.js, React, and more. Stay updated with the latest tutorials and articles.',
};

const AllBlogsPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/all`, {
        cache: 'no-store',
    });

    const result = await res.json();
    const blogs = result.data.data;
    console.log(blogs);
    return (
        <div className='py-30 px-4 max-w-7xl mx-auto'>
            <h2 className='text-center text-4xl'>All Blogs</h2>
            <div className='grid grid-cols-3 gap-4 mx-auto max-w-6xl my-5'>
                {blogs.length === 0 ? (
                    <p className='text-center col-span-3'>No blogs found.</p>
                ) : (
                    blogs.map((post) => <BlogCard key={post.id} post={post} />)
                )}
            </div>
        </div>
    );
};

export default AllBlogsPage;
