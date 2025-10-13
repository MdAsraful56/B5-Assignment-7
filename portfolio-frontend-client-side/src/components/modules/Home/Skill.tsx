import Image from 'next/image';
import boostrabLogo from '../../../../public/assetes/skill/boostrap.png';
import cssLogo from '../../../../public/assetes/skill/css.png';
import figmaLogo from '../../../../public/assetes/skill/figma.png';
import firebaseLogo from '../../../../public/assetes/skill/firebase.png';
import htmlLogo from '../../../../public/assetes/skill/html.png';
import jsLogo from '../../../../public/assetes/skill/javaScript.png';
import mongodbLogo from '../../../../public/assetes/skill/mongodb.png';
import nodeLogo from '../../../../public/assetes/skill/node.js.png';
import postgresLogo from '../../../../public/assetes/skill/postgress.png';
import pythonLogo from '../../../../public/assetes/skill/python.png';
import reactLogo from '../../../../public/assetes/skill/react.png';
import sqlLogo from '../../../../public/assetes/skill/sql.png';
import tailwindCssLogo from '../../../../public/assetes/skill/tailwind css.png';
import typeScriptLogo from '../../../../public/assetes/skill/typeScript.png';

const skills = [
    { name: 'HTML', image: htmlLogo },
    { name: 'CSS', image: cssLogo },
    { name: 'Bootstrap', image: boostrabLogo },
    { name: 'Tailwind', image: tailwindCssLogo },
    { name: 'JavaScript', image: jsLogo },
    { name: 'TypeScript', image: typeScriptLogo },
    { name: 'React', image: reactLogo },
    { name: 'Node.js', image: nodeLogo },
    { name: 'MongoDB', image: mongodbLogo },
    { name: 'PostgreSQL', image: postgresLogo },
    { name: 'Firebase', image: firebaseLogo },
    { name: 'Figma', image: figmaLogo },
    { name: 'Python', image: pythonLogo },
    { name: 'SQL', image: sqlLogo },
];

const Skill = () => {
    return (
        <section className='py-10'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-100'>
                My Skills
            </h2>

            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6 place-items-center'>
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className='flex flex-col items-center justify-center bg-white/5 dark:bg-zinc-900/40 border border-gray-200/20 dark:border-zinc-700/50 rounded-xl p-3 sm:p-4 hover:scale-105 hover:shadow-md transition-all duration-300'
                    >
                        <Image
                            src={skill.image}
                            alt={skill.name}
                            width={50}
                            height={50}
                            className='object-contain mb-2 opacity-90'
                        />
                        <span className='text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center'>
                            {skill.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skill;
