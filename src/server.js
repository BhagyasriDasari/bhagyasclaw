require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Check for environment variables
if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Supabase URL or Key is missing');
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Create Express app
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Server is running and ready to serve data!');
});

// Route for Supabase data
app.get('/data', async (req, res) => {
  try {
    const { data, error } = await supabase.from('test_table').select('*');
    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
