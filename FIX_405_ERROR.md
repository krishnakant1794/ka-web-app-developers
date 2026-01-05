# 🔧 Fix 405 Error on Admin Login

## 🐛 Problem
Getting `405 Method Not Allowed` error when trying to login at `/api/auth/login`

## ✅ Fixes Applied

### 1. Added Explicit OPTIONS Handling
- Added `app.options('*', cors())` to handle CORS preflight requests
- This ensures OPTIONS requests are properly handled before POST requests

### 2. Fixed Axios Configuration
- Updated axios config to properly handle production vs development URLs
- Fixed baseURL handling to work correctly with Vercel environment variables

### 3. Improved Login Error Handling
- Added better error messages
- Added logging to help debug issues
- Added proper URL construction

### 4. Added Test Route
- Added GET `/api/auth` route to verify auth routes are working

---

## 🚀 Steps to Fix

### STEP 1: Push Code Changes

```powershell
cd "C:\Users\Krishnakant\Desktop\flutter\comapany website"
git add .
git commit -m "Fix: 405 error on admin login - add OPTIONS handling and fix axios config"
git push origin main
```

### STEP 2: Verify Environment Variables in Vercel

1. Go to [vercel.com](https://vercel.com) → Your project
2. Go to **Settings** → **Environment Variables**
3. Verify `VITE_API_URL` is set to:
   ```
   https://ka-website-backend.onrender.com
   ```
   ⚠️ **NO trailing slash!**

### STEP 3: Verify CORS in Render

1. Go to [render.com](https://render.com) → Your backend service
2. Go to **Environment** tab
3. Verify `CORS_ORIGIN` is set to:
   ```
   https://ka-web-app-developers.vercel.app,https://webappdeveloper.online
   ```
   ⚠️ **NO trailing slashes, comma-separated, no spaces!**

### STEP 4: Test Auth Route

After deployment, test:
1. Visit: `https://ka-website-backend.onrender.com/api/auth`
   - Should return: `{"message":"Auth routes are working","endpoints":["/login","/verify"]}`

2. Test login:
   - Go to: `https://ka-web-app-developers.vercel.app/admin/login`
   - Email: `krishnakk8281@gmail.com`
   - Password: `123456`
   - Should login successfully!

---

## 🐛 Troubleshooting

### Still Getting 405 Error?

1. **Check Render Logs**:
   - Go to Render → Your service → **Logs** tab
   - Look for any errors when making login request
   - Check if route is being hit

2. **Check Browser Console**:
   - Open F12 → **Network** tab
   - Try to login
   - Check the `/api/auth/login` request:
     - Status code
     - Request URL (should be full URL)
     - Request method (should be POST)
     - Response headers

3. **Verify Backend is Running**:
   - Test: `https://ka-website-backend.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

4. **Check CORS**:
   - In browser console, look for CORS errors
   - Verify `CORS_ORIGIN` includes your frontend URL exactly

5. **Clear Cache**:
   - Hard refresh: `Ctrl + Shift + R`
   - Or use incognito mode

---

## 📝 Important Notes

1. **VITE_API_URL Format**:
   ```
   https://ka-website-backend.onrender.com
   ```
   - No trailing slash
   - Full URL with https://

2. **CORS_ORIGIN Format**:
   ```
   https://ka-web-app-developers.vercel.app,https://webappdeveloper.online
   ```
   - Comma-separated
   - No spaces after comma
   - No trailing slashes

3. **After Changing Environment Variables**:
   - **Vercel**: Auto-redeploys (wait 2-3 minutes)
   - **Render**: Must manually redeploy (go to Manual Deploy tab)

---

## ✅ Success Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel auto-deployed
- [ ] `VITE_API_URL` set correctly in Vercel
- [ ] `CORS_ORIGIN` set correctly in Render
- [ ] Backend redeployed (if env vars changed)
- [ ] Test `/api/auth` endpoint works
- [ ] Admin login works without 405 error

---

**After these fixes, login should work! 🚀**

