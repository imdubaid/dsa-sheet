'use client';

import { PropsWithChildren } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { components } from '@/theme/components';

const ThemeProvider = (props: PropsWithChildren) => {
    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#ededed',
                // main: '#e5e5e5',
            },
            secondary: {
                main: '#222222',
                dark: '#171717',
                light: '#acacad',
            },
            background: {
                default: '#000000',
                paper: '#121212',
            },
            text: {
                primary: '#f2f2f2',
                secondary: '#f2f2f2cc',
                disabled: 'rgba(255, 255, 255, 0.5)',
            },

            success: {
                main: '#05c900',
            },
            action: {
                hover: '#e5e5e517',
            },
        },
        typography: {
            fontFamily: '"Montserrat", "Raleway", "Helvetica", "Arial", sans-serif',
            // fontFamily: 'var(--font-outfit), "Raleway", "Helvetica", "Arial", sans-serif',
        },
        breakpoints: {
            keys: ['xs', 'sm', 'md', 'lg', 'xl'],
            values: {
                xs: 0,
                sm: 576,
                md: 768,
                lg: 1280,
                xl: 1440,
            },
        },
        components,
    });

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </MuiThemeProvider>
    );
};

export default ThemeProvider;
