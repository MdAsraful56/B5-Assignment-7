import { Metadata } from 'next';
import BlogPostForm from '../../../../components/modules/Dashboard/BlogPostForm';

export const metadata: Metadata = {
    title: 'Create Blog - Dashboard - Portfolio',
    description: 'Create and manage your blog posts within the dashboard.',
};

const createBlogPage = () => {
    return (
        <div className='max-w-4xl mx-auto'>
            <BlogPostForm />
        </div>
    );
};

export default createBlogPage;
