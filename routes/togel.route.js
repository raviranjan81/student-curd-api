import express from 'express';
import { createTogel, getAllToggles, updateTogelStatus } from '../controllers/togel.controller.js';

const router = express.Router();

router.post('/', createTogel);               
router.get('/', getAllToggles);               
router.get('/:type', updateTogelStatus);       

export default router;
