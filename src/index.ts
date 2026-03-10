import express from 'express';
import timetableRoutes from './routes/timetable.route.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 라우터 연결
app.use('/api/', timetableRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));