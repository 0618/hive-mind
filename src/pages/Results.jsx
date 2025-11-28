import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

// Helper function to generate bell curve data
const bellCurve = (center, stdDev, x) => {
  return Math.exp(-0.5 * Math.pow((x - center) / stdDev, 2));
};

const generateData = () => {
  const data = [];
  for (let i = 0; i <= 3000; i += 150) {
    data.push({
      name: i,
      independent: bellCurve(1350, 400, i),
      social: bellCurve(1800, 500, i),
    });
  }
  return data;
};

const Results = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const experimentData = JSON.parse(localStorage.getItem('experimentData'));

  if (!experimentData) {
    return <div>No data found</div>;
  }

  const { guess } = experimentData;
  const chartData = generateData();

  const handleTryAgain = () => {
    localStorage.removeItem('experimentData');
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 text-center space-y-8">
      <h1 className="text-4xl font-bold mb-2">{t('results.title')}</h1>
      <h2 className="text-2xl text-gray-400 mb-8">Your Guess: {guess}</h2>

      <div key={i18n.language} style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis hide={true} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
              labelStyle={{ color: '#F9FAFB' }}
            />
            <Legend formatter={(value) => <span className="text-gray-300">{t(`results.${value}`)}</span>} />

            <Area type="monotone" dataKey="independent" fill="#22d3ee" stroke="#22d3ee" fillOpacity={0.3} />
            <Area type="monotone" dataKey="social" fill="#fb923c" stroke="#fb923c" fillOpacity={0.3} />

            <ReferenceLine x={1350} stroke="#10b981" label={{ value: t('results.truth'), fill: '#10b981', position: 'insideTop' }} />
            <ReferenceLine x={parseInt(guess, 10)} stroke="#ffffff" label={{ value: t('results.you'), fill: '#ffffff', position: 'insideTop' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <button
        onClick={handleTryAgain}
        className="mt-8 px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        {t('results.try_again')}
      </button>
    </div>
  );
};

export default Results;
