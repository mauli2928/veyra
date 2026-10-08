import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import CareerSelection from './pages/CareerSelection';
import Analysis from './pages/Analysis';
import Roadmap from './pages/Roadmap';
import './App.css'; // Optional additional app CSS if needed, but we use index.css

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/career" element={<CareerSelection />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/roadmap" element={<Roadmap />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
