'use server';

import { getUserSession } from '@/helpers/getUserSession';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const create = async (data: FormData) => {
    const session = await getUserSession();
    const blogInfo = Object.fromEntries(data.entries());
    const modifiedData = {
        ...blogInfo,
        authorId: session?.user?.id,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedData),
    });

    const result = await res.json();

    if (result?.id) {
        revalidateTag('BLOG');
        revalidatePath('/blog');
        redirect('/');
    }
    return result;
};
