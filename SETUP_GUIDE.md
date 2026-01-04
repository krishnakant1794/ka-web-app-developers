# Setup Guide - KA Web & App Developers Website

## Quick Start

### Step 1: Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/kawebapp
   JWT_SECRET=your-super-secret-jwt-key-change-this
   ADMIN_EMAIL=admin@kawebapp.com
   ADMIN_PASSWORD=admin123
   ```

   **For MongoDB Atlas (Cloud):**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kawebapp?retryWrites=true&w=majority
   ```

4. **Start backend server:**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Step 2: Frontend Setup

1. **Open a new terminal and navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:3000`

### Step 3: Access the Website

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Login**: http://localhost:3000/admin/login
  - Email: `admin@kawebapp.com`
  - Password: `admin123`

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/kawebapp`

### Option 2: MongoDB Atlas (Cloud - Recommended)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get connection string
5. Replace `<password>` with your database password
6. Add connection string to `.env` file

## Initial Data Setup

After starting the server, the admin user will be automatically created with default credentials:
- Email: `admin@kawebapp.com`
- Password: `admin123`

**⚠️ IMPORTANT: Change these credentials immediately after first login!**

## Adding Content via Admin Panel

1. Login at `/admin/login`
2. Navigate to Admin Dashboard
3. Add Projects, Testimonials, and Pricing Plans

### Example Project Data:
```json
{
  "name": "E-Commerce Website",
  "type": "Website",
  "category": "Client Project",
  "description": "A modern e-commerce platform",
  "features": [
    "Product Catalog",
    "Shopping Cart",
    "Payment Integration"
  ],
  "techStack": [
    "React.js",
    "Node.js",
    "MongoDB"
  ],
  "liveDemoLink": "https://example.com"
}
```

### Example Testimonial:
```json
{
  "clientName": "John Doe",
  "projectType": "Website",
  "feedback": "Great work! Very professional.",
  "rating": 5
}
```

### Example Pricing Plan:
```json
{
  "planName": "Basic Website",
  "category": "Website",
  "price": 5000,
  "targetAudience": "Small businesses and startups",
  "features": [
    "Up to 5 pages",
    "Responsive design",
    "Contact form"
  ],
  "technologies": [
    "HTML5",
    "CSS3",
    "JavaScript"
  ],
  "isPopular": false
}
```

## Production Deployment

### Frontend (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set Environment Variable:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com`

5. **Update vercel.json:**
   - Replace `your-backend-url.onrender.com` with your actual backend URL

### Backend (Render)

1. **Create Account:**
   - Go to [render.com](https://render.com)
   - Sign up for free account

2. **Create New Web Service:**
   - Connect your GitHub repository
   - Select backend folder as root directory
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Set Environment Variables:**
   - `PORT` (auto-set by Render)
   - `MONGODB_URI` (your MongoDB connection string)
   - `JWT_SECRET` (strong random string)
   - `ADMIN_EMAIL` (your admin email)
   - `ADMIN_PASSWORD` (strong password)

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify connection string in `.env`
- Check firewall settings

**Port Already in Use:**
- Change `PORT` in `.env` file
- Or kill the process using port 5000

### Frontend Issues

**API Calls Failing:**
- Check if backend is running
- Verify proxy settings in `vite.config.js`
- Check browser console for errors

**Build Errors:**
- Delete `node_modules` and reinstall
- Clear npm cache: `npm cache clean --force`

## Security Checklist

- [ ] Change default admin credentials
- [ ] Use strong JWT_SECRET (at least 32 characters)
- [ ] Use MongoDB Atlas with authentication
- [ ] Enable HTTPS in production
- [ ] Set up CORS properly for production
- [ ] Regular backups of MongoDB database

## Support

For issues or questions:
- Email: krishnakk8281@gmail.com
- WhatsApp: 9263945768

