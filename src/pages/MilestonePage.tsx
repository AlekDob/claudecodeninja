import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { milestones } from '../data/milestones';
import { completeMilestone, getMilestoneStatus, isMilestoneUnlocked } from '../utils/progressTracking';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const MilestonePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'it' | 'en'>('it');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const milestoneId = parseInt(id || '1');
  const milestone = milestones.find((m) => m.id === milestoneId);
  const status = getMilestoneStatus(milestoneId);
  const isUnlocked = isMilestoneUnlocked(milestoneId);

  if (!milestone) {
    return <div>Milestone non trovata</div>;
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-3xl font-bold text-white mb-3">Milestone Bloccata</h2>
          <p className="text-white/60 mb-8 text-base">
            Completa la Milestone {milestoneId - 1} per sbloccare questa!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-sm transition-colors"
          >
            Torna alle Milestone
          </button>
        </div>
      </div>
    );
  }

  const handleComplete = () => {
    completeMilestone(milestone.id, milestone.xp);
    navigate('/');
  };

  const handleLanguageChange = (lang: 'it' | 'en') => {
    setLanguage(lang);
    console.log('Language changed to:', lang);
  };

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    console.log('Theme changed to:', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-[#111827]">
      {/* Global Header */}
      <Header
        currentLanguage={language}
        isDarkMode={isDarkMode}
        onLanguageChange={handleLanguageChange}
        onThemeChange={handleThemeChange}
      />

      {/* Milestone Header - Nextra Style */}
      <header className="border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna alle Milestone
            </button>
            <div className="flex items-center gap-2">
              {status === 'completed' && (
                <span className="px-2.5 py-1 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Completata
                </span>
              )}
              <span className="px-2.5 py-1 rounded text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {milestone.xp} XP
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">{milestone.title}</h1>
          <p className="text-lg text-white/70 leading-relaxed">{milestone.subtitle}</p>
        </div>
      </header>

      {/* Content - Nextra Style Layout */}
      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Content - Clean, no card */}
          <div>
            <div className="prose-compact max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {milestone.description}
              </ReactMarkdown>
            </div>

            {/* Complete Button */}
            {status !== 'completed' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <button
                  onClick={handleComplete}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Completa Milestone ({milestone.xp} XP)
                </button>
              </motion.div>
            )}

            {status === 'completed' && (
              <div className="mt-6 border-l-4 border-emerald-500 bg-emerald-500/5 px-4 py-3">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <div>
                    <p className="font-medium text-sm">Milestone Completata! 🎉</p>
                    <p className="text-xs text-white/60 mt-0.5">
                      +{milestone.xp} XP guadagnati
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Nextra Style */}
          <aside className="hidden lg:block">
            <div className="sticky top-4 space-y-6">
              {/* Topics */}
              <div>
                <h3 className="font-semibold text-xs uppercase tracking-wide text-white/40 mb-3">Argomenti Trattati</h3>
                <ul className="space-y-2 text-sm">
                  {milestone.topics.map((topic, index) => (
                    <li
                      key={index}
                      className="text-white/70 hover:text-white transition-colors leading-snug"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation */}
              <div className="pt-4 border-t border-white/5">
                <h3 className="font-semibold text-xs uppercase tracking-wide text-white/40 mb-3">Navigazione</h3>
                <div className="space-y-2 text-sm">
                  {milestone.id > 1 && (
                    <button
                      onClick={() => navigate(`/milestone/${milestone.id - 1}`)}
                      className="block text-white/70 hover:text-white transition-colors text-left"
                    >
                      ← Milestone Precedente
                    </button>
                  )}
                  {milestone.id < 12 && (
                    <button
                      onClick={() => navigate(`/milestone/${milestone.id + 1}`)}
                      className="block text-white/70 hover:text-white transition-colors text-left"
                    >
                      Milestone Successiva →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
