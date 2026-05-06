'use client';

import { Typography, Stack, TextField, Button, Link as MuiLink, Divider } from '@mui/material';
import Link from 'next/link';
import Form from '@/components/lib/form';

const Register = () => {
    const onSubmit = async () => {};

    return (
        <Stack gap={4}>
            {/* Header with Logo */}
            <Stack gap={2} alignItems={'center'} justifyContent={'center'} pb={1}>
                <Typography variant='h3' component='h1' fontSize={38} textAlign={'center'}>
                    Create an account
                </Typography>

                <Typography variant='body1' color='text.secondary' textAlign={'center'}>
                    Let&apos;s get your account ready.
                </Typography>
            </Stack>

            <Form onSubmit={onSubmit}>
                <Stack gap={1} mb={3}>
                    <Typography variant='body2' fontSize={14} color='text.secondary'>
                        Name
                    </Typography>
                    <TextField size='small' fullWidth placeholder='John Doe' variant='outlined' required />
                </Stack>
                <Stack gap={1} mb={3}>
                    <Typography variant='body2' fontSize={14} color='text.secondary'>
                        Email
                    </Typography>
                    <TextField size='small' fullWidth placeholder='john@email.com' variant='outlined' required />
                </Stack>

                <Stack gap={1} mb={3}>
                    <Typography variant='body2' fontSize={14} color='text.secondary'>
                        Password
                    </Typography>
                    <TextField
                        size='small'
                        fullWidth
                        placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                        variant='outlined'
                        required
                    />
                </Stack>

                {/* Sign In Button */}
                <Button type='submit' fullWidth variant='contained' color='primary' size='small' sx={{ mb: 1.5 }}>
                    Create Account
                </Button>

                <Divider variant='middle' sx={{ mb: 1.5 }} />
            </Form>

            <Typography variant='body2' color='text.secondary' textAlign={'center'}>
                Already have an account?
                <MuiLink component={Link} href={'/auth/sign-in'} ml={1}>
                    Sign in
                </MuiLink>
            </Typography>
        </Stack>
    );
};

export default Register;
