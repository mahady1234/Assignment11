🩸 LifeFlow | Comprehensive Blood Donation Management System
LifeFlow is a robust MERN-stack platform designed to bridge the gap between blood donors and recipients. It streamlines the process of requesting blood, managing donor databases, and handling emergency requirements through a role-based dashboard system (Admin, Volunteer, and Donor).

🌐 Live Deployment
Live Site: [Insert Your Live Link Here]

Client Repository: [Insert GitHub Client Link]

Server Repository: [Insert GitHub Server Link]

🛠️ Tech Stack & Packages Used
Frontend
Framework: React (v19) with Vite

Styling: Tailwind CSS & DaisyUI (Custom Theme)

Routing: React Router Dom (v7)

Icons & Animation: Lucide-React, React Icons, Framer Motion

State & Forms: React Hook Form, Axios

Visualization: Recharts (for Dashboard Analytics)

Notifications: React Hot Toast / SweetAlert2

Backend & Security
Environment: Node.js & Express.js

Database: MongoDB

Authentication: Firebase Auth & JWT (JSON Web Tokens)

Payment: Stripe (for Funding System)

✨ Key Features
🔐 Role-Based Access Control (RBAC)
Admin: Full control over users (block/unblock), role management, and all donation requests.

Volunteer: Can manage all donation requests and update statuses, with restricted access to administrative settings.

Donor: Can create blood requests, manage personal profile, and view their donation history.

🩸 Donation Management
Search Engine: Advanced filtering by Blood Group, District, and Upazila to find donors instantly.

Request Lifecycle: Complete workflow from Pending → Inprogress → Done/Canceled.

Public Requests: A dedicated page for pending requests where any logged-in user can step up to donate.

📊 Advanced Dashboard
Statistics: Interactive charts (using Recharts) showing total donors, funds, and donation requests.

Pagination & Filtering: Tabular data management with server-side pagination for seamless performance.

Dynamic Profile: Non-editable email security with an easy-to-use toggle for profile updates.

💳 Funding & Payments
Secure Transactions: Integrated Stripe Payment Gateway for users to contribute funds to the organization.

Financial History: A transparent funding page showing all contributions in real-time.

🚀 Installation & Local Setup
Clone the repositories:

Bash

git clone https://github.com/your-username/blood-donation-client
git clone https://github.com/your-username/blood-donation-server
Install dependencies (both Client & Server):

Bash

npm install
Environment Variables: Create a .env file in the root of both folders and add the following:

Server .env:

Code snippet

DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_key
Client .env:

Code snippet

VITE_FIREBASE_API_KEY=your_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
Run the application:

Bash

npm run dev
 Security Measures
Environment Variables: Sensitive Firebase and MongoDB credentials are fully secured.

JWT Authentication: Private routes and APIs are protected via JWT tokens stored securely.

CORS Configuration: Server is optimized for production to prevent cross-origin errors.

 Admin Credentials (for Testing)
Email: admin@lifeflow.com 

Password: 