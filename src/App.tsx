import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { NoQuizModeProvider } from './contexts/NoQuizModeContext';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { MilestonePage } from './pages/MilestonePage';
import './assets/css/index.css';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <NoQuizModeProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/milestones" element={<HomePage />} />
            <Route path="/milestone/:id" element={<MilestonePage />} />
          </Routes>
        </NoQuizModeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
