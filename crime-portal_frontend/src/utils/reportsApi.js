export const API_BASE = 'http://localhost:8080';

async function apiFetch(path, options = {}) {
const res = await fetch(`${API_BASE}${path}`, {
headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
...options,
});
if (!res.ok) {
let msg = `Request failed: ${res.status}`;
try { msg = (await res.text()) || msg; } catch {}
throw new Error(msg);
}
if (res.status === 204) return null;
return res.json();
}

// Raw fetchers
export function fetchAllReports() {
return apiFetch('/api/reports');
}

export function fetchReportsByEmail(email) {
return apiFetch(`/api/reports/by-email/${encodeURIComponent(email)}`);
}

export function fetchReportsByStatus(status) {
return apiFetch(`/api/reports/by-status/${encodeURIComponent(status)}`);
}

export function fetchReportsByHandledBy(officerEmail) {
return apiFetch(`/api/reports/by-handled/${encodeURIComponent(officerEmail)}`);
}

// Aggregation helpers (client-side)
export function groupByStatus(reports) {
const counts = {};
for (const r of reports) {
const s = (r.status || 'Unknown').trim();
counts[s] = (counts[s] || 0) + 1;
}
return counts;
}

export function groupByCategory(reports) {
const counts = {};
for (const r of reports) {
const c = (r.category || 'Uncategorized').trim();
counts[c] = (counts[c] || 0) + 1;
}
return counts;
}

export function groupByStatusAndCategory(reports) {
// returns { status: { category: count } }
const map = {};
for (const r of reports) {
const s = (r.status || 'Unknown').trim();
const c = (r.category || 'Uncategorized').trim();
map[s] = map[s] || {};
map[s][c] = (map[s][c] || 0) + 1;
}
return map;
}

export function emergencySplit(reports, threshold = 46) {
let emergency = 0;
let nonEmergency = 0;
for (const r of reports) {
const score = Number(r.score) || 0;
if (score >= threshold) emergency++;
else nonEmergency++;
}
return { emergency, nonEmergency };
}

// Convenience helpers for citizen analytics
export function pendingCompletedForUser(reports) {
// define Completed ≈ Resolved; Pending is literally "Pending"
let pending = 0;
let completed = 0;
for (const r of reports) {
const s = (r.status || '').toLowerCase();
if (s === 'pending') pending++;
if (s === 'resolved') completed++;
}
return { pending, completed };
}
export function updateReport(id, updatedFields) {
  return apiFetch(`/api/reports/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedFields), // ✅ Add JSON.stringify
  });
}

  
  export function fetchReportById(id) {
    return apiFetch(`/api/reports/${id}`);
  }
  