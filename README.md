# 🏌️‍♂️ Parity Golf Platform

A **production-ready, full-stack SaaS platform** combining performance tracking, gamified rewards, and charity contribution — built with modern web technologies and scalable architecture.

---

## 🚀 Live Demo

* 🌐 **Website:** https://parityplatform.vercel.app/
* 👤 **User Dashboard:** https://parityplatform.vercel.app/dashboard
* 🔐 **Admin Panel:** https://parityplatform.vercel.app/admin

---

## 🔑 Demo Credentials

**Admin Access**

```
Email: adminnavin@gmail.com  
Password: admin8817
```

---

## ✨ Core Features

### 👤 User Platform

* Secure authentication (Supabase Auth)
* Golf score submission (1–45 range)
* Rolling 5-score system (latest only)
* Monthly draw participation
* Real-time results & ranking
* Personal dashboard with stats
* Subscription-gated access
* Charity contribution tracking

---

### 🎯 Gamification Engine

* 🎰 Random 5-number draw system
* 🧠 Match detection (3 / 4 / 5 matches)
* 🏆 Ranking system (🥇 🥈 🥉)
* 📜 Draw history tracking
* 🏆 Leaderboard system

---

### 💚 Charity Integration

* User-selected charity support
* Minimum 10% contribution model
* Track total impact per user
* Scalable donation tracking system

---

### 🔐 Admin Panel (Full Control)

* Role-based access (Admin/User)
* User management system
* Subscription control
* Draw simulation & execution
* Winner verification workflow
* Charity management (CRUD)
* Platform analytics & insights

---

## 🛡️ Security (Production-Level)

* Supabase Row Level Security (RLS)
* JWT-based authentication
* Secure backend API (Express middleware)
* Role-based route protection
* Admin-only access enforcement
* Environment variable isolation

---

## 🧠 Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS
* React Router
* Recharts

### Backend

* Node.js
* Express.js

### Database & Auth

* Supabase (PostgreSQL + Auth + RLS)

### Deployment

* Vercel (Frontend)
* Node Server (Backend APIs)

---

## 📁 Project Structure

```
src/
 ├── components/        # Reusable UI components
 ├── contexts/          # Auth & global state
 ├── pages/
 │    ├── admin/        # Admin dashboard
 │    └── user/         # User dashboard
 ├── lib/
 │    ├── supabase.ts   # Supabase client
 │    └── api.ts        # API handler
 └── App.tsx

server.ts               # Express backend
```

---

## ⚙️ Environment Variables

Create `.env` file:

```
# Frontend
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_URL=http://localhost:3000

# Backend (server only)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

⚠️ Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend

---

## 🛠️ Installation & Setup

```bash
# Clone repository
git clone https://github.com/NavinKumar8816/parity-golf-platform.git

# Navigate into project
cd parity-golf-platform

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🧪 Build & Preview

```bash
npm run build
npm run preview
```

---

## 🔌 API Architecture

* Centralized API handler (`api.ts`)
* Automatic JWT token injection
* Environment-aware routing (dev + production)

Example:

```ts
import { apiFetch } from "@/lib/api";

const users = await apiFetch("/api/admin/users");
```

---

## 🔒 Admin API Protection

* Middleware-based validation
* Verifies:

  * JWT token
  * User role from database
* Blocks unauthorized access automatically

---

## 📊 Performance Optimization

* Code splitting (manualChunks)
* Lazy loading ready
* Optimized Vite build
* Reduced bundle size

---

## 📌 Future Improvements

* 💳 Stripe / Razorpay integration
* 🔴 Real-time leaderboard (live updates)
* 🔔 Notification system (email + in-app)
* 📈 Advanced analytics dashboard
* 📱 Mobile app (React Native)

---

## 👨‍💻 Author

**Navin Kumar**
📧 [Navinkumar.dev01@gmail.com](mailto:Navinkumar.dev01@gmail.com)
🌐 https://navin-portfolio-gamma.vercel.app/

---

## ⭐ Why This Project Stands Out

* Full-stack SaaS architecture (not just frontend)
* Real-world product thinking (subscription + gamification + charity)
* Secure backend with RLS & role-based control
* Admin dashboard with complete system control
* Scalable and production-ready design

---

## 📜 License

This project is built for educational, evaluation, and portfolio purposes.
