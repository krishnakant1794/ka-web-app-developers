import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Website', 'App'],
  },
  price: {
    type: Number,
    required: true,
  },
  targetAudience: {
    type: String,
    required: true,
  },
  features: [{
    type: String,
    required: true,
  }],
  technologies: [{
    type: String,
    required: true,
  }],
  isPopular: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Pricing', pricingSchema);

