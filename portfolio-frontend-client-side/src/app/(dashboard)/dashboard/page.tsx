import { getServerSession } from 'next-auth';
import { authOptions } from '../../../helpers/authOptions';

const DashboardPage = async () => {
    const session = await getServerSession(authOptions);
    console.log(session);

    return (
        <div>
            <h1 className='text-2xl font-bold'>Welcome to the Dashboard</h1>
            <p className=''>{session?.user?.email}</p>
            <p className=''>{session?.user?.name}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={session?.user?.image ?? undefined} alt='' />
        </div>
    );
};

export default DashboardPage;
