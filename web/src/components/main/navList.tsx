import { IconType } from 'react-icons';
import { GoHome } from 'react-icons/go';
import { PiIdentificationCard, PiShieldCheck } from 'react-icons/pi';

export type RouteType = 'general' | 'security';

export type Route = {
    name: string;
    icon: IconType;
    to: string;
};

export const routes: Route[] = [
    {
        name: 'Home',
        icon: GoHome,
        to: '/home',
    },
    {
        name: 'Profile',
        icon: PiIdentificationCard,
        to: '/profile',
    },
    {
        name: 'Progress',
        icon: PiShieldCheck,
        to: '/progress',
    },
];
