const normalizeSkill = (skill) => {
  return skill
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "") // remove spaces and special characters for comparison
    .trim();
};

const getCommonVariants = (skillName) => {
  const normal = normalizeSkill(skillName);
  if (normal === "javascript") return ["javascript", "js"];
  if (normal === "uiux" || normal === "uiuxdesign") return ["uiux", "uiuxdesign", "uxui", "userinterface"];
  if (normal === "powerbi") return ["powerbi"];
  if (normal === "machinelearning") return ["machinelearning", "ml"];
  if (normal === "deeplearning") return ["deeplearning", "dl"];
  if (normal === "react") return ["react", "reactjs"];
  if (normal === "node" || normal === "nodejs") return ["node", "nodejs"];
  return [normal];
};

export const analyzeCareer = (studentProfile, targetCareer) => {
  if (!studentProfile || !targetCareer) return null;

  const studentSkills = [
    ...(studentProfile.technicalSkills || []),
    ...(studentProfile.softSkills || [])
  ];

  const matchedSkills = [];
  const partialSkills = [];
  const missingSkills = [];

  let totalWeight = 0;
  let earnedScore = 0;

  targetCareer.requiredSkills.forEach((reqSkill) => {
    totalWeight += reqSkill.weight;

    const reqVariants = getCommonVariants(reqSkill.name);
    
    // Find if student has this skill
    const foundSkill = studentSkills.find((s) => {
      const sVariants = getCommonVariants(s.name);
      return sVariants.some(v => reqVariants.includes(v));
    });

    const skillAnalysis = {
      ...reqSkill,
      currentProficiency: foundSkill ? parseInt(foundSkill.proficiency) : 0,
    };

    if (!foundSkill) {
      skillAnalysis.status = "MISSING";
      skillAnalysis.gap = reqSkill.expectedProficiency;
      skillAnalysis.priority = reqSkill.weight >= 0.9 ? "HIGH" : reqSkill.weight >= 0.7 ? "MEDIUM" : "LOW";
      missingSkills.push(skillAnalysis);
    } else {
      const gap = reqSkill.expectedProficiency - skillAnalysis.currentProficiency;
      skillAnalysis.gap = gap;
      
      if (gap <= 0) {
        skillAnalysis.status = "MATCHED";
        skillAnalysis.priority = "NONE";
        skillAnalysis.gap = 0;
        matchedSkills.push(skillAnalysis);
        earnedScore += reqSkill.weight; // Full points
      } else {
        skillAnalysis.status = "PARTIAL";
        skillAnalysis.priority = reqSkill.weight >= 0.9 && gap >= 2 ? "HIGH" : reqSkill.weight >= 0.7 ? "MEDIUM" : "LOW";
        partialSkills.push(skillAnalysis);
        
        // Partial points based on how close they are
        const closeness = skillAnalysis.currentProficiency / reqSkill.expectedProficiency;
        earnedScore += (reqSkill.weight * closeness);
      }
    }
  });

  // Calculate Base Readiness Score (0-100) based purely on skills (75% weight in final score)
  const skillsScore = totalWeight > 0 ? (earnedScore / totalWeight) * 75 : 0;
  
  // Calculate extras (Projects, Certs, Internships, Academics) (25% weight in final score)
  let extraScore = 0;
  
  // Projects: up to 10 points (2.5 per project)
  const projectCount = studentProfile.projects ? studentProfile.projects.length : 0;
  extraScore += Math.min(10, projectCount * 2.5);
  
  // Certifications: up to 5 points (2.5 per cert)
  const certCount = studentProfile.certifications ? studentProfile.certifications.length : 0;
  extraScore += Math.min(5, certCount * 2.5);
  
  // Internship: up to 5 points (5 if has internship)
  const hasInternship = studentProfile.internship && studentProfile.internship.organization ? true : false;
  if (hasInternship) extraScore += 5;
  
  // Academics: up to 5 points based on CGPA (out of 10)
  const cgpa = parseFloat(studentProfile.cgpa) || 0;
  extraScore += (cgpa / 10) * 5;

  const finalScore = Math.min(100, Math.round(skillsScore + extraScore));

  // Sort gaps by weight and gap size
  const allGaps = [...missingSkills, ...partialSkills].sort((a, b) => {
    const scoreA = a.weight * a.gap;
    const scoreB = b.weight * b.gap;
    return scoreB - scoreA;
  });

  const criticalGaps = allGaps.filter(g => g.priority === "HIGH");
  const developmentAreas = allGaps.filter(g => g.priority === "MEDIUM" || g.priority === "LOW");
  
  const strengths = matchedSkills.sort((a, b) => b.weight - a.weight).slice(0, 3);

  // Recommendations logic
  const getRecommendation = (skill) => {
    const name = skill.name.toLowerCase();
    if (name.includes("sql")) return "Learn SQL fundamentals, practice joins, and build a database-driven project.";
    if (name.includes("python") || name.includes("javascript")) return "Build a real-world project using " + skill.name + " to solidify fundamentals.";
    if (name.includes("power bi") || name.includes("tableau")) return "Build an interactive " + skill.name + " dashboard using a real-world dataset.";
    if (name.includes("figma") || name.includes("ui")) return "Create a complete mobile app or web prototype in Figma.";
    if (name.includes("research")) return "Conduct user interviews and convert findings into design requirements.";
    if (name.includes("git")) return "Learn Git and GitHub fundamentals and use version control in your next project.";
    if (name.includes("communication")) return "Practice explaining one project clearly in a structured 2-minute presentation.";
    if (name.includes("data structure") || name.includes("algorithm")) return "Build DSA fundamentals through arrays, strings, searching, sorting and basic problem solving.";
    if (name.includes("machine learning")) return "Train a basic predictive model using scikit-learn on a Kaggle dataset.";
    if (skill.status === "MISSING") return "Complete a foundational course in " + skill.name + " and apply it in a small project.";
    return "Practice advanced concepts in " + skill.name + " to bridge the gap.";
  };

  const roadmap = allGaps.slice(0, 5).map((gap, index) => ({
    id: "step-" + (index + 1),
    stepNumber: index + 1,
    title: gap.status === "MISSING" ? "Learn " + gap.name : "Strengthen " + gap.name,
    skill: gap.name,
    action: getRecommendation(gap),
    reason: gap.reason,
    estimatedEffort: gap.status === "MISSING" ? "2-3 weeks" : "5-7 days",
    priority: gap.priority,
    status: "pending"
  }));

  const nextBestAction = roadmap.length > 0 ? {
    action: roadmap[0].action,
    reason: "This addresses one of the highest-impact gaps for your target career."
  } : null;

  return {
    readinessScore: finalScore,
    matchedSkills,
    partialSkills,
    missingSkills,
    strengths,
    criticalGaps,
    developmentAreas,
    explanation: "Your score is primarily based on how closely your current skills match the requirements of your target career. Projects, certifications, internships and academic performance provide additional evidence of readiness.",
    roadmap,
    nextBestAction
  };
};
