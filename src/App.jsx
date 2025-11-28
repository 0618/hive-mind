import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Experiment from './pages/Experiment';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col items-center">
        <div className="w-full max-w-7xl flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/experiment" element={<Experiment />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;