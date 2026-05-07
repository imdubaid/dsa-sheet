'use client';

import Image from '@/components/ui/image';
import { Sheet } from '@/types/types';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    Chip,
    IconButton,
    LinearProgress,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import Link from 'next/link';
import { memo, useCallback, useMemo, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { DIFFICULTY_COLORS } from '@/constants/colors';
import { updateUserProgress } from '@/api/user/client';

type ProblemStackProps = Sheet & {
    completed: Record<string, boolean>;
    toggleProblem: (problemId: string) => void;
};

function ProblemStack(props: ProblemStackProps) {
    const { _id, problems, completed, toggleProblem } = props;
    const [expandedSection, setExpandedSection] = useState<string>('');

    const totalProblems = problems.length;
    const completedCount = useMemo(() => problems.reduce((n, p) => n + (completed[p._id] ? 1 : 0), 0), [problems, completed]);

    const handleToggleProblem = useCallback(
        async (problemId: string) => {
            toggleProblem(problemId);
            await updateUserProgress(problemId, completed[problemId] ? 'pending' : 'completed');
        },
        [completed, toggleProblem],
    );

    return (
        <Accordion
            expanded={expandedSection === _id}
            onChange={(_, expanded) => setExpandedSection(expanded ? _id : '')}
            disableGutters
            sx={{
                bgcolor: 'transparent',
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&::before': { display: 'none' },
            }}>
            <AccordionSummary
                expandIcon={<FiChevronDown color='#d0d0d0' />}
                sx={{
                    px: 2,
                    pb: 1,
                    '& .MuiAccordionSummary-content': {
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mr: 2,
                    },
                }}>
                <Typography fontWeight={700}>{_id}</Typography>

                <Stack direction='row' alignItems='center' columnGap={2}>
                    <LinearProgress
                        value={(completedCount / totalProblems) * 100}
                        variant='determinate'
                        sx={{
                            width: 150,
                            height: 7,
                            borderRadius: 100,
                        }}
                    />
                    <Typography color='text.secondary' fontSize={14} minWidth={50} textAlign='right'>
                        {completedCount} / {totalProblems}
                    </Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0, border: '1px solid', borderColor: 'divider', borderRadius: '12px' }}>
                <Table size='small'>
                    <TableHead>
                        <TableRow sx={{ height: 48, borderBottomColor: 'transparent' }}>
                            <TableCell sx={{ width: 56 }}>Status</TableCell>
                            <TableCell>Problem</TableCell>
                            <TableCell sx={{ width: 130 }}>Leet Code</TableCell>
                            <TableCell sx={{ width: 130 }}>Youtube</TableCell>
                            <TableCell sx={{ width: 130 }}>Article</TableCell>
                            <TableCell sx={{ width: 130 }}>Difficulty</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {problems.map(problem => (
                            <TableRow key={problem._id} hover sx={{ '& td': { borderColor: 'divider' } }}>
                                <TableCell>
                                    <Checkbox checked={Boolean(completed[problem._id])} onChange={() => handleToggleProblem(problem._id)} />
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant='body2'
                                        sx={{
                                            color: completed[problem._id] ? 'text.primary' : 'text.secondary',
                                            textDecoration: completed[problem._id] ? 'line-through' : 'none',
                                        }}>
                                        {problem.title}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton LinkComponent={Link} href={problem.links.leetcode} target='_blank'>
                                        <Image name='leetcode.png' alt='LeetCode' sx={{ width: 20, height: 20 }} />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton LinkComponent={Link} href={problem.links.youtube} target='_blank'>
                                        <Image name='youtube.png' alt='Youtube' sx={{ width: 20, height: 20 }} />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton LinkComponent={Link} href={problem.links.tuf} target='_blank'>
                                        <Image name='tuf.png' alt='TUF' sx={{ width: 20, height: 20 }} />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        size='small'
                                        label={problem.difficulty}
                                        sx={{
                                            bgcolor: '#2a2a2a',
                                            color: DIFFICULTY_COLORS[problem.difficulty],
                                            fontWeight: 600,
                                            minWidth: 78,
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </AccordionDetails>
        </Accordion>
    );
}

function problemStackPropsAreEqual(prev: ProblemStackProps, next: ProblemStackProps): boolean {
    if (prev._id !== next._id || prev.problems !== next.problems || prev.toggleProblem !== next.toggleProblem) {
        return false;
    }
    for (const p of prev.problems) {
        if (!!prev.completed[p._id] !== !!next.completed[p._id]) {
            return false;
        }
    }
    return true;
}

export default memo(ProblemStack, problemStackPropsAreEqual);
