import Education from '../components/modules/Home/Education';
import Hero from '../components/modules/Home/Hero';
import Skill from '../components/modules/Home/Skill';
import Contact from '../components/shared/Contact';

const HomePage = () => {
    return (
        <div>
            <section>
                <Hero />
                <Education />
                <Skill />
                <Contact />
            </section>
        </div>
    );
};

export default HomePage;
