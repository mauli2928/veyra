const PROFILE_KEY = 'veyra_profile';
const TARGET_CAREER_KEY = 'veyra_target_career';
const ROADMAP_KEY = 'veyra_roadmap_progress';

export const saveProfile = (data) => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Could not save profile", e);
  }
};

export const getProfile = () => {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Could not get profile", e);
    return null;
  }
};

export const saveTargetCareer = (careerId) => {
  try {
    localStorage.setItem(TARGET_CAREER_KEY, careerId);
  } catch (e) {
    console.error("Could not save career", e);
  }
};

export const getTargetCareer = () => {
  try {
    return localStorage.getItem(TARGET_CAREER_KEY);
  } catch (e) {
    return null;
  }
};

export const saveRoadmapProgress = (progress) => {
  try {
    localStorage.setItem(ROADMAP_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Could not save roadmap progress", e);
  }
};

export const getRoadmapProgress = () => {
  try {
    const data = localStorage.getItem(ROADMAP_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
};

export const clearAppData = () => {
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(TARGET_CAREER_KEY);
  localStorage.removeItem(ROADMAP_KEY);
};

export const createDemoProfile = () => {
  const demoProfile = {
    fullName: "Mauli Chauhan",
    university: "State University",
    degree: "B.Tech Computer Science Engineering",
    year: "3rd Year",
    cgpa: "8.5",
    academicAchievements: "Dean's List",
    technicalSkills: [
      { name: "Python", proficiency: "3" },
      { name: "JavaScript", proficiency: "3" },
      { name: "SQL", proficiency: "2" },
      { name: "Figma", proficiency: "4" },
      { name: "HTML/CSS", proficiency: "4" },
      { name: "React", proficiency: "3" }
    ],
    softSkills: [
      { name: "Communication", proficiency: "4" },
      { name: "Problem Solving", proficiency: "3" }
    ],
    projects: [
      { name: "Fitness Management Platform", description: "Web app for tracking fitness goals", technologies: "React, Node.js" },
      { name: "Student Portfolio", description: "Personal portfolio website", technologies: "HTML, CSS, JS" },
      { name: "Marketing Analytics Dashboard", description: "Data visualization dashboard", technologies: "Python, Pandas" }
    ],
    certifications: [
      { name: "Python Fundamentals", domain: "Programming" },
      { name: "Web Development", domain: "Software Dev" }
    ],
    internship: {
      organization: "Tech Solutions Inc.",
      role: "Frontend Intern",
      duration: "3 months"
    }
  };
  saveProfile(demoProfile);
  saveTargetCareer("ui-ux-designer");
  saveRoadmapProgress({});
};
