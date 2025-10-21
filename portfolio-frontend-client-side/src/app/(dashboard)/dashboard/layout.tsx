import Sidebar from '@/components/shared/Sidebar';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className='min-h-dvh flex'>
            <Sidebar />
            {/* Main content area with proper responsive padding */}
            <div className='flex-1 p-4 lg:p-6 pt-20 lg:pt-6 overflow-x-hidden bg-gray-50 dark:bg-gray-950'>
                {children}
            </div>
        </main>
    );
}
