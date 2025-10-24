import { Metadata } from 'next';
import ContactCard from '../../../../components/modules/Contact/ContactCard';

export const metadata: Metadata = {
    title: 'Massage - Dashboard - Portfolio',
    description: 'View and manage your massage inquiries and communications.',
};

const contactPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contact/all`);
    const result = await res.json();

    // console.log(result, 'massage page');

    return (
        <div className=''>
            <ContactCard data={result} />
        </div>
    );
};

export default contactPage;
