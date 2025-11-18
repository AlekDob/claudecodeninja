import { Link } from 'react-router-dom';
import { Code2, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  onLanguageChange?: (lang: 'it' | 'en') => void;
  currentLanguage?: 'it' | 'en';
}

export const Header = ({
  onLanguageChange,
  currentLanguage = 'it',
}: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ borderColor: 'var(--border-color)' }}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group transition-all duration-200 hover:scale-105"
          >
            <img
              src="/claude-code-ninja-logo.png"
              alt="Claude Code Ninja Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-xl font-bold gradient-text-hero hidden sm:inline-block">
              Claude Code Ninja
            </span>
          </Link>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div
              className="flex items-center gap-1 rounded-full p-1 border"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)',
                borderColor: 'var(--border-color)'
              }}
            >
              <button
                onClick={() => onLanguageChange?.('it')}
                className="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: currentLanguage === 'it'
                    ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.1)')
                    : 'transparent',
                  color: currentLanguage === 'it'
                    ? 'var(--text-primary)'
                    : 'var(--text-tertiary)'
                }}
                aria-label="Switch to Italian"
              >
                IT
              </button>
              <button
                onClick={() => onLanguageChange?.('en')}
                className="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: currentLanguage === 'en'
                    ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.1)')
                    : 'transparent',
                  color: currentLanguage === 'en'
                    ? 'var(--text-primary)'
                    : 'var(--text-tertiary)'
                }}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-opacity-20 transition-all duration-200 group"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)',
                borderColor: 'var(--border-color)'
              }}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: 'var(--text-primary)' }} />
              ) : (
                <Moon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: 'var(--text-primary)' }} />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
