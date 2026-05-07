import { getProblem } from '@/api/problem/server';
import Sheet from './sheet';
import { Stack, Typography } from '@mui/material';

export default async function Page() {
    const sheet = await getProblem('sde');

    return (
        <Stack>
            <Stack spacing={1}>
                <Typography fontWeight={700} fontSize={{ xs: 20, md: 32 }}>
                    DSA SDE Sheet - Top Coding Interview Problems
                </Typography>
                <Typography color='text.secondary' mt={0.6} fontSize={14}>
                    Carefully curated coding interview problems across DSA topics with revision-first tracking.
                </Typography>
            </Stack>

            <Sheet sheet={sheet} />
        </Stack>
    );
}
