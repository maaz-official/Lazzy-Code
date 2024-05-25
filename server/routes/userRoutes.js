import express from 'express';
import { signin, signup } from '../controllers/userController.js';
import { generateStrongPassword } from '../helper/generateStrongPassword.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);
// Signup route
router.post('/signin', signin);

// Password suggestion route
router.get('/suggest-password', (req, res) => {
    const strongPassword = generateStrongPassword();
    res.status(200).json({ password: strongPassword });
});

export default router;
