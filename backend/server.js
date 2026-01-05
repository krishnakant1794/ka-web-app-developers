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

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'KA Web & App Developers API',
    status: 'Server is running',
    version: '1.0.0',
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

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/team-members', teamMemberRoutes);

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

