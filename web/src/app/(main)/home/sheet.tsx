'use client';

import ProblemStack from './components/problemStack';
import type { Sheet } from '@/types/types';
import { Stack } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Tracker from './components/tracker';

type SheetProps = {
    sheet: Sheet[];
};

function Sheet({ sheet }: SheetProps) {
    const [completed, setCompleted] = useState<Record<string, boolean>>({});
    const allProblems = useMemo(() => sheet.flatMap(item => item.problems), [sheet]);
    const totalProblems = allProblems.length;

    const toggleProblem = useCallback((problemId: string) => {
        setCompleted(prev => ({ ...prev, [problemId]: !prev[problemId] }));
    }, []);

    useEffect(() => {
        allProblems.forEach(problem => {
            if (problem.status === 'completed') {
                setCompleted(prev => ({ ...prev, [problem._id]: true }));
            }
        });
    }, [allProblems]);

    return (
        <Stack>
            <Tracker allProblems={allProblems} completed={completed} totalProblems={totalProblems} />
            <Stack spacing={2.5} mt={5} border='1px solid' borderColor='divider' borderRadius='12px' p={2} bgcolor='background.paper'>
                {sheet.map(item => (
                    <ProblemStack key={item._id} {...item} completed={completed} toggleProblem={toggleProblem} />
                ))}
            </Stack>
        </Stack>
    );
}

export default Sheet;
