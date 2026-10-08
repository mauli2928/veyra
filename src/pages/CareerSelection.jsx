import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { careers } from '../data/careers';
import { saveTargetCareer, getTargetCareer, getProfile } from '../utils/helpers';
import { Briefcase, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CareerSelection() {
  const navigate = useNavigate();
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const saved = getTargetCareer();
    if (saved) setSelectedCareer(saved);
    
    const profile = getProfile();
    setHasProfile(!!profile && profile.fullName !== '');
  }, []);

  const handleSelect = (id) => {
    setSelectedCareer(id);
    saveTargetCareer(id);
  };

  const handleAnalyze = () => {
    if (!hasProfile) {
      alert("Please build your profile first.");
      navigate('/profile');
      return;
    }
    navigate('/analysis');
  };

  const springConfig = { type: 'spring', bounce: 0, duration: 0.4 };
  const bouncierSpring = { type: 'spring', bounce: 0.2, duration: 0.5 };

  return (
    <motion.div 
      className="page-wrapper container" 
      style={{ padding: '40px 22px' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={springConfig}
    >
      <div className="flex flex-col items-center text-center" style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Step 2 of 3
        </h2>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.015em' }}>Choose Your Target Career</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '17px', lineHeight: 1.47059 }}>
          Select the career you are aiming for to cross-reference your profile against industry requirements.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginBottom: '48px' }}>
        {careers.map((career) => {
          const isSelected = selectedCareer === career.id;
          return (
            <motion.div 
              key={career.id}
              onClick={() => handleSelect(career.id)}
              whileHover={{ scale: isSelected ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                boxShadow: isSelected ? '0 10px 30px rgba(0, 102, 204, 0.15)' : '0 4px 12px rgba(0,0,0,0.04)',
                borderColor: isSelected ? 'var(--accent-primary)' : 'rgba(0,0,0,0.04)',
                backgroundColor: isSelected ? '#fafcff' : '#ffffff'
              }}
              transition={springConfig}
              style={{
                cursor: 'pointer',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderRadius: 'var(--radius-md)',
                position: 'relative',
                padding: '24px'
              }}
            >
              <AnimatePresence>
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={bouncierSpring}
                    style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--accent-primary)' }}
                  >
                    <CheckCircle2 size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="flex flex-col gap-3" style={{ marginBottom: '16px' }}>
                <motion.div 
                  animate={{
                    backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--accent-light)',
                    color: isSelected ? '#fff' : 'var(--accent-primary)'
                  }}
                  transition={springConfig}
                  style={{ 
                    width: '40px', height: '40px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '10px'
                  }}
                >
                  <Briefcase size={20} />
                </motion.div>
                <h3 style={{ fontSize: '21px', fontWeight: 600, letterSpacing: '-0.015em' }}>{career.name}</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', minHeight: '60px', lineHeight: 1.4 }}>
                {career.shortDescription}
              </p>
              
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Required Skills
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-primary)' }}>{career.requiredSkills.length} Total</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {career.requiredSkills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} style={{ 
                      fontSize: '12px', padding: '4px 8px', 
                      background: 'rgba(0,0,0,0.04)', borderRadius: '4px',
                      color: 'var(--text-primary)', fontWeight: 500
                    }}>
                      {skill.name}
                    </span>
                  ))}
                  {career.requiredSkills.length > 3 && (
                    <span style={{ 
                      fontSize: '12px', padding: '4px 8px', 
                      background: 'transparent', color: 'var(--text-secondary)', fontWeight: 500 
                    }}>
                      +{career.requiredSkills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center" style={{ marginBottom: '48px' }}>
        <motion.button 
          className="btn btn-primary" 
          disabled={!selectedCareer}
          onClick={handleAnalyze}
          whileTap={selectedCareer ? { scale: 0.96 } : {}}
          animate={{ opacity: !selectedCareer ? 0.5 : 1 }}
          transition={springConfig}
          style={{ 
            pointerEvents: !selectedCareer ? 'none' : 'auto',
            padding: '14px 28px'
          }}
        >
          Analyze My Career <ChevronRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}
