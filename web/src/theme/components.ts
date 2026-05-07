import { alpha, Components, Theme } from '@mui/material';

export const components: Components<Theme> = {
    MuiCssBaseline: {
        styleOverrides: theme => ({
            html: {
                scrollBehavior: 'smooth',
            },
            body: {
                'input::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: '0',
                },
                '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                    backgroundColor: 'transparent',
                    width: '4px',
                    height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                    borderRadius: 8,
                    backgroundColor: theme.palette.divider,
                },
                '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                    backgroundColor: 'inherit',
                },
                '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                    backgroundColor: '#747775',
                },
                '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                    backgroundColor: '#747775',
                },
                '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#9c9c9c',
                },
            },
        }),
    },
    MuiCard: {
        styleOverrides: {
            root: ({ theme }) => ({
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 16,
                backgroundColor: theme.palette.background.paper,
            }),
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                boxShadow: 'none',
                backgroundImage: 'unset',
            },
        },
    },
    MuiInput: {
        styleOverrides: {
            root: ({ theme }) => ({
                '&:focus-visible': {
                    outline: 'none',
                },
                '& input::placeholder': {
                    color: alpha(theme.palette.text.secondary, 0.5),
                },
            }),
        },
    },

    MuiAlert: {
        variants: [
            {
                props: { severity: 'error' },
                style: {
                    backgroundColor: '#3a1314',
                    color: '#ff9592',
                },
            },
            {
                props: { severity: 'warning' },
                style: {
                    backgroundColor: '#302a11',
                },
            },
            {
                props: { severity: 'success' },
                style: {
                    backgroundColor: '#092a0e',
                },
            },
            {
                props: { severity: 'info' },
                style: {
                    backgroundColor: '#0f2832',
                },
            },
        ],
        styleOverrides: {
            root: {
                borderRadius: 6,
            },
        },
    },

    MuiOutlinedInput: {
        styleOverrides: {
            root: ({ theme }) => ({
                '&:focus-visible': {
                    outline: 'none',
                },

                // disabled
                '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(theme.palette.primary.main, 0.23),
                },

                // focused but NOT error
                '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(theme.palette.primary.main, 0.23),
                },

                // hover but NOT error
                '&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(theme.palette.primary.main, 0.23),
                },
            }),
        },
    },
    MuiButton: {
        variants: [
            {
                props: { shape: 'rounded' },
                style: {
                    borderRadius: 999,
                },
            },
        ],
        styleOverrides: {
            root: ({ ownerState, theme }) => ({
                variants: [
                    {
                        props: { size: 'small' },
                        style: {
                            textTransform: 'none',
                            fontSize: 16,
                            minHeight: 40,
                        },
                    },
                ],
                textTransform: 'none',
                borderRadius: 999,
                '&:hover': {
                    backgroundColor:
                        ownerState.variant === 'contained'
                            ? theme.palette.primary.main
                            : ['text', 'outlined'].includes(ownerState.variant ?? '')
                              ? 'transparent'
                              : ownerState.color === 'secondary'
                                ? theme.palette.secondary.main
                                : theme.palette.primary.main,
                    borderColor: ['text', 'outlined'].includes(ownerState.variant ?? '')
                        ? alpha(theme.palette.primary.main, 0.35)
                        : theme.palette.primary.main,
                },
                ...(ownerState.variant === 'outlined'
                    ? {
                          borderColor: theme.palette.divider,
                      }
                    : {}),
            }),
        },
    },

    // Drawer nav styling (pill item + colored icon circle)
    MuiListItem: {
        styleOverrides: {
            root: ({ theme }) => ({
                '&:hover .MuiListItemButton-root:not(.Mui-selected):not(variant="stackItem")': {
                    backgroundColor: alpha(theme.palette.text.primary, 0.08),
                },
            }),
        },
    },
    MuiListItemButton: {
        variants: [
            {
                props: { variant: 'navItem' },
                style: ({ theme }) => ({
                    borderRadius: 999,
                    padding: theme.spacing(1),
                    gap: theme.spacing(1),
                    flexGrow: 0,
                    minHeight: 56,
                    transition: theme.transitions.create(['background-color', 'box-shadow'], {
                        duration: theme.transitions.duration.shortest,
                    }),
                    '&.Mui-selected, &.Mui-selected:hover': {
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: `0 1px 2px ${alpha(theme.palette.common.black, 0.08)}`,
                    },
                }),
            },
        ],
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: theme.spacing(0.5),
            }),
        },
    },
    MuiListItemIcon: {
        variants: [
            {
                props: { variant: 'navIcon' },
                style: {
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'var(--nav-icon-bg, transparent)',
                    color: 'var(--nav-icon-fg, inherit)',
                    display: 'grid',
                    placeItems: 'center',
                    flex: '0 0 auto',
                },
            },
        ],
        styleOverrides: {
            root: ({ theme }) => ({
                minWidth: 0,
                '& svg': {
                    width: theme.spacing(2.5),
                    height: theme.spacing(2.5),
                },
                '& svg, & path': {
                    color: 'inherit',
                },
            }),
        },
    },
    MuiListItemText: {
        styleOverrides: {
            root: {
                margin: 0,
            },
            primary: ({ theme }) => ({
                fontSize: 14,
                fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
                fontWeight: 500,
                color: theme.palette.text.primary,
                paddingRight: theme.spacing(1.5),
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            }),
            secondary: ({ theme }) => ({
                fontSize: 14,
                color: theme.palette.text.secondary,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            }),
        },
    },
};
