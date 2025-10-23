import ContactCard from '../../../../components/modules/Contact/ContactCard';

const contactPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contact/all`);
    const result = await res.json();

    console.log(result);

    return (
        <div className=''>
            <ContactCard data={result} />
        </div>
    );
};

export default contactPage;
