export const Footer = () => {
  return (
    <footer className="border-t border-white/5 mt-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="py-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-sm text-white/40">
            Built by{' '}
            <a
              href="https://alekdob.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors font-medium"
            >
              Alek Dobrohotov
            </a>
          </p>
          <span className="hidden sm:inline text-white/20">·</span>
          <a
            href="https://github.com/alekdob"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/40 hover:text-white/60 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
