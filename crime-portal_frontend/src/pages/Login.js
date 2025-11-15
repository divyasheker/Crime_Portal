import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { loginApi} from '../utils/userApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
const navigate = useNavigate();
const auth = useAuth(); // if not using context, remove and just use localStorage
const [form, setForm] = useState({ email: '', password: '' });
const [role, setRole] = useState(''); // optional selector; backend doesn’t require it
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const routeByRole = (r) => {
const R = (r || '').toUpperCase();
if (R === 'ADMIN') return '/admin';
if (R === 'POLICE') return '/police';
if (R === 'MANAGER') return '/manager';
return '/citizen';
};

const onSubmit = async (e) => {
e.preventDefault();
setError('');
setLoading(true);
try {
const user = await loginApi({ email: form.email, password: form.password });
if (auth?.login) {
auth.login(user);
} else {
localStorage.setItem('cp_user', JSON.stringify(user));
}
navigate(routeByRole(user.role));
} catch (err) {
setError('Invalid credentials');
} finally {
setLoading(false);
}
};

return (
<div className="container my-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
<motion.div className="col-md-6 col-lg-5 shadow p-4 rounded bg-light" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
<h2 className="text-center mb-4 fw-bold">Login</h2>
<form onSubmit={onSubmit}>
<div className="mb-3">
<label className="form-label">Email</label>
<div className="input-group">
<span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
<input name="email" type="email" className="form-control" placeholder="Enter your email" required value={form.email} onChange={onChange} />
</div>
</div>
<div className="mb-3">
<label className="form-label">Password</label>
<div className="input-group">
<span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
<input name="password" type="password" className="form-control" placeholder="Enter your password" required value={form.password} onChange={onChange} />
</div>
</div>
<div className="mb-3">
<label className="form-label">Login as</label>
<select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
<option value="">Select your role (optional)</option>
<option value="citizen">Citizen</option>
<option value="police">Police</option>
<option value="moderator" disabled>Moderator</option>
<option value="admin">Admin</option>
</select>
</div>
<div className="text-end mb-3">
<a href="/forgot-password" className="text-decoration-none small">Forgot password?</a>
</div>
<button className="btn btn-primary w-100" disabled={loading}>
<i className="bi bi-box-arrow-in-right me-2"></i> {loading ? 'Logging in...' : 'Login'}
</button>
{error && <p className="text-danger mt-3">{error}</p>}
</form>
<p className="text-center mt-3">
Don’t have an account? <a href="/signup" className="fw-bold">Sign up here</a>
</p>
</motion.div>
</div>
);
}

export default Login;