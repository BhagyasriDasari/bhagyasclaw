const supabase = require('../utils/supabaseClient'); // Correct import

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Sign Up Error:', error);
      throw error;
    }

    const user = new User({ email, supabaseId: data.user.id });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user: data.user });
  } catch (error) {
    console.error('Register User Error:', error);
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Sign In Error:', error);
      throw error;
    }

    res.status(200).json({ message: 'User logged in successfully', user: data.user });
  } catch (error) {
    console.error('Login User Error:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
