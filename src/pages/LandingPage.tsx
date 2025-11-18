import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Trophy, Sparkles } from 'lucide-react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { ConsultingSection } from '../components/ConsultingSection/ConsultingSection';
import { AboutAuthor } from '../components/AboutAuthor/AboutAuthor';
import { Helmet } from 'react-helmet-async';

export const LandingPage = () => {
  const milestones = [
    {
      number: '01',
      title: 'Primi Passi',
      description: 'Installazione, setup ambiente, primi comandi essenziali',
      xp: 100
    },
    {
      number: '02',
      title: 'File Operations',
      description: 'Read, Write, Edit - padroneggia la gestione file',
      xp: 150
    },
    {
      number: '03',
      title: 'Advanced Prompting',
      description: 'Prompt engineering, context-aware, pattern recognition',
      xp: 200
    },
    {
      number: '04',
      title: 'Project Architecture',
      description: 'Strutturare progetti complessi, best practices',
      xp: 250
    },
    {
      number: '05',
      title: 'Debugging & Optimization',
      description: 'Problem solving sistematico, performance tuning',
      xp: 300
    },
    {
      number: '06',
      title: 'Collaboration Workflows',
      description: 'Git integration, team workflows, code review',
      xp: 350
    },
    {
      number: '07',
      title: 'Advanced Techniques',
      description: 'Plan Mode, Thinking Mode, meta-prompting',
      xp: 400
    },
    {
      number: '08',
      title: 'Testing & CI/CD',
      description: 'TDD, automazione, deployment strategies',
      xp: 600
    }
  ];

  const features = [
    {
      icon: Zap,
      title: '12 Milestone Progressive',
      description: 'Percorso strutturato da principiante a esperto Claude Code'
    },
    {
      icon: Target,
      title: 'Quiz & Challenge',
      description: 'Valida le tue competenze con quiz interattivi e sfide pratiche'
    },
    {
      icon: Trophy,
      title: 'Sistema XP & Badge',
      description: 'Sblocca badge Bronze, Silver, Gold e Platinum progredendo'
    },
    {
      icon: Sparkles,
      title: '100% Pratico',
      description: 'Esempi reali, casi studio, workflow production-ready'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Claude Code Ninja - Corso Completo Claude Code in Italiano</title>
        <meta
          name="description"
          content="Impara Claude Code da zero con il primo corso gamificato in italiano. 12 milestone progressive, quiz interattivi, sistema XP. Da principiante a esperto."
        />
        <meta
          name="keywords"
          content="Claude Code, corso Claude Code, AI development, Claude AI, corso programmazione AI, tutorial Claude Code italiano, imparare Claude Code, sviluppo AI, coding con AI"
        />
        <meta property="og:title" content="Claude Code Ninja - Corso Completo Claude Code" />
        <meta property="og:description" content="Il primo corso gamificato in italiano per padroneggiare Claude Code" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://claudecodeninja.vercel.app" />
      </Helmet>

      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
        <Header />

        {/* Hero Section */}
        <main className="flex-1">
          <section className="relative overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `linear-gradient(var(--border-normal) 1px, transparent 1px),
                               linear-gradient(90deg, var(--border-normal) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />

            {/* Gradient Orbs */}
            <motion.div
              className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
              style={{ background: '#FF6B35' }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.div
              className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-15"
              style={{ background: '#00D9FF' }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.25, 0.15]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1
              }}
            />

            <div className="container mx-auto px-6 py-24 relative">
              <div className="max-w-6xl mx-auto">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center mb-8"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                    style={{
                      background: 'var(--bg-secondary)',
                      borderColor: 'var(--border-normal)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <Sparkles className="w-4 h-4" style={{ color: '#FF6B35' }} />
                    <span className="text-sm font-medium">Primo corso Claude Code in italiano</span>
                  </div>
                </motion.div>

                {/* Hero Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-6 leading-[1.1]"
                  style={{
                    color: 'var(--text-primary)',
                    fontFamily: '"Space Grotesk", system-ui, sans-serif'
                  }}
                >
                  Padroneggia<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Claude Code
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl text-center max-w-3xl mx-auto mb-12"
                  style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}
                >
                  Il corso gamificato che ti porta da <strong>principiante a esperto</strong> in sviluppo AI-assisted.
                  12 milestone progressive, quiz interattivi, sistema XP.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                  <Link
                    to="/milestones"
                    className="group px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                      color: 'white'
                    }}
                  >
                    Inizia Gratuitamente
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="#milestones"
                    className="px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 hover:scale-105"
                    style={{
                      borderColor: 'var(--border-normal)',
                      color: 'var(--text-primary)',
                      background: 'var(--bg-secondary)'
                    }}
                  >
                    Scopri i Contenuti
                  </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center"
                >
                  {[
                    { value: '12', label: 'Milestone' },
                    { value: '40+', label: 'Ore Contenuti' },
                    { value: '100%', label: 'Pratico' }
                  ].map((stat, index) => (
                    <div key={index}>
                      <div className="text-4xl font-bold mb-2" style={{ color: '#FF6B35' }}>
                        {stat.value}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Perché Claude Code Ninja?
                </h2>
                <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                  L'unico percorso strutturato in italiano per padroneggiare Claude Code
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-2xl border group hover:scale-105 transition-all duration-300"
                    style={{
                      background: 'var(--bg-primary)',
                      borderColor: 'var(--border-normal)'
                    }}
                  >
                    <feature.icon
                      className="w-12 h-12 mb-4 transition-colors"
                      style={{ color: '#FF6B35' }}
                    />
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {feature.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Milestones Preview Section */}
          <section id="milestones" className="py-24" style={{ background: 'var(--bg-primary)' }}>
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Il Tuo Percorso di Apprendimento
                </h2>
                <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                  8 milestone disponibili, 4 in arrivo. Progressione da Bronze a Platinum.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="group relative overflow-hidden rounded-2xl border p-6 hover:scale-105 transition-all duration-300"
                    style={{
                      background: 'var(--bg-secondary)',
                      borderColor: 'var(--border-normal)'
                    }}
                  >
                    {/* Number */}
                    <div className="text-6xl font-bold mb-4 opacity-10 group-hover:opacity-20 transition-opacity"
                      style={{ color: '#FF6B35' }}
                    >
                      {milestone.number}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {milestone.title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {milestone.description}
                    </p>

                    {/* XP Badge */}
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: 'rgba(255, 107, 53, 0.1)',
                        color: '#FF6B35'
                      }}
                    >
                      <Zap className="w-3 h-3" />
                      {milestone.xp} XP
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <Link
                  to="/milestones"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    color: 'white'
                  }}
                >
                  Inizia il Percorso
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Consulting Section */}
          <ConsultingSection />

          {/* About Author Section */}
          <AboutAuthor />

          {/* Final CTA Section */}
          <section className="py-24" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                  Pronto a Diventare un Claude Code Ninja?
                </h2>
                <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
                  Inizia oggi gratuitamente. Nessuna carta di credito richiesta.
                </p>
                <Link
                  to="/milestones"
                  className="inline-flex items-center gap-2 px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    color: 'white'
                  }}
                >
                  Inizia Ora - È Gratis
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <p className="mt-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  🎓 Certificazione inclusa al completamento · 💯 Soddisfatto o rimborsato
                </p>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};
