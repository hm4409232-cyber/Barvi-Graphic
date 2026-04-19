import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg p-4 font-sans">
      <h1 className="text-4xl font-bold text-primary mb-12">Barvi Graphic Faisalabad</h1>
      <div className="flex gap-4">
        <button 
          onClick={() => navigate('/admin/login')} 
          className="px-8 py-3 bg-primary text-white rounded-md hover:bg-accent transition-colors font-semibold"
        >
            Admin Login
        </button>
        <button 
          onClick={() => navigate('/student/login')} 
          className="px-8 py-3 bg-white text-primary border border-primary rounded-md hover:bg-primary-light transition-colors font-semibold"
        >
            Student Login
        </button>
      </div>
    </div>
  );
}
