import Link from 'next/link';
import React from 'react';

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

interface BlogCardProps {
    post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    return (
        <Link href={`/blog/${post.id}`} className='h-full block'>
            <div className='border rounded-lg shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition h-full flex flex-col'>
                {/* Image Section - Fixed Height */}
                {post.thumbnail ? (
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className='w-full h-48 object-cover rounded-t-lg'
                        width={400}
                        height={200}
                    />
                ) : (
                    <div className='w-full h-48 bg-gray-100 dark:bg-gray-600 flex items-center justify-center rounded-t-lg text-gray-400'>
                        No Image Available
                    </div>
                )}

                {/* Content Section - Flexible Height */}
                <div className='p-4 flex flex-col flex-grow'>
                    {/* Title - Fixed 2 lines */}
                    <h2 className='text-xl font-semibold mb-2 line-clamp-2 min-h-[3.5rem]'>
                        {post.title}
                    </h2>

                    {/* Content - Fixed 3 lines */}
                    <p className='text-gray-700 dark:text-gray-300 mb-3 line-clamp-3 flex-grow'>
                        {post.content}
                    </p>

                    {/* Tags Section */}
                    <div className='flex flex-wrap gap-2 mb-3 min-h-[2rem]'>
                        {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className='bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm'
                            >
                                #{tag}
                            </span>
                        ))}
                        {post.tags.length > 3 && (
                            <span className='text-gray-500 text-sm self-center'>
                                +{post.tags.length - 3} more
                            </span>
                        )}
                    </div>

                    {/* Footer - Always at bottom */}
                    <div className='text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center mt-auto pt-2 border-t'>
                        <span className='truncate mr-2'>
                            By {post.author.name}
                        </span>
                        <span className='whitespace-nowrap'>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
