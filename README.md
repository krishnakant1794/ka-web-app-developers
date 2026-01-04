# KA Web & App Developers - Business Website

A complete full-stack business portfolio website for showcasing web and mobile app development services, projects, pricing, and client testimonials.

## 🚀 Features

- **Frontend**: React.js with Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Admin Panel**: Secure authentication for managing content
- **Responsive Design**: Mobile-first, works on all devices
- **SEO Friendly**: Optimized for search engines

## 📁 Project Structure

```
.
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   └── App.jsx       # Main app component
│   └── package.json
│
└── backend/           # Node.js backend API
    ├── models/        # MongoDB models
    ├── routes/         # API routes
    ├── middleware/     # Auth middleware
    └── server.js       # Express server
```

## 🛠️ Tech Stack

### Frontend
- React.js 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
ADMIN_EMAIL=admin@kawebapp.com
ADMIN_PASSWORD=admin123
```

4. Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000` and backend on `http://localhost:5000`

## 🌐 Deployment

### Frontend (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Navigate to frontend directory:
```bash
cd frontend
```

3. Deploy:
```bash
vercel
```

4. Update API base URL in production:
   - Create `vercel.json` or update environment variables
   - Set `VITE_API_URL` to your backend URL

### Backend (Render)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables:
   - `PORT` (auto-set by Render)
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`

## 🔐 Admin Access

Default admin credentials (change after first login):
- Email: `admin@kawebapp.com`
- Password: `admin123`

**Important**: Change these credentials in production!

### 📖 Admin Guides:

- **QUICK_START.md** - 5-minute quick setup guide
- **ADMIN_GUIDE.md** - Complete step-by-step guide for:
  - Setting up `.env` file
  - Admin login process
  - Adding Projects (Client & Personal)
  - Adding Pricing Plans
  - Adding Testimonials
  - Editing & Deleting content

## 📄 Pages

1. **Home** - Hero section, services preview, why choose us
2. **Services** - Detailed service offerings
3. **Projects** - Client and personal projects showcase
4. **Pricing** - Website and app pricing plans
5. **Testimonials** - Client feedback and reviews
6. **About** - Company mission and team information
7. **Contact** - Contact form and business details
8. **Admin Dashboard** - Content management panel

## 🎨 Customization

### Colors
Edit `frontend/tailwind.config.js` to customize the color scheme.

### Content
- Projects: Add via Admin Dashboard
- Testimonials: Add via Admin Dashboard
- Pricing Plans: Add via Admin Dashboard

## 📱 Contact Information

- **WhatsApp**: 9263945768
- **Phone**: 7488415643
- **Email**: krishnakk8281@gmail.com

## 👨‍💻 Developers

- **Krishnakant Kumar**
- **Abhay Shankar**

## 📝 License

This project is proprietary and confidential.

## 🆘 Support

For issues or questions, contact the development team.

