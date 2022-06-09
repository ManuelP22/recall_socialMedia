import express from 'express';

import { singin, singup } from '../controllers/user.js';

router.post('/singin', singin);
router.post('/singup', singup);

const router = express.Router();

export default router;