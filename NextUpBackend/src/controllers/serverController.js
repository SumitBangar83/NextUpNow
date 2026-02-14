import express from 'express';

const router = express.Router()


const serverCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Server is running fine!",
    timestamp: new Date().toISOString(),
  });
};

router.get('/serverCheck',serverCheck)

export default router;