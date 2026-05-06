'use client';

import { styled } from '@mui/material/styles';
import MuiStack, { StackProps as MuiStackProps } from '@mui/material/Stack';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Icons, IconType } from '@/constants/icons';
import ListItem from '@mui/material/ListItem';
import Link from 'next/link';

const StyledStack = styled(MuiStack)(({ theme }) => ({
    '& .MuiListItem-root:first-of-type > .MuiListItemButton-root': {
        borderTopLeftRadius: theme.spacing(2.5),
        borderTopRightRadius: theme.spacing(2.5),
    },
    '& .MuiListItem-root:last-of-type > .MuiListItemButton-root': {
        borderBottomLeftRadius: theme.spacing(2.5),
        borderBottomRightRadius: theme.spacing(2.5),
    },
}));

export const StackContainer = StyledStack;

export type StackItem = {
    icon: IconType;
    primary: string;
    secondary: string | null;
    secondaryAction?: React.ReactNode;
    description?: string;
    placeholder?: string
    href: string;
}

interface StackProps extends MuiStackProps {
    items: StackItem[];
}

const Stack = (props: StackProps) => {
    const { items, ...rest } = props;

    return (
        <StyledStack sx={{ '& .MuiListItem-root': { borderBottom: `1px solid`, borderColor: 'background.default' } }} {...rest}>
            {items.map((item) => {
                const Icon = Icons[item.icon];

                return (
                    <ListItem key={item.primary} component={Link} href={item.href} disablePadding>
                        <ListItemButton variant='stackItem'>
                            <ListItemIcon>
                                <Icon size={24} />
                            </ListItemIcon>
                            <ListItemText primary={item.primary} secondary={item.secondary ?? item.placeholder} />
                            {item.secondaryAction}
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </StyledStack>
    )
}

export default Stack;