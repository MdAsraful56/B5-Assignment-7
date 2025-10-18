import Image from 'next/image';
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
        <Link href={`/blog/${post.id}`}>
            <div
                className='border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition'
                key={post.id}
            >
                {post.thumbnail ? (
                    <Image
                        src={post.thumbnail}
                        alt={post.title}
                        className='w-full h-48 object-cover rounded-md mb-3'
                        width={400}
                        height={200}
                    />
                ) : (
                    <div className='w-full h-48 bg-gray-100 flex items-center justify-center rounded-md mb-3 text-gray-400'>
                        No image
                    </div>
                )}

                <h2 className='text-xl font-semibold mb-2'>{post.title}</h2>
                <p className='text-gray-700 mb-3 line-clamp-3'>
                    {post.content}
                </p>

                <div className='flex flex-wrap gap-2 mb-3'>
                    {post.tags.map((tag, index) => (
                        <span
                            key={index}
                            className='bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm'
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className='text-sm text-gray-500 flex justify-between'>
                    <span>By {post.author.name}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
