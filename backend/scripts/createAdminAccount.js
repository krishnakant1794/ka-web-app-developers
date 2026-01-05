import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdminAccount = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kawebapp';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    const email = 'krishnakk8281@gmail.com';
    const password = '123456';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      console.log('⚠️  Admin already exists with this email!');
      console.log('Email:', existingAdmin.email);
      console.log('If you want to reset password, delete the existing admin first.');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = new Admin({
      email: email.toLowerCase(),
      password: hashedPassword
    });

    await admin.save();
    console.log('\n✅ Admin account created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdminAccount();

