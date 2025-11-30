import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const Experiment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [guess, setGuess] = useState(500);
  const [group, setGroup] = useState(null);
  const [socialAvg, setSocialAvg] = useState(0);

  useEffect(() => {
    setGroup(Math.random() < 0.5 ? "independent" : "social");

    const fetchGuesses = async () => {
      const querySnapshot = await getDocs(collection(db, "guesses"));
      const guesses = querySnapshot.docs.map((doc) => doc.data().guess);
      if (guesses.length > 0) {
        const avg = guesses.reduce((a, b) => a + b, 0) / guesses.length;
        setSocialAvg(avg);
      }
    };

    fetchGuesses();
  }, []);

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "guesses"), {
        guess: Number(guess),
        group,
        timestamp: serverTimestamp(),
      });
      localStorage.setItem("guess", guess);
      navigate("/results");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col items-center text-center">
      <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-8">
        {t("experiment.task")}
      </h2>
      <img
        src="/jar-of-beans.png"
        alt="Jar of beans"
        className="h-80 w-auto mx-auto object-contain rounded-2xl shadow-2xl border-4 border-slate-700/50 mb-8"
      />

      {group === "social" && (
        <div className="text-orange-400 font-mono text-lg mb-4 bg-orange-400/10 px-4 py-2 rounded-lg">
          {t("experiment.social_cue")} {Math.round(socialAvg)}
        </div>
      )}

      <div className="w-full space-y-8">
        <div className="flex items-center justify-center space-x-4">
          <input
            type="range"
            min="0"
            max="3000"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="w-64"
          />
          <span className="font-mono text-lg w-12 text-left">{guess}</span>
        </div>

        <button
          onClick={handleSubmit}
          className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {t("experiment.submit")}
        </button>
      </div>
    </div>
  );
};

export default Experiment;
