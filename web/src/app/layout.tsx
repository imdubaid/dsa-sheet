import ThemeProvider from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import '@/styles/globals.css';
import { Toaster } from 'sonner';
import { IoCloseCircleSharp, IoCheckmarkCircle, IoInformationCircleSharp, IoWarningSharp } from 'react-icons/io5';

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang='en' data-theme='light' data-scroll-behavior='smooth'>
            <body style={{ height: '100dvh', overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth' }}>
                <AppRouterCacheProvider>
                    <Toaster
                        theme='dark'
                        duration={5000}
                        position='bottom-right'
                        icons={{
                            error: <IoCloseCircleSharp fontSize={20} color='red' />,
                            success: <IoCheckmarkCircle fontSize={20} color='green' />,
                            info: <IoInformationCircleSharp fontSize={20} color='blue' />,
                            warning: <IoWarningSharp fontSize={20} color='yellow' />,
                        }}
                    />
                    <ThemeProvider>{props.children}</ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
