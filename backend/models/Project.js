import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Website', 'App', 'Full Stack'],
  },
  category: {
    type: String,
    required: true,
    enum: ['Client Project', 'Personal Project'],
  },
  description: {
    type: String,
    required: true,
  },
  features: [{
    type: String,
    required: true,
  }],
  techStack: [{
    type: String,
    required: true,
  }],
  liveDemoLink: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  clientFeedback: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Project', projectSchema);

