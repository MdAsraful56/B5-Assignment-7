import { Button } from '../components/ui/button';

const HomePage = () => {
    return (
        <div>
            <section>
                <h1 className='text-4xl font-bold mb-4'>
                    Welcome to My Portfolio
                </h1>
                <p className='text-lg'>
                    This is a simple portfolio website built with Next.js and
                    Tailwind CSS.
                </p>
                <Button className='mt-4'>Get Started</Button>
            </section>
        </div>
    );
};

export default HomePage;
