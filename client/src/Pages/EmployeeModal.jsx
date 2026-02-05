import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const EmployeeModal = ({ isOpen, onClose, onSave, employee }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:3001/api/EmployeesDB/new', {
        name: name.trim(),
        email,
        role,
        department,
      });
      navigate('/employees');
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {employee ? 'Edit Employee' : 'Add Employee'}
          </h2>
          <Link to="/employees" className="p-2 hover:bg-slate-100 rounded-full">
            <X className="w-5 h-5" />
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError((prev) => ({ ...prev, name: '' }));
              }}
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError((prev) => ({ ...prev, email: '' }));
              }}
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Role
              </label>
              <input
                required
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setError((prev) => ({ ...prev, role: '' }));
                }}
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Department
              </label>
              <input
                required
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setError((prev) => ({ ...prev, department: '' }));
                }}
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Link
              to="/employees"
              className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </Link>
            <button
              disabled={loading}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {employee ? 'Save Changes' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EmployeeModal;
