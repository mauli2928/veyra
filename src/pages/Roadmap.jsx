import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, getTargetCareer, getRoadmapProgress, saveRoadmapProgress } from '../utils/helpers';
import { careers } from '../data/careers';
import { analyzeCareer } from '../services/careerEngine';
import { CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Roadmap() {
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const profile = getProfile();
    const careerId = getTargetCareer();

    if (!profile || !careerId) {
      navigate('/');
      return;
    }

    const career = careers.find(c => c.id === careerId);
    if (career) {
      const result = analyzeCareer(profile, career);
      setRoadmap(result.roadmap || []);
      
      const savedProgress = getRoadmapProgress();
      setProgress(savedProgress);
    }
  }, [navigate]);

  const toggleComplete = (id) => {
    const newProgress = { ...progress, [id]: !progress[id] };
    setProgress(newProgress);
    saveRoadmapProgress(newProgress);
  };

  const springConfig = { type: 'spring', bounce: 0, duration: 0.4 };

  if (roadmap.length === 0) {
    return (
      <div className="page-wrapper container flex flex-col items-center justify-center animate-in" style={{ padding: '80px 22px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: 600 }}>You're all set!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>We couldn't find any major skill gaps for your target career.</p>
        <button className="btn btn-primary" onClick={() => navigate('/analysis')}>
          <ArrowLeft size={16} /> Back to Analysis
        </button>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: springConfig }
  };

  return (
    <motion.div 
      className="page-wrapper container" 
      style={{ padding: '40px 22px', maxWidth: '720px' }}
      initial="hidden" animate="show" exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      <div className="flex items-center justify-between" style={{ marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.015em' }}>Your Roadmap</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>A step-by-step personalized plan to become job-ready.</p>
        </div>
        <motion.button 
          className="btn btn-secondary" 
          onClick={() => navigate('/analysis')}
          whileTap={{ scale: 0.95 }}
          transition={springConfig}
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          <ArrowLeft size={14} /> Analysis
        </motion.button>
      </div>

      <div className="flex flex-col gap-6" style={{ position: 'relative' }}>
        {/* Connecting line */}
        <div style={{ 
          position: 'absolute', left: '28px', top: '40px', bottom: '40px', 
          width: '2px', background: 'rgba(0,0,0,0.06)', zIndex: 0 
        }} />

        {roadmap.map((step, index) => {
          const isComplete = progress[step.id];
          
          return (
            <motion.div 
              key={step.id} 
              className="flex gap-6" 
              style={{ position: 'relative', zIndex: 1 }}
              variants={itemVariants}
            >
              <div className="flex flex-col items-center" style={{ width: '60px' }}>
                <motion.button 
                  onClick={() => toggleComplete(step.id)}
                  whileTap={{ scale: 0.85 }}
                  animate={{
                    background: isComplete ? 'var(--success)' : '#fff',
                    borderColor: isComplete ? 'var(--success)' : 'rgba(0,0,0,0.1)',
                    color: isComplete ? '#fff' : 'var(--text-primary)'
                  }}
                  transition={springConfig}
                  style={{ 
                    width: '40px', height: '40px', borderRadius: '50%',
                    borderWidth: '1px', borderStyle: 'solid',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 0 8px var(--bg-color)' // Cut out background line
                  }}
                >
                  {isComplete ? <CheckCircle size={20} /> : <span style={{ fontWeight: 600, fontSize: '15px' }}>{index + 1}</span>}
                </motion.button>
              </div>

              <motion.div 
                className="card" 
                animate={{ opacity: isComplete ? 0.6 : 1 }} 
                transition={springConfig}
                style={{ flex: 1, padding: '24px' }}
              >
                <div className="flex justify-between items-start" style={{ marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, letterSpacing: '-0.015em', textDecoration: isComplete ? 'line-through' : 'none' }}>
                    {step.title}
                  </h3>
                  {step.priority === 'HIGH' && !isComplete && (
                    <span className="badge badge-missing" style={{ fontSize: '11px', padding: '2px 6px' }}>High Priority</span>
                  )}
                </div>
                
                <p style={{ marginBottom: '16px', color: 'var(--text-primary)', fontSize: '15px', lineHeight: 1.4 }}>
                  {step.action}
                </p>
                
                <div style={{ background: 'rgba(0,0,0,0.03)', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Why:</strong> {step.reason}
                  </p>
                </div>

                <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                  <Clock size={14} />
                  <span>Effort: {step.estimatedEffort}</span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="text-center" style={{ marginTop: '48px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
          * Completing roadmap items does not change your readiness score. Update your profile skills directly when you master them.
        </p>
      </div>
    </motion.div>
  );
}
