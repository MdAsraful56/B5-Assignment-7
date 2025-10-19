import { getServerSession } from 'next-auth';
import { authOptions } from '../../../helpers/authOptions';

const DashboardPage = async () => {
    const session = await getServerSession(authOptions);
    console.log(session);

    return (
        <div>
            <h1 className='text-2xl font-bold'>Welcome to the Dashboard</h1>
        </div>
    );
};

export default DashboardPage;
