import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';

export default function HomePage() {
  const { translate, toggleLanguage, language } = useLanguage();
  const navigate = useNavigate();

  const images = [
    { title: 'زیر نگرانی', src: 'https://picsum.photos/seed/nigrani/200/300' },
    { title: 'فیضان نظر', src: 'https://picsum.photos/seed/faizan/200/300' },
    { title: 'معلم', src: 'https://picsum.photos/seed/muallim/200/300' }
  ];

  return (
    <div className="min-h-screen bg-bg p-4 font-sans text-center">
      <button onClick={toggleLanguage} className="mb-4 bg-primary text-white p-2 rounded">
        {language === 'en' ? 'Urdu' : 'English'}
      </button>
      
      <p className="text-xl mb-4">{translate('bismillah')}</p>
      <h1 className="text-4xl font-bold text-primary mb-2">{translate('jamiaName')}</h1>
      <p className="text-lg text-text-muted mb-8">{translate('address')}</p>

      <div className="flex justify-center gap-6 mb-12">
        {images.map((img, i) => (
          <div key={i} className="cursor-pointer" onClick={() => navigate('/profile')}>
            <img src={img.src} alt={img.title} className="w-40 h-60 object-cover rounded-lg shadow-md mb-2" referrerPolicy="no-referrer" />
            <p className="font-semibold">{img.title}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={() => navigate('/login')} className="px-6 py-2 bg-primary text-white rounded">
          {translate('studentLogin')} / {translate('adminLogin')}
        </button>
      </div>

      <footer className="mt-12 text-sm text-text-muted">
        <p>{translate('footer')}</p>
        <a href="https://share.google/YhQGYyA6qsLBTY0m6" className="text-primary underline" target="_blank" rel="noopener noreferrer">
          Barvi Graphics
        </a>
      </footer>
    </div>
  );
}
