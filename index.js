// Title: Simple Task Management API - Node.js (100 lines)

// Import required modules
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory tasks array to store tasks
let tasks = [];



// Sample task structure:
// { id: 1, title: "Sample Task", completed: false }

// Endpoint to get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Endpoint to get a single task by ID
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Endpoint to create a new task
app.post('/tasks', (req, res) => {
    const { title, completed = false } = req.body;
    const newTask = {
        id: tasks.length + 1,
        title,
        completed
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Endpoint to update a task by ID
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    const { title, completed } = req.body;
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title ?? tasks[taskIndex].title,
        completed: completed ?? tasks[taskIndex].completed
    };
    res.json(tasks[taskIndex]);
});

// Endpoint to delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// Endpoint to mark a task as completed
app.patch('/tasks/:id/complete', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    task.completed = true;
    res.json(task);
});

// Endpoint to list only completed tasks
app.get('/tasks/completed', (req, res) => {
    const completedTasks = tasks.filter(t => t.completed);
    res.json(completedTasks);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
