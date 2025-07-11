module.exports = (roles) => (req, res, next) => {
  // Check if user exists (from auth middleware)
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'User not authenticated' 
    });
  }

  // Check if user has required role
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Insufficient permissions.' 
    });
  }

  next();
}; 