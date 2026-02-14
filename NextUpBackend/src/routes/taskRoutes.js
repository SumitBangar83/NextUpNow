import express from 'express'

import { createTask, getTasks, getJobTasks, updateTask, deleteTask } from '../controllers/taskController.js'

import { protect } from '../middlewares/authMiddleware.js'
const router = express()

router.use(protect)

router.post('/createTask', createTask)

router.get('/getTask', getTasks)

router.get('/getJobTask', getJobTasks)

router.put('/updateTask/:id', updateTask)

router.delete('/deleteTask', deleteTask)

export default router;