import express from 'express';
import { createTogel, getAllToggles, getTogelByType } from '../controllers/togel.controller.js';

const router = express.Router();

router.post('/', createTogel);               
router.get('/', getAllToggles);               
router.get('/:type', getTogelByType);       

export default router;
