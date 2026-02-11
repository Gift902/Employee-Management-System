import React, { useState, useEffect } from 'react';
import { Bell, Search, Menu, User } from 'lucide-react';
import axios from 'axios';
const Header = ({ onMenuClick }) => {
  const [admin, setAdmin] = useState(null); 
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return setLoading(false);
        const res = await axios.get("http://localhost:3001/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmin(res.data);
      } catch (err) {
        console.error("Error fetching admin:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <button 
        onClick={onMenuClick}
        className="md:hidden mr-4 p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
          {admin ? (
            <>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-slate-700">{admin.name}</p>
                <p className="text-xs text-slate-500">{admin.role || "Administrator"}</p>
              </div>
            </>
          ) : (
            // Fallback if admin not loaded yet
            <User className="w-8 h-8 text-slate-400" />
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
