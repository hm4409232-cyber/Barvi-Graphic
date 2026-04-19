import { useState, useEffect, FormEvent } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebase';

export default function StudentDashboard() {
  const [student, setStudent] = useState<any>(null);
  const [form, setForm] = useState({ name: '', fatherName: '', education: '', age: '', address: '', phoneNumber: '', whatsappNumber: '', selectedCourse: '' });

  useEffect(() => {
    const fetchStudent = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'students', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStudent(docSnap.data());
        }
      }
    };
    fetchStudent();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    const studentData = { ...form, status: 'pending', totalFee: 10000, paidFee: 0, remainingFee: 10000 };
    await setDoc(doc(db, 'students', auth.currentUser.uid), studentData);
    setStudent(studentData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {student ? (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Your Application Status: {student.status}</h2>
          <p>Course: {student.selectedCourse}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">Admission Form</h2>
          <input type="text" placeholder="Name" className="w-full p-2 border mb-2" onChange={e => setForm({...form, name: e.target.value})} />
          <input type="text" placeholder="Father Name" className="w-full p-2 border mb-2" onChange={e => setForm({...form, fatherName: e.target.value})} />
          <input type="text" placeholder="Education" className="w-full p-2 border mb-2" onChange={e => setForm({...form, education: e.target.value})} />
          <input type="number" placeholder="Age" className="w-full p-2 border mb-2" onChange={e => setForm({...form, age: e.target.value})} />
          <input type="text" placeholder="Address" className="w-full p-2 border mb-2" onChange={e => setForm({...form, address: e.target.value})} />
          <input type="text" placeholder="Phone Number" className="w-full p-2 border mb-2" onChange={e => setForm({...form, phoneNumber: e.target.value})} />
          <input type="text" placeholder="WhatsApp Number" className="w-full p-2 border mb-2" onChange={e => setForm({...form, whatsappNumber: e.target.value})} />
          <select className="w-full p-2 border mb-4" onChange={e => setForm({...form, selectedCourse: e.target.value})}>
            <option value="">Select Course</option>
            <option value="Graphic Designing">Graphic Designing</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Web Development">Web Development</option>
            <option value="Freelancing">Freelancing</option>
          </select>
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Submit Application</button>
        </form>
      )}
    </div>
  );
}
