import { authOptions } from '@/helpers/authOptions';
import { getServerSession } from 'next-auth';

const DashboardPage = async () => {
    const session = await getServerSession(authOptions);
    console.log(session);

    return (
        <div className='max-w-4xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
                Welcome to the Dashboard
            </h1>

            <div className='bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 space-y-6'>
                {/* User Info Section */}
                <div className='space-y-4'>
                    <div className='flex items-center gap-4'>
                        {session?.user?.image && (
                            <img
                                src={session.user.image}
                                alt='Profile'
                                width={80}
                                height={80}
                                className='rounded-full object-cover border-2 border-gray-200 dark:border-gray-700'
                            />
                        )}
                        <div>
                            <p className='text-xl font-semibold text-gray-900 dark:text-white'>
                                {session?.user?.name}
                            </p>
                            <p className='text-gray-600 dark:text-gray-400'>
                                {session?.user?.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className='border-gray-200 dark:border-gray-800' />

                {/* Content Section */}
                <div>
                    <h2 className='text-xl font-semibold mb-4 text-gray-900 dark:text-white'>
                        About
                    </h2>
                    <p className='text-justify leading-relaxed text-gray-700 dark:text-gray-300'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Accusamus, veniam. Voluptate assumenda molestiae
                        officia illum vel iste officiis laboriosam at nulla ut.
                        Iste consequatur maiores laboriosam vero eligendi
                        architecto exercitationem qui asperiores, harum facilis
                        similique unde nobis odit, impedit corporis saepe
                        sapiente accusamus molestiae. In itaque magni, libero
                        minus laboriosam aspernatur recusandae quos officiis,
                        quaerat autem iure. Accusantium, repellendus dolor
                        itaque, eos iste quas distinctio sequi earum, provident
                        eligendi sit ratione beatae laborum obcaecati neque ab
                        consequuntur esse rem totam ad aut. Impedit,
                        perspiciatis placeat? Odio, sit quis vero doloremque
                        maiores hic velit a iure unde temporibus illo suscipit
                        soluta. Quas voluptatem sint numquam facilis soluta
                        quaerat ut dignissimos obcaecati vitae, in officia
                        facere iste debitis autem nesciunt, eligendi saepe error
                        id, magni natus a. Libero, iusto natus nemo sequi veniam
                        dolorum ea ut maiores, sapiente vero voluptatem
                        excepturi fuga laboriosam maxime, rerum enim ipsa. Ullam
                        impedit explicabo tenetur dolor voluptates, eius, quasi
                        voluptate excepturi ipsum maiores nesciunt veniam neque,
                        deserunt repellendus beatae hic culpa? Tempora quidem
                        necessitatibus sunt ratione natus nobis aliquam adipisci
                        eos beatae officiis? Molestias rem pariatur saepe
                        accusamus eveniet at provident eum, exercitationem
                        aspernatur quasi expedita corporis cumque omnis impedit.
                        Porro, animi. Nihil quia aspernatur aperiam!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
