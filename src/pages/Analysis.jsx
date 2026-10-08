import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, getTargetCareer } from '../utils/helpers';
import { careers } from '../data/careers';
import { analyzeCareer } from '../services/careerEngine';
import { ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Analysis() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [careerName, setCareerName] = useState("");

  useEffect(() => {
    const profile = getProfile();
    const careerId = getTargetCareer();

    if (!profile || !careerId) {
      navigate('/');
      return;
    }

    const career = careers.find(c => c.id === careerId);
    if (career) {
      setCareerName(career.name);
      const result = analyzeCareer(profile, career);
      setAnalysis(result);
    }
  }, [navigate]);

  if (!analysis) return <div className="page-wrapper container flex items-center justify-center">Loading...</div>;

  const springConfig = { type: 'spring', bounce: 0, duration: 0.4 };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: springConfig }
  };

  const renderProgressBar = (current, expected) => {
    const segments = [];
    for (let i = 1; i <= 5; i++) {
      let bg = 'rgba(0,0,0,0.06)';
      if (i <= current) bg = 'var(--accent-primary)';
      else if (i <= expected) bg = 'var(--accent-light)';
      
      segments.push(
        <motion.div 
          key={i} 
          className="progress-segment"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ ...springConfig, delay: i * 0.05 }}
          style={{ 
            background: bg,
            opacity: i <= expected ? 1 : 0.4,
            transformOrigin: 'left'
          }} 
        />
      );
    }
    return <div className="progress-container">{segments}</div>;
  };

  const renderSkillRow = (skill, idx) => (
    <motion.div 
      variants={itemVariants}
      key={skill.name} 
      className="flex flex-wrap items-center justify-between" 
      style={{ padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div style={{ flex: '1 1 200px', paddingRight: '16px' }}>
        <h4 style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{skill.name}</h4>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4, display: 'block' }}>{skill.reason}</span>
      </div>
      
      <div className="flex items-center gap-6" style={{ flex: '1 1 250px', justifyContent: 'flex-end' }}>
        <div className="flex flex-col items-end gap-1">
          <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>
            Level {skill.currentProficiency} / {skill.expectedProficiency}
          </span>
          {renderProgressBar(skill.currentProficiency, skill.expectedProficiency)}
        </div>
        
        <div style={{ width: '90px', textAlign: 'right' }}>
          {skill.status === 'MATCHED' && <span className="badge badge-matched">Matched</span>}
          {skill.status === 'PARTIAL' && <span className="badge badge-partial">Partial</span>}
          {skill.status === 'MISSING' && <span className="badge badge-missing">Missing</span>}
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      className="page-wrapper container" 
      style={{ padding: '40px 22px', maxWidth: '800px' }}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      
      {/* Header section */}
      <motion.div variants={itemVariants} className="text-center" style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Career Readiness
        </h2>
        <h1 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.015em' }}>
          {careerName}
        </h1>
      </motion.div>

      {/* Main Score & Stats Grid */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6" style={{ marginBottom: '40px' }}>
        
        {/* Score Card */}
        <motion.div 
          className="card flex flex-col justify-center items-center text-center" 
          style={{ padding: '48px 32px', background: 'var(--accent-primary)', color: '#fff', border: 'none' }}
          whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(44,76,59,0.2)' }}
          transition={springConfig}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Readiness Score
          </h3>
          <div className="flex items-baseline gap-1" style={{ marginBottom: '16px' }}>
            <motion.span 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              style={{ fontSize: '80px', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              {analysis.readinessScore}
            </motion.span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', lineHeight: 1.5, maxWidth: '400px' }}>
            {analysis.explanation}
          </p>
        </motion.div>

        {/* Breakdown Card */}
        <motion.div 
          className="card flex flex-col justify-center" 
          style={{ padding: '32px' }}
          whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.06)' }}
          transition={springConfig}
        >
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span style={{ fontSize: '17px', fontWeight: 600, color: 'var(--success)' }}>Matched Skills</span>
              <span style={{ fontSize: '24px', fontWeight: 600 }}>{analysis.matchedSkills.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ fontSize: '17px', fontWeight: 600, color: 'var(--warning)' }}>Partial Matches</span>
              <span style={{ fontSize: '24px', fontWeight: 600 }}>{analysis.partialSkills.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ fontSize: '17px', fontWeight: 600, color: 'var(--danger)' }}>Missing Skills</span>
              <span style={{ fontSize: '24px', fontWeight: 600 }}>{analysis.missingSkills.length}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Next Best Action (Prominent) */}
      {analysis.nextBestAction && (
        <motion.div 
          variants={itemVariants}
          className="card" 
          style={{ marginBottom: '40px', padding: '32px', background: 'var(--accent-secondary)', color: '#fff', border: 'none' }}
          whileHover={{ scale: 1.01 }}
          transition={springConfig}
        >
          <div className="flex gap-6 items-start">
            <div style={{ color: '#fff', marginTop: '4px' }}>
              <Zap size={32} />
            </div>
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>Your Next Best Action</h3>
              <p style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.015em', marginBottom: '12px' }}>
                {analysis.nextBestAction.action}
              </p>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                <strong>Why:</strong> {analysis.nextBestAction.reason}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Detailed Analysis */}
      <motion.div variants={itemVariants} className="card" style={{ marginBottom: '40px', padding: '32px' }}>
        <h3 style={{ fontSize: '21px', fontWeight: 600, marginBottom: '24px', letterSpacing: '-0.015em' }}>Skill Comparison</h3>
        <div className="flex flex-col">
          {[...analysis.missingSkills, ...analysis.partialSkills, ...analysis.matchedSkills].map(renderSkillRow)}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center" style={{ marginBottom: '64px' }}>
        <motion.button 
          className="btn btn-primary" 
          onClick={() => navigate('/roadmap')}
          whileTap={{ scale: 0.96 }}
          transition={springConfig}
        >
          View Roadmap <ArrowRight size={16} />
        </motion.button>
      </motion.div>

    </motion.div>
  );
}
