import Hero from '../components/modules/Home/Hero';
import Contact from '../components/shared/Contact';
import Project from '../components/shared/Project';

const HomePage = () => {
    return (
        <div>
            <section>
                <Hero />
                {/* <Education /> */}
                {/* <Skill /> */}
                <Project />
                <Contact />
            </section>
        </div>
    );
};

export default HomePage;
