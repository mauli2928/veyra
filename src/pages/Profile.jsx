import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, saveProfile } from '../utils/helpers';
import { Plus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: '', university: '', degree: '', year: '', cgpa: '', academicAchievements: '',
    technicalSkills: [], softSkills: [], projects: [], certifications: [],
    internship: { organization: '', role: '', duration: '' }
  });

  useEffect(() => {
    const saved = getProfile();
    if (saved) setProfile(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(p => ({ ...p, [name]: value }));
  };

  const handleInternshipChange = (e) => {
    const { name, value } = e.target;
    setProfile(p => ({ ...p, internship: { ...p.internship, [name]: value } }));
  };

  const addSkill = (type) => {
    setProfile(p => ({
      ...p,
      [type]: [...p[type], { name: '', proficiency: '3' }]
    }));
  };

  const updateSkill = (type, index, field, value) => {
    const newSkills = [...profile[type]];
    newSkills[index][field] = value;
    setProfile(p => ({ ...p, [type]: newSkills }));
  };

  const removeSkill = (type, index) => {
    setProfile(p => ({ ...p, [type]: p[type].filter((_, i) => i !== index) }));
  };

  const addProject = () => {
    setProfile(p => ({
      ...p,
      projects: [...p.projects, { name: '', description: '', technologies: '' }]
    }));
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...profile.projects];
    newProjects[index][field] = value;
    setProfile(p => ({ ...p, projects: newProjects }));
  };

  const removeProject = (index) => {
    setProfile(p => ({ ...p, projects: p.projects.filter((_, i) => i !== index) }));
  };

  const addCert = () => {
    setProfile(p => ({
      ...p,
      certifications: [...p.certifications, { name: '', domain: '' }]
    }));
  };

  const updateCert = (index, field, value) => {
    const newCerts = [...profile.certifications];
    newCerts[index][field] = value;
    setProfile(p => ({ ...p, certifications: newCerts }));
  };

  const removeCert = (index) => {
    setProfile(p => ({ ...p, certifications: p.certifications.filter((_, i) => i !== index) }));
  };

  const handleSaveAndContinue = () => {
    saveProfile(profile);
    navigate('/career');
  };

  const springConfig = { type: 'spring', bounce: 0, duration: 0.4 };
  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: springConfig }
  };

  const renderProficiencySelector = (type, index, currentVal) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map(level => (
        <motion.button
          key={level}
          whileTap={{ scale: 0.9 }}
          onClick={() => updateSkill(type, index, 'proficiency', level.toString())}
          className="flex items-center justify-center"
          animate={{
            background: currentVal == level ? 'var(--accent-primary)' : 'var(--accent-light)',
            color: currentVal == level ? '#fff' : 'var(--text-primary)',
          }}
          transition={springConfig}
          style={{
            width: '32px', height: '32px', borderRadius: '6px',
            fontWeight: currentVal == level ? '600' : '400',
            fontSize: '13px'
          }}
        >
          {level}
        </motion.button>
      ))}
    </div>
  );

  return (
    <motion.div 
      className="page-wrapper container" 
      style={{ padding: '40px 22px', maxWidth: '720px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={springConfig}
    >
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Your Profile</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Fill in your details to get an accurate readiness score.</p>
      </div>
      
      <div className="flex flex-col gap-6">
        
        {/* Personal Info */}
        <motion.div className="card" variants={itemVariants} initial="hidden" animate="show">
          <h2 style={{ fontSize: '19px', marginBottom: '16px' }}>Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Full Name</label>
              <input className="input-field" name="fullName" value={profile.fullName} onChange={handleChange} placeholder="e.g. Jane Doe" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>University</label>
              <input className="input-field" name="university" value={profile.university} onChange={handleChange} placeholder="e.g. State University" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Degree</label>
              <input className="input-field" name="degree" value={profile.degree} onChange={handleChange} placeholder="e.g. B.Tech Computer Science" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Year</label>
              <input className="input-field" name="year" value={profile.year} onChange={handleChange} placeholder="e.g. 3rd Year" />
            </div>
          </div>
        </motion.div>

        {/* Academics */}
        <motion.div className="card" variants={itemVariants} initial="hidden" animate="show">
          <h2 style={{ fontSize: '19px', marginBottom: '16px' }}>Academics</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>CGPA (out of 10)</label>
              <input className="input-field" name="cgpa" type="number" step="0.1" value={profile.cgpa} onChange={handleChange} placeholder="e.g. 8.5" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Academic Achievements</label>
              <input className="input-field" name="academicAchievements" value={profile.academicAchievements} onChange={handleChange} placeholder="e.g. Dean's List" />
            </div>
          </div>
        </motion.div>

        {/* Technical Skills */}
        <motion.div className="card" variants={itemVariants} initial="hidden" animate="show">
          <div className="flex justify-between items-center" style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '19px' }}>Technical Skills</h2>
            <motion.button 
              className="btn btn-secondary" 
              style={{ padding: '8px 12px', fontSize: '13px' }} 
              onClick={() => addSkill('technicalSkills')}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={14} /> Add Skill
            </motion.button>
          </div>
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {profile.technicalSkills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-4 items-center flex-wrap"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0, scale: 0.9 }}
                  transition={springConfig}
                  style={{ overflow: 'hidden' }}
                >
                  <input 
                    className="input-field" style={{ flex: 1, minWidth: '150px' }}
                    placeholder="e.g. Python" value={skill.name}
                    onChange={(e) => updateSkill('technicalSkills', index, 'name', e.target.value)}
                  />
                  <div className="flex flex-col">
                    <span style={{ fontSize: '11px', marginBottom: '4px', color: 'var(--text-secondary)' }}>Proficiency (1-5)</span>
                    {renderProficiencySelector('technicalSkills', index, skill.proficiency)}
                  </div>
                  <motion.button 
                    onClick={() => removeSkill('technicalSkills', index)} 
                    style={{ color: 'var(--danger)', marginTop: '20px' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
            {profile.technicalSkills.length === 0 && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No technical skills added yet.</p>
            )}
          </div>
        </motion.div>

        {/* Soft Skills */}
        <motion.div className="card" variants={itemVariants} initial="hidden" animate="show">
          <div className="flex justify-between items-center" style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '19px' }}>Soft Skills</h2>
            <motion.button 
              className="btn btn-secondary" 
              style={{ padding: '8px 12px', fontSize: '13px' }} 
              onClick={() => addSkill('softSkills')}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={14} /> Add Skill
            </motion.button>
          </div>
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {profile.softSkills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-4 items-center flex-wrap"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0, scale: 0.9 }}
                  transition={springConfig}
                  style={{ overflow: 'hidden' }}
                >
                  <input 
                    className="input-field" style={{ flex: 1, minWidth: '150px' }}
                    placeholder="e.g. Communication" value={skill.name}
                    onChange={(e) => updateSkill('softSkills', index, 'name', e.target.value)}
                  />
                  <div className="flex flex-col">
                    <span style={{ fontSize: '11px', marginBottom: '4px', color: 'var(--text-secondary)' }}>Proficiency (1-5)</span>
                    {renderProficiencySelector('softSkills', index, skill.proficiency)}
                  </div>
                  <motion.button 
                    onClick={() => removeSkill('softSkills', index)} 
                    style={{ color: 'var(--danger)', marginTop: '20px' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
             {profile.softSkills.length === 0 && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No soft skills added yet.</p>
            )}
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div className="card" variants={itemVariants} initial="hidden" animate="show">
          <div className="flex justify-between items-center" style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '19px' }}>Projects</h2>
            <motion.button 
              className="btn btn-secondary" 
              style={{ padding: '8px 12px', fontSize: '13px' }} 
              onClick={addProject}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={14} /> Add Project
            </motion.button>
          </div>
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {profile.projects.map((proj, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col gap-3" 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={springConfig}
                  style={{ padding: '16px', background: 'var(--bg-color)', borderRadius: '12px' }}
                >
                  <div className="flex justify-between">
                    <input className="input-field" placeholder="Project Name" value={proj.name} onChange={(e) => updateProject(index, 'name', e.target.value)} />
                    <motion.button 
                      onClick={() => removeProject(index)} 
                      style={{ color: 'var(--danger)', marginLeft: '16px' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                  <input className="input-field" placeholder="Description" value={proj.description} onChange={(e) => updateProject(index, 'description', e.target.value)} />
                  <input className="input-field" placeholder="Technologies (e.g. React, Node.js)" value={proj.technologies} onChange={(e) => updateProject(index, 'technologies', e.target.value)} />
                </motion.div>
              ))}
            </AnimatePresence>
            {profile.projects.length === 0 && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No projects added yet.</p>
            )}
          </div>
        </motion.div>

      </div>

      <div className="flex justify-end" style={{ marginTop: '32px', marginBottom: '48px' }}>
        <motion.button 
          className="btn btn-primary" 
          onClick={handleSaveAndContinue}
          whileTap={{ scale: 0.96 }}
          transition={springConfig}
        >
          Continue <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}
