import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { MilestonePage } from './pages/MilestonePage';
import './assets/css/index.css';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/milestones" element={<HomePage />} />
          <Route path="/milestone/:id" element={<MilestonePage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
