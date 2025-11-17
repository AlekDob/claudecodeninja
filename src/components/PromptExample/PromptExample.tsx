import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface PromptExampleProps {
  type: 'good' | 'bad';
  children: string;
  title?: string;
}

export const PromptExample = ({ type, children, title }: PromptExampleProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isGood = type === 'good';

  return (
    <div
      className={`relative rounded-lg border-2 overflow-hidden my-6 ${
        isGood
          ? 'border-emerald-500/30 bg-emerald-500/5'
          : 'border-red-500/30 bg-red-500/5'
      }`}
    >
      {/* Header with icon and title */}
      <div
        className={`flex items-center justify-between px-4 py-2 border-b ${
          isGood
            ? 'bg-emerald-500/10 border-emerald-500/20'
            : 'bg-red-500/10 border-red-500/20'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">
            {isGood ? '✅' : '❌'}
          </span>
          <span
            className={`font-semibold text-sm ${
              isGood ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {title || (isGood ? 'Prompt Efficace' : 'Prompt Vago')}
          </span>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`p-1.5 rounded transition-colors ${
            isGood
              ? 'hover:bg-emerald-500/20 text-emerald-400'
              : 'hover:bg-red-500/20 text-red-400'
          }`}
          title="Copia prompt"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <pre className="font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
          <code style={{ color: 'var(--text-secondary)' }}>
            {children}
          </code>
        </pre>
      </div>

      {/* Visual indicator stripe */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          isGood ? 'bg-emerald-500' : 'bg-red-500'
        }`}
      />
    </div>
  );
};
