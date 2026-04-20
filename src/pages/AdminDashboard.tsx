import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser?.email !== 'hasanbarvi@gmail.com') {
      alert('Access Denied: Only Admin can access this page.');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-bg p-8 font-sans">
      <h2 className="text-2xl font-bold mb-8 text-text-main">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
            <h3 className="font-bold text-primary mb-2">Student Management</h3>
            <p className="text-text-muted text-sm">Add, Edit, View Students</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
            <h3 className="font-bold text-primary mb-2">Daily Reports</h3>
            <p className="text-text-muted text-sm">Mark attendance, Add Academic Reports</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
            <h3 className="font-bold text-primary mb-2">Finance</h3>
            <p className="text-text-muted text-sm">Manage Income & Expenses</p>
        </div>
      </div>
    </div>
  );
}
