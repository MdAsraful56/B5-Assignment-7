import { Metadata } from 'next';
import About from '../../../components/modules/About/About';
import Education from '../../../components/modules/About/Education';
import Skill from '../../../components/modules/About/Skill';

export const metadata: Metadata = {
    title: 'About Me - Portfolio',
    description: 'Learn more about me, my education, and my skills.',
};

const AboutPage = () => {
    return (
        <div className=''>
            <About />
            <Education />
            <Skill />
        </div>
    );
};

export default AboutPage;
