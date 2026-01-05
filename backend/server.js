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

// Middleware - CORS with multiple origins support
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim().replace(/\/$/, ''))
  : ['http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Remove trailing slash for comparison
    const normalizedOrigin = origin.replace(/\/$/, '');
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(normalizedOrigin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      // Also check if any allowed origin matches
      const isAllowed = allowedOrigins.some(allowedOrigin => {
        const normalizedAllowed = allowedOrigin.replace(/\/$/, '');
        return normalizedOrigin === normalizedAllowed || 
               normalizedOrigin.includes(normalizedAllowed.replace('https://', '').replace('http://', ''));
      });
      callback(isAllowed ? null : new Error('Not allowed by CORS'), isAllowed);
    }
  },
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
    timestamp: new Date().toISOString(),
    deployed: 'Railway.app'
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

// Handle OPTIONS requests for CORS preflight - respond with explicit headers
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  return res.sendStatus(204);
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/team-members', teamMemberRoutes);

// CORS error handler - turn cors package errors into 403 so preflight doesn't return 500
app.use((err, req, res, next) => {
  if (err && err.message && err.message.includes('Not allowed by CORS')) {
    console.warn(`CORS blocked request from origin=${req.headers.origin} allowed=${JSON.stringify(allowedOrigins)}`);
    return res.status(403).json({ message: 'CORS origin not allowed' });
  }
  next(err);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kawebapp')
.then(() => {
  console.log('✅ MongoDB connected successfully');
  // Initialize admin user if not exists
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
});

