import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Experiment from './pages/Experiment';
import Results from './pages/Results';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/experiment" element={<Experiment />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
