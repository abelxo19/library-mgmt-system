const Member = require('../models/Member');
const User = require('../models/User');

// Get all members
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find().populate('userId', 'username email name');
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single member
exports.getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate('userId', 'username email name');
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new member
exports.createMember = async (req, res) => {
  try {
    const { userId, name, email, phone, address } = req.body;
    
    if (!userId || !name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user exists and is a member
    const user = await User.findById(userId);
    if (!user || user.role !== 'member') {
      return res.status(400).json({ error: 'Invalid user or user is not a member' });
    }

    // Check if member already exists for this user
    const existingMember = await Member.findOne({ userId });
    if (existingMember) {
      return res.status(400).json({ error: 'Member already exists for this user' });
    }

    // Generate membership ID
    const membershipId = `MEM${Date.now()}`;

    const member = new Member({ 
      userId, 
      membershipId, 
      name, 
      email, 
      phone, 
      address 
    });
    
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a member
exports.updateMember = async (req, res) => {
  try {
    const { name, email, phone, address, status } = req.body;
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, status },
      { new: true, runValidators: true }
    );
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a member
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 