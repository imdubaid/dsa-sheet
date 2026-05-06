import { Box, Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
    return (
        <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }} id='auth-layout'>
            <Stack flexGrow={1} mx={2} justifyContent={'center'} alignItems={'center'}>
                <Stack width={'100%'} maxWidth={410}>
                    {props.children}
                </Stack>
            </Stack>
        </Box>
    );
}
