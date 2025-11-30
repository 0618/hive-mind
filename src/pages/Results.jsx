import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const calculateMedian = (arr) => {
  const sorted = arr.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const Results = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const yourGuess = localStorage.getItem('guess');

  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [percentile, setPercentile] = useState(0);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "guesses"));
      const allGuesses = querySnapshot.docs.map(doc => doc.data());

      const independentGuesses = allGuesses.filter(g => g.group === 'independent').map(g => g.guess);
      const socialGuesses = allGuesses.filter(g => g.group === 'social').map(g => g.guess);

      const realAnswer = 1355;
      const yourGuessNum = Number(yourGuess);
      const yourError = Math.abs(yourGuessNum - realAnswer);

      const socialErrors = socialGuesses.map(g => Math.abs(g - realAnswer));
      const closerCount = socialErrors.filter(e => yourError < e).length;
      const calculatedPercentile = socialGuesses.length > 0 ? (closerCount / socialGuesses.length) * 100 : 0;
      setPercentile(calculatedPercentile);

      const newStats = {
        independentMedian: calculateMedian(independentGuesses),
        socialMedian: calculateMedian(socialGuesses),
      };
      setStats(newStats);

      const bins = {};
      for (let i = 0; i <= 3000; i += 100) {
        bins[i] = { name: i, independent: 0, social: 0 };
      }

      independentGuesses.forEach(guess => {
        const bin = Math.floor(guess / 100) * 100;
        if (bins[bin]) bins[bin].independent++;
      });
      socialGuesses.forEach(guess => {
        const bin = Math.floor(guess / 100) * 100;
        if (bins[bin]) bins[bin].social++;
      });
      
      setChartData(Object.values(bins));
      setLoading(false);
    };

    fetchResults();
  }, []);

  const handleTryAgain = () => {
    localStorage.removeItem('guess');
    navigate('/');
  };

  if (loading) {
    return <div className="text-center p-10">{t('results.loading')}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 text-center space-y-8">
      <h1 className="text-4xl font-bold mb-2">{t('results.title')}</h1>
      {yourGuess && <h2 className="text-2xl text-gray-400 mb-8">{t('results.your_guess')}: {yourGuess}</h2>}

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

            <ReferenceLine x={1355} stroke="#10b981" label={{ value: t('results.truth'), fill: '#10b981', position: 'insideTop' }} />
            {yourGuess && <ReferenceLine x={parseInt(yourGuess, 10)} stroke="#ffffff" label={{ value: t('results.you'), fill: '#ffffff', position: 'insideTop' }} />}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg w-full max-w-4xl">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold text-green-400">{t('results.real_answer')}</h3>
          <p>1355</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold text-cyan-400">{t('results.independent_median')}</h3>
          <p>{stats.independentMedian?.toFixed(0)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold text-orange-400">{t('results.social_median')}</h3>
          <p>{stats.socialMedian?.toFixed(0)}</p>
        </div>
      </div>
      
      {yourGuess && (
        <p className="text-lg mt-4">{t('results.feedback', { percent: percentile.toFixed(0) })}</p>
      )}

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
