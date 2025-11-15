import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signupApi } from '../utils/userApi';
import { useNavigate } from 'react-router-dom';

function Signup() {
const navigate = useNavigate();
const [form, setForm] = useState({ name: '', email: '',phone:'', password: '', confirm: '' });
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

const onChange = (e) => setForm({ ...form, [e.target.type === 'password' && e.target.placeholder?.toLowerCase().includes('re-enter') ? 'confirm' : e.target.name]: e.target.value });

const onSubmit = async (e) => {
e.preventDefault();
setError('');
if (!form.name || !form.email || !form.password || !form.phone) {
setError('All fields are required');
return;
}
if (form.password !== form.confirm) {
setError('Passwords do not match');
return;
}
setLoading(true);
try {
await signupApi({ name: form.name, email: form.email, password: form.password , phone :form.phone});
navigate('/login');
} catch (err) {
setError(err.message || 'Signup failed');
} finally {
setLoading(false);
}
};

return (
<div className="container my-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
<motion.div className="col-md-6 col-lg-5 shadow p-4 rounded bg-light" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
<h2 className="text-center mb-4 fw-bold">Create an Account</h2>
<form onSubmit={onSubmit}>
<div className="mb-3">
<label className="form-label">Full Name</label>
<div className="input-group">
<span className="input-group-text"><i className="bi bi-person-fill"></i></span>
<input name="name" type="text" className="form-control" placeholder="Enter your name" required value={form.name} onChange={onChange} />
</div>
</div>
<div className="mb-3">
<label className="form-label">Email</label>
<div className="input-group">
<span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
<input name="email" type="email" className="form-control" placeholder="Enter your email" required value={form.email} onChange={onChange} />
</div>
</div>
<div className="mb-3">
<label className="form-label">PHone Number</label>
<div className="input-group">
<span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
<input name="phone" type="phone" className="form-control" placeholder="Enter your phone number " required value={form.phone} onChange={onChange} />
</div>
</div>
<div className="mb-3">
<label className="form-label">Password</label>
<div className="input-group">
<span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
<input name="password" type="password" className="form-control" placeholder="Create a password" required value={form.password} onChange={onChange} />
</div>
</div>
<div className="mb-3">
<label className="form-label">Confirm Password</label>
<div className="input-group">
<span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
<input type="password" className="form-control" placeholder="Re-enter your password" required value={form.confirm} onChange={onChange} />
</div>
</div>
<input type="hidden" name="role" value="citizen" />
<button className="btn btn-success w-100" disabled={loading}>
<i className="bi bi-person-plus-fill me-2"></i> {loading ? 'Signing up...' : 'Signup'}
</button>
{error && <p className="text-danger mt-3">{error}</p>}
</form>
<p className="text-center mt-3">
Already have an account? <a href="/login" className="fw-bold">Login here</a>
</p>
</motion.div>
</div>
);
}

export default Signup;

