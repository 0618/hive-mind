import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700 shadow-lg">
      <button
        onClick={() => i18n.changeLanguage('en')}
        className={`text-sm font-bold px-2 py-0.5 rounded transition-all ${
          i18n.language.startsWith('en') ? 'text-cyan-400 bg-slate-700/50' : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        EN
      </button>
      <div className="w-px h-3 bg-slate-600"></div>
      <button
        onClick={() => i18n.changeLanguage('zh')}
        className={`text-sm font-bold px-2 py-0.5 rounded transition-all ${
          i18n.language.startsWith('zh') ? 'text-cyan-400 bg-slate-700/50' : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        中文
      </button>
    </div>
  );
}