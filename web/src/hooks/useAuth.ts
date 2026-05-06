'use client';

import { authRoutes } from '@/routes';
import { SessionUser } from '@/types/types';
import { clearStoredToken, decodeToken, getStoredToken, isTokenExpired, setStoredToken } from '@/utils/token';
import { useCallback, useMemo, useSyncExternalStore } from 'react';

type UseAuthResult = {
    session: SessionUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    validateToken: (token?: string | null) => SessionUser | null;
    refreshSession: () => void;
    setToken: (token: string) => void;
    logout: (redirectTo?: string) => void;
};

const authListeners = new Set<() => void>();

function subscribeAuthStore(onStoreChange: () => void) {
    authListeners.add(onStoreChange);
    return () => {
        authListeners.delete(onStoreChange);
    };
}

function emitAuthStoreChange() {
    authListeners.forEach(fn => {
        fn();
    });
}

/** Valid JWT from the cookie, or null. Used as the client snapshot for useSyncExternalStore. */
function getClientTokenSnapshot(): string | null {
    const raw = getStoredToken();
    if (!raw) return null;
    const decoded = decodeToken(raw);
    if (!decoded || isTokenExpired(decoded)) return null;
    return raw;
}

function getServerTokenSnapshot(): string | null {
    return null;
}

function useAuth(): UseAuthResult {
    const validateToken = useCallback((rawToken?: string | null) => {
        const decoded = decodeToken(rawToken ?? undefined);
        if (!decoded) return null;
        if (isTokenExpired(decoded)) return null;
        return decoded;
    }, []);

    const token = useSyncExternalStore(subscribeAuthStore, getClientTokenSnapshot, getServerTokenSnapshot);
    const session = useMemo(() => validateToken(token), [token, validateToken]);

    const clearAuth = useCallback(() => {
        clearStoredToken();
        emitAuthStoreChange();
    }, []);

    const hydrateFromStorage = useCallback(() => {
        const storedToken = getStoredToken();
        const validSession = validateToken(storedToken);

        if (!storedToken || !validSession) {
            clearAuth();
            return;
        }

        setStoredToken(storedToken);
        emitAuthStoreChange();
    }, [clearAuth, validateToken]);

    const refreshSession = useCallback(() => {
        hydrateFromStorage();
    }, [hydrateFromStorage]);

    const setToken = useCallback(
        (nextToken: string) => {
            const validSession = validateToken(nextToken);
            if (!validSession) {
                clearAuth();
                return;
            }

            setStoredToken(nextToken);
            emitAuthStoreChange();
        },
        [clearAuth, validateToken],
    );

    const logout = useCallback(
        (redirectTo = authRoutes.signIn) => {
            clearAuth();
            window.location.assign(redirectTo);
        },
        [clearAuth],
    );

    const isAuthenticated = useMemo(() => Boolean(session && token), [session, token]);

    return {
        session,
        token,
        isAuthenticated,
        isLoading: false,
        validateToken,
        refreshSession,
        setToken,
        logout,
    };
}

export default useAuth;
