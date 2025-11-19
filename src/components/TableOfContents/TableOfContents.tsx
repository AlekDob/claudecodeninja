import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import GithubSlugger from 'github-slugger';
import { slugifyHeading } from '../../utils/slugify';

interface Heading {
  id: string;
  text: string;
  level: number; // 2 for H2, 3 for H3
}

interface TableOfContentsProps {
  content: string;
}

/**
 * TableOfContents Component
 *
 * Dynamically extracts h2 and h3 headings from markdown content and provides
 * smooth scroll navigation with offset for fixed header.
 *
 * H2 = Main chapters (e.g., "Capitolo 1: CLAUDE.md di Progetto")
 * H3 = Subsections (e.g., "1.1 Overview", "1.2 Tech Stack")
 *
 * Uses centralized slugifyHeading utility to match rehype-slug ID generation exactly.
 *
 * @param {string} content - Raw markdown content to parse
 *
 * @example
 * <TableOfContents content={milestone.description} />
 */
export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract h2 and h3 headings from markdown content
  useEffect(() => {
    const extractHeadings = (markdown: string): Heading[] => {
      const headingRegex = /^(#{2,3}) (.+)$/gm;
      const extractedHeadings: Heading[] = [];
      const slugger = new GithubSlugger();
      let match;

      while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[1].length; // Count # symbols (2 or 3)
        const text = match[2];
        // Use centralized slugify utility for consistent ID generation
        const id = slugifyHeading(text, slugger);
        extractedHeadings.push({ id, text, level }); // Keep original text and level
      }

      return extractedHeadings;
    };

    setHeadings(extractHeadings(content));
  }, [content]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 64; // Header h-16
      const buffer = 50; // Buffer for active detection
      const threshold = headerHeight + buffer; // 114px from top

      const headingElements = headings.map(h => ({
        id: h.id,
        element: document.getElementById(h.id)
      })).filter(item => item.element !== null);

      // Find the heading closest to the active zone
      let closestId = '';
      let closestDistance = Infinity;

      headingElements.forEach(({ id, element }) => {
        if (element) {
          const rect = element.getBoundingClientRect();

          // Distance from the threshold line (positive = below, negative = above)
          const distance = rect.top - threshold;

          // We want the heading that's just above or at the threshold
          // Priority: heading closest to threshold from above or at threshold
          if (distance <= 0) { // Heading is at or above threshold
            const absDistance = Math.abs(distance);
            if (absDistance < closestDistance) {
              closestDistance = absDistance;
              closestId = id;
            }
          }
        }
      });

      // Set active ID if found, otherwise keep first heading if at top
      if (closestId) {
        setActiveId(closestId);
      } else if (window.scrollY < 100) {
        setActiveId(headings[0]?.id || '');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // Smooth scroll to section with header offset
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 64; // Header h-16 = 64px
      const buffer = 36; // Extra buffer
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - headerHeight - buffer;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) {
    return null; // Don't render if no headings found
  }

  return (
    <div>
      <h3
        className="font-semibold text-xs uppercase tracking-wide mb-3"
        style={{ color: 'var(--text-tertiary)' }}
      >
        Indice dei Contenuti
      </h3>
      <nav aria-label="Table of Contents">
        <ul className="space-y-1 text-sm">
          {headings.map((heading, index) => (
            <motion.li
              key={heading.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={heading.level === 3 ? 'pl-3' : ''} // Indent H3 subsections
            >
              <button
                onClick={() => scrollToSection(heading.id)}
                className="text-left w-full py-1 transition-colors leading-snug hover:translate-x-1 transition-transform duration-200"
                style={{
                  color: activeId === heading.id ? '#FF6B35' : 'var(--text-secondary)',
                  fontWeight: activeId === heading.id ? 600 : 400,
                  fontSize: heading.level === 2 ? '0.875rem' : '0.8125rem', // H2 slightly larger
                }}
                onMouseEnter={(e) => {
                  if (activeId !== heading.id) {
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeId !== heading.id) {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
                aria-label={`Navigate to ${heading.text}`}
              >
                {heading.text}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
