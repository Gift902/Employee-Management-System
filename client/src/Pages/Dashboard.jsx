import React from 'react';
import { useEmployee } from '../context/EmployeeContext';
import { Users, UserCheck, UserPlus, Building2 } from 'lucide-react';
const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);
const Dashboard = () => {
  const { employees } = useEmployee();
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const newHires = employees.filter(e => {}).length;
  const departments = new Set(employees.map(e => e.department)).size;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Employees"
          value={activeEmployees}
          icon={UserCheck}
          color="bg-emerald-500"
        />
        <StatCard
          title="New Hires (30d)"
          value={newHires}
          icon={UserPlus}
          color="bg-violet-500"
        />
        <StatCard
          title="Departments"
          value={departments}
          icon={Building2}
          color="bg-orange-500"
        />
      </div>
    </div>
  );
};
export default Dashboard;
