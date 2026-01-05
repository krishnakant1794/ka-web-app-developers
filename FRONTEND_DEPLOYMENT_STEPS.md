# 🌐 Frontend Deployment to Vercel - Step by Step

## ✅ Backend Status
Your backend is successfully deployed at: **https://ka-website-backend.onrender.com**

---

## 🚀 Step 1: Update GitHub with Latest Code

First, push the latest changes (including axios config fix) to GitHub:

```powershell
# Navigate to project folder
cd "C:\Users\Krishnakant\Desktop\flutter\comapany website"

# Add all changes
git add .

# Commit
git commit -m "Fix: Update axios config for production deployment"

# Push to GitHub
git push origin main
```

---

## 📦 Step 2: Deploy Frontend to Vercel

### 2.1 Sign Up / Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (or **"Log In"** if you have an account)
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account

### 2.2 Create New Project

1. After logging in, click **"Add New..."** button (top right)
2. Select **"Project"**

### 2.3 Import Your Repository

1. You'll see a list of your GitHub repositories
2. Find your repository: `comapany website` (or your repo name)
3. Click **"Import"** next to it

### 2.4 Configure Project Settings

**IMPORTANT**: Make sure these settings are correct!

1. **Framework Preset**: Should auto-detect as `Vite` ✅
   - If not, select `Vite` from dropdown

2. **Root Directory**: Click **"Edit"** → Change to `frontend` ⚠️ **CRITICAL!**
   - This tells Vercel where your frontend code is

3. **Build Command**: Should be `npm run build` (auto-filled) ✅

4. **Output Directory**: Should be `dist` (auto-filled) ✅

5. **Install Command**: Should be `npm install` (auto-filled) ✅

### 2.5 Add Environment Variable

**This is CRITICAL for connecting to your backend!**

1. Scroll down to **"Environment Variables"** section
2. Click **"Add"** or **"Add Another"**
3. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://ka-website-backend.onrender.com`
   ⚠️ **IMPORTANT**: No trailing slash! Use exactly: `https://ka-website-backend.onrender.com`

### 2.6 Deploy!

1. Click **"Deploy"** button (bottom right)
2. Wait for deployment (2-3 minutes)
   - You'll see build logs in real-time
   - Watch for any errors

3. Once deployment completes, you'll see:
   - ✅ **"Ready"** status
   - Your frontend URL: `https://your-project-name.vercel.app`

---

## 🔧 Step 3: Update Backend CORS

Now you need to allow your Vercel frontend to access the backend:

### 3.1 Go to Render Dashboard

1. Go to [render.com](https://render.com)
2. Click on your backend service: `ka-website-backend`

### 3.2 Add CORS Environment Variable

1. Click **"Environment"** tab (left sidebar)
2. Click **"Add Environment Variable"**
3. Add:
   - **Key**: `CORS_ORIGIN`
   - **Value**: `https://your-frontend-url.vercel.app`
   https://webappdeveloper.online
   ⚠️ Replace `your-frontend-url` with your actual Vercel URL!

4. Click **"Save Changes"**

### 3.3 Redeploy Backend

1. Go to **"Manual Deploy"** tab
2. Click **"Deploy latest commit"**
3. Wait for redeployment (5-10 minutes)

---

## ✅ Step 4: Test Your Deployment

### 4.1 Test Frontend

1. Visit your Vercel URL: `https://your-frontend-url.vercel.app`
2. Check if website loads
3. Navigate to different pages (Home, Services, Projects, etc.)

### 4.2 Test Admin Panel

1. Go to: `https://your-frontend-url.vercel.app/admin/login`
2. Try logging in (if you've created an admin account)
3. Check if admin dashboard loads
4. Test logout button

### 4.3 Test API Connection

1. Open browser console (F12)
2. Go to **"Network"** tab
3. Navigate through the website
4. Check if API calls are successful (should show 200 status)
5. If you see CORS errors, make sure `CORS_ORIGIN` is set correctly in Render

---

## 🐛 Troubleshooting

### Problem: Frontend can't connect to backend

**Symptoms**: API calls failing, 404 errors, or CORS errors

**Solutions**:
1. ✅ Check `VITE_API_URL` in Vercel environment variables
2. ✅ Verify backend URL is correct (no trailing slash)
3. ✅ Make sure `CORS_ORIGIN` is set in Render = your Vercel URL
4. ✅ Redeploy both frontend and backend after adding environment variables

### Problem: Build fails in Vercel

**Symptoms**: Deployment shows "Build Failed"

**Solutions**:
1. ✅ Check build logs in Vercel dashboard
2. ✅ Make sure `Root Directory` is set to `frontend`
3. ✅ Verify all dependencies are in `package.json`
4. ✅ Check for any syntax errors in code

### Problem: 404 errors on routes

**Symptoms**: Pages show 404 when navigating

**Solutions**:
1. ✅ Check if `vercel.json` exists in `frontend/` folder (it should!)
2. ✅ Verify `vercel.json` has the rewrite rules

### Problem: Admin login not working

**Symptoms**: Can't login to admin panel

**Solutions**:
1. ✅ Check browser console for errors
2. ✅ Verify backend is running (test `/api/health`)
3. ✅ Make sure admin account exists in MongoDB
4. ✅ Check if JWT_SECRET is set in Render

---

## 📋 Quick Checklist

Before considering deployment complete:

- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] `VITE_API_URL` environment variable set in Vercel
- [ ] `CORS_ORIGIN` environment variable set in Render
- [ ] Backend redeployed after adding CORS_ORIGIN
- [ ] Frontend URL accessible
- [ ] All pages load correctly
- [ ] API calls working (check browser console)
- [ ] Admin login page accessible
- [ ] Can login to admin panel
- [ ] Admin navbar displays correctly
- [ ] Logout button works

---

## 🔗 Important URLs to Save

- **Backend (Render)**: `https://ka-website-backend.onrender.com`
- **Frontend (Vercel)**: `https://your-frontend-url.vercel.app`
- **Admin Panel**: `https://your-frontend-url.vercel.app/admin/login`

---

## 🎉 Success!

Once all steps are complete, your website is **LIVE**! 🚀

- Users can visit your frontend URL
- All API calls connect to your backend
- Admin panel is accessible and functional

---

## 💡 Pro Tips

1. **Auto-Deployment**: Vercel automatically redeploys when you push to GitHub
2. **Environment Variables**: Always add them in Vercel dashboard, not in code
3. **CORS**: Must match exactly (including https://)
4. **Testing**: Always test in incognito mode to avoid cache issues

---

**Need Help?** Check Vercel deployment logs for detailed error messages!

