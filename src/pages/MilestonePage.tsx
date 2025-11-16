import { useParams, useNavigate } from 'react-router-dom';
import { milestones } from '../data/milestones';
import { completeMilestone, getMilestoneStatus, isMilestoneUnlocked } from '../utils/progressTracking';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const MilestonePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const milestoneId = parseInt(id || '1');
  const milestone = milestones.find((m) => m.id === milestoneId);
  const status = getMilestoneStatus(milestoneId);
  const isUnlocked = isMilestoneUnlocked(milestoneId);

  if (!milestone) {
    return <div>Milestone non trovata</div>;
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark to-secondary/20 flex items-center justify-center">
        <div className="glass-card p-12 text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-4">Milestone Bloccata</h2>
          <p className="text-light/70 mb-6">
            Completa la Milestone {milestoneId - 1} per sbloccare questa!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-secondary/20">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-light/70 hover:text-light transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Torna alle Milestone
        </button>

        <div className="glass-card p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  {milestone.id}
                </div>
                <h1 className="text-4xl font-bold">{milestone.title}</h1>
              </div>
              <p className="text-xl text-light/70">{milestone.subtitle}</p>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2 text-accent mb-2">
                <Award className="w-6 h-6" />
                <span className="text-2xl font-bold">{milestone.xp} XP</span>
              </div>
              <span className="text-4xl">{milestone.badge}</span>
            </div>
          </div>

          <div className="flex gap-4 text-sm text-light/70">
            <span>⏱️ {milestone.estimatedTime}</span>
            <span>•</span>
            <span>{milestone.topics.length} argomenti</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 prose prose-invert prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {milestone.description}
              </ReactMarkdown>
            </div>

            {/* Complete Button */}
            {status !== 'completed' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <button
                  onClick={handleComplete}
                  className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  Completa Milestone e Guadagna {milestone.xp} XP
                </button>
              </motion.div>
            )}

            {status === 'completed' && (
              <div className="mt-8 glass-card p-6 border-2 border-success">
                <div className="flex items-center gap-3 text-success">
                  <CheckCircle2 className="w-8 h-8" />
                  <div>
                    <p className="font-bold text-lg">Milestone Completata! 🎉</p>
                    <p className="text-sm text-light/70">
                      Hai guadagnato {milestone.xp} XP
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Topics */}
            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-4">Argomenti Trattati</h3>
              <div className="space-y-2">
                {milestone.topics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-4">Navigazione</h3>
              <div className="space-y-2">
                {milestone.id > 1 && (
                  <button
                    onClick={() => navigate(`/milestone/${milestone.id - 1}`)}
                    className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                  >
                    ← Milestone Precedente
                  </button>
                )}
                {milestone.id < 12 && (
                  <button
                    onClick={() => navigate(`/milestone/${milestone.id + 1}`)}
                    className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                  >
                    Milestone Successiva →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
