const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Document Collection',
      'Job Placement',
      'Communication',
      'Partnership Management',
      'Business Development',
      'Visa Processing',
      'Financial',
      'Administrative',
      'Training',
      'Assessment'
    ]
  },
  type: {
    type: String,
    required: true,
    enum: ['Candidate Task', 'Agent Task', 'Administrative Task', 'System Task']
  },
  priority: {
    type: String,
    required: true,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'In Progress', 'Completed', 'Overdue', 'Cancelled'],
    default: 'Pending'
  },
  assignedTo: {
    type: String,
    required: true,
    trim: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  clientName: {
    type: String,
    trim: true
  },
  clientType: {
    type: String,
    enum: ['candidate', 'agent', 'none'],
    default: 'none'
  },
  dueDate: {
    type: Date,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  completedDate: {
    type: Date
  },
  notes: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  recurring: {
    type: Boolean,
    default: false
  },
  recurringInterval: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'],
    required: false
  },
  reminderDate: {
    type: Date
  },
  estimatedHours: {
    type: Number,
    min: 0
  },
  actualHours: {
    type: Number,
    min: 0
  },
  attachments: [{
    name: String,
    url: String,
    type: String
  }]
}, {
  timestamps: true
});

// Index for better query performance
taskSchema.index({ status: 1, dueDate: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ clientId: 1 });
taskSchema.index({ category: 1 });

// Virtual for overdue tasks
taskSchema.virtual('isOverdue').get(function() {
  return this.status !== 'Completed' && this.dueDate < new Date();
});

// Update status to overdue automatically
taskSchema.pre('find', function() {
  this.updateMany(
    { 
      status: { $in: ['Pending', 'In Progress'] },
      dueDate: { $lt: new Date() }
    },
    { status: 'Overdue' }
  );
});

taskSchema.pre('findOne', function() {
  this.updateOne(
    { 
      status: { $in: ['Pending', 'In Progress'] },
      dueDate: { $lt: new Date() }
    },
    { status: 'Overdue' }
  );
});

module.exports = mongoose.model('Task', taskSchema);