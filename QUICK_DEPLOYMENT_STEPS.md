# ⚡ Quick Deployment Steps

## 🎯 Fast Track Guide (TL;DR)

### 1️⃣ GitHub Setup (5 minutes)
```bash
cd "C:\Users\Krishnakant\Desktop\flutter\comapany website"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ka-web-app-developers.git
git branch -M main
git push -u origin main
```

### 2️⃣ MongoDB Atlas (5 minutes)
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create FREE cluster (M0)
3. Get connection string: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/ka-website?retryWrites=true&w=majority`
4. Allow access from anywhere (Network Access)

### 3️⃣ Render Backend (10 minutes)
1. Go to [render.com](https://render.com) → New Web Service
2. Connect GitHub → Select repository
3. Settings:
   - **Root Directory**: `backend`
   - **Build**: `npm install`
   - **Start**: `node server.js`
4. Environment Variables:
   ```
   MONGODB_URI = your-mongodb-connection-string
   JWT_SECRET = your-random-secret-key-32-chars-min
   PORT = 10000
   ```
5. Deploy → Copy URL: `https://your-backend.onrender.com`

### 4️⃣ Vercel Frontend (5 minutes)
1. Go to [vercel.com](https://vercel.com) → Add Project
2. Import GitHub repository
3. Settings:
   - **Root Directory**: `frontend`
   - **Framework**: Vite
4. Environment Variable:
   ```
   VITE_API_URL = https://your-backend.onrender.com
   ```
5. Deploy → Get URL: `https://your-site.vercel.app`

### 5️⃣ Update CORS
In Render backend, add:
```
CORS_ORIGIN = https://your-site.vercel.app
```

### 6️⃣ Create Admin
Run locally or use MongoDB Atlas to create admin user.

---

## ✅ Done! Your site is live!

**Frontend**: `https://your-site.vercel.app`  
**Backend**: `https://your-backend.onrender.com`

---

For detailed instructions, see `DEPLOYMENT_GUIDE.md`

