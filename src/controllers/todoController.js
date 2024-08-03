const Todo = require('../models/Todo');

// Create a new to-do item
const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = new Todo({
      text,
      userId: req.user.id
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all to-do items for the logged-in user
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a to-do item
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a to-do item
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'To-do item deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
