import { JwtPayload } from 'jwt-decode';

export const isSessionExpired = (payload: JwtPayload) => {
    if (!payload?.exp) return true;
    return payload.exp * 1000 <= Date.now();
};
