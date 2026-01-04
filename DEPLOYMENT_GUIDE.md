# 🚀 Complete Deployment Guide
## Deploy Frontend to Vercel & Backend to Render

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step 1: Setup GitHub Repository](#step-1-setup-github-repository)
3. [Step 2: Deploy Backend to Render](#step-2-deploy-backend-to-render)
4. [Step 3: Deploy Frontend to Vercel](#step-3-deploy-frontend-to-vercel)
5. [Step 4: Update Environment Variables](#step-4-update-environment-variables)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, make sure you have:
- ✅ GitHub account (free)
- ✅ Vercel account (free) - Sign up at [vercel.com](https://vercel.com)
- ✅ Render account (free) - Sign up at [render.com](https://render.com)
- ✅ MongoDB Atlas account (free) - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- ✅ Git installed on your computer

---

## Step 1: Setup GitHub Repository

### 1.1 Create a New Repository on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name**: `ka-web-app-developers` (or any name you like)
   - **Description**: "Business website for KA Web & App Developers"
   - **Visibility**: Choose **Public** (free) or **Private**
   - **DO NOT** check "Initialize with README" (we already have files)
4. Click **"Create repository"**

### 1.2 Initialize Git in Your Project

Open terminal/command prompt in your project folder and run:

```bash
# Navigate to your project folder
cd "C:\Users\Krishnakant\Desktop\flutter\comapany website"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Complete business website"

# Add GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ka-web-app-developers.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note**: If you get authentication error, GitHub now requires a Personal Access Token instead of password:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token"
3. Select scopes: `repo` (full control)
4. Copy the token
5. When pushing, use the token as password

### 1.3 Verify Upload

1. Go to your GitHub repository page
2. You should see all your files (frontend/, backend/, etc.)

---

## Step 2: Deploy Backend to Render

### 2.1 Create MongoDB Atlas Database

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login
3. Click **"Build a Database"** → Choose **"FREE"** (M0)
4. Select a cloud provider (AWS) and region (choose closest to you, e.g., Mumbai)
5. Click **"Create"**
6. Wait for database to be created (2-3 minutes)

### 2.2 Get MongoDB Connection String

1. Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
4. Replace `<password>` with your database password
5. Add database name at the end: `...mongodb.net/ka-website?retryWrites=true&w=majority`

### 2.3 Setup Network Access

1. In MongoDB Atlas, go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Render deployment)
4. Click **"Confirm"**

### 2.4 Create Admin User in MongoDB

1. In MongoDB Atlas, go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username and password (save these!)
5. Set privileges: **"Read and write to any database"**
6. Click **"Add User"**

### 2.5 Deploy Backend to Render

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository: `ka-web-app-developers`
5. Configure the service:
   - **Name**: `ka-website-backend` (or any name)
   - **Region**: Choose closest to you (e.g., Mumbai)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Click **"Advanced"** → Add Environment Variables:
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ka-website?retryWrites=true&w=majority
   JWT_SECRET = your-super-secret-jwt-key-change-this-to-something-random
   PORT = 10000
   NODE_ENV = production
   ```
   **Important**: Replace `username`, `password`, and cluster URL with your actual MongoDB credentials!

7. Click **"Create Web Service"**
8. Wait for deployment (5-10 minutes)
9. Once deployed, you'll get a URL like: `https://ka-website-backend.onrender.com`
10. **Save this URL** - you'll need it for frontend!

### 2.6 Test Backend

1. Visit: `https://YOUR-BACKEND-URL.onrender.com/api/health` (if you have a health endpoint)
2. Or test: `https://YOUR-BACKEND-URL.onrender.com/api/projects` (should return empty array `[]`)

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Update Frontend API Configuration

1. Open `frontend/src/config/axios.js`
2. Update the baseURL to your Render backend URL:
   ```javascript
   const baseURL = import.meta.env.VITE_API_URL || 'https://YOUR-BACKEND-URL.onrender.com';
   ```

### 3.2 Create Vercel Environment Variable File

Create `frontend/.env.production`:
```env
VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com
```

### 3.3 Deploy to Vercel

**Option A: Using Vercel Dashboard (Recommended)**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `ka-web-app-developers`
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://YOUR-BACKEND-URL.onrender.com`
6. Click **"Deploy"**
7. Wait for deployment (2-3 minutes)
8. Once deployed, you'll get a URL like: `https://ka-web-app-developers.vercel.app`

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend folder
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? ka-website-frontend
# - Directory? ./
# - Override settings? No
```

### 3.4 Update CORS in Backend

Make sure your backend allows requests from Vercel domain:

1. Go to Render dashboard → Your backend service → Environment
2. Add environment variable:
   ```
   CORS_ORIGIN = https://your-frontend-url.vercel.app
   ```
3. Update `backend/server.js` to use this:
   ```javascript
   const cors = require('cors');
   app.use(cors({
     origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
     credentials: true
   }));
   ```
4. Redeploy backend (Render auto-deploys on git push)

---

## Step 4: Update Environment Variables

### 4.1 Backend Environment Variables (Render)

Go to Render → Your Backend Service → Environment → Add:

```
MONGODB_URI = mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ka-website?retryWrites=true&w=majority
JWT_SECRET = your-super-secret-jwt-key-minimum-32-characters-long
PORT = 10000
NODE_ENV = production
CORS_ORIGIN = https://your-frontend-url.vercel.app
```

### 4.2 Frontend Environment Variables (Vercel)

Go to Vercel → Your Project → Settings → Environment Variables → Add:

```
VITE_API_URL = https://your-backend-url.onrender.com
```

**Important**: After adding environment variables, **redeploy** both services!

---

## Step 5: Create Admin Account

### 5.1 Create Admin via MongoDB Atlas

1. Go to MongoDB Atlas → Your Database → Browse Collections
2. Create a new collection: `admins`
3. Insert a document:
   ```json
   {
     "email": "admin@example.com",
     "password": "$2b$10$hashedpasswordhere"
   }
   ```

**OR** use this script to create admin:

1. Create `backend/scripts/createAdmin.js`:
   ```javascript
   import mongoose from 'mongoose';
   import bcrypt from 'bcrypt';
   import Admin from '../models/Admin.js';
   import dotenv from 'dotenv';

   dotenv.config();

   const createAdmin = async () => {
     try {
       await mongoose.connect(process.env.MONGODB_URI);
       console.log('Connected to MongoDB');

       const email = 'admin@example.com';
       const password = 'your-secure-password-here';

       const hashedPassword = await bcrypt.hash(password, 10);

       const admin = new Admin({
         email,
         password: hashedPassword
       });

       await admin.save();
       console.log('Admin created successfully!');
       console.log('Email:', email);
       console.log('Password:', password);
       process.exit(0);
     } catch (error) {
       console.error('Error:', error);
       process.exit(1);
     }
   };

   createAdmin();
   ```

2. Run locally:
   ```bash
   cd backend
   node scripts/createAdmin.js
   ```

---

## Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- **Solution**: Check Render logs → Make sure `MONGODB_URI` is correct
- **Solution**: Check `package.json` has `"type": "module"` for ES6 imports

**Problem**: CORS errors
- **Solution**: Add `CORS_ORIGIN` environment variable in Render
- **Solution**: Update backend `server.js` to use `process.env.CORS_ORIGIN`

**Problem**: MongoDB connection failed
- **Solution**: Check MongoDB Atlas → Network Access → Allow Render IPs
- **Solution**: Verify connection string has correct password

### Frontend Issues

**Problem**: API calls failing
- **Solution**: Check `VITE_API_URL` in Vercel environment variables
- **Solution**: Verify backend URL is correct (no trailing slash)

**Problem**: Build failing
- **Solution**: Check Vercel build logs
- **Solution**: Make sure all dependencies are in `package.json`

**Problem**: 404 errors on routes
- **Solution**: Add `vercel.json` in frontend root:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

### General Issues

**Problem**: Changes not reflecting
- **Solution**: Push changes to GitHub → Auto-deploy triggers
- **Solution**: Manually trigger redeploy in Vercel/Render dashboard

**Problem**: Environment variables not working
- **Solution**: Redeploy after adding environment variables
- **Solution**: Check variable names match exactly (case-sensitive)

---

## 🎉 Success Checklist

- [ ] GitHub repository created and code pushed
- [ ] MongoDB Atlas database created and connected
- [ ] Backend deployed to Render and accessible
- [ ] Frontend deployed to Vercel and accessible
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] Admin account created
- [ ] Can login to admin panel
- [ ] Can add/edit projects, testimonials, pricing

---

## 📞 Need Help?

If you face any issues:
1. Check the logs in Render/Vercel dashboard
2. Verify all environment variables are set
3. Make sure MongoDB connection string is correct
4. Ensure CORS is configured properly

---

## 🔄 Updating Your Website

After initial deployment, to update:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   ```
3. Vercel and Render will auto-deploy (usually takes 2-5 minutes)

---

**Congratulations! Your website is now live! 🎊**

