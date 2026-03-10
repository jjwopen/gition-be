import { Router } from 'express';
import {
  getDocs, getSubjects,
  getTimeTables,
  postDoc,
  postTimeTable,
  registerUser,
  updateDoc
} from '../controllers/timetable.controller.js';

const router = Router();
router.get('/timetable/get/', getTimeTables);
router.get('/subject/get/', getSubjects);
router.get('/doc/get/', getDocs);
router.post('/user/post', registerUser);
router.post('/timetable/post', postTimeTable);
router.post('/doc/post', postDoc);
router.post('/doc/update', updateDoc);

export default router;