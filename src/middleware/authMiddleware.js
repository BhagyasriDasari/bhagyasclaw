const supabase = require('../utils/supabaseClient');

const authenticate = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Expected format: 'Bearer <token>'

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Get user by token
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      throw error;
    }

    if (!data.user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Attach the user to the request object
    req.user = data.user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ error: 'Unauthorized: ' + error.message });
  }
};

module.exports = authenticate;
