# 🚀 Complete Guide: Update GitHub & Deploy to Render + Vercel

## 📋 Quick Overview

This guide will help you:
1. ✅ Update your GitHub repository with the latest code (including navbar fixes)
2. ✅ Deploy Backend to Render
3. ✅ Deploy Frontend to Vercel

---

## 🔄 STEP 1: Update GitHub Repository

Since you've already pushed code to GitHub, now you need to update it with the latest changes.

### 1.1 Open Terminal/Command Prompt

Open PowerShell or Command Prompt in your project folder:
```powershell
cd "C:\Users\Krishnakant\Desktop\flutter\comapany website"
```

### 1.2 Check Git Status

```bash
git status
```

This shows which files have been changed.

### 1.3 Add All Changes

```bash
git add .
```

This stages all your changes (including the navbar fixes).

### 1.4 Commit Changes

```bash
git commit -m "Fix: Admin navbar UI and logout button functionality"
```

### 1.5 Push to GitHub

```bash
git push origin main
```

**If you get authentication error:**
- GitHub requires a Personal Access Token (not password)
- Go to: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Click "Generate new token (classic)"
- Select scope: `repo` (full control)
- Copy the token
- When prompted for password, paste the token instead

### 1.6 Verify Upload

1. Go to your GitHub repository page
2. Check that your latest commit appears
3. Verify files like `frontend/src/App.jsx` and `frontend/src/pages/AdminDashboard.jsx` are updated

---

## 🖥️ STEP 2: Deploy Backend to Render

### 2.1 Create MongoDB Atlas Database (If Not Done)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login
3. Click **"Build a Database"** → Choose **"FREE"** (M0)
4. Select cloud provider: **AWS** and region: **Mumbai (ap-south-1)** or closest to you
5. Click **"Create"**
6. Wait 2-3 minutes for database creation

### 2.2 Get MongoDB Connection String

1. Click **"Connect"** button on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual database password
5. Add database name at the end:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ka-website?retryWrites=true&w=majority
   ```
6. **Save this connection string!**

### 2.3 Setup Network Access

1. In MongoDB Atlas, click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Render)
4. Click **"Confirm"**

### 2.4 Create Database User

1. In MongoDB Atlas, click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - **Username**: `admin` (or any username)
   - **Password**: Create a strong password (save it!)
5. Set privileges: **"Read and write to any database"**
6. Click **"Add User"**

### 2.5 Deploy to Render

1. Go to [render.com](https://render.com) and **Sign In** (or Sign Up for free)

2. Click **"New +"** button (top right) → Select **"Web Service"**

3. **Connect GitHub** (if not connected):
   - Click **"Connect account"**
   - Authorize Render to access your GitHub
   - Select your repository: `comapany website` (or your repo name)

4. **Configure the service:**
   - **Name**: `ka-website-backend` (or any name)
   - **Region**: Choose **Mumbai (Mumbai)** or closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend` ⚠️ **IMPORTANT!**
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

5. Click **"Advanced"** button

6. **Add Environment Variables** (click "Add Environment Variable" for each):
   
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ka-website?retryWrites=true&w=majority
   ```
   ⚠️ Replace `username`, `password`, and `cluster0.xxxxx` with your actual MongoDB credentials!
   
   ```
   JWT_SECRET = your-super-secret-jwt-key-minimum-32-characters-long-change-this
   ```
   ⚠️ Use a long random string (at least 32 characters)
   
   ```
   PORT = 10000
   ```
   
   ```
   NODE_ENV = production
   ```

7. Click **"Create Web Service"**

8. **Wait for deployment** (5-10 minutes)
   - You'll see build logs in real-time
   - Wait until status shows "Live" ✅

9. **Copy your backend URL** (looks like: `https://ka-website-backend.onrender.com`)
   - **SAVE THIS URL!** You'll need it for frontend

### 2.6 Test Backend

1. Visit: `https://YOUR-BACKEND-URL.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. Or test: `https://YOUR-BACKEND-URL.onrender.com/api/projects`
   - Should return: `[]` (empty array)

---

## 🌐 STEP 3: Deploy Frontend to Vercel

### 3.1 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and **Sign In** (or Sign Up for free)

2. Click **"Add New..."** → **"Project"**

3. **Import your GitHub repository:**
   - Search for your repository: `comapany website` (or your repo name)
   - Click **"Import"**

4. **Configure Project:**
   - **Framework Preset**: `Vite` (should auto-detect)
   - **Root Directory**: Click **"Edit"** → Change to `frontend` ⚠️ **IMPORTANT!**
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `dist` (should be auto-filled)
   - **Install Command**: `npm install` (should be auto-filled)

5. **Add Environment Variable:**
   - Click **"Environment Variables"**
   - Add new variable:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://YOUR-BACKEND-URL.onrender.com`
     ⚠️ Replace `YOUR-BACKEND-URL` with your actual Render backend URL!

6. Click **"Deploy"**

7. **Wait for deployment** (2-3 minutes)
   - You'll see build logs
   - Wait until status shows "Ready" ✅

8. **Copy your frontend URL** (looks like: `https://comapany-website.vercel.app`)

### 3.2 Update Backend CORS

Now you need to allow your Vercel frontend to access the backend:

1. Go back to **Render Dashboard** → Your backend service

2. Click **"Environment"** tab

3. **Add new environment variable:**
   ```
   CORS_ORIGIN = https://your-frontend-url.vercel.app
   ```
   ⚠️ Replace `your-frontend-url` with your actual Vercel URL!

4. Click **"Save Changes"**

5. **Redeploy backend:**
   - Go to **"Manual Deploy"** tab
   - Click **"Deploy latest commit"**
   - Wait for redeployment (2-3 minutes)

### 3.3 Verify Frontend Works

1. Visit your Vercel URL: `https://your-frontend-url.vercel.app`
2. Check if the website loads
3. Try navigating to different pages
4. Test admin login (if you've created an admin account)

---

## 👤 STEP 4: Create Admin Account

You need to create an admin account to access the admin panel.

### Option A: Using Script (Recommended)

1. **Update the script** (if needed):
   - Open `backend/scripts/createAdmin.js`
   - Make sure it's configured correctly

2. **Run locally** (if you have Node.js installed):
   ```bash
   cd backend
   npm install
   node scripts/createAdmin.js
   ```
   - Make sure your `.env` file has the correct `MONGODB_URI`

### Option B: Using MongoDB Atlas

1. Go to MongoDB Atlas → Your Database → **"Browse Collections"**
2. If `admins` collection doesn't exist, create it
3. Click **"Insert Document"**
4. Add:
   ```json
   {
     "email": "admin@example.com",
     "password": "$2b$10$hashedpasswordhere"
   }
   ```
   ⚠️ You need to hash the password first using bcrypt

### Option C: Using API (After Backend is Deployed)

1. Create a temporary script or use Postman
2. Make a POST request to: `https://YOUR-BACKEND-URL.onrender.com/api/auth/register`
3. Send:
   ```json
   {
     "email": "admin@example.com",
     "password": "your-secure-password"
   }
   ```

---

## ✅ Final Checklist

Before considering deployment complete, verify:

- [ ] GitHub repository updated with latest code
- [ ] MongoDB Atlas database created and accessible
- [ ] Backend deployed to Render and responding to requests
- [ ] Frontend deployed to Vercel and accessible
- [ ] Environment variables set correctly in both Render and Vercel
- [ ] CORS configured in backend (CORS_ORIGIN set to Vercel URL)
- [ ] Admin account created
- [ ] Can access admin panel at: `https://your-frontend-url.vercel.app/admin/login`
- [ ] Can login with admin credentials
- [ ] Admin navbar displays correctly with navigation links
- [ ] Logout button works properly

---

## 🔄 Updating Your Website in Future

Whenever you make changes:

1. **Make your code changes**

2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

3. **Auto-deployment:**
   - Vercel will automatically detect the push and redeploy (2-3 minutes)
   - Render will automatically detect the push and redeploy (5-10 minutes)

4. **Check deployment status:**
   - Vercel: Go to your project → "Deployments" tab
   - Render: Go to your service → "Events" tab

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- **Solution**: Check Render logs → Look for error messages
- **Solution**: Verify `MONGODB_URI` is correct (no spaces, correct password)
- **Solution**: Check `package.json` has all dependencies

**Problem**: CORS errors in browser console
- **Solution**: Make sure `CORS_ORIGIN` in Render matches your Vercel URL exactly
- **Solution**: Redeploy backend after adding `CORS_ORIGIN`

**Problem**: MongoDB connection failed
- **Solution**: Check MongoDB Atlas → Network Access → Should allow all IPs (0.0.0.0/0)
- **Solution**: Verify connection string has correct password and database name

### Frontend Issues

**Problem**: API calls failing (404 or CORS errors)
- **Solution**: Check `VITE_API_URL` in Vercel environment variables
- **Solution**: Verify backend URL is correct (no trailing slash)
- **Solution**: Make sure backend is deployed and running

**Problem**: Build failing in Vercel
- **Solution**: Check Vercel build logs for errors
- **Solution**: Make sure `Root Directory` is set to `frontend`
- **Solution**: Verify all dependencies are in `package.json`

**Problem**: 404 errors when navigating to routes
- **Solution**: Check if `vercel.json` exists in `frontend/` folder
- **Solution**: If missing, create `frontend/vercel.json`:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```

### General Issues

**Problem**: Changes not reflecting after push
- **Solution**: Wait 5-10 minutes for auto-deployment
- **Solution**: Manually trigger redeploy in Vercel/Render dashboard
- **Solution**: Clear browser cache (Ctrl+Shift+R)

**Problem**: Environment variables not working
- **Solution**: Redeploy after adding environment variables
- **Solution**: Check variable names match exactly (case-sensitive)
- **Solution**: For Vercel, make sure variable name starts with `VITE_` for frontend

---

## 📞 Quick Reference

### Important URLs to Save:

- **GitHub Repository**: `https://github.com/YOUR_USERNAME/YOUR_REPO`
- **Backend URL (Render)**: `https://ka-website-backend.onrender.com`
- **Frontend URL (Vercel)**: `https://your-frontend-url.vercel.app`
- **MongoDB Atlas**: `https://cloud.mongodb.com`

### Environment Variables Summary:

**Render (Backend):**
```
MONGODB_URI = mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ka-website?retryWrites=true&w=majority
JWT_SECRET = your-super-secret-jwt-key-minimum-32-characters
PORT = 10000
NODE_ENV = production
CORS_ORIGIN = https://your-frontend-url.vercel.app
```

**Vercel (Frontend):**
```
VITE_API_URL = https://your-backend-url.onrender.com
```

---

## 🎉 Congratulations!

Your website is now live! 🚀

- **Frontend**: `https://your-frontend-url.vercel.app`
- **Admin Panel**: `https://your-frontend-url.vercel.app/admin/login`
- **Backend API**: `https://your-backend-url.onrender.com`

---

## 💡 Pro Tips

1. **Monitor Deployments**: Check Render and Vercel dashboards regularly
2. **Save Credentials**: Keep MongoDB connection string and passwords safe
3. **Test Locally First**: Always test changes locally before pushing
4. **Use Git Branches**: Create branches for major features
5. **Check Logs**: Use Render/Vercel logs to debug issues

---

**Need Help?** Check the logs in Render/Vercel dashboards - they usually show what went wrong!

