'use client';

import { DIFFICULTY_COLORS } from '@/constants/colors';
import { Problem } from '@/types/types';
import { CircularProgress, Stack, Typography, Box } from '@mui/material';
import { useMemo } from 'react';

type TrackerProps = {
    allProblems: Problem[];
    completed: Record<string, boolean>;
    totalProblems: number;
};

function Tracker({ allProblems, completed, totalProblems }: TrackerProps) {
    const difficultyCounts = useMemo(() => {
        return {
            Easy: allProblems.filter(problem => problem.difficulty === 'Easy').length,
            Medium: allProblems.filter(problem => problem.difficulty === 'Medium').length,
            Hard: allProblems.filter(problem => problem.difficulty === 'Hard').length,
        };
    }, [allProblems]);

    const completedCount = useMemo(() => Object.values(completed).filter(Boolean).length, [completed]);

    const completedByDifficulty = useMemo(() => {
        const counts = { Easy: 0, Medium: 0, Hard: 0 };
        allProblems.forEach(problem => {
            if (completed[problem._id]) counts[problem.difficulty] += 1;
        });
        return counts;
    }, [allProblems, completed]);

    const progressPercent = totalProblems ? Math.round((completedCount / totalProblems) * 100) : 0;

    return (
        <Box
            mt={2.5}
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '12px',
                p: 3,
                bgcolor: 'background.paper',
            }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Stack direction='row' spacing={1.5} alignItems='center'>
                    <CircularProgress
                        variant='determinate'
                        value={progressPercent}
                        size={52}
                        sx={{
                            '& .MuiCircularProgress-circle': { strokeLinecap: 'round' },
                        }}
                    />
                    <Box>
                        <Typography fontWeight={700}>Overall Progress</Typography>
                        <Typography>
                            {completedCount} / {totalProblems}
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction='row' spacing={2.5}>
                    {(['Easy', 'Medium', 'Hard'] as const).map(level => (
                        <Typography key={level} fontSize={14} color='text.secondary' fontWeight={500}>
                            <Box component='span' sx={{ color: DIFFICULTY_COLORS[level] }}>
                                ●
                            </Box>{' '}
                            {level} {completedByDifficulty[level]}/{difficultyCounts[level]}
                        </Typography>
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
}

export default Tracker;
