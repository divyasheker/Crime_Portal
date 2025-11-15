import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchAllUsers, updateUserApi, deleteUserApi } from "../../utils/userApi";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", role: "" });

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (e) {
      setError(e.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditForm({ name: user.name, role: user.role });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", role: "" });
  };

  const saveEdit = async (userId, email, phone, password) => {
    try {
      await updateUserApi(userId, {
        name: editForm.name,
        email, // keep original
        phone, // keep original
        password, // keep original
        role: editForm.role,
      });
      setEditingId(null);
      await loadUsers(); // refresh list
    } catch (e) {
      alert(e.message || "Update failed");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUserApi(userId);
      await loadUsers(); // refresh list
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <motion.div
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="fw-bold mb-3">Manage Users</h2>
        <p>Loading users...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="fw-bold mb-3">Manage Users</h2>
        <p className="text-danger">{error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="fw-bold mb-3">Manage Users</h2>
      <p>View, edit roles, or delete users.</p>

      {users.length === 0 ? (
        <p className="text-muted">No users found.</p>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const isEditing = editingId === user.id;
                return (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone || "—"}</td>
                    <td>
                      {isEditing ? (
                        <select
                          className="form-select form-select-sm"
                          value={editForm.role}
                          onChange={(e) =>
                            setEditForm({ ...editForm, role: e.target.value })
                          }
                        >
                          <option value="CITIZEN">CITIZEN</option>
                          <option value="POLICE">POLICE</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      ) : (
                        <span className="badge bg-primary">{user.role}</span>
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() =>
                              saveEdit(user.id, user.email, user.phone, user.password)
                            }
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => startEdit(user)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

export default ManageUsers;
