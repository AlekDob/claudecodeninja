import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

interface HeaderProps {
  onLanguageChange?: (lang: 'it' | 'en') => void;
  onThemeChange?: () => void;
  currentLanguage?: 'it' | 'en';
  isDarkMode?: boolean;
}

export const Header = ({
  onLanguageChange,
  onThemeChange,
  currentLanguage = 'it',
  isDarkMode = true,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group transition-all duration-200 hover:scale-105"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center border border-white/10">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text-hero hidden sm:inline-block">
              ClaudeCodeNinja
            </span>
          </Link>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
              <button
                onClick={() => onLanguageChange?.('it')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentLanguage === 'it'
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Switch to Italian"
              >
                IT
              </button>
              <button
                onClick={() => onLanguageChange?.('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentLanguage === 'en'
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={onThemeChange}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-200 group"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-900 group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
