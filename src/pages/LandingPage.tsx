import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Trophy, Sparkles } from 'lucide-react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { ConsultingSection } from '../components/ConsultingSection/ConsultingSection';
import { AboutAuthor } from '../components/AboutAuthor/AboutAuthor';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

export const LandingPage = () => {
  // Scroll-triggered animations with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll('.scroll-animate, .scroll-animate-scale');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  const milestones = [
    {
      number: '01',
      title: 'Primi Passi',
      description: 'Installazione, setup ambiente, primi comandi essenziali',
      xp: 100
    },
    {
      number: '02',
      title: 'Core CLI',
      description: 'Master i comandi essenziali: claude, -p, -c, -r',
      xp: 150
    },
    {
      number: '03',
      title: 'Permissions',
      description: 'Ask/Allow/Reject e gestione tool approval workflow',
      xp: 150
    },
    {
      number: '04',
      title: 'Settings & CLAUDE.md',
      description: 'Gerarchia settings, struttura CLAUDE.md, organizzazione',
      xp: 150
    },
    {
      number: '05',
      title: 'Architettura',
      description: 'Come funziona Claude Code sotto il cofano',
      xp: 200
    },
    {
      number: '06',
      title: 'Prompt Engineering',
      description: 'Anatomia prompt efficaci, precisione, contesto',
      xp: 200
    },
    {
      number: '07',
      title: 'Advanced Prompting',
      description: 'Plan Mode, Thinking Mode, meta-prompting avanzato',
      xp: 350
    },
    {
      number: '08',
      title: 'Project Setup',
      description: 'CLAUDE.md di progetto, ADR, feature specs, architettura',
      xp: 400
    },
    {
      number: '09',
      title: 'Subagents & Skills',
      description: 'Protocol Droids, B-MAD Method, orchestrazione multi-agent',
      xp: 500
    },
    {
      number: '10',
      title: 'Hooks & MCP',
      description: 'Lifecycle hooks, Model Context Protocol, estensioni custom',
      xp: 600
    },
    {
      number: '11',
      title: 'Testing Workflow',
      description: 'TDD, test automation, coverage analysis, debugging avanzato',
      xp: 400
    },
    {
      number: '12',
      title: 'GitLab/GitHub CI/CD',
      description: 'Pipeline automation, code review AI, deployment strategies',
      xp: 450
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
          content="🚀 Impara Claude Code GRATIS con il primo corso gamificato in italiano. 12 milestone progressive, quiz interattivi, sistema XP. Da principiante a esperto. Inizia subito! ⚡"
        />
        <meta
          name="keywords"
          content="Claude Code, corso Claude Code, AI development, Claude AI, corso programmazione AI, tutorial Claude Code italiano, imparare Claude Code, sviluppo AI, coding con AI"
        />
        <meta property="og:title" content="Claude Code Ninja - Corso Completo Claude Code" />
        <meta property="og:description" content="Il primo corso gamificato in italiano per padroneggiare Claude Code" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://claudecodeninja.vercel.app/claude-code-ninja-logo.png" />
        <link rel="canonical" href="https://claudecodeninja.vercel.app" />

        {/* Schema.org Course Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Claude Code Ninja - Corso Completo Claude Code in Italiano",
            "description": "Corso gamificato per imparare Claude Code da zero. 12 milestone progressive con quiz interattivi e sistema XP per passare da principiante a esperto.",
            "provider": {
              "@type": "Person",
              "name": "Aleksandar Dobrohotov",
              "url": "https://alekdob.com"
            },
            "educationalLevel": "Beginner to Advanced",
            "coursePrerequisites": "Nessuno - accessibile a tutti",
            "inLanguage": "it-IT",
            "isAccessibleForFree": true,
            "learningResourceType": "Interactive Course",
            "teaches": [
              "Claude Code basics",
              "File operations",
              "Advanced prompting",
              "Project architecture",
              "Debugging & optimization",
              "Collaboration workflows",
              "Testing & CI/CD"
            ],
            "numberOfCredits": 12,
            "timeRequired": "P15H",
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online",
              "courseWorkload": "PT15H"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "1"
            }
          })}
        </script>

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Claude Code Ninja",
            "url": "https://claudecodeninja.vercel.app",
            "logo": "https://claudecodeninja.vercel.app/claude-code-ninja-logo.png",
            "sameAs": [
              "https://medium.com/@aleksandardobrohotov",
              "https://alekdob.com"
            ],
            "founder": {
              "@type": "Person",
              "name": "Aleksandar Dobrohotov"
            }
          })}
        </script>

        {/* FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Cos'è Claude Code e perché dovrei impararlo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Claude Code è l'editor AI di Anthropic che permette sviluppo assistito dall'intelligenza artificiale. Con Claude Code puoi scrivere codice 10x più velocemente, automatizzare task ripetitivi, e creare progetti complessi in una frazione del tempo. È il futuro dello sviluppo software e padroneggiarlo oggi significa avere un vantaggio competitivo enorme nel mercato del lavoro."
                }
              },
              {
                "@type": "Question",
                "name": "Il corso è davvero gratuito?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sì! Le prime 4 milestone sono completamente gratuite e ti danno una base solida per iniziare. Puoi sbloccare tutte le 12 milestone con l'upgrade Premium (€49/mese) che include certificazione ufficiale, quiz avanzati, e sfide pratiche con progetti reali."
                }
              },
              {
                "@type": "Question",
                "name": "Quanto tempo ci vuole per completare il corso?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Il corso completo richiede circa 15 ore distribuite su 12 milestone. Puoi procedere al tuo ritmo - alcuni studenti completano tutto in 2 settimane dedicando 3 ore al giorno, altri preferiscono 1 ora al giorno per 6-8 settimane. Il sistema XP e i badge ti tengono motivato lungo tutto il percorso."
                }
              },
              {
                "@type": "Question",
                "name": "Ho bisogno di esperienza di programmazione?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No! Il corso parte da zero e ti guida passo dopo passo. Se sai usare un computer e hai voglia di imparare, sei già pronto. Le prime milestone coprono i fondamentali, poi progressivamente introduciamo concetti avanzati. Anche se hai già esperienza, il corso ti insegnerà tecniche AI-assisted che rivoluzionano il tuo workflow."
                }
              },
              {
                "@type": "Question",
                "name": "Cosa rende questo corso diverso da tutorial YouTube gratuiti?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Tre differenze fondamentali: 1) Percorso strutturato e progressivo - niente video sparsi senza ordine, 2) Sistema gamificato con XP e badge che ti mantiene motivato e traccia i progressi, 3) Contenuto pratico e production-ready - esempi reali, casi studio aziendali, workflow testati in 8 paesi EU. È l'unico corso Claude Code completo in italiano."
                }
              }
            ]
          })}
        </script>
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

            {/* Gradient Orbs - Reduced animation for performance */}
            <motion.div
              className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
              style={{ background: '#FF6B35', willChange: 'transform' }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.2, 0.15]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop'
              }}
            />
            <motion.div
              className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-15"
              style={{ background: '#00D9FF', willChange: 'transform' }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop'
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
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-6 leading-[1.1]"
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
                    { value: '15', label: 'Ore Contenuti' },
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
              <div className="text-center mb-16 scroll-animate">
                <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Perché Claude Code Ninja?
                </h2>
                <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                  L'unico percorso strutturato in italiano per padroneggiare Claude Code
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border group hover:scale-105 transition-all duration-300 scroll-animate-scale ${
                      index === 0 ? 'animate-delay-100' :
                      index === 1 ? 'animate-delay-200' :
                      index === 2 ? 'animate-delay-300' :
                      'animate-delay-400'
                    }`}
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
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Milestones Preview Section */}
          <section id="milestones" className="py-24" style={{ background: 'var(--bg-primary)' }}>
            <div className="container mx-auto px-6">
              <div className="text-center mb-16 scroll-animate">
                <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Il Tuo Percorso di Apprendimento
                </h2>
                <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                  12 milestone complete e disponibili. Progressione da Bronze a Platinum.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border p-6 hover:scale-105 transition-all duration-300 scroll-animate"
                    style={{
                      background: 'var(--bg-secondary)',
                      borderColor: 'var(--border-normal)',
                      transitionDelay: `${index * 0.05}s`
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
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center scroll-animate-scale animate-delay-100">
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
              </div>
            </div>
          </section>

          {/* Consulting Section */}
          <ConsultingSection />

          {/* About Author Section */}
          <AboutAuthor />

          {/* FAQ Section */}
          <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <div className="scroll-animate">
                  <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: 'var(--text-primary)' }}>
                    Domande Frequenti
                  </h2>
                  <p className="text-xl text-center mb-12" style={{ color: 'var(--text-secondary)' }}>
                    Tutto quello che devi sapere su Claude Code Ninja
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      question: "Cos'è Claude Code e perché dovrei impararlo?",
                      answer: "Claude Code è l'editor AI di Anthropic che permette sviluppo assistito dall'intelligenza artificiale. Con Claude Code puoi scrivere codice 10x più velocemente, automatizzare task ripetitivi, e creare progetti complessi in una frazione del tempo. È il futuro dello sviluppo software e padroneggiarlo oggi significa avere un vantaggio competitivo enorme nel mercato del lavoro."
                    },
                    {
                      question: "Il corso è davvero gratuito?",
                      answer: "Sì! Le prime 4 milestone sono completamente gratuite e ti danno una base solida per iniziare. Puoi sbloccare tutte le 12 milestone con l'upgrade Premium (€49/mese) che include certificazione ufficiale, quiz avanzati, e sfide pratiche con progetti reali."
                    },
                    {
                      question: "Quanto tempo ci vuole per completare il corso?",
                      answer: "Il corso completo richiede circa 15 ore distribuite su 12 milestone. Puoi procedere al tuo ritmo - alcuni studenti completano tutto in 2 settimane dedicando 3 ore al giorno, altri preferiscono 1 ora al giorno per 6-8 settimane. Il sistema XP e i badge ti tengono motivato lungo tutto il percorso."
                    },
                    {
                      question: "Ho bisogno di esperienza di programmazione?",
                      answer: "No! Il corso parte da zero e ti guida passo dopo passo. Se sai usare un computer e hai voglia di imparare, sei già pronto. Le prime milestone coprono i fondamentali, poi progressivamente introduciamo concetti avanzati. Anche se hai già esperienza, il corso ti insegnerà tecniche AI-assisted che rivoluzionano il tuo workflow."
                    },
                    {
                      question: "Cosa rende questo corso diverso da tutorial YouTube gratuiti?",
                      answer: "Tre differenze fondamentali: 1) Percorso strutturato e progressivo - niente video sparsi senza ordine, 2) Sistema gamificato con XP e badge che ti mantiene motivato e traccia i progressi, 3) Contenuto pratico e production-ready - esempi reali, casi studio aziendali, workflow testati in 8 paesi EU. È l'unico corso Claude Code completo in italiano."
                    }
                  ].map((faq, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl border scroll-animate"
                      style={{
                        background: 'var(--bg-secondary)',
                        borderColor: 'var(--border-normal)',
                        transitionDelay: `${index * 0.1}s`
                      }}
                    >
                      <h3 className="text-xl font-bold mb-3 flex items-start gap-3" style={{ color: 'var(--text-primary)' }}>
                        <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{
                            background: 'rgba(255, 107, 53, 0.1)',
                            color: '#FF6B35'
                          }}
                        >
                          {index + 1}
                        </span>
                        {faq.question}
                      </h3>
                      <p className="pl-11" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-24" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center scroll-animate-scale">
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
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};
