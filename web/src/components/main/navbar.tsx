'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Stack, Typography, Paper, styled, Button } from '@mui/material';
import { authRoutes, DEFAULT_ROUTE } from '@/routes';
import useAuth from '@/hooks/useAuth';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
    bottom: theme.spacing(3),
    zIndex: 1300,
    width: '100%',
    background: '#ffffff1a',
    border: `1px solid ${theme.palette.primary.main}1c`,
    borderRadius: '50px',
    transition: 'ease-in 0.2s',
    backdropFilter: 'blur(8px)',
    paddingBlock: theme.spacing(1),
    paddingInline: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
        top: theme.spacing(3),
        bottom: 'auto',
    },
}));

function Navbar() {
    const { session, logout } = useAuth();

    return (
        <Fragment>
            <AppBar component='nav' position='sticky' elevation={0} color='transparent'>
                <Toolbar
                    sx={{
                        alignItems: 'center',
                        width: theme => `min(98%, ${theme.breakpoints.values.xl}px)`,
                        mx: 'auto',
                        '&': { p: 0, pt: 3, m: 0, width: '100%' },
                    }}>
                    <StyledPaper
                        elevation={0}
                        sx={{
                            '& .MuiPaper-root': {
                                backgroundColor: 'transparent',
                            },
                        }}>
                        <Stack width='100%' direction='row' alignItems='center'>
                            <Link href={DEFAULT_ROUTE} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', minWidth: 0 }}>
                                <Typography variant='h6' fontSize={24} fontWeight={600}>
                                    DSA Sheet
                                </Typography>
                            </Link>

                            {/* <Stack direction='row' spacing={0.4}>
                                {routes.map((item, key) => (
                                    <NavLink
                                        key={key}
                                        href={session ? item.to : authRoutes.signIn}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                        }}>
                                        {(isActive: boolean) => (
                                            <Button
                                                variant='text'
                                                sx={{
                                                    position: 'relative',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    fontSize: 14,
                                                    fontWeight: isActive ? 600 : 300,
                                                }}>
                                                {item.name}
                                            </Button>
                                        )}
                                    </NavLink>
                                ))}
                            </Stack> */}

                            <Stack direction='row' spacing={1.5} flex={1} justifyContent='flex-end' alignItems='center' minWidth={0}>
                                {session ? (
                                    <Button variant='outlined' shape='rounded' onClick={() => logout(DEFAULT_ROUTE)} sx={{ px: 3, fontWeight: 500 }}>
                                        Sign out
                                    </Button>
                                ) : (
                                    <Button
                                        variant='contained'
                                        shape='rounded'
                                        LinkComponent={Link}
                                        href={authRoutes.signIn}
                                        sx={{ px: 3, fontWeight: 500 }}>
                                        Get started
                                    </Button>
                                )}
                            </Stack>
                        </Stack>
                    </StyledPaper>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}

export default Navbar;
