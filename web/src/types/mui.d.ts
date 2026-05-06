import { ListItemButtonVariants, ListItemIconVariants, ButtonShape } from '@/types/constants';

import '@mui/material/styles';

declare module '@mui/material/ListItemButton' {
    interface ListItemButtonBaseProps {
        variant?: (typeof ListItemButtonVariants)[number];
    }
}

declare module '@mui/material/ListItemIcon' {
    interface ListItemIconProps {
        variant?: (typeof ListItemIconVariants)[number];
    }
}

declare module '@mui/material/Button' {
    interface ButtonOwnProps {
        shape?: (typeof ButtonShape)[number];
    }
}
