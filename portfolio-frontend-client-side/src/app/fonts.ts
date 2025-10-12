import {
    Geist,
    Geist_Mono,
    Inter,
    Raleway,
    Schoolbell,
} from 'next/font/google';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

const schoolbell = Schoolbell({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-schoolbell',
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-raleway',
});

export { geistMono, geistSans, inter, raleway, schoolbell };
