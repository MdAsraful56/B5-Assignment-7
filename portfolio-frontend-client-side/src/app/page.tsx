import Education from '../components/modules/Home/Education';
import Hero from '../components/modules/Home/Hero';
import Contact from '../components/shared/Contact';

const HomePage = () => {
    return (
        <div>
            <section>
                <Hero />
                <Education />
                <Contact />
            </section>
        </div>
    );
};

export default HomePage;
