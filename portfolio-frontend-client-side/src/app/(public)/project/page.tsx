import { Metadata } from 'next';
import Project from '../../../components/modules/Project/Project';

export const metadata: Metadata = {
    title: 'My Projects - Portfolio',
    description: 'Explore my projects and contributions to web development.',
};

const ProjectPage = () => {
    return (
        <div>
            <Project />
        </div>
    );
};

export default ProjectPage;
