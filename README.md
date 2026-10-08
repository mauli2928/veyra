# VEYRA
**Know your gap. Build your future.**

## 1. Problem
Students accumulate academic and professional information across documents, certificates, resumes, platforms, and personal records. They may have a target career but often do not understand:
* What specific skills that career requires
* Which of those skills they already have
* Which skills they are weak in
* Which skills they are completely missing
* What they should improve first

## 2. Solution
VEYRA provides a Smart Student Career Profile and Career Readiness analysis. It goes beyond a digital resume by connecting what a student *has* with what their target career *requires*, identifying actionable gaps.

## 3. Why VEYRA
Students don't have a lack of information; they have a lack of direction. VEYRA acts as an intelligent career counselor that creates a personalized roadmap to job readiness.

## 4. Core Features
* **Digital Career Profile**: Track academics, projects, technical skills, soft skills, certifications, and internships.
* **Proficiency System**: Self-rate skills from Beginner (1) to Expert (5).
* **Career Gap Engine**: Deterministically analyzes the profile against real-world career requirements.
* **Readiness Score**: A transparent 0-100 score based on skill match and profile strength.
* **Skill Comparison Visualizations**: See exactly how your current levels match expected levels.
* **Personalized Roadmap**: Prioritized, actionable steps to bridge critical gaps.
* **Next Best Action**: The single highest-impact step you can take today.

## 5. Career Gap Engine
The engine maps user skills to required career skills (normalizing variants like "ui ux" -> "UI/UX"). It categorizes matches into:
* **MATCHED**: User has the skill at or above the expected proficiency.
* **PARTIAL**: User has the skill but below the expected proficiency.
* **MISSING**: User does not have the skill.

## 6. Readiness Score
Calculated dynamically based on:
* Skill Match / Career Alignment (75%)
* Projects (up to 10 points)
* Certifications (up to 5 points)
* Internships (up to 5 points)
* Academic Performance (up to 5 points)

## 7. Supported Careers
1. Data Analyst
2. Data Scientist
3. Software Developer
4. Machine Learning Engineer
5. Cybersecurity Analyst
6. UI/UX Designer
7. Product Manager

## 8. User Flow
Landing Page -> Build Profile (or Demo) -> Career Selection -> Analysis Dashboard -> Personalized Roadmap

## 9. Technology Stack
* Frontend: React, Vite, JavaScript, CSS
* UI/Icons: lucide-react, framer-motion (optional animations)
* State Management: localStorage
* Routing: react-router-dom

## 10. MVP Scope
The MVP focuses purely on the deterministic Gap Engine, transparent scoring, and offline-first persistent browser storage without needing a backend or external APIs.

## 11. Future Scope
* University ERP integration
* Job description parsing
* Backend data sync
* AI-driven personalized learning resource recommendations

## 12. Installation
\`\`\`bash
npm install
\`\`\`

## 13. Running Locally
\`\`\`bash
npm run dev
\`\`\`

## 14. Hackathon Context
This project was built for the Smart Student Career Profile problem statement, prioritizing the core requirement of analyzing a student's profile against career requirements to generate a readiness score and skill gap analysis.
