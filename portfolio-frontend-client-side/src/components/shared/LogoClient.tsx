'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import logo2 from '../../../public/assetes/logo/logo (2).png';
import logo from '../../../public/assetes/logo/logo.png';

const LogoClient = () => {
    const { theme } = useTheme();
    return (
        <div>
            {theme === 'light' ? (
                <Image src={logo} alt='Logo' width={120} height={40} />
            ) : (
                <Image src={logo2} alt='Logo' width={120} height={40} />
            )}
        </div>
    );
};

export default LogoClient;
