# 🚀 PeerLoop — Scalable Multi-Role Training, Competency Mapping & Capacity Building Platform

> **Event:** Smart India Hackathon (SIH) Solution  
> **Domain:** Organizational Capacity Building, Training Governance & Competency Discovery  
> **Architecture:** Cloud-Native Serverless & Generative AI  
> **Roles Supported:** Trainee, Trainer, and Administrator  

---

## 📌 1. Executive Summary & SIH Problem Context

Organizational capacity building and workforce skilling across institutions require a unified, transparent, and scalable ecosystem. Conventional training infrastructures suffer from disconnected student profiles, subjective manual trainer selection, unmonitored material distribution, and disconnected evaluation metrics.

**PeerLoop** addresses this challenge by engineering an enterprise-grade training, assessment, and competency mapping platform with three distinct role hierarchies:

1. **Trainee Experience**:
   - Create professional, verifiable profiles including **academic qualifications**, **work experience**, **interests**, **skills**, and **certificates**.
   - Browse and enroll in accredited courses across technical and governance domains.
   - Access the centralized **Trainer Library** featuring high-definition recorded lectures, presentation slide decks, and reference study guides.
   - Attempt timed **subject-wise MCQ assessments** with automated scoring and instant certificate/badge minting upon passing.
   - Submit structured feedback and quality reviews on courses and trainer delivery.

2. **Trainer Workspace**:
   - Manage professional profiles, academic credentials, and domain specialization tags.
   - Build custom **MCQ questionnaires with strict deadlines**, time limits, passing thresholds, and dynamic diagnostic explanations.
   - Monitor real-time **trainee participation and scoring analytics** (average scores, pass rates, submission logs, and student feedback).
   - Upload and manage recorded lectures (MP4), presentation slide decks (PPTX), and study materials (PDF) accessible to enrolled trainees.

3. **Admin Console & Institutional Governance**:
   - **User Approval & Role Management**: Inspect new registrations, approve or reject applicants, and toggle user roles dynamically between Trainee, Trainer, and Administrator.
   - **Executive Dashboards**: Monitor courses, total enrollments, certifications issued, assessment attempts, and department-wide participation statistics.
   - **Homepage Content Publisher**: Broadcast official directives, celebrate institutional milestones/achievements, alert deadlines, and announce newly uploaded learning resources directly on the homepage.

4. **Algorithmic Competency Mapping Engine**:
   - Evaluates trainer academic degrees, verified skills, teaching experience, and trainee satisfaction ratings.
   - Algorithmatically calculates a **Suitability Match Score (0–100%)** to pair faculty trainers with subject curriculum demands (e.g., Cloud & DevOps, AI & Data Science, Cybersecurity, Full-Stack Systems).

---

## 🌟 2. System Architecture & Features

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    Client Interface (PWA)                                   │
│            Trainee Portal     │      Trainer Studio      │       Admin Console              │
│       - Profiles & Certs      │  - Questionnaire Builder │  - User Approvals & Roles        │
│       - Course Enrollment     │  - Library Uploads       │  - Monitoring Dashboards         │
│       - MCQ Assessments       │  - Performance Tracking  │  - Homepage Notice Broadcast     │
│       - Course Feedback       │  - Feedback Analytics    │  - Competency Matching Matrix    │
└──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                               │
                        HTTPS / REST API / Cognito Domain Auth
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                              Application & Verification Engine                              │
│       - Role-Based Access Control (RBAC)         - Instant Automated MCQ Grader             │
│       - Single-Table Reactive Zustand Store      - Algorithmic Competency Scorer            │
│       - Cryptographic Micro-Credential Minter    - Dual Theme Engine (Light / Dark)         │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ 3. Role Breakdown & Key User Stories

### 👨‍🎓 1. Trainee Module
- **Comprehensive Profile**: Add and manage degrees, GPA/grades, internship/work history, learning interests, and certified credentials.
- **Course Enrollment**: Search, filter, and enroll in accredited courses with syllabus details and competency outcomes.
- **Trainer Library**: Stream video lectures, download slide decks, and read study guides.
- **Subject-Wise MCQ Tests**: Take timed questionnaires, receive instant evaluation, view diagnostic question explanations, and earn verifiable badges.
- **Feedback & Ratings**: Rate course content quality and trainer delivery with constructive reviews.

### 👨‍🏫 2. Trainer Workspace
- **Questionnaire Creator**: Build MCQ assessments with title, subject, deadline picker, duration, passing threshold, and question options.
- **Resource Management**: Upload video lectures, presentations, and manuals with metadata tags.
- **Participation Monitor**: View enrolled trainees, submission scores, completion percentages, and feedback ratings.

### 🏛️ 3. Admin Console
- **User Approvals**: Review pending trainee and trainer applicants; 1-click Approve or Reject.
- **Dynamic Role Management**: Elevate or switch user roles between Trainee, Trainer, and Admin on the fly.
- **Real-Time Dashboards**: Track enrollments, certifications, assessment attempts, and department-wide participation.
- **Bulletin Publisher**: Publish notices, achievements, and new content onto the homepage bulletin board.

### 🧭 4. Competency Mapping
- Ranks candidate trainers per curriculum subject with a percentage suitability score.
- Considers verified competencies, academic qualifications, and teaching tenure.

---

## 💻 4. Technology Stack

- **Framework:** Next.js 14 (App Router)
- **UI & Styling:** Tailwind CSS, Lucide Icons, Responsive Mobile-First Design
- **State & Persistence:** Zustand Reactive Store + Local Storage Sync
- **Security & Identity:** Amazon Cognito Domain Verification & Role-Based Access Control (RBAC)
- **Theming:** Full Dark & Light Mode with instant toggle and zero flicker

---

## 🚀 5. Getting Started & Verification

```bash
# Clone the repository
git clone https://github.com/Chirag0511/PEERLOOP-AWS.git

# Navigate to directory
cd PEERLOOP-AWS

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application. Use the top navigation role switcher to toggle between **Trainee**, **Trainer**, and **Admin** perspectives instantly!
