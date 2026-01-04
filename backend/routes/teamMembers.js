import express from 'express';
import TeamMember from '../models/TeamMember.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all active team members (public)
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single team member (public)
router.get('/:id', async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    
    if (!member || !member.isActive) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json(member);
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create team member (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const member = new TeamMember(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update team member (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json(member);
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete team member (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

