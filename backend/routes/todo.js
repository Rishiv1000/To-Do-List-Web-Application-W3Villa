const express = require('express');
const Todo = require('../models/Todo');
const jwt = require('jsonwebtoken');
const router = express.Router();


const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, "rajTM");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};


router.post('/todos', authMiddleware, async (req, res) => {
  const { text } = req.body;

  try {
    const newTodo = new Todo({
      text,
      user: req.user.userId,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/todos', authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/todos/:id', authMiddleware, async (req, res) => {
  const { text, isCompleted } = req.body;

  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (todo.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    todo.text = text || todo.text;
    todo.isCompleted = isCompleted ?? todo.isCompleted;

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



router.delete('/todos/:id', authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

   
    if (todo.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

   
    await Todo.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
