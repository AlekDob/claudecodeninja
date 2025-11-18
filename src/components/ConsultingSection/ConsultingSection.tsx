import { motion } from 'framer-motion';
import { useState, FormEvent, ChangeEvent } from 'react';
import { Mail, CheckCircle2, AlertCircle, Sparkles, Target, Zap } from 'lucide-react';

interface FormData {
  nome: string;
  email: string;
  tipo: '' | 'Azienda' | 'Professionista' | 'Privato';
  messaggio: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  tipo?: string;
  messaggio?: string;
}

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateField = (
  name: keyof FormData,
  value: string
): string | undefined => {
  switch (name) {
    case 'nome':
      return value.trim().length < 2
        ? 'Il nome deve contenere almeno 2 caratteri'
        : undefined;
    case 'email':
      return !validateEmail(value)
        ? 'Inserisci un indirizzo email valido'
        : undefined;
    case 'tipo':
      return value === ''
        ? 'Seleziona il tipo di cliente'
        : undefined;
    case 'messaggio':
      return value.trim().length < 10
        ? 'Il messaggio deve contenere almeno 10 caratteri'
        : undefined;
    default:
      return undefined;
  }
};

export const ConsultingSection = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    tipo: '',
    messaggio: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormData, value);

    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setSubmitted(true);
      setFormData({ nome: '', email: '', tipo: '', messaggio: '' });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Email send error:', error);
      // Show error message to user
      setErrors({
        messaggio: 'Errore nell\'invio del messaggio. Riprova o usa l\'email diretta.'
      });
    }
  };

  const isFormValid =
    formData.nome.trim().length >= 2 &&
    validateEmail(formData.email) &&
    formData.tipo !== '' &&
    formData.messaggio.trim().length >= 10;

  const benefits = [
    {
      icon: Sparkles,
      title: 'Quick Wins Immediati',
      description: 'Ottimizza i tuoi processi con AI in 48 ore'
    },
    {
      icon: Target,
      title: 'Strategia Personalizzata',
      description: 'Roadmap su misura per il tuo business'
    },
    {
      icon: Zap,
      title: 'Training Hands-On',
      description: 'Il tuo team operativo con Claude Code'
    }
  ];

  return (
    <section id="consulting" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(var(--border-normal) 1px, transparent 1px),
                         linear-gradient(90deg, var(--border-normal) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Gradient Accent */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: '#FF6B35' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                style={{
                  background: 'var(--bg-secondary)',
                  borderColor: 'var(--border-normal)',
                  color: 'var(--text-secondary)'
                }}
              >
                <Mail className="w-4 h-4" style={{ color: '#FF6B35' }} />
                <span className="text-sm font-medium">Consulenza 1:1</span>
              </div>

              {/* Headline */}
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: '"Space Grotesk", system-ui, sans-serif'
                }}
              >
                Trasforma il Tuo Team con{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  AI-First Development
                </span>
              </h2>

              {/* Description */}
              <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Consulenza strategica per aziende, professionisti e team che vogliono padroneggiare
                Claude Code e accelerare lo sviluppo con l'AI. Da oltre 3 anni lavoro con Apple
                Premium Partner in 8 paesi EU.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(255, 107, 53, 0.1)',
                        border: '1px solid rgba(255, 107, 53, 0.2)'
                      }}
                    >
                      <benefit.icon className="w-5 h-5" style={{ color: '#FF6B35' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {benefit.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Proof */}
              <div className="p-4 rounded-lg border" style={{
                background: 'var(--bg-secondary)',
                borderColor: 'var(--border-normal)'
              }}>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>€80/ora</strong> ·
                  Sessioni da 2h · Training personalizzato ·
                  Supporto post-consulenza incluso
                </p>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-2xl p-8 border backdrop-blur-sm sticky top-24"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'var(--border-normal)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: '#10b981' }} />
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      Richiesta Inviata!
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      Ti risponderò entro 24 ore
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      Prenota una Consulenza
                    </h3>
                    <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                      Compila il form e ti contatterò entro 24 ore
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Nome */}
                      <div>
                        <label htmlFor="nome" className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Nome *
                        </label>
                        <input
                          type="text"
                          id="nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200"
                          style={{
                            background: 'var(--bg-primary)',
                            borderColor: errors.nome ? '#ef4444' : 'var(--border-normal)',
                            color: 'var(--text-primary)'
                          }}
                          placeholder="Mario Rossi"
                        />
                        {errors.nome && (
                          <div className="flex items-center gap-1 mt-2 text-sm" style={{ color: '#ef4444' }}>
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.nome}</span>
                          </div>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200"
                          style={{
                            background: 'var(--bg-primary)',
                            borderColor: errors.email ? '#ef4444' : 'var(--border-normal)',
                            color: 'var(--text-primary)'
                          }}
                          placeholder="mario@esempio.it"
                        />
                        {errors.email && (
                          <div className="flex items-center gap-1 mt-2 text-sm" style={{ color: '#ef4444' }}>
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.email}</span>
                          </div>
                        )}
                      </div>

                      {/* Tipo Cliente */}
                      <div>
                        <label htmlFor="tipo" className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Tipo Cliente *
                        </label>
                        <select
                          id="tipo"
                          name="tipo"
                          value={formData.tipo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200"
                          style={{
                            background: 'var(--bg-primary)',
                            borderColor: errors.tipo ? '#ef4444' : 'var(--border-normal)',
                            color: 'var(--text-primary)'
                          }}
                        >
                          <option value="">Seleziona...</option>
                          <option value="Azienda">Azienda</option>
                          <option value="Professionista">Professionista</option>
                          <option value="Privato">Privato</option>
                        </select>
                        {errors.tipo && (
                          <div className="flex items-center gap-1 mt-2 text-sm" style={{ color: '#ef4444' }}>
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.tipo}</span>
                          </div>
                        )}
                      </div>

                      {/* Messaggio */}
                      <div>
                        <label htmlFor="messaggio" className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Messaggio *
                        </label>
                        <textarea
                          id="messaggio"
                          name="messaggio"
                          value={formData.messaggio}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200 resize-none"
                          style={{
                            background: 'var(--bg-primary)',
                            borderColor: errors.messaggio ? '#ef4444' : 'var(--border-normal)',
                            color: 'var(--text-primary)'
                          }}
                          placeholder="Raccontami del tuo progetto o delle tue esigenze..."
                        />
                        {errors.messaggio && (
                          <div className="flex items-center gap-1 mt-2 text-sm" style={{ color: '#ef4444' }}>
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.messaggio}</span>
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={!isFormValid}
                        whileHover={isFormValid ? { scale: 1.02 } : {}}
                        whileTap={isFormValid ? { scale: 0.98 } : {}}
                        className="w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 disabled:cursor-not-allowed"
                        style={{
                          background: isFormValid
                            ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'
                            : 'rgba(100, 116, 139, 0.3)',
                          color: isFormValid ? 'white' : 'rgba(255, 255, 255, 0.4)',
                          boxShadow: isFormValid ? '0 4px 12px rgba(255, 107, 53, 0.3)' : 'none'
                        }}
                      >
                        Invia Richiesta
                      </motion.button>

                      {/* Mailto Fallback */}
                      <div className="text-center">
                        <a
                          href="mailto:gmail@alekdob.com"
                          className="text-sm hover:underline"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Oppure scrivi a gmail@alekdob.com
                        </a>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
