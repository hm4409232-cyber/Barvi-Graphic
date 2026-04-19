import { useState, FormEvent } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

export default function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/student/dashboard');
    } catch (error) {
      console.error(error);
      alert('Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4 font-sans">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg border border-border w-full max-w-sm shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-primary">{isRegister ? 'Student Register' : 'Student Login'}</h2>
        <input type="email" placeholder="Email" className="w-full p-3 border border-border rounded-md mb-4" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-3 border border-border rounded-md mb-6" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-primary text-white p-3 rounded-md hover:bg-accent transition-colors font-semibold mb-4">{isRegister ? 'Register' : 'Login'}</button>
        <button type="button" onClick={() => setIsRegister(!isRegister)} className="w-full text-primary hover:text-accent font-medium">
            {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
      </form>
    </div>
  );
}
