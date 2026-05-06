import Footer from '@/components/main/footer';
import Navbar from '@/components/main/navbar';
import PageContainer from '@/components/ui/pageContainer';
import { Stack } from '@mui/material';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Stack component='main' position='relative' mx='auto' minHeight='100dvh' width={'min(98%, 1516px)'}>
            <Navbar />
            <PageContainer sx={{ flexGrow: 1, pt: 5 }}>{children}</PageContainer>
            <Footer />
        </Stack>
    );
}

export default Layout;
