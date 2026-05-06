'use client';

import { Box, Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';
import { ReactNode } from 'react';
import { RiHomeLine } from 'react-icons/ri';
import { BackButton } from './button';
import { authRoutes, DEFAULT_ROUTE } from '@/routes';
import { AUTH_ERROR_MESSAGES, AuthErrors } from '@/constants/error';
import { parseCase } from '@/utils/helpers';

export type AuthErrorProps = {
    error?: string;
    title?: string;
    description?: string;
    hideExtras?: boolean;
    customExtras?: ReactNode;
};

export function AuthError({ ...props }: AuthErrorProps) {
    const errorKey = props.error as AuthErrors;
    const errorInfo = AUTH_ERROR_MESSAGES[errorKey] ?? AUTH_ERROR_MESSAGES.AuthenticationError;

    const title = props.title ?? parseCase(errorKey);
    const description = props.description ?? errorInfo;

    return (
        <Box
            component='main'
            sx={{
                display: 'grid',
                placeItems: 'center',
                minHeight: '100%',
                bgcolor: 'transparent',
                px: { xs: 3, sm: 4 },
                py: { xs: 12, sm: 16 },
            }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    variant='h3'
                    component='h1'
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.875rem', sm: '3rem' },
                        mb: 2,
                    }}>
                    {title}
                </Typography>

                <Typography
                    variant='body1'
                    sx={{
                        mt: 1.5,
                        lineHeight: 1.75,
                        color: 'text.secondary',
                    }}>
                    {description}
                </Typography>

                {props.error && props.error !== 'Default' && (
                    <Typography
                        variant='body2'
                        sx={{
                            mt: 2,
                            color: 'error.main',
                        }}>
                        Error Code: {props.error}
                    </Typography>
                )}

                {!props.hideExtras && (
                    <Stack direction='row' spacing={2} mt={4} alignItems='center' justifyContent='center' flexWrap='wrap'>
                        <BackButton variant='text' size='large' />

                        <Link href={authRoutes.auth} style={{ textDecoration: 'none' }}>
                            <Button variant='contained' size='large'>
                                Try Again
                            </Button>
                        </Link>

                        <Link href={DEFAULT_ROUTE} style={{ textDecoration: 'none' }}>
                            <Button startIcon={<RiHomeLine />} variant='outlined' size='large'>
                                Take me home
                            </Button>
                        </Link>
                    </Stack>
                )}

                {props.customExtras}
            </Box>
        </Box>
    );
}

export function AuthErrorPage(props: AuthErrorProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
                minHeight: '24rem',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Google Sans Flex, Google Sans, Roboto, Arial, sans-serif;'
            }}>
            <AuthError {...props} />
        </Box>
    );
}
