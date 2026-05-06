import getSheet from '@/actions/sheet';
import Sheet from './sheet';
import { Stack, Typography } from '@mui/material';
import Tracker from './components/tracker';

export default async function Page() {
    const sheet = await getSheet('sde');

    return (
        <Stack>
            <Stack spacing={1}>
                <Typography fontWeight={700} fontSize={{ xs: 20, md: 32 }}>
                    Strivers SDE Sheet - Top Coding Interview Problems
                </Typography>
                <Typography color='text.secondary' mt={0.6} fontSize={14}>
                    Carefully curated coding interview problems across DSA topics with revision-first tracking.
                </Typography>
            </Stack>

            <Sheet sheet={sheet} />
        </Stack>
    );
}
