import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  return <h2>{t('home.title')}</h2>;
}

function About() {
  const { t } = useTranslation();
  return <h2>{t('about.title')}</h2>;
}

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white">
        <nav className="p-4 border-b border-slate-800">
          <ul className="flex space-x-4">
            <li>
              <Link to="/">{t('nav.home')}</Link>
            </li>
            <li>
              <Link to="/about">{t('nav.about')}</Link>
            </li>
          </ul>
          <div className="absolute top-4 right-4">
            <button onClick={() => changeLanguage('en')} className="p-1">EN</button>
            <button onClick={() => changeLanguage('zh')} className="p-1">ZH</button>
          </div>
        </nav>
        <main className="p-4">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
