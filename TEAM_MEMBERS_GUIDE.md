# 👥 Team Members Management Guide

## How to Add Team Members via Admin Panel

### Step 1: Login to Admin Dashboard
- Go to: `http://localhost:3000/admin/login`
- Login with admin credentials

### Step 2: Navigate to Team Members Tab
- Click on **"Team Members"** tab in Admin Dashboard

### Step 3: Add Team Member
- Click **"Add Team Member"** button
- Fill the form:

**Example for Krishnakant Kumar:**
```
Name: Krishnakant Kumar

Role: Full Stack Developer & Co-Founder

Photo URL: (upload photo to image hosting and paste URL, or leave empty)

Biography: 
Experienced full stack developer passionate about building scalable 
web and mobile applications. Currently pursuing Computer Science & 
Engineering at Central University of Jharkhand.

Education: 
Computer Science & Engineering, Central University of Jharkhand

Experience: 
2+ years of experience in web and mobile app development

Skills (one per line):
React.js
Node.js
Express.js
MongoDB
Flutter
Dart
JavaScript
TypeScript
Tailwind CSS

Display Order: 0

Mark as Head of Company: ✓ (CHECK THIS)
```

**Example for Abhay Shankar:**
```
Name: Abhay Shankar

Role: Full Stack Developer & Co-Founder

Photo URL: (upload photo and paste URL, or leave empty)

Biography: 
Skilled full stack developer with expertise in modern web technologies 
and mobile app development. Currently pursuing Computer Science & 
Engineering at Central University of Jharkhand.

Education: 
Computer Science & Engineering, Central University of Jharkhand

Experience: 
2+ years of experience in full stack development

Skills (one per line):
React.js
Node.js
MongoDB
Flutter
JavaScript
Python
UI/UX Design
API Development

Display Order: 1

Mark as Head of Company: ✓ (CHECK THIS)
```

### Step 4: Save
- Click **"Save"** button
- Team member will appear on About Us page!

---

## Adding Photos

### Option 1: Image Hosting (Recommended)
1. Upload photo to:
   - Imgur (imgur.com)
   - Cloudinary
   - Any image hosting service
2. Copy image URL
3. Paste in "Photo URL" field

### Option 2: Local Storage (For Development)
1. Place image in `frontend/public/team/` folder
2. Use URL: `/team/filename.jpg`

---

## Fields Explained

- **Name:** Full name of team member
- **Role:** Job title/position
- **Photo URL:** URL to team member's photo
- **Biography:** Short description about the person
- **Education:** Educational background
- **Experience:** Work experience details
- **Skills:** One skill per line (will show as tags)
- **Display Order:** Lower numbers appear first (0 = first)
- **Mark as Head:** Check this for company heads/co-founders

---

## Editing Team Members

1. Find team member in list
2. Click **"Edit"** button
3. Modify fields
4. Click **"Save"**

---

## Deleting Team Members

1. Find team member in list
2. Click **"Delete"** button
3. Confirm deletion

---

## Viewing on Website

- Go to: `http://localhost:3000/about`
- See all team members displayed with:
  - Photo (or initials if no photo)
  - Name with "Head" badge (if marked as head)
  - Role
  - Education
  - Experience
  - Biography
  - Skills as tags

---

**That's it! Your team members will appear on the About Us page! 🎉**

