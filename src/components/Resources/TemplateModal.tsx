import { useState, useEffect } from 'react';
import { X, Copy, Download, Check } from 'lucide-react';
import type { TemplateResource } from '../../types';

interface TemplateModalProps {
  template: TemplateResource;
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateModal = ({ template, isOpen, onClose }: TemplateModalProps) => {
  const [copied, setCopied] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([template.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = template.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl border flex flex-col"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--border-normal)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: 'var(--border-normal)' }}
        >
          <div>
            <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {template.title}
            </h3>
            {template.description && (
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                {template.description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-opacity-10 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <pre
            className="p-4 rounded-lg overflow-x-auto text-sm leading-relaxed"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontFamily: 'monospace'
            }}
          >
            <code>{template.content}</code>
          </pre>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between p-6 border-t gap-4"
          style={{ borderColor: 'var(--border-normal)' }}
        >
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {template.filename}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all"
              style={{
                backgroundColor: copied ? '#10B981' : 'var(--bg-secondary)',
                color: copied ? '#ffffff' : 'var(--text-primary)',
                border: '1px solid var(--border-normal)'
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copiato!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copia
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
              style={{
                backgroundColor: '#FF6B35',
                color: '#ffffff'
              }}
            >
              <Download className="w-4 h-4" />
              Scarica
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
