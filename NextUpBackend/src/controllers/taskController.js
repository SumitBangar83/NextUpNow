import asyncHandler from "express-async-handler";
import Task from "../models/Task.js";
import User from "../models/User.js"; // User model ko import kar rahe hain, just in case.

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private (Logged-in user)
const createTask = asyncHandler(async (req, res) => {
  // Request body se task ki details nikaalo
  console.log("req hit for create Task")
  const {
    taskName,
    description,
    link,
    isJobTask,
    isRecurring,
    priority,
    deadline,
  } = req.body;

  // taskName required hai
  if (!taskName) {
    res.status(400);
    throw new Error("Task name is required");
  }
  console.log("req all data fetched")

  // Naya task create karo
  const task = new Task({
    userId: req.user._id, // Logged-in user ki ID middleware se aa rahi hai
    taskName,
    description,
    link,
    isJobTask,
    isRecurring,
    priority,
    deadline,
    // Baki fields default values le lengi (status: "Pending", startTime: Date.now)
  });

  // Task ko database me save karo
  const createdTask = await task.save();
  console.log("req all good response : 201")
  res.status(201).json({ success: true, message: 'Task successfully created', createdTask });
});

// @desc    Get all tasks for a logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  // Sirf logged-in user ke tasks dhundo
  const tasks = await Task.find({ userId: req.user._id });
  res.status(200).json(tasks);
});

// @desc    Get only job-related tasks for a logged-in user
// @route   GET /api/tasks/jobs
// @access  Private
const getJobTasks = asyncHandler(async (req, res) => {
  // Sirf logged-in user ke job tasks dhundo (jinka isJobTask true hai)
  const jobTasks = await Task.find({ userId: req.user._id, isJobTask: true });
  res.status(200).json(jobTasks);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  // URL se task ki ID nikaalo
  const taskId = req.params.id;
  const task = await Task.findById(taskId);

  // Check karo ki task exist karta hai ya nahi
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check karo ki task user ka hi hai ya nahi
  // task.userId ek object hai, isliye .toString() use karna zaroori hai
  if (task.userId.toString() !== req.user._id.toString()) {
    res.status(401); // Unauthorized
    throw new Error("User not authorized to update this task");
  }

  // Task ki fields ko request body se update karo
  task.taskName = req.body.taskName || task.taskName;
  task.description = req.body.description || task.description;
  task.link = req.body.link || task.link;
  task.isJobTask = req.body.isJobTask !== undefined ? req.body.isJobTask : task.isJobTask;
  task.isRecurring = req.body.isRecurring !== undefined ? req.body.isRecurring : task.isRecurring;
  task.priority = req.body.priority || task.priority;
  task.status = req.body.status || task.status;
  task.conclusion = req.body.conclusion || task.conclusion;
  task.deadline = req.body.deadline || task.deadline;

  // Logic: Agar status 'Completed' ho raha hai, toh timeTaken calculate karo
  if (req.body.status === "Completed" && task.status !== "Completed") {
    const startTime = new Date(task.startTime).getTime();
    const completionTime = Date.now();
    // Time difference minutes me calculate karo
    task.timeTaken = Math.round((completionTime - startTime) / (1000 * 60));
  }

  // Updated task ko save karo
  const updatedTask = await task.save();
  res.status(200).json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);

  // Check karo ki task exist karta hai
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check karo ki task user ka hi hai
  if (task.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized to delete this task");
  }

  // Task ko remove karo
  await task.deleteOne(); // Use deleteOne() for modern Mongoose versions
  res.status(200).json({ message: "Task removed successfully" });
});

export { createTask, getTasks, getJobTasks, updateTask, deleteTask };