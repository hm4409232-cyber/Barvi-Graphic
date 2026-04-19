import { useState, FormEvent } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4 font-sans">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg border border-border w-full max-w-sm shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-primary">Admin Login</h2>
        <input type="email" placeholder="Email" className="w-full p-3 border border-border rounded-md mb-4" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-3 border border-border rounded-md mb-6" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-primary text-white p-3 rounded-md hover:bg-accent transition-colors font-semibold">Login</button>
      </form>
    </div>
  );
}
