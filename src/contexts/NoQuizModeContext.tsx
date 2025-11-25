import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

interface NoQuizModeContextType {
  noQuizMode: boolean;
  setNoQuizMode: (enabled: boolean) => void;
}

const NoQuizModeContext = createContext<NoQuizModeContextType | undefined>(undefined);

export const NoQuizModeProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();
  const [noQuizMode, setNoQuizMode] = useState(false);

  useEffect(() => {
    // Check query parameter: ?noQuiz=true or ?quiz=false
    const noQuizParam = searchParams.get('noQuiz');
    const quizParam = searchParams.get('quiz');

    if (noQuizParam === 'true' || quizParam === 'false') {
      setNoQuizMode(true);
      // Store in sessionStorage so it persists during navigation
      sessionStorage.setItem('claudecodeninja-no-quiz-mode', 'true');
    } else {
      // Check sessionStorage for previously set mode
      const storedMode = sessionStorage.getItem('claudecodeninja-no-quiz-mode');
      if (storedMode === 'true') {
        setNoQuizMode(true);
      }
    }
  }, [searchParams]);

  return (
    <NoQuizModeContext.Provider value={{ noQuizMode, setNoQuizMode }}>
      {children}
    </NoQuizModeContext.Provider>
  );
};

export const useNoQuizMode = () => {
  const context = useContext(NoQuizModeContext);
  if (context === undefined) {
    throw new Error('useNoQuizMode must be used within a NoQuizModeProvider');
  }
  return context;
};
