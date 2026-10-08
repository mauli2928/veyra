export const careers = [
  {
    id: "data-analyst",
    name: "Data Analyst",
    shortDescription: "Transforms data into actionable insights for business decisions.",
    requiredSkills: [
      { name: "Python", category: "Technical", expectedProficiency: 4, weight: 1.0, reason: "Essential for data manipulation and analysis scripts." },
      { name: "SQL", category: "Technical", expectedProficiency: 4, weight: 1.0, reason: "Core skill for querying and extracting data from databases." },
      { name: "Excel", category: "Technical", expectedProficiency: 4, weight: 0.8, reason: "Crucial for ad-hoc analysis and stakeholder reporting." },
      { name: "Statistics", category: "Technical", expectedProficiency: 4, weight: 0.9, reason: "Foundation for accurate data interpretation." },
      { name: "Power BI", category: "Technical", expectedProficiency: 3, weight: 0.8, reason: "Important for creating interactive dashboards." },
      { name: "Data Visualization", category: "Technical", expectedProficiency: 4, weight: 0.8, reason: "Necessary for presenting insights clearly." },
      { name: "Communication", category: "Soft", expectedProficiency: 3, weight: 0.7, reason: "Vital for translating findings to non-technical teams." }
    ]
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    shortDescription: "Applies advanced analytics and machine learning to solve complex problems.",
    requiredSkills: [
      { name: "Python", category: "Technical", expectedProficiency: 5, weight: 1.0, reason: "Primary language for data science workflows." },
      { name: "Machine Learning", category: "Technical", expectedProficiency: 4, weight: 1.0, reason: "Core for building predictive models." },
      { name: "Statistics", category: "Technical", expectedProficiency: 5, weight: 0.9, reason: "Essential for model validation and hypothesis testing." },
      { name: "SQL", category: "Technical", expectedProficiency: 4, weight: 0.8, reason: "Needed for data extraction and preprocessing." },
      { name: "Data Wrangling", category: "Technical", expectedProficiency: 4, weight: 0.8, reason: "Critical for preparing messy real-world data." },
      { name: "Deep Learning", category: "Technical", expectedProficiency: 3, weight: 0.6, reason: "Valuable for unstructured data tasks like NLP or CV." },
      { name: "Communication", category: "Soft", expectedProficiency: 4, weight: 0.7, reason: "Important to explain complex models to stakeholders." }
    ]
  },
  {
    id: "software-developer",
    name: "Software Developer",
    shortDescription: "Builds and maintains robust software applications and systems.",
    requiredSkills: [
      { name: "JavaScript", category: "Technical", expectedProficiency: 4, weight: 1.0, reason: "Fundamental for full-stack and frontend development." },
      { name: "React", category: "Technical", expectedProficiency: 4, weight: 0.9, reason: "Industry standard for building user interfaces." },
      { name: "Node.js", category: "Technical", expectedProficiency: 3, weight: 0.8, reason: "Common for backend API development." },
      { name: "Git", category: "Technical", expectedProficiency: 4, weight: 0.9, reason: "Essential for version control and team collaboration." },
      { name: "SQL", category: "Technical", expectedProficiency: 3, weight: 0.7, reason: "Required for basic database operations." },
      { name: "Data Structures & Algorithms", category: "Technical", expectedProficiency: 4, weight: 1.0, reason: "Core foundation for writing efficient code." },
      { name: "Problem Solving", category: "Soft", expectedProficiency: 4, weight: 0.9, reason: "Crucial for debugging and architecture decisions." }
    ]
  },
  {
    id: "machine-learning-engineer",
    name: "Machine Learning Engineer",
    shortDescription: "Designs, builds, and deploys scalable machine learning models.",
    requiredSkills: [
      { name: "Python", category: "Technical", expectedProficiency: 5, weight: 1.0, reason: "Standard language for ML engineering." },
      { name: "Machine Learning", category: "Technical", expectedProficiency: 4, weight: 1.0, reason: "Core competency for model development." },
      { name: "Software Engineering", category: "Technical", expectedProficiency: 4, weight: 0.9, reason: "Essential for deploying models into production." },
      { name: "Cloud Platforms", category: "Technical", expectedProficiency: 3, weight: 0.8, reason: "Needed for scalable infrastructure (AWS/GCP/Azure)." },
      { name: "Docker", category: "Technical", expectedProficiency: 3, weight: 0.7, reason: "Standard for containerizing ML applications." },
      { name: "Deep Learning", category: "Technical", expectedProficiency: 4, weight: 0.8, reason: "Required for advanced AI applications." },
      { name: "System Design", category: "Technical", expectedProficiency: 3, weight: 0.7, reason: "Important for designing scalable ML pipelines." }
    ]
  },
  {
    id: "cybersecurity-analyst",
    name: "Cybersecurity Analyst",
    shortDescription: "Protects IT infrastructure and data from security threats.",
    requiredSkills: [
      { name: "Network Security", category: "Technical", expectedProficiency: 4, weight: 1.0, reason: "Fundamental for protecting infrastructure." },
      { name: "Linux", category: "Technical", expectedProficiency: 4, weight: 0.9, reason: "Core OS for security tools and server management." },
      { name: "Python", category: "Technical", expectedProficiency: 3, weight: 0.7, reason: "Useful for automating security scripts." },
      { name: "Incident Response", category: "Technical", expectedProficiency: 4, weight: 0.9, reason: "Critical for handling active security breaches." },
      { name: "Threat Intelligence", category: "Technical", expectedProficiency: 3, weight: 0.8, reason: "Important for anticipating and mitigating attacks." },
      { name: "Ethical Hacking", category: "Technical", expectedProficiency: 3, weight: 0.7, reason: "Helps in understanding attacker methodologies." },
      { name: "Attention to Detail", category: "Soft", expectedProficiency: 4, weight: 0.8, reason: "Crucial for spotting anomalies in logs." }
    ]
  },
  {
    id: "ui-ux-designer",
    name: "UI/UX Designer",
    shortDescription: "Creates intuitive, accessible, and beautiful user experiences.",
    requiredSkills: [
      { name: "Figma", category: "Technical", expectedProficiency: 4, weight: 1.0, reason: "Industry standard tool for design and prototyping." },
      { name: "UI Design", category: "Technical", expectedProficiency: 4, weight: 1.0, reason: "Core skill for creating visual interfaces." },
      { name: "UX Research", category: "Technical", expectedProficiency: 4, weight: 1.0, reason: "Essential for understanding user needs and behaviors." },
      { name: "Prototyping", category: "Technical", expectedProficiency: 4, weight: 0.9, reason: "Required to demonstrate interaction flows." },
      { name: "Design Systems", category: "Technical", expectedProficiency: 3, weight: 0.8, reason: "Important for maintaining design consistency at scale." },
      { name: "Accessibility", category: "Technical", expectedProficiency: 3, weight: 0.8, reason: "Ensures products are usable by everyone." },
      { name: "Communication", category: "Soft", expectedProficiency: 4, weight: 0.8, reason: "Vital for defending design decisions to stakeholders." }
    ]
  },
  {
    id: "product-manager",
    name: "Product Manager",
    shortDescription: "Guides the strategy, development, and success of a product.",
    requiredSkills: [
      { name: "Product Strategy", category: "Technical", expectedProficiency: 4, weight: 1.0, reason: "Core to defining the product vision and roadmap." },
      { name: "Agile Methodologies", category: "Technical", expectedProficiency: 4, weight: 0.9, reason: "Standard framework for managing development sprints." },
      { name: "Data Analysis", category: "Technical", expectedProficiency: 3, weight: 0.8, reason: "Needed to make data-informed product decisions." },
      { name: "User Research", category: "Technical", expectedProficiency: 3, weight: 0.8, reason: "Important to validate assumptions with real users." },
      { name: "Wireframing", category: "Technical", expectedProficiency: 2, weight: 0.5, reason: "Helpful for communicating ideas to designers." },
      { name: "Leadership", category: "Soft", expectedProficiency: 4, weight: 0.9, reason: "Essential for rallying the team without direct authority." },
      { name: "Communication", category: "Soft", expectedProficiency: 5, weight: 1.0, reason: "The most critical skill for stakeholder alignment." }
    ]
  }
];
