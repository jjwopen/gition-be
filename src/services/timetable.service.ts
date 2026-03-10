import db from '../lib/db.js';

export const getUserTimeTables = (userId: number) => {
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

export const createTimeTable = (userId: number, tableName: string, timeTable: string = "", merge: string = "", subjectNames: string[]) => {
  const execute = db.transaction((uId: number, n: string, tt: string, mg: string, sNames: string[]) => {
    const tableStmt = db.prepare(`
        INSERT INTO TimeTable (userId, name, timeTable, merge)
        VALUES (?, ?, ?, ?)
    `);
    const tableInfo = tableStmt.run(uId, n, tt, mg);
    const tableId = tableInfo.lastInsertRowid;

    const subjectStmt = db.prepare(`
        INSERT INTO Subject (name, timeTableId)
        VALUES (?, ?)
    `);

    for (const sName of sNames) {
      subjectStmt.run(sName, tableId);
    }

    return tableId;
  });

  const newTableId = execute(userId, tableName, timeTable, merge, subjectNames);

  return {
    id: Number(newTableId),
    userId,
    name: tableName,
    subjectNames
  };
};

export const createDoc = (subjectId: number, docTitle: string) => {
  const stmt = db.prepare(`
  INSERT INTO Subject (title, body, subjectId)
    VALUES (?, ?, ?)
  `);

  const info = stmt.run(docTitle, "", subjectId);
  return {
    id: Number(info.lastInsertRowid),
    docTitle
  }
}

export const patchDoc = (id: number, title?: string, body?: string) => {
  const stmt = db.prepare(`
      UPDATE Doc
      SET title = COALESCE(?, title),
          body  = COALESCE(?, body)
      WHERE id = ?
  `);

  const info = stmt.run(title ?? null, body ?? null, id);

  if ( info.changes === 0 ) {
    throw new Error("Cannot find doc");
  }

  return db.prepare('SELECT * FROM Doc WHERE id = ?').get(id);
}