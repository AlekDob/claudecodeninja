export const Footer = () => {
  return (
    <footer className="border-t mt-auto" style={{ borderColor: 'var(--border-color)' }}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="py-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Built by{' '}
            <a
              href="https://alekdob.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:opacity-80"
              style={{ color: 'var(--text-secondary)' }}
            >
              Alek Dobrohotov
            </a>
          </p>
          <span className="hidden sm:inline" style={{ color: 'var(--border-color)' }}>·</span>
          <a
            href="https://github.com/alekdob"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:opacity-80"
            style={{ color: 'var(--text-tertiary)' }}
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
