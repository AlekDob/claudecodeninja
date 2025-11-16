import { useState } from 'react';
import { milestones } from '../data/milestones';
import { MilestoneCard } from '../components/LearningPath/MilestoneCard';
import { ProgressTracker } from '../components/LearningPath/ProgressTracker';
import { BadgeDisplay } from '../components/Gamification/BadgeDisplay';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const [view, setView] = useState<'milestones' | 'badges'>('milestones');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-secondary/20">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
          ClaudeCodeNinja
        </h1>
        <p className="text-xl text-light/80 mb-8">
          Il Percorso Guidato per Diventare Claude Code Master
        </p>
        <p className="text-light/60 max-w-2xl mx-auto">
          12 milestone progressive · Sistema di badge · Certificazione finale
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        {/* Progress Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress & Badges */}
          <div className="lg:col-span-1 space-y-6">
            <ProgressTracker />

            {/* View Toggle */}
            <div className="glass-card p-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setView('milestones')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    view === 'milestones'
                      ? 'bg-primary text-white'
                      : 'bg-white/10 text-light/70 hover:bg-white/20'
                  }`}
                >
                  Milestone
                </button>
                <button
                  onClick={() => setView('badges')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    view === 'badges'
                      ? 'bg-primary text-white'
                      : 'bg-white/10 text-light/70 hover:bg-white/20'
                  }`}
                >
                  Badge
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            {view === 'milestones' ? (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold mb-6">
                  Le 12 Milestone del Percorso
                </h2>
                {milestones.map((milestone) => (
                  <MilestoneCard
                    key={milestone.id}
                    milestone={milestone}
                    onClick={() => navigate(`/milestone/${milestone.id}`)}
                  />
                ))}
              </div>
            ) : (
              <BadgeDisplay />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
