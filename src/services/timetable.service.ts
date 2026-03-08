import db from '../lib/db.js';

// 모든 시간표 정보 조회
export const getUserTimeTables = (userId: number) => {
  // id, name 외에 신규 필드도 포함하여 조회
  const stmt = db.prepare('SELECT id, name, timeTable, merge FROM TimeTable WHERE userId = ?');
  return stmt.all(userId);
};

export const createUser = (email: string) => {
  try {
    const stmt = db.prepare(`
      INSERT INTO User (email)
      VALUES (?)
  `);

    const info = stmt.run(email);
    return {
      id: Number(info.lastInsertRowid),
      email
    }
  } catch (e: any) {
    if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      throw new Error('Already existing email')
    }
    throw e;
  }
}

// 시간표 생성 (POST)
export const createTimeTable = (userId: number, name: string, timeTable: string = "", merge: string = "") => {
  const stmt = db.prepare(`
    INSERT INTO TimeTable (userId, name, timeTable, merge) 
    VALUES (?, ?, ?, ?)
  `);

  const info = stmt.run(userId, name, timeTable, merge);
  return {
    id: info.lastInsertRowid,
    name,
    timeTable,
    merge
  };
};