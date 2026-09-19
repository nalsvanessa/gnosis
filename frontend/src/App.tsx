import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Challenges from './pages/Challenges';
import AddChallenge from './pages/AddChallenge';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/add-challenge" element={<AddChallenge />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;