import express from 'express';
import timetableRoutes from './routes/timetable.route.js';

const app = express();
app.use(express.json());

// 라우터 연결
app.use('/api/timetables', timetableRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));