import { Metadata } from 'next';
import ProjectForm from '../../../../components/modules/Dashboard/ProjectForm';

export const metadata: Metadata = {
    title: 'Create Project - Dashboard - Portfolio',
    description: 'Create and manage your projects within the dashboard.',
};

const CreateProjectPage = () => {
    return (
        <div className='max-w-4xl mx-auto'>
            <ProjectForm />
        </div>
    );
};

export default CreateProjectPage;
