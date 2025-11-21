import { useState } from 'react';
import { milestones } from '../data/milestones';
import { MilestoneCard } from '../components/LearningPath/MilestoneCard';
import { ProgressTracker } from '../components/LearningPath/ProgressTracker';
import { BadgeDisplay } from '../components/Gamification/BadgeDisplay';
import { ResourceView } from '../components/Resources/ResourceView';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export const HomePage = () => {
  const { theme } = useTheme();
  const [view, setView] = useState<'milestones' | 'badges' | 'resources'>('milestones');
  const [language, setLanguage] = useState<'it' | 'en'>('it');
  const navigate = useNavigate();

  const handleLanguageChange = (lang: 'it' | 'en') => {
    setLanguage(lang);
    // TODO: Implementare cambio lingua
    console.log('Language changed to:', lang);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Compact Header */}
      <Header
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Progress Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Progress & Badges */}
          <div className="lg:col-span-1 space-y-6">
            <ProgressTracker />

            {/* View Toggle */}
            <div
              className="backdrop-blur-sm border rounded-lg p-4"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.03)',
                borderColor: 'var(--border-color)'
              }}
            >
              <div className="flex gap-2">
                <button
                  onClick={() => setView('milestones')}
                  className="flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors"
                  style={{
                    backgroundColor: view === 'milestones' ? '#FF6B35' : (theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.05)'),
                    color: view === 'milestones' ? '#ffffff' : 'var(--text-secondary)'
                  }}
                  onMouseEnter={(e) => {
                    if (view !== 'milestones') {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.08)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (view !== 'milestones') {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.05)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  Milestone
                </button>
                <button
                  onClick={() => setView('badges')}
                  className="flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors"
                  style={{
                    backgroundColor: view === 'badges' ? '#FF6B35' : (theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.05)'),
                    color: view === 'badges' ? '#ffffff' : 'var(--text-secondary)'
                  }}
                  onMouseEnter={(e) => {
                    if (view !== 'badges') {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.08)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (view !== 'badges') {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.05)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  Badge
                </button>
                <button
                  onClick={() => setView('resources')}
                  className="flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors"
                  style={{
                    backgroundColor: view === 'resources' ? '#FF6B35' : (theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.05)'),
                    color: view === 'resources' ? '#ffffff' : 'var(--text-secondary)'
                  }}
                  onMouseEnter={(e) => {
                    if (view !== 'resources') {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.08)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (view !== 'resources') {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.05)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  Risorse
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            {view === 'milestones' ? (
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                  Le 12 Milestone del Percorso
                </h2>
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <MilestoneCard
                      milestone={milestone}
                      onClick={() => navigate(`/milestone/${milestone.id}`)}
                    />
                  </div>
                ))}
              </div>
            ) : view === 'badges' ? (
              <BadgeDisplay />
            ) : (
              <ResourceView />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
