import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MilestonePage } from './pages/MilestonePage';
import './assets/css/index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/milestone/:id" element={<MilestonePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
