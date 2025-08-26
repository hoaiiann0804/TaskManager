const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { 
    createTask, 
    getTasks, 
    getStaskById, 
    updateTask, 
    deleteTask, 
    filterByStatus, 
    UpdateStatus,
    getTaskStatistics,
    bulkCreateTasks,
    getTasksByDate
} = require('../controllers/task.controller');

// Basic CRUD operations
router.post('/create', authMiddleware, createTask)
router.get('/get', authMiddleware, getTasks)
router.get('/get/:id', authMiddleware, getStaskById)
router.put('/update/:id', authMiddleware, updateTask)
router.delete('/delete/:id', authMiddleware, deleteTask)

// Filtering and status updates
router.get('/filter', authMiddleware, filterByStatus)
router.patch('/updateStatus/:id', authMiddleware, UpdateStatus)

// New enhanced endpoints
// router.get('/statistics', authMiddleware, getTaskStatistics)
// router.post('/bulk-create', authMiddleware, bulkCreateTasks)
// router.get('/calendar', authMiddleware, getTasksByDate)

module.exports = router;