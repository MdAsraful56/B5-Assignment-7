import { Calendar, Eye, User } from 'lucide-react';
import Image from 'next/image';

const BlogDetails = async ({ params }: { params: { blogDetails: string } }) => {
    const { blogDetails } = params;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/post/${blogDetails}`,
        {
            cache: 'no-store',
        }
    );
    const data = await res.json();
    const blogData = data.data;

    // Format date helper
    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Default thumbnail if not available
    const thumbnailUrl =
        blogData.thumbnail ||
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80';

    return (
        <div className='min-h-screen py-8 px-4'>
            <div className='max-w-4xl mx-auto'>
                {/* Blog Card */}
                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
                    {/* Thumbnail Image */}
                    <div className='w-full h-96 overflow-hidden'>
                        <Image
                            src={thumbnailUrl}
                            alt={blogData.title}
                            className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'
                            width={800}
                            height={400}
                        />
                    </div>

                    {/* Content Section */}
                    <div className='p-6 sm:p-8'>
                        {/* Author Info Bar */}
                        <div className='flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-gray-200 dark:border-gray-700'>
                            {/* Author */}
                            <div className='flex items-center gap-3'>
                                <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden'>
                                    {blogData.author?.picture ? (
                                        <Image
                                            src={blogData.author.picture}
                                            alt={blogData.author.name}
                                            className='w-full h-full object-cover'
                                            width={48}
                                            height={48}
                                        />
                                    ) : (
                                        <User className='w-6 h-6 text-white' />
                                    )}
                                </div>
                                <div>
                                    <p className='font-semibold text-gray-900 dark:text-gray-100'>
                                        {blogData.author?.name}
                                    </p>
                                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                                        {blogData.author?.email}
                                    </p>
                                </div>
                            </div>

                            {/* Meta Info */}
                            <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
                                <div className='flex items-center gap-1'>
                                    <Calendar className='w-4 h-4' />
                                    <span>
                                        {formatDate(blogData.createdAt)}
                                    </span>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <Eye className='w-4 h-4' />
                                    <span>{blogData.views} views</span>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        {blogData.tags && blogData.tags.length > 0 && (
                            <div className='flex flex-wrap gap-2 mt-6'>
                                {blogData.tags.map(
                                    (tag: string, index: number) => (
                                        <span
                                            key={index}
                                            className='px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium'
                                        >
                                            #{tag}
                                        </span>
                                    )
                                )}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mt-6 leading-tight'>
                            {blogData.title}
                        </h1>

                        {/* Content */}
                        <div className='mt-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap'>
                            {blogData.content}
                        </div>

                        {/* Updated Info */}
                        {blogData.updatedAt !== blogData.createdAt && (
                            <div className='mt-8 pt-6 border-t border-gray-200 dark:border-gray-700'>
                                <p className='text-sm text-gray-500 dark:text-gray-400 italic'>
                                    Last updated:{' '}
                                    {formatDate(blogData.updatedAt)}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
