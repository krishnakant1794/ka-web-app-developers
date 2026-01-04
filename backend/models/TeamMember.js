import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
    default: '',
  },
  biography: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    default: '',
  },
  experience: {
    type: String,
    default: '',
  },
  skills: [{
    type: String,
    required: true,
  }],
  isHead: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('TeamMember', teamMemberSchema);

