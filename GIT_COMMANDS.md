# 📝 Git Commands for Updating GitHub

## Quick Commands to Update Your Repository

Open **PowerShell** or **Command Prompt** in your project folder and run these commands one by one:

### Step 1: Navigate to Project Folder

```powershell
cd "C:\Users\Krishnakant\Desktop\flutter\comapany website"
```

### Step 2: Check What Changed

```bash
git status
```

This shows you which files were modified.

### Step 3: Add All Changes

```bash
git add .
```

This stages all your changes (including the navbar fixes).

### Step 4: Commit Changes

```bash
git commit -m "Fix: Admin navbar UI and logout button functionality"
```

### Step 5: Push to GitHub

```bash
git push origin main
```

---

## 🔐 If You Get Authentication Error

GitHub requires a **Personal Access Token** instead of password:

### Create Token:
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give it a name: `Deployment Token`
4. Select scope: ✅ **repo** (full control)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)

### Use Token:
- When `git push` asks for password, **paste the token** instead
- Username: Your GitHub username

---

## ✅ Verify It Worked

1. Go to your GitHub repository page
2. You should see your latest commit: "Fix: Admin navbar UI and logout button functionality"
3. Check that files are updated

---

## 🚨 Common Errors & Fixes

### Error: "fatal: not a git repository"
**Fix**: Run `git init` first, then add remote:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

### Error: "remote origin already exists"
**Fix**: Update the remote URL:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

### Error: "Authentication failed"
**Fix**: Use Personal Access Token (see above)

---

**That's it! Your code is now on GitHub! 🎉**

