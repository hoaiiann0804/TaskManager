
const Task = require('../models/tasks')

const createTask = async (req, res) => {
    try {
        const { title, description, deadline, status, labels } = req.body
        if (!title || !deadline) {
            return res.status(400).json({ message: 'Title and deadline are required' })
        }
        const newTask = new Task({
            title,
            description,
            deadline,
            status: status || 'todo',
            labels: labels || [],
            owner: req.user.id
        })
        await newTask.save()
        res.status(201).json({ 
            success: true,
            data: newTask,
            message: 'Task created successfully' 
        })
    }
    catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        })
    }

}

const getTasks = async (req, res) => {

    try {
        const filter = ({ owner: req.user.id })
        if (req.query.status) {
            filter.status = req.query.status
        }
        if (req.query.labels) {
            filter.labels = req.query.labels
        }
        const sort = {}
        if (req.query.sort === 'deadline') {
            sort.deadline = 1
        }
        if (req.query.search) {
            const searchKeyWord = { $regex: req.query.search, $options: 'i' }
            filter.$or = [
                { title: searchKeyWord },
                { description: searchKeyWord },
                { labels: searchKeyWord },
                { status: searchKeyWord }
            ]   
        }
        

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit
        const tasks = await Task.find(filter).sort(sort).skip(skip).limit(limit)
        const totalTasks = await Task.countDocuments(filter)
        const totalPages = Math.ceil(totalTasks / limit)
        if (tasks.length === 0) return res.status(404).send({ message: 'No tasks found' })
        res.json({ 
            success: true,
            data: tasks,
            pagination: {
                page, 
                limit, 
                totalTasks, 
                totalPages
            },
            message: 'Tasks retrieved successfully'
        })
    }
    catch (error) {
        res.status(500).send({ 
            success: false,
            message: error.message 
        })
    }
}
const getStaskById = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        if (!task) return res.status(404).send({ message: 'Task not found' })
        res.json({
            success: true,
            data: task,
            message: 'Task retrieved successfully'
        })
    }
    catch (error) {
        res.status(500).send({ 
            success: false,
            message: error.message 
        })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndUpdate({ _id: id, owner: req.user.id }, req.body, { new: true, runValidators: true })
        if (!task) return res.status(404).send({ message: 'Not authorized Task not found' })
        if (!task.title || !task.deadline) return res.status(400).send({ message: 'Title and deadline are required' })
        res.json({
            success: true,
            data: task,
            message: 'Task updated successfully'
        })
    }
    catch (error) {
        res.status(500).send({ 
            success: false,
            message: error.message 
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findOneAndDelete({ _id: id, owner: req.user.id })
        if (!task) return res.status(403).json({ message: 'Not authorized and task not found' });
        res.json({ 
            success: true,
            message: 'Task deleted successfully' 
        })
    }
    catch (error) {
        res.status(500).send({ 
            success: false,
            message: error.message 
        })
    }
}

const filterByStatus = async (req, res) => {
    try {
        const { status } = req.query
        const tasks = await Task.find({ status })
        if (!tasks) return res.status(404).send({ message: 'No task found' })
        res.json({
            success: true,
            data: tasks,
            message: 'Tasks filtered successfully'
        })
    }
    catch (error) {
        res.status(500).send({ 
            success: false,
            message: error.message 
        })
    }
}

const UpdateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body
        const task = await Task.findOne({ _id: id, owner: req.user.id })
        if (!task ) return res.status(403).json({ message: 'Not authorized' });
        task.status = status
        await task.save()
        res.json({
            success: true,
            data: task,
            message: 'Task status updated successfully'
        })
    }
    catch (error) {
        res.status(500).send({ 
            success: false,
            message: error.message 
        })
    }
}



module.exports = { 
    createTask, 
    getTasks, 
    getStaskById, 
    updateTask, 
    deleteTask, 
    filterByStatus, 
    UpdateStatus,
    // getTaskStatistics,
    // bulkCreateTasks,
    // getTasksByDate
}

