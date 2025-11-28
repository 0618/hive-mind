import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Experiment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [guess, setGuess] = useState(500);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    setGroup(Math.random() < 0.5 ? 'independent' : 'social');
  }, []);

  const handleSubmit = () => {
    localStorage.setItem('experimentData', JSON.stringify({ guess, group }));
    navigate('/results');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 text-center space-y-8">
      <h2 className="text-3xl font-bold mb-4">{t('experiment.task')}</h2>
      <img 
        src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=1000&auto=format&fit=crop" 
        alt="Jar of beans" 
        className="w-64 h-64 object-cover rounded-lg mb-4"
      />

      {group === 'social' && (
        <div className="text-orange-400 mb-4">
          {t('experiment.social_cue')} 1840
        </div>
      )}

      <div className="flex items-center space-x-4 mb-4">
        <input
          type="range"
          min="0"
          max="3000"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="w-64"
        />
        <span className="font-mono text-lg">{guess}</span>
      </div>

      <button
        onClick={handleSubmit}
        className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        {t('experiment.submit')}
      </button>
    </div>
  );
};

export default Experiment;
