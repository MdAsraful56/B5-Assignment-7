'use client';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
    const phoneNumber = '+8801889245756';
    const message = 'Hello, I would like to chat with you!';

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
    )}`;

    return (
        <Link
            href={whatsappLink}
            className='flex items-center max-w-44 gap-2 p-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300'
            target='_blank'
            rel='noopener noreferrer'
        >
            <FaWhatsapp size={24} />
            <span>Chat with Me 👋</span>
        </Link>
    );
};

export default WhatsAppButton;
