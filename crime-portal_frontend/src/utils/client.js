export const API_BASE = 'http://localhost:8080';

export async function apiFetch(path, { method = 'GET', body, headers } = {}) {
const res = await fetch(${API_BASE}${path}, {
method,
headers: {
'Content-Type': 'application/json',
...(headers || {})
},
body: body ? JSON.stringify(body) : undefined
});
if (!res.ok) {
let message = Request failed: ${res.status};
try {
const text = await res.text();
if (text) message = text;
} catch {}
throw new Error(message);
}
if (res.status === 204) return null;
return res.json();
}

