import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { milestones } from '../data/milestones';
import { completeMilestone, getMilestoneStatus, isMilestoneUnlocked } from '../utils/progressTracking';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { TableOfContents } from '../components/TableOfContents/TableOfContents';
import { PromptExample } from '../components/PromptExample/PromptExample';
import { QuizModal } from '../components/LearningPath/QuizModal';
import { remarkPromptPlugin } from '../utils/remarkPromptPlugin';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Components } from 'react-markdown';

export const MilestonePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'it' | 'en'>('it');
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Custom components for ReactMarkdown
  const markdownComponents: Components = {
    code: (props) => {
      const { node, className, children, ...rest } = props;

      const codeContent = String(children).replace(/\n$/, '');

      // Check if inline (no className means inline code)
      const inline = !className;

      // Check if this is a prompt example (added by remarkPromptPlugin)
      const isPromptExample = className?.includes('prompt-example');
      const isPromptGood = className?.includes('prompt-good');
      const isPromptBad = className?.includes('prompt-bad');

      // Use PromptExample component for marked prompt examples
      if (isPromptExample && (isPromptGood || isPromptBad)) {
        return (
          <PromptExample
            type={isPromptGood ? 'good' : 'bad'}
          >
            {codeContent}
          </PromptExample>
        );
      }

      // Default code rendering for regular code blocks
      if (!inline) {
        return (
          <div className="relative rounded-lg overflow-hidden max-w-full" style={{ background: 'var(--bg-secondary)' }}>
            <pre className="p-4 overflow-x-auto border max-w-full" style={{ borderColor: 'var(--border-color)', margin: 0 }}>
              <code className={className} {...rest}>
                {children}
              </code>
            </pre>
          </div>
        );
      }

      // Inline code
      return (
        <code className={className} {...rest}>
          {children}
        </code>
      );
    },
  };

  const milestoneId = parseInt(id || '1');
  const milestone = milestones.find((m) => m.id === milestoneId);
  const status = getMilestoneStatus(milestoneId);
  const isUnlocked = isMilestoneUnlocked(milestoneId);

  if (!milestone) {
    return <div>Milestone non trovata</div>;
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Milestone Bloccata</h2>
          <p className="mb-8 text-base" style={{ color: 'var(--text-secondary)' }}>
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
    // If milestone has quiz, open quiz modal
    if (milestone.quiz && milestone.quiz.questions.length > 0) {
      setIsQuizOpen(true);
    } else {
      // No quiz, complete directly
      completeMilestone(milestone.id, milestone.xp);
      navigate('/');
    }
  };

  const handleRetakeQuiz = () => {
    // Open quiz modal for retake
    setIsQuizOpen(true);
  };

  const handleQuizComplete = (scorePercentage: number) => {
    // Close quiz modal
    setIsQuizOpen(false);

    // If milestone already completed, don't redirect (just update score)
    if (status === 'completed') {
      completeMilestone(milestone.id, milestone.xp, scorePercentage);
    } else {
      // First time completion: complete and redirect
      completeMilestone(milestone.id, milestone.xp, scorePercentage);
      navigate('/');
    }
  };

  const handleLanguageChange = (lang: 'it' | 'en') => {
    setLanguage(lang);
    console.log('Language changed to:', lang);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Global Header */}
      <Header
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Milestone Header - Nextra Style */}
      <header className="border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 transition-colors text-sm"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
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
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{milestone.title}</h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{milestone.subtitle}</p>
        </div>
      </header>

      {/* Content - Nextra Style Layout */}
      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Content - Clean, no card */}
          <div className="min-w-0">
            <div className="prose-compact max-w-none overflow-x-hidden">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkPromptPlugin]}
                rehypePlugins={[rehypeSlug]}
                components={markdownComponents}
              >
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
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Milestone Completata! 🎉</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                        +{milestone.xp} XP guadagnati
                      </p>
                    </div>
                  </div>

                  {/* Retake Quiz Button - Only show if milestone has quiz */}
                  {milestone.quiz && milestone.quiz.questions.length > 0 && (
                    <button
                      onClick={handleRetakeQuiz}
                      className="px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 flex-shrink-0"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Rifai Quiz
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Nextra Style */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              <TableOfContents content={milestone.description} />

              {/* Divider */}
              <div className="pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }} />

              {/* Topics */}
              <div>
                <h3 className="font-semibold text-xs uppercase tracking-wide mb-3" style={{ color: 'var(--text-tertiary)' }}>Argomenti Trattati</h3>
                <ul className="space-y-2 text-sm">
                  {milestone.topics.map((topic, index) => (
                    <li
                      key={index}
                      className="transition-colors leading-snug"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation */}
              <div className="pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <h3 className="font-semibold text-xs uppercase tracking-wide mb-3" style={{ color: 'var(--text-tertiary)' }}>Navigazione</h3>
                <div className="space-y-2 text-sm">
                  {milestone.id > 1 && (
                    <button
                      onClick={() => navigate(`/milestone/${milestone.id - 1}`)}
                      className="block transition-colors text-left"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                      ← Milestone Precedente
                    </button>
                  )}
                  {milestone.id < 12 && (
                    <button
                      onClick={() => navigate(`/milestone/${milestone.id + 1}`)}
                      className="block transition-colors text-left"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
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

      {/* Quiz Modal */}
      {milestone.quiz && (
        <QuizModal
          quiz={milestone.quiz}
          milestoneTitle={milestone.title}
          xpReward={milestone.xp}
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
};
