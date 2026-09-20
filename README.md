# 🚀 PeerLoop — AI-Powered Skill Barter & Micro-Mentorship Platform

> **Event:** Amazon Code Conquest — Hackathon (AWS Student Builder Group, VSSUT)  
> **Challenge:** Problem Statement 01 — Skill Exchange & Community Learning  
> **Team Size:** 2 Members  
> **Submission Deadline:** 22 September 2026, 11:59 PM IST  

---

## 📌 1. Project Overview

Valuable student expertise across university campuses remains untapped because traditional tutoring systems suffer from:
1. **The Double-Coincidence Problem:** Student A teaches UI Design and wants Guitar lessons; Student B teaches Guitar but wants German conversation, not UI Design.
2. **Cold-Start & Trust Barriers:** Students hesitate to reach out to unverified strangers on campus.
3. **Session Commitment Fatigue:** Coordinating 2-hour formal lectures fails when a student just needs 15 minutes of unblocking before a deadline.

**PeerLoop** is a decentralized, serverless skill-barter ecosystem that unlocks holistic campus knowledge. Students trade skills 1-on-1 across **Creative Arts, Music, Foreign Languages, 3D CAD, Public Speaking, and Technology** with zero tuition fees using circular time-credits, instant 15-minute SOS flash matching, and verifiable credentials.

---

## ✨ 2. Key Features

- **Multi-Hop Campus Time-Credits (Karma Ledger):** Solves the barter liquidity barrier. Earn credits by mentoring; spend them to learn from anyone.
- **15-Minute SOS Flash Mentoring Desk:** Live real-time urgent board for students blocked on bugs, render crashes, or exam doubts.
- **Amazon Bedrock Semantic Matchmaker:** Natural language compatibility discovery powered by foundation models (Claude 3 & Titan).
- **Interactive 1-on-1 Barter Room:** Live collaborative notes, practice drills, and countdown timer.
- **Automated AI Session Synthesis & Proof-of-Skill Badges:** Amazon Bedrock auto-summarizes takeaways and mints verifiable digital badges with cryptographic hashes.
- **Institutional Domain Authentication:** Restricts sign-ups to verified college accounts (`@vssut.ac.in`) via Amazon Cognito.
- **Flexible Indian Rupee (₹) Pricing:** Allows students to offer 0-cost peer barters or optional micro-bounties (`₹99`–`₹199`).

---

## ☁️ 3. AWS Cloud & Serverless Architecture

Built 100% serverless for zero idle cost and high scalability:

| AWS Service | Role in PeerLoop |
| :--- | :--- |
| **Amazon Bedrock** | Foundation model inference (Claude 3 / Titan) for semantic matchmaking, session synthesis, and badge evaluation. |
| **AWS Lambda** | Event-driven compute for matchmaking logic, room orchestration, and time-credit transactions. |
| **Amazon API Gateway** | Manages REST endpoints and bidirectional WebSockets for real-time SOS alerts. |
| **Amazon DynamoDB** | Single-table NoSQL design storing profiles, skills, and immutable transaction ledgers with sub-10ms latency. |
| **Amazon Cognito** | Institutional email verification (`@vssut.ac.in`) and secure JWT session handling. |
| **AWS Amplify & CloudFront** | Edge caching, CI/CD pipeline, and global static/SSR distribution. |

**Cost Model:** Operational cost for 5,000 university students is **< $10 / month** (and **$0.00** during pilot testing under AWS Free Tier).

---

## 🛠️ 4. Technology Stack & Dependencies

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Icons & UI:** Lucide React, clsx, tailwind-merge
- **Cloud SDK:** `@aws-sdk/client-bedrock-runtime`, `@aws-sdk/client-dynamodb`
- **State & Resilience:** LocalStorage reactive store with intelligent offline fallback mode

---

## ⚡ 5. Setup & Running the Project

### Prerequisites
- Node.js `v18+` or `v20+` (Tested on Node `v24.x`)
- npm `v9+` or `v10+`

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# 2. Install dependencies
npm install

# 3. Configure environment variables (Optional for live AWS credentials)
cp .env.example .env.local

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 🔒 6. Environment Variables (`.env.example`)

PeerLoop includes an **Intelligent Demo & Simulation Engine** so judges can evaluate the entire application out-of-the-box without requiring live AWS keys.

If connecting to a live AWS account:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
NEXT_PUBLIC_INSTITUTION_DOMAIN=vssut.ac.in
NEXT_PUBLIC_EVENT_NAME="Amazon Code Conquest 2026"
```
*(Never commit actual secrets or `.env.local` to GitHub)*

---

## 🎯 7. Key Pages & Demo Walkthrough for Judges

1. **Homepage (`/`):** View campus barter stats, 3-step barter flow, instant barter matcher, and live SOS queue.
2. **Discover & Barter (`/explore`):** Test semantic search across creative, musical, language, and technical skills with Bedrock match confidence.
3. **15-Min SOS Queue (`/sos`):** View urgent help tickets with ₹ bounties and test **"Accept & Launch Room"**.
4. **Peer Collaboration Room (`/room/[id]`):** Live shared practice notes + 15m timer + click **"Complete Barter & Mint Badge"** for AI synthesis.
5. **My Profile & Ledger (`/profile`):** View verifiable digital badges, skill preferences, and the DynamoDB Rupee/Karma transaction ledger.
6. **AWS Architecture Inspector (`/architecture`):** Dedicated judge slide deck detailing the cloud services, data flow, and cost curves.

---

## 🤝 8. Acknowledgments & Open-Source Credits

- **Event:** AWS Student Builder Group VSSUT — Amazon Code Conquest 2026
- **Framework & Libraries:** Next.js by Vercel, Tailwind CSS, Lucide Icons, AWS SDK for JavaScript v3
- **Photography & Assets:** Unsplash open-license portrait avatars
