import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/EmployeesDB/new"); 
        setEmployees(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);
  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    setEmployees((prev) =>
      prev.map((emp) =>
        emp._id === id ? { ...emp, deleting: true } : emp
      )
    );
    axios
      .delete(`http://localhost:3001/api/EmployeesDB/new/${id}`)
      .then(() => {
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting employee:", err);
        alert("Failed to delete employee");
      });
  };
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase()) ||
    emp.role.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employees</h1>
          <p className="text-slate-500">
            Manage your team members and their account permissions.
          </p>
        </div>
        <Link
          to={'/add'}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Employee</span>
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    Loading employees...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    No employees found.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          alt="img"
                          className="w-8 h-8 rounded-full"
                          src={emp.avatar || `https://ui-avatars.com/api/?name=${emp.name}`}
                        />
                        <div>
                          <p className="font-medium text-slate-900">{emp.name}</p>
                          <p className="text-slate-500">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{emp.role}</td>
                    <td className="px-6 py-4">{emp.department}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <Link 
                          to={`/update/${emp._id}`}
                          className="text-slate-400 hover:text-blue-600">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button 
                            onClick={() => handleDelete(emp._id, emp.name)}
                            className="text-slate-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default EmployeeList;
