import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createDemoProfile } from '../utils/helpers';
import { ArrowRight, LayoutDashboard, Target, Zap, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  const navigate = useNavigate();

  const handleDemo = () => {
    createDemoProfile();
    navigate('/career');
  };

  const springConfig = { type: 'spring', bounce: 0, duration: 0.4 };

  return (
    <motion.div 
      className="page-wrapper"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={springConfig}
    >
      <div className="page-content" style={{ padding: '0 22px' }}>
        
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center" style={{ padding: '80px 0 60px' }}>
          <motion.h2 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, ...springConfig }}
            style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '12px' }}
          >
            Smart Student Career Profile
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, ...springConfig }}
            style={{ fontSize: '56px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '24px', maxWidth: '700px' }}
          >
            Know your gaps.<br />
            Build your future.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, ...springConfig }}
            style={{ fontSize: '21px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.4, letterSpacing: '-0.022em' }}
          >
            Stop guessing what employers want. Compare your skills against real-world roles and get a clear roadmap to job readiness.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, ...springConfig }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button 
              className="btn btn-primary" 
              onClick={() => navigate('/profile')}
              whileTap={{ scale: 0.96 }}
              transition={springConfig}
            >
              Build My Profile
            </motion.button>
            <motion.button 
              className="btn btn-secondary" 
              onClick={handleDemo}
              whileTap={{ scale: 0.96 }}
              transition={springConfig}
            >
              Try Demo <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>

        {/* Feature/Problem Section */}
        <motion.div 
          className="container" 
          style={{ paddingBottom: '80px', marginTop: '40px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...springConfig }}
        >
          <div className="card" style={{ background: '#f5f5f7', border: 'none', padding: '48px' }}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 style={{ fontSize: '32px', marginBottom: '16px', letterSpacing: '-0.02em', color: 'var(--accent-primary)' }}>The Problem</h3>
                <p style={{ fontSize: '21px', fontWeight: 500, marginBottom: '16px', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
                  Students don't have a lack of information. They have a lack of direction.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.47059 }}>
                  You accumulate skills, projects, and certificates, but you don't know if you're truly ready for your target career. VEYRA bridges this gap with deterministic analysis.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <LayoutDashboard size={20} />, title: "Profile", desc: "Build digital record" },
                  { icon: <Target size={20} />, title: "Career", desc: "Select target roles" },
                  { icon: <Zap size={20} />, title: "Gaps", desc: "Find missing skills" },
                  { icon: <Navigation size={20} />, title: "Roadmap", desc: "Your next step" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
                    whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.06)' }}
                    transition={springConfig}
                  >
                    <div style={{ color: 'var(--accent-primary)', marginBottom: '12px' }}>{item.icon}</div>
                    <h4 style={{ fontSize: '15px', marginBottom: '4px', fontWeight: 600 }}>{item.title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
