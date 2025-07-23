import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Watermelon from './pages/Watermelon';
import Steyberry from './pages/Steyberry';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watermelon" element={<Watermelon />} />
      <Route path="/steyberry" element={<Steyberry />} />
    </Routes>
  );
}

export default App;
