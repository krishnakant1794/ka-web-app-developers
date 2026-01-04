import express from 'express';
import Pricing from '../models/Pricing.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all active pricing plans (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    
    if (category) {
      filter.category = category;
    }

    const pricingPlans = await Pricing.find(filter).sort({ price: 1 });
    res.json(pricingPlans);
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single pricing plan (public)
router.get('/:id', async (req, res) => {
  try {
    const plan = await Pricing.findById(req.params.id);
    
    if (!plan || !plan.isActive) {
      return res.status(404).json({ message: 'Pricing plan not found' });
    }

    res.json(plan);
  } catch (error) {
    console.error('Error fetching pricing plan:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create pricing plan (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const plan = new Pricing(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    console.error('Error creating pricing plan:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update pricing plan (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const plan = await Pricing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res.status(404).json({ message: 'Pricing plan not found' });
    }

    res.json(plan);
  } catch (error) {
    console.error('Error updating pricing plan:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete pricing plan (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const plan = await Pricing.findByIdAndDelete(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: 'Pricing plan not found' });
    }

    res.json({ message: 'Pricing plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting pricing plan:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

