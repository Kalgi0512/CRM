const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('clientId', 'name email userType')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// GET task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('clientId', 'name email userType');
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Failed to fetch task' });
  }
});

// GET tasks by client ID
router.get('/client/:clientId', async (req, res) => {
  try {
    const tasks = await Task.find({ clientId: req.params.clientId })
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching client tasks:', error);
    res.status(500).json({ message: 'Failed to fetch client tasks' });
  }
});

// GET tasks by assignee
router.get('/assigned/:assignee', async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.assignee })
      .populate('clientId', 'name email userType')
      .sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching assigned tasks:', error);
    res.status(500).json({ message: 'Failed to fetch assigned tasks' });
  }
});

// GET overdue tasks
router.get('/status/overdue', async (req, res) => {
  try {
    const overdueTasks = await Task.find({
      status: { $in: ['Pending', 'In Progress', 'Overdue'] },
      dueDate: { $lt: new Date() }
    }).populate('clientId', 'name email userType')
      .sort({ dueDate: 1 });
    
    res.json(overdueTasks);
  } catch (error) {
    console.error('Error fetching overdue tasks:', error);
    res.status(500).json({ message: 'Failed to fetch overdue tasks' });
  }
});

// POST create new task
router.post('/', async (req, res) => {
  try {
    // If clientId is provided, fetch client details
    let clientName = req.body.clientName;
    let clientType = req.body.clientType || 'none';
    
    if (req.body.clientId) {
      const client = await User.findById(req.body.clientId);
      if (client) {
        clientName = client.name || client.fullname || `${client.firstname || ''} ${client.lastname || ''}`.trim();
        clientType = client.userType || 'none';
      }
    }

    const taskData = {
      ...req.body,
      clientName,
      clientType
    };

    const task = new Task(taskData);
    const savedTask = await task.save();
    
    // Populate client data in response
    const populatedTask = await Task.findById(savedTask._id)
      .populate('clientId', 'name email userType');
    
    res.status(201).json(populatedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({ message: 'Failed to create task' });
  }
});

// PUT update task
router.put('/:id', async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // If status is being changed to completed, set completed date
    if (updateData.status === 'Completed' && req.body.status !== 'Completed') {
      updateData.completedDate = new Date();
    }
    
    // If clientId is being updated, fetch new client details
    if (updateData.clientId) {
      const client = await User.findById(updateData.clientId);
      if (client) {
        updateData.clientName = client.name || client.fullname || `${client.firstname || ''} ${client.lastname || ''}`.trim();
        updateData.clientType = client.userType || 'none';
      }
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('clientId', 'name email userType');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({ message: 'Failed to update task' });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

// PATCH update task status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updateData = { status };
    
    if (status === 'Completed') {
      updateData.completedDate = new Date();
    }
    
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('clientId', 'name email userType');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: 'Failed to update task status' });
  }
});

// GET task statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Promise.all([
      Task.countDocuments({ status: 'Pending' }),
      Task.countDocuments({ status: 'In Progress' }),
      Task.countDocuments({ status: 'Completed' }),
      Task.countDocuments({ status: 'Overdue' }),
      Task.countDocuments({ priority: 'High' }),
      Task.countDocuments({ priority: 'Medium' }),
      Task.countDocuments({ priority: 'Low' }),
    ]);

    const [pending, inProgress, completed, overdue, high, medium, low] = stats;

    res.json({
      status: {
        pending,
        inProgress,
        completed,
        overdue,
        total: pending + inProgress + completed + overdue
      },
      priority: {
        high,
        medium,
        low,
        total: high + medium + low
      }
    });
  } catch (error) {
    console.error('Error fetching task statistics:', error);
    res.status(500).json({ message: 'Failed to fetch task statistics' });
  }
});

module.exports = router;