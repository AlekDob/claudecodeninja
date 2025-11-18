import { motion } from 'framer-motion';
import { MapPin, Briefcase, Code2, Sparkles, PenTool } from 'lucide-react';

export const AboutAuthor = () => {
  const stats = [
    {
      icon: Briefcase,
      value: '8 Paesi EU',
      label: 'Enterprise deployment'
    },
    {
      icon: Code2,
      value: '80%+ AI',
      label: 'Codice generato'
    },
    {
      icon: Sparkles,
      value: '10+ Anni',
      label: 'Product Management'
    }
  ];

  return (
    <section className="py-8 relative overflow-hidden" id="about">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(var(--border-normal) 1px, transparent 1px),
                         linear-gradient(90deg, var(--border-normal) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Compact Card Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-5 md:p-6 rounded-xl border"
            style={{
              background: 'var(--bg-primary)',
              borderColor: 'var(--border-normal)'
            }}
          >
            <div className="flex flex-col md:flex-row gap-5 items-start">
              {/* Left: Profile Image with Animated Gradient Border */}
              <div className="flex-shrink-0 relative">
                {/* Animated Gradient Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(45deg, #FF6B35, #F7931E, #00D9FF, #FF6B35)',
                    backgroundSize: '300% 300%',
                    padding: '3px'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  <div className="w-full h-full rounded-full" style={{ background: 'var(--bg-primary)' }} />
                </motion.div>

                {/* Profile Image */}
                <img
                  src="/alek-profile.png"
                  alt="Alek Dobrohotov"
                  className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover"
                  style={{
                    padding: '3px'
                  }}
                />
              </div>

              {/* Right: Content */}
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1"
                    style={{
                      color: 'var(--text-primary)',
                      fontFamily: '"Space Grotesk", system-ui, sans-serif'
                    }}
                  >
                    Alek Dobrohotov
                  </h3>
                  <p className="text-sm md:text-base mb-1.5" style={{ color: '#FF6B35', fontWeight: 600 }}>
                    Product Manager & AI-First Developer
                  </p>
                  <div className="flex items-center gap-1.5 text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Apulia, Italy</span>
                  </div>
                </div>

                {/* Bio Text */}
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Product Manager con 10+ anni di esperienza in sistemi enterprise. Oggi costruisco{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>Claude Code Ninja</strong>, il primo corso completo
                  in italiano per padroneggiare l'AI-First Development. Pubblico su{' '}
                  <a
                    href="https://medium.com/@aleksandardobrohotov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline transition-colors"
                    style={{ color: '#FF6B35' }}
                  >
                    Medium
                  </a>{' '}
                  e credo nel potere della documentazione come codice.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm pt-1">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <stat.icon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: '#FF6B35' }} />
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                        {stat.value}
                      </span>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <a
                    href="https://alekdob.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs transition-all duration-300 hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                      color: 'white'
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Portfolio
                  </a>
                  <a
                    href="https://medium.com/@aleksandardobrohotov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs border transition-all duration-300 hover:opacity-80"
                    style={{
                      borderColor: 'var(--border-normal)',
                      color: 'var(--text-primary)',
                      background: 'transparent'
                    }}
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    Medium
                  </a>
                  <a
                    href="#consulting"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs border transition-all duration-300 hover:opacity-80"
                    style={{
                      borderColor: 'var(--border-normal)',
                      color: 'var(--text-primary)',
                      background: 'transparent'
                    }}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    Consulenza
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
