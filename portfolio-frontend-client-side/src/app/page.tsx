import Hero from '../components/modules/Home/Hero';
import Contact from '../components/shared/Contact';
import Project from '../components/shared/project/Project';
import ProjectForm from '../components/shared/project/ProjectForm';

const HomePage = () => {
    return (
        <div>
            <section>
                <Hero />
                {/* <Education /> */}
                {/* <Skill /> */}
                <Project />
                <Contact />
                <ProjectForm />
            </section>
        </div>
    );
};

export default HomePage;
