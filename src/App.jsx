import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Experiment from "./pages/Experiment";
import Results from "./pages/Results";
import LanguageSwitcher from "./components/LanguageSwitcher";

function App() {
  return (
    <Router>
      <div className="fixed top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>
      <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col items-center">
        <div className="w-full max-w-7xl flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/experiment" element={<Experiment />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </div>
      <Analytics />
    </Router>
  );
}

export default App;
