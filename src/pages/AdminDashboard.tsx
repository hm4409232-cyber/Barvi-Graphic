import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function AdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, 'students'));
      setStudents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchStudents();
  }, []);

  const handleApprove = async (id: string, name: string) => {
    await updateDoc(doc(db, 'students', id), { status: 'approved' });
    alert(`Approved ${name}. WhatsApp API would trigger here.`);
    setStudents(students.map(s => s.id === id ? {...s, status: 'approved'} : s));
  };

  return (
    <div className="min-h-screen bg-bg p-8 font-sans">
      <h2 className="text-2xl font-bold mb-8 text-text-main">Admin Dashboard</h2>
      <div className="grid gap-6">
        {students.map(s => (
          <div key={s.id} className="bg-white p-6 rounded-lg border border-border flex justify-between items-center transition-all hover:shadow-md">
            <div>
              <p className="font-bold text-text-main">{s.name}</p>
              <p className="text-sm text-text-muted capitalize">Status: {s.status}</p>
              <p className="text-sm text-text-muted">Course: {s.selectedCourse}</p>
            </div>
            {s.status === 'pending' && (
                <button 
                  onClick={() => handleApprove(s.id, s.name)} 
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-accent transition-colors text-sm font-semibold"
                >
                  Approve
                </button>
            )}
           {s.status === 'approved' && (
              <span className="text-sm font-semibold text-primary bg-primary-light px-3 py-1 rounded-full">Approved</span>
           )}
          </div>
        ))}
      </div>
    </div>
  );
}
