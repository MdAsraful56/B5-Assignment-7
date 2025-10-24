'use client';

import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

type Props = {
    data: Message[];
};

const ContactCard = ({ data }: Props) => {
    const [messages, setMessages] = useState<Message[]>(data);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [error, setError] = useState<string>('');

    const handleDelete = async (id: number) => {
        try {
            setDeletingId(id);
            setError('');

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API}/contact/delete/${id}`,
                {
                    method: 'DELETE',
                }
            );

            if (res.ok) {
                setMessages(messages.filter((msg) => msg.id !== id));
            } else {
                setError('Failed to delete message. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Delete error:', err);
        } finally {
            setDeletingId(null);
        }
    };

    // if (messages.length === 0) {
    //     return (
    //         <div className='min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
    //             <div className='max-w-7xl mx-auto'>
    //                 <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8'>
    //                     Contact Messages
    //                 </h1>
    //                 <div className='flex flex-col items-center justify-center py-20'>
    //                     <MessageSquare className='w-24 h-24 text-gray-300 dark:text-gray-600 mb-4' />
    //                     <p className='text-xl text-gray-500 dark:text-gray-400'>
    //                         No messages yet
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className='min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2'>
                    Contact Messages
                </h1>
                <p className='text-gray-600 dark:text-gray-400 mb-8'>
                    Total messages:{' '}
                    <span className='font-semibold'>{messages.length}</span>
                </p>

                {error && (
                    <div className='bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6'>
                        {error}
                    </div>
                )}

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className='bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-300 p-6 border-l-4 border-purple-500 dark:border-purple-400 hover:scale-105'
                        >
                            <div className='mb-4 pb-4 border-b border-gray-200 dark:border-gray-700'>
                                <h3 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1'>
                                    {msg.name}
                                </h3>
                                <p className='text-sm text-gray-600 dark:text-gray-400 break-all'>
                                    {msg.email}
                                </p>
                            </div>

                            <div className='mb-4 min-h-[120px]'>
                                <p className='text-base text-gray-700 dark:text-gray-300 leading-relaxed'>
                                    {msg.message}
                                </p>
                            </div>

                            <div className='flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700'>
                                <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>
                                    {new Date(msg.createdAt).toLocaleDateString(
                                        'en-US',
                                        {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        }
                                    )}
                                    <br />
                                    {new Date(msg.createdAt).toLocaleTimeString(
                                        'en-US',
                                        {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        }
                                    )}
                                </p>

                                <button
                                    onClick={() => handleDelete(msg.id)}
                                    disabled={deletingId === msg.id}
                                    className='bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
                                    aria-label='Delete message'
                                >
                                    {deletingId === msg.id ? (
                                        <>
                                            <Loader2 className='w-4 h-4 animate-spin' />
                                            <span className='text-sm'>
                                                Deleting...
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className='w-4 h-4' />
                                            <span className='text-sm'>
                                                Delete
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
