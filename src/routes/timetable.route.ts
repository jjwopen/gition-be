import { Router } from 'express';
import {getTimeTables, postTimeTable, registerUser} from '../controllers/timetable.controller.js';

const router = Router();
router.get('/', getTimeTables); // GET /api/timetables?userId=1
router.post('/', registerUser);
router.post('/', postTimeTable);

export default router;