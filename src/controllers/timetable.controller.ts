import type {Request, Response} from 'express';
import * as TimeTableService from '../services/timetable.service.js';

export const getTimeTables = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.query.userId as string);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "유효한 userId가 필요합니다." });
    }

    const data = TimeTableService.getUserTimeTables(userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({error: "email required"})
    }

    const newUser = TimeTableService.createUser(email);
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({error: "error"})
  }
}

export const postTimeTable = async (req: Request, res: Response) => {
  try {
    const { userId, name, timeTable, merge } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ error: "userId와 name은 필수입니다." });
    }

    // 서비스 호출 시 새로운 필드 전달
    const newTable = TimeTableService.createTimeTable(
        Number(userId),
        name,
        timeTable || "",
        merge || ""
    );

    res.status(201).json(newTable);
  } catch (error) {
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
};