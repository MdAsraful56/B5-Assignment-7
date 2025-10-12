import Image from 'next/image';
import first from '../../../../public/assetes/skill/1.png';

const Skill = () => {
    return (
        <div>
            <h2 className='text-2xl font-bold'>My Skills</h2>
            <div className=''>
                <Image src={first} alt='Skill Image' width={100} height={80} />
            </div>
            <ul className='list-disc pl-5'>
                <li>JavaScript</li>
                <li>React</li>
                <li>Node.js</li>
                <li>CSS</li>
            </ul>
        </div>
    );
};

export default Skill;
