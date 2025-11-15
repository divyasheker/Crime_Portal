import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
const [user, setUser] = useState(() => {
try { return JSON.parse(localStorage.getItem('cp_user')) || null; } catch { return null; }
});

const login = (u) => {
setUser(u);
localStorage.setItem('cp_user', JSON.stringify(u));
};

const logout = () => {
setUser(null);
localStorage.removeItem('cp_user');
};

const value = useMemo(() => ({ user, login, logout }), [user]);
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
return useContext(AuthContext);
}

