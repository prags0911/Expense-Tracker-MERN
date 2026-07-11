💰 Expense Tracker | MERN Stack

A full-stack expense management app that lets users securely track, categorize, and visualize their financial transactions.

🔗 Live Demo: expense-tracker-prags1.vercel.app


🚀 Features


🔐 JWT authentication with email OTP verification
📊 Interactive dashboards — category-wise pie charts & monthly bar charts (Chart.js)
💸 Full CRUD for expenses
🌗 Dark mode & protected routes
📱 Responsive UI with real-time financial summaries



🛠️ Tech Stack

Frontend: React.js, Tailwind CSS, Chart.js
Backend: Node.js, Express.js, MongoDB
Auth: JWT, Email OTP
Deployment: Vercel (frontend), Render (backend)


⚙️ Local Setup

bashgit clone https://github.com/prags0911/Expense-Tracker-MERN.git
cd Expense-Tracker-MERN

# Backend
cd backend
npm install
npm start

# Frontend
cd ../frontend
npm install
npm run dev

Backend .env:

envDB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL=your_email_address
RESEND_API_KEY=your_resend_api_key


📧 Deployment Note

OTP emails are sent via Resend instead of Nodemailer/Gmail SMTP. Render blocks outbound SMTP ports (25/465/587), causing ENETUNREACH/ETIMEDOUT errors — Resend sends over HTTPS, avoiding this entirely.


👤 Author

Prags — GitHub
