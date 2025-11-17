export const Footer = () => {
  return (
    <footer className="border-t border-white/5 mt-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="py-6 flex items-center justify-center">
          <p className="text-sm text-white/40">
            Built by{' '}
            <a
              href="https://github.com/alekdob"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors font-medium"
            >
              Alek Dob
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
