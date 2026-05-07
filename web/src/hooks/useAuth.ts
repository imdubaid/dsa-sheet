'use client';

import { authRoutes } from '@/routes';
import { SessionUser } from '@/types/types';
import { clearSessionCookie, getSessionCookie, getSession, setSessionCookie } from '@/actions/session/client';
import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { jwtDecode } from 'jwt-decode';
import { isSessionExpired } from '@/utils/helper';

type UseAuthResult = {
    session: SessionUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
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
    const raw = getSessionCookie();
    if (!raw) return null;
    const decoded = jwtDecode(raw);
    if (!decoded || isSessionExpired(decoded)) return null;
    return raw;
}

function getServerTokenSnapshot(): string | null {
    return null;
}

function useAuth(): UseAuthResult {
    const token = useSyncExternalStore(subscribeAuthStore, getClientTokenSnapshot, getServerTokenSnapshot);
    const session = useMemo(() => getSession(token), [token]);

    const clearAuth = useCallback(() => {
        clearSessionCookie();
        emitAuthStoreChange();
    }, []);

    const hydrateFromStorage = useCallback(() => {
        const storedToken = getSessionCookie();
        const validSession = getSession(storedToken);

        if (!storedToken || !validSession) {
            clearAuth();
            return;
        }

        setSessionCookie(storedToken);
        emitAuthStoreChange();
    }, [clearAuth]);

    const refreshSession = useCallback(() => {
        hydrateFromStorage();
    }, [hydrateFromStorage]);

    const setToken = useCallback(
        (nextToken: string) => {
            const validSession = getSession(nextToken);
            if (!validSession) {
                clearAuth();
                return;
            }

            setSessionCookie(nextToken);
            emitAuthStoreChange();
        },
        [clearAuth],
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
        isAuthenticated,
        isLoading: false,
        refreshSession,
        setToken,
        logout,
    };
}

export default useAuth;
