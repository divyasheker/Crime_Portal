// src/utils/userApi.js

const USERS_API_URL = 'http://localhost:8080/api/users';

// If you add JWT later, store it here and attach as Authorization header
const getAuthToken = () => sessionStorage.getItem('token');

// Build headers with optional auth
const buildHeaders = (withJson = true) => {
const headers = withJson ? { 'Content-Type': 'application/json' } : {};
const token = getAuthToken();
if (token) headers['Authorization'] =` Bearer ${token}`;
return headers;
};

// ========== Public (no token required for now) ==========

// Sign up (register): name, email, password; role defaults to CITIZEN on backend
export const signupApi = async ({ name, email, password , phone }) => {
const res = await fetch(USERS_API_URL, {
method: 'POST',
headers: buildHeaders(true),
body: JSON.stringify({ name, email, password , phone }),
});
if (!res.ok) throw new Error(`Signup failed: ${res.status}`);
return res.json(); // returns created user with id and role
};

// Login: email, password; returns user object for now
export const loginApi = async ({ email, password }) => {
const res = await fetch(`${USERS_API_URL}/login`, {
method: 'POST',
headers: buildHeaders(true),
body: JSON.stringify({ email, password }),
});
if (!res.ok) throw new Error('Invalid credentials');
const user = await res.json();

// Optional: if you add JWT later, save token here
// sessionStorage.setItem('token', user.token);

// Persist user profile locally for routing
sessionStorage.setItem('cp_user', JSON.stringify(user));
return user;
};

// ========== Protected (attach token later when security is added) ==========

// Get all users
export const fetchAllUsers = async () => {
const res = await fetch(USERS_API_URL, {
method: 'GET',
headers: buildHeaders(true),
});
if (!res.ok) throw new Error(`Fetch users failed: ${res.status}`);
return res.json();
};

// Update a user fully (PUT): send all fields you want to keep
export const updateUserApi = async (userId, { name, email,phone, password, role }) => {
const res = await fetch(`${USERS_API_URL}/${userId}`, {
method: 'PUT',
headers: buildHeaders(true),
body: JSON.stringify({ name, email,phone, password, role }),
});
if (!res.ok) throw new Error(`Update user failed: ${res.status}`);
return res.json();
};

// Delete a user
export const deleteUserApi = async (userId) => {
const res = await fetch(`${USERS_API_URL}/${userId}`, {
method: 'DELETE',
headers: buildHeaders(false),
});
if (!res.ok) {
let msg = `Failed to delete user (Status: ${res.status})`;
try {
const data = await res.json();
msg = data.message || msg;
} catch {}
throw new Error(msg);
}
return true; // 204 No Content expected
};

// ========== Helpers for local auth state ==========

export const getLocalUser = () => {
try {
return JSON.parse(sessionStorage.getItem('cp_user'));
} catch {
return null;
}
};

export const clearAuth = () => {
sessionStorage.removeItem('cp_user');
sessionStorage.removeItem('token');
};