import express from 'express';
import validateLogin from '../middlewares/validateLogin.js';

const router = express.Router();

router.post('/login', validateLogin, (req, res) => {
  const user = req.user;
  res.status(200).json({ message: 'Inloggningen lyckades', userId: user.userId });
});

export default router;
