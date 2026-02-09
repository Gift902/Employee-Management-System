import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, UserPlus } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/api/EmployeesDB/admin", {
        email,
        password,
      });
      console.log("Signup success:", res.data);
      setSuccess("Account created successfully. You can now log in.");
      setEmail("");
      setPassword("");
      navigate('/');
    } catch (err) {
      setError("Failed to create account. Try another email.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-2">
            <UserPlus className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Create an Account
          </h1>
          <p className="text-slate-500 text-sm">
            Sign up to start managing your team
          </p>
        </div>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
          <div>
            <Link to={'/'} className="text-blue-600">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
