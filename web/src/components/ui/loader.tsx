import { Box, Skeleton, Typography } from '@mui/material';

export function LogoLoader() {
    return (
        <Box
            sx={{
                animation: 'bounce 1s infinite',
                '@keyframes bounce': {
                    '0%, 100%': {
                        transform: 'translateY(-25%)',
                        animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
                    },
                    '50%': {
                        transform: 'translateY(0)',
                        animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
                    },
                },
            }}>
            <Typography variant='h6' fontSize={24} fontWeight={600}>
                DSA Sheet
            </Typography>
        </Box>
    );
}

export function PageLoader() {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
                minHeight: '800px',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <LogoLoader />
        </Box>
    );
}

export function SkeletonTable({ contentLength = 10 }: { contentLength?: number }) {
    return (
        <Box>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                {Array(2)
                    .fill(1)
                    .map((_, i) => (
                        <Skeleton key={`skeleton-table-header-${i}`} variant='rounded' height={48} width='25%' sx={{ bgcolor: 'action.hover' }} />
                    ))}
            </Box>

            <Skeleton variant='rectangular' height={48} sx={{ mb: 0.5, bgcolor: 'action.hover' }} />

            {Array(contentLength)
                .fill(1)
                .map((_, i) => (
                    <Skeleton key={`skeleton-table-contents-${i}`} variant='rectangular' height={40} sx={{ mb: 0.5, bgcolor: 'action.selected' }} />
                ))}
        </Box>
    );
}

export function SkeletonCardList({ contentLength = 10 }: { contentLength?: number }) {
    return (
        <Box>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                {Array(2)
                    .fill(1)
                    .map((_, i) => (
                        <Skeleton key={`skeleton-cardlist-header-${i}`} variant='rounded' height={48} width='25%' sx={{ bgcolor: 'action.hover' }} />
                    ))}
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)',
                        xl: 'repeat(4, 1fr)',
                    },
                    gap: 2,
                }}>
                {Array(contentLength)
                    .fill(1)
                    .map((_, i) => (
                        <Skeleton
                            key={`skeleton-cardlist-contents-${i}`}
                            variant='rounded'
                            sx={{
                                mb: 0.5,
                                height: { xs: 64, sm: 96, md: 112 },
                                bgcolor: 'action.selected',
                            }}
                        />
                    ))}
            </Box>
        </Box>
    );
}
