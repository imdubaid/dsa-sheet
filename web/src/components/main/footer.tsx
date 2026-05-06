import { Box, Button, Stack, Typography } from '@mui/material';

function Footer() {
    return (
        <Box sx={{ py: 4 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='space-between' alignItems='center'>
                <Typography sx={{ color: '#666666' }}>© 2026 DSA Sheet. All rights reserved.</Typography>
                <Stack direction='row' spacing={3} sx={{ color: '#666666' }}>
                    <Button color='inherit'>Privacy Policy</Button>
                    <Button color='inherit'>Terms of Service</Button>
                    <Button color='inherit'>Contact</Button>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Footer;
