# ✅ Quick Deployment Checklist

Use this checklist to ensure everything is set up correctly!

## 🔄 Step 1: Update GitHub (5 minutes)

```bash
# In your project folder
git add .
git commit -m "Fix: Admin navbar UI and logout button"
git push origin main
```

- [ ] Changes committed
- [ ] Changes pushed to GitHub
- [ ] Verified on GitHub website

---

## 🖥️ Step 2: Backend on Render (15-20 minutes)

### MongoDB Setup
- [ ] MongoDB Atlas account created
- [ ] Database cluster created (FREE tier)
- [ ] Database user created (username + password saved)
- [ ] Network Access: Allow from anywhere (0.0.0.0/0)
- [ ] Connection string copied and saved

### Render Setup
- [ ] Render account created
- [ ] GitHub connected to Render
- [ ] New Web Service created
- [ ] Root Directory: `backend` ✅
- [ ] Build Command: `npm install`
- [ ] Start Command: `node server.js`
- [ ] Environment Variables added:
  - [ ] `MONGODB_URI` (with database name at end)
  - [ ] `JWT_SECRET` (32+ characters)
  - [ ] `PORT` = `10000`
  - [ ] `NODE_ENV` = `production`
- [ ] Service deployed and "Live" ✅
- [ ] Backend URL saved: `https://________.onrender.com`
- [ ] Tested: `https://your-backend.onrender.com/api/health` works

---

## 🌐 Step 3: Frontend on Vercel (10-15 minutes)

### Vercel Setup
- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] New Project created
- [ ] Repository selected
- [ ] Root Directory: `frontend` ✅
- [ ] Framework: Vite (auto-detected)
- [ ] Build Command: `npm run build` (auto)
- [ ] Output Directory: `dist` (auto)
- [ ] Environment Variable added:
  - [ ] `VITE_API_URL` = `https://your-backend.onrender.com`
- [ ] Project deployed and "Ready" ✅
- [ ] Frontend URL saved: `https://________.vercel.app`

### Update Backend CORS
- [ ] Added `CORS_ORIGIN` in Render = `https://your-frontend.vercel.app`
- [ ] Backend redeployed after adding CORS_ORIGIN

---

## 👤 Step 4: Create Admin Account

- [ ] Admin account created (via script, MongoDB, or API)
- [ ] Email: `________@________.com`
- [ ] Password saved securely

---

## ✅ Step 5: Final Testing

- [ ] Frontend loads: `https://your-frontend.vercel.app`
- [ ] All pages work (Home, Services, Projects, etc.)
- [ ] Admin login page loads: `https://your-frontend.vercel.app/admin/login`
- [ ] Can login with admin credentials
- [ ] Admin dashboard loads
- [ ] Admin navbar displays correctly (with navigation links)
- [ ] Logout button works
- [ ] Can add/edit projects
- [ ] Can add/edit testimonials
- [ ] Can view contact messages

---

## 🔗 Important URLs (Fill These In!)

- **GitHub Repo**: `https://github.com/________/________`
- **Backend (Render)**: `https://________.onrender.com`
- **Frontend (Vercel)**: `https://________.vercel.app`
- **MongoDB Atlas**: `https://cloud.mongodb.com`

---

## 🐛 Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Backend not starting | Check MongoDB connection string |
| CORS errors | Add `CORS_ORIGIN` in Render = your Vercel URL |
| Frontend can't connect | Check `VITE_API_URL` in Vercel |
| 404 on routes | Add `vercel.json` in frontend folder |
| Build fails | Check Root Directory is `frontend` or `backend` |

---

## 📝 Environment Variables Quick Copy

### Render (Backend)
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ka-website?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
PORT=10000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.vercel.app
```

### Vercel (Frontend)
```
VITE_API_URL=https://your-backend.onrender.com
```

---

**🎉 Once all checked, your website is LIVE!**

