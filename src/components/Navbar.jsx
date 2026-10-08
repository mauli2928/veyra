import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAppData } from '../utils/helpers';
import { Compass, RefreshCw } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear your profile and start over?")) {
      clearAppData();
      navigate('/');
    }
  };

  const isLanding = location.pathname === '/';

  return (
    <nav style={{ 
      background: 'var(--card-bg)', 
      borderBottom: '1px solid var(--border-color)',
      padding: '16px 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.5px' }}>
          <Compass className="text-gradient" size={28} />
          <span>VEYRA</span>
        </Link>
        
        {!isLanding && (
          <div className="flex items-center gap-6">
            <Link to="/profile" style={{ 
              fontWeight: 500, 
              color: location.pathname === '/profile' ? 'var(--accent-primary)' : 'var(--text-secondary)' 
            }}>Profile</Link>
            <Link to="/career" style={{ 
              fontWeight: 500, 
              color: location.pathname === '/career' ? 'var(--accent-primary)' : 'var(--text-secondary)' 
            }}>Career</Link>
            <Link to="/analysis" style={{ 
              fontWeight: 500, 
              color: location.pathname === '/analysis' ? 'var(--accent-primary)' : 'var(--text-secondary)' 
            }}>Analysis</Link>
            <Link to="/roadmap" style={{ 
              fontWeight: 500, 
              color: location.pathname === '/roadmap' ? 'var(--accent-primary)' : 'var(--text-secondary)' 
            }}>Roadmap</Link>
            
            <button onClick={handleReset} style={{ 
              display: 'flex', alignItems: 'center', gap: '4px',
              fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: '16px' 
            }}>
              <RefreshCw size={16} /> Reset
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
