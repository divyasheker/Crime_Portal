import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateUserApi } from '../utils/userApi';

function Profile() {
const { user, login } = useAuth();
const navigate = useNavigate();

const [editing, setEditing] = useState(false);
const [form, setForm] = useState({
name: user?.name || '',
email: user?.email || '',
phone: user?.phone || '',
password: '',
});
const [error, setError] = useState('');
const [message, setMessage] = useState('');

React.useEffect(() => {
if (!user) navigate('/login');
}, [user, navigate]);

const startEdit = () => {
setEditing(true);
setForm({
name: user.name,
email: user.email,
phone: user.phone || '',
password: '',
});
setError('');
setMessage('');
};

const cancelEdit = () => {
setEditing(false);
setError('');
setMessage('');
setForm({
name: user.name,
email: user.email,
phone: user.phone || '',
password: '',
});
};

const handleUpdate = async (e) => {
e.preventDefault();
setError('');
setMessage('');
if (!form.name || !form.email) {
setError('Name and Email are required.');
return;
}
try {
const updatedUser = await updateUserApi(user.id, {
name: form.name,
email: form.email,
phone: form.phone,
password: form.password || user.password,
role: user.role
});
setMessage('Profile updated!');
login(updatedUser);
setEditing(false);
} catch (err) {
setError(err.message || 'Update failed.');
}
};

if (!user) return <div className="container mt-5">Loading...</div>;

return (
<div className="container my-5 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
<div className="col-md-7 col-lg-5 shadow p-4 rounded bg-light">
<h2 className="text-center mb-4 fw-bold">Profile</h2>
{!editing ? (
<ul className="list-group mb-4">
<li className="list-group-item"><strong>Name:</strong> {user.name}</li>
<li className="list-group-item"><strong>Email:</strong> {user.email}</li>
<li className="list-group-item"><strong>Phone:</strong> {user.phone || '-'}</li>
<li className="list-group-item"><strong>Role:</strong> {user.role}</li>
</ul>
) : (
<form onSubmit={handleUpdate}>
<div className="mb-3">
<label className="form-label">Name</label>
<input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
</div>
<div className="mb-3">
<label className="form-label">Email</label>
<input type="email" className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
</div>
<div className="mb-3">
<label className="form-label">Phone</label>
<input type="tel" className="form-control" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Optional" />
</div>
<div className="mb-3">
<label className="form-label">Change Password</label>
<input type="password" className="form-control" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Leave blank to keep current password" />
</div>
<button className="btn btn-success me-2" type="submit">Save</button>
<button className="btn btn-secondary" type="button" onClick={cancelEdit}>Cancel</button>
{error && <p className="text-danger mt-3">{error}</p>}
{message && <p className="text-success mt-3">{message}</p>}
</form>
)}
{!editing && (
<button className="btn btn-outline-primary w-100" onClick={startEdit}>Edit Profile</button>
)}
</div>
</div>
);
}

export default Profile;

