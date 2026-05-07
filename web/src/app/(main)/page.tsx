'use client';

import React from 'react';
import { Box, Container, Typography, Button, Stack, Card, CardContent, Grid, Avatar, Chip } from '@mui/material';
import { FiArrowRight, FiCheckCircle, FiVideo, FiTrendingUp, FiZap } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { authRoutes, routes } from '@/routes';
import useAuth from '@/hooks/useAuth';
import Image from '@/components/ui/image';

const features = [
    {
        icon: <FiCheckCircle style={{ fontSize: 32 }} />,
        title: 'Curated Sheets',
        description: 'Carefully designed learning paths for better results',
    },
    {
        icon: <FiVideo style={{ fontSize: 32 }} />,
        title: 'Expert Videos',
        description: 'Detailed videos and editorials by experienced educators',
    },
    {
        icon: <FiTrendingUp style={{ fontSize: 32 }} />,
        title: 'Streaks & Leaderboard',
        description: 'Stay consistent and compete with the community',
    },
    {
        icon: <FiZap style={{ fontSize: 32 }} />,
        title: 'AI Doubt Support',
        description: 'Instant AI-powered assistance for faster learning',
    },
];

const testimonials = [
    {
        name: 'Rohit Sharma',
        company: 'Amazon',
        image: '👨‍💼',
    },
    {
        name: 'Anusha Jha',
        company: 'Deloitte',
        image: '👩‍💼',
    },
    {
        name: 'Kushagra Sahay',
        company: 'LinkedIn',
        image: '👨‍💻',
    },
];

function Page() {
    const router = useRouter();
    const { session } = useAuth();

    return (
        <Box>
            <Grid container spacing={10} sx={{ py: 2, alignItems: 'center' }} mt={7} mb={20}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Chip
                        label='15,41,934+ Learners'
                        sx={{
                            bgcolor: 'background.paper',
                            color: 'text.secondary',
                            mb: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    />
                    <Typography
                        variant='h2'
                        sx={{
                            fontWeight: 'bold',
                            mb: 3,
                            fontSize: { xs: 32, md: 48 },
                            background: 'linear-gradient(180deg, #ededed 72%, #111111 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                        ONE STOP <br /> Learning Platform <br /> For TECH Interviews
                    </Typography>
                    <Typography variant='body1' color='text.secondary' maxWidth={400} mb={4}>
                        Learn DSA, System Design, and Core CS Subjects with personalised roadmaps, expert videos, and practice built for results.
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button
                            variant='contained'
                            size='large'
                            shape='rounded'
                            endIcon={<FiArrowRight />}
                            onClick={() => (session ? router.push(routes.home) : router.push(authRoutes.signIn))}
                            sx={{
                                fontWeight: 'bold',
                                px: 4,
                                py: 1.5,
                                fontSize: 16,
                            }}>
                            Start Learning for Free
                        </Button>
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Image name='hero.png' alt='hero' sx={{ width: '100%', height: '100%' }} />
                </Grid>
            </Grid>

            {/* Features Section */}
            <Box py={{ xs: 6, md: 10 }}>
                <Container maxWidth='lg'>
                    <Typography
                        variant='h3'
                        sx={{
                            textAlign: 'center',
                            mb: 6,
                            fontWeight: 'bold',
                            fontSize: { xs: 32, md: 42 },
                        }}>
                        Why Choose DSA Sheet?
                    </Typography>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                <Card
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: '15px',
                                        height: '100%',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                                        },
                                    }}>
                                    <CardContent>
                                        <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                        <Typography variant='h6' mb={1} fontWeight={600}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant='body2' color='text.secondary'>
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Container maxWidth='lg' sx={{ py: { xs: 6, md: 10 } }}>
                <Typography
                    variant='h3'
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        fontWeight: 'bold',
                        fontSize: { xs: 32, md: 42 },
                    }}>
                    Trusted by Top Tech Professionals
                </Typography>
                <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                    {testimonials.map((testimonial, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Card
                                sx={{
                                    borderRadius: '15px',
                                    p: 3,
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        borderColor: 'divider',
                                    },
                                }}>
                                <Avatar
                                    sx={{
                                        width: 70,
                                        height: 70,
                                        mx: 'auto',
                                        mb: 2,
                                        bgcolor: 'background.paper',
                                        fontSize: 40,
                                    }}>
                                    {testimonial.image}
                                </Avatar>
                                <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                    {testimonial.name}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                    {testimonial.company}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box py={{ xs: 6, md: 10 }}>
                <Container maxWidth='md' sx={{ textAlign: 'center' }}>
                    <Typography
                        variant='h3'
                        sx={{
                            mb: 3,
                            fontWeight: 'bold',
                            fontSize: { xs: 28, md: 40 },
                        }}>
                        Ready to Master Tech Interviews?
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            mb: 4,
                            color: '#666666',
                            fontSize: 18,
                        }}>
                        Join thousands of learners who have landed their dream jobs
                    </Typography>
                    <Button
                        variant='contained'
                        size='large'
                        shape='rounded'
                        onClick={() => (session ? router.push(routes.home) : router.push(authRoutes.signIn))}>
                        Get Started
                    </Button>
                </Container>
            </Box>
        </Box>
    );
}

export default Page;
