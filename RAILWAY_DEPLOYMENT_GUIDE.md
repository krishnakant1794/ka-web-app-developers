# 🚀 Railway.app Backend Deployment Guide

## 📋 Overview
Deploy your KA Web & App Developers backend on Railway.app for better reliability and performance.

---

## 🔧 Step 1: Prepare Backend for Railway

### Update package.json for Railway
```json
{
  "name": "ka-web-app-backend",
  "version": "1.0.0",
  "description": "Backend for KA Web & App Developers website",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

### Update server.js for Railway
```javascript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/projects.js';
import testimonialRoutes from './routes/testimonials.js';
import pricingRoutes from './routes/pricing.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import teamMemberRoutes from './routes/teamMembers.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Railway-specific CORS configuration
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:3000', 'https://ka-web-app-developers.vercel.app', 'https://webappdeveloper.online'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'KA Web & App Developers API',
    status: 'Server is running',
    version: '1.0.0',
    deployed: 'Railway.app',
    endpoints: {
      health: '/api/health',
      projects: '/api/projects',
      testimonials: '/api/testimonials',
      pricing: '/api/pricing',
      contact: '/api/contact',
      teamMembers: '/api/team-members',
      auth: '/api/auth'
    }
  });
});

// Handle OPTIONS requests for CORS preflight
app.options('*', cors());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/team-members', teamMemberRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kawebapp')
.then(() => {
  console.log('✅ MongoDB connected successfully');
  initializeAdmin();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
});

// Initialize admin user
async function initializeAdmin() {
  try {
    const Admin = (await import('./models/Admin.js')).default;
    const bcrypt = (await import('bcryptjs')).default;
    
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL || 'admin@kawebapp.com' });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
      await Admin.create({
        email: process.env.ADMIN_EMAIL || 'admin@kawebapp.com',
        password: hashedPassword,
      });
      console.log('✅ Admin user initialized');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
```

---

## 🚀 Step 2: Deploy to Railway.app

### Create Railway Account
1. Go to: https://railway.app
2. Sign up with GitHub (recommended)

### Deploy Backend Service
1. Click **"Deploy a new project"**
2. Click **"GitHub"** → Connect your repository
3. Select your repository: `comapany website`
4. **Root Directory**: `backend`
5. Click **"Deploy Now"**

### Configure Environment Variables
1. Go to your Railway project
2. Click on your backend service
3. Click **"Variables"** tab
4. Add these variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://krishnakk8281_db_user:9ZmVAR5LyxSIhhIJ@cluster0.h4v1rqi.mongodb.net/2appName-Cluster
ADMIN_EMAIL=krishnakk8281@gmail.com
ADMIN_PASSWORD=123456
JWT_SECRET=4412783e847b3d50905b3dbc7fc8fd5569e524104733262abf84a75adc98202716c5dcaab5d4618230107000001cc8903240607130037376309617072068702
CORS_ORIGIN=https://ka-web-app-developers.vercel.app,https://webappdeveloper.online
```

---

## 🔧 Step 3: Update Frontend Configuration

### Update .env.production
```env
VITE_API_URL=https://your-railway-url.railway.app
```

### Get Railway URL
1. In Railway dashboard, click your service
2. Look for **"URL"** in the service details
3. Copy the URL (e.g., `https://ka-backend-production.up.railway.app`)

---

## 🧪 Step 4: Test Railway Deployment

### Test Health Endpoint
```bash
curl https://your-railway-url.railway.app/health
```

### Test Login
```bash
curl -X POST https://your-railway-url.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"krishnakk8281@gmail.com","password":"123456"}'
```

---

## 🔄 Step 5: Update Frontend & Redeploy

### Commit Changes
```bash
cd "c:\Users\Krishnakant\Desktop\flutter\comapany website"
git add .
git commit -m "Migrate backend to Railway.app

✅ Updated server.js for Railway deployment
✅ Fixed CORS configuration for Railway
✅ Added proper health checks
✅ Updated package.json for Railway
✅ Changed frontend API URL to Railway"

git push origin main
```

### Redeploy Frontend
1. Go to Vercel dashboard
2. Click **"Redeploy"** for your frontend project

---

## ✅ Expected Results

After Railway deployment:
- ✅ No more 405 errors
- ✅ All API endpoints work perfectly
- ✅ Better performance and reliability
- ✅ Proper error logs in Railway dashboard
- ✅ Admin panel functions 100%

---

## 🚨 Troubleshooting

### If Deployment Fails:
1. Check Railway logs for errors
2. Verify all environment variables are set
3. Make sure MongoDB URI is correct
4. Check package.json for correct scripts

### If CORS Issues:
1. Verify CORS_ORIGIN includes your frontend domains
2. Check Railway logs for CORS errors
3. Make sure frontend URL is correct

### If Database Issues:
1. Verify MONGODB_URI is correct
2. Check MongoDB Atlas IP access
3. Ensure database user has proper permissions

---

## 🎯 Railway Advantages

- ✅ More reliable than Render
- ✅ Better error logging
- ✅ Faster deployments
- ✅ Better performance
- ✅ Easier debugging
- ✅ Free tier available

---

## 🚀 Final Steps

1. **Deploy backend to Railway**
2. **Update frontend API URL**
3. **Test all endpoints**
4. **Deploy frontend to Vercel**
5. **Test complete application**

**Your KA Web & App Developers website will be 100% functional on Railway!** 🚀
