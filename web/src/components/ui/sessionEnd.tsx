'use client';

import { Typography, Stack, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { authRoutes } from '@/routes';

function SessionEnd() {
    const router = useRouter();

    return (
        <Stack gap={4}>
            <Stack gap={2} alignItems={'center'} justifyContent={'center'} pb={1}>
                <Typography variant='h3' component='h1' fontSize={38} textAlign={'center'}>
                    Your session has ended
                </Typography>

                <Typography variant='body1' color='text.secondary' textAlign={'center'}>
                    Continue by signing in, or use mdubaid.in <br /> without an account
                </Typography>
            </Stack>

            <Stack gap={3}>
                <Button size='small' fullWidth variant='contained' color='primary' onClick={() => router.replace(authRoutes.auth)}>
                    Sign in
                </Button>
            </Stack>
        </Stack>
    );
}

export default SessionEnd;
