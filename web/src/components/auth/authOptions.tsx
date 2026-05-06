'use client';

import { Button, Stack } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';

function AuthOptions() {
    return (
        <Stack spacing={2}>
            <Button variant='contained' size='small' color='secondary' disableRipple startIcon={<FcGoogle />} onClick={() => signIn('google')}>
                Continue with Google
            </Button>
            <Button variant='contained' size='small' color='secondary' disableRipple startIcon={<FaGithub />} onClick={() => signIn('github')}>
                Continue with GitHub
            </Button>
        </Stack>
    );
}

export default AuthOptions;
