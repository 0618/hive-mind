import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { seedDatabase } from '../utils/seeder';

const Landing = () => {
  const { t } = useTranslation();

  const handleSeed = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Add test data to database?')) {
       await seedDatabase();
       alert('Database populated!');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-900 text-white flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* 2. Main Content (Centered) */}
      <main className="z-10 flex flex-col items-center text-center px-4 max-w-4xl space-y-10">
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse-slow">
            {t('landing.title')}
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide max-w-2xl mx-auto">
            {t('landing.subtitle')}
          </p>
        </div>

        <Link to="/experiment">
          <button className="relative px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
            {t('landing.button') || "Join Experiment"}
          </button>
        </Link>
      </main>

      {/* 3. Debug Button (Fixed Bottom-Left) */}
      <button
        onClick={handleSeed}
        className="fixed bottom-4 left-4 z-50 text-[10px] uppercase tracking-widest text-slate-700 hover:text-cyan-500 transition-colors opacity-50 hover:opacity-100"
      >
        🌱 Debug Seed
      </button>

    </div>
  );
};

export default Landing;