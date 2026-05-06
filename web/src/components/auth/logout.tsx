import { Box, Button } from '@mui/material';
import { signOut } from '@/utils/auth';
import { authRoutes } from '@/routes';
function Logout() {
    return (
        <Box
            component='form'
            action={async () => {
                'use server';
                await signOut({ redirectTo: authRoutes.auth });
            }}>
            <Button variant='contained' color='primary' type='submit'>
                Logout
            </Button>
        </Box>
    );
}

export default Logout;
