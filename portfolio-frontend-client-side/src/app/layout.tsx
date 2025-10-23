import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '../providers/AuthProvider';
import { geistMono, geistSans, inter, schoolbell } from './fonts';
import './globals.css';

export const metadata: Metadata = {
    title: 'Portfolio of Md Asraful',
    description: 'Portfolio website of Md Asraful',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${schoolbell.variable} antialiased`}
            >
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className='max-w-7xl mx-auto px-5'>
                        <AuthProvider>
                            {/* <Navbar /> */}
                            {children}
                            {/* <Footer /> */}
                        </AuthProvider>
                    </main>
                </ThemeProvider>
                <ToastContainer position='bottom-right' />
            </body>
        </html>
    );
}
