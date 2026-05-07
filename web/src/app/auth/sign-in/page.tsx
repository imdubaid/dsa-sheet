'use client';

import { Typography, Stack, TextField, Button, Link as MuiLink, Divider } from '@mui/material';
import Link from 'next/link';
import Form from '@/components/lib/form';
import useAuth from '@/hooks/useAuth';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { routes } from '@/routes';
import { signIn } from '@/actions/auth';

export default function LoginPage() {
    const { setToken } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async () => {
        const { data, error } = await signIn(formData.email, formData.password);
        if (error || !data) return toast.error(error);

        setToken(data.token as string);
        toast.success('Login successful');
        router.push(routes.home);
    };

    return (
        <Stack gap={4}>
            <Stack gap={2} alignItems={'center'} justifyContent={'center'} pb={1}>
                <Typography variant='h3' component='h1' fontSize={38} textAlign={'center'}>
                    Welcome back
                </Typography>

                <Typography variant='body1' color='text.secondary' textAlign={'center'}>
                    Sign in to continue
                </Typography>
            </Stack>

            <Form onSubmit={onSubmit}>
                <Stack gap={1} mb={3}>
                    <Typography variant='body2' fontSize={14} color='text.secondary'>
                        Email
                    </Typography>
                    <TextField size='small' fullWidth placeholder='john@doe.com' variant='outlined' required name='email' onChange={handleChange} />
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
                        name='password'
                        type='password'
                        onChange={handleChange}
                    />
                </Stack>

                {/* Sign In Button */}
                <Button type='submit' fullWidth variant='contained' color='primary' size='small' sx={{ mb: 1.5 }}>
                    Sign in
                </Button>

                <Divider variant='middle' sx={{ mb: 1.5 }} />
            </Form>

            <Typography variant='body2' color='text.secondary' textAlign={'center'}>
                Don&apos;t have an account?{' '}
                <Link href={'/auth/create-account'} style={{ textDecoration: 'none' }}>
                    <MuiLink component='span' sx={{ ml: 1, '&:hover': { textDecoration: 'underline' } }}>
                        Create account
                    </MuiLink>
                </Link>
            </Typography>
        </Stack>
    );
}
