import Database from 'better-sqlite3';

const db: Database.Database = new Database('local.db', {verbose: console.log});

// 외래 키 제약 조건 활성화 (필수)
db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS User
    (
        id    INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE
    );

    CREATE TABLE IF NOT EXISTS TimeTable
    (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        name      TEXT    NOT NULL,
        timeTable TEXT,
        merge     TEXT,
        userId    INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES User (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Subject
    (
        id       INTEGER PRIMARY KEY AUTOINCREMENT,
        name     TEXT    NOT NULL,
        timeTableId INTEGER NOT NULL,
        FOREIGN KEY (timeTableId) REFERENCES TimeTable (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Doc
    (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        title       TEXT    NOT NULL,
        body        TEXT,
        subjectId INTEGER NOT NULL,
        FOREIGN KEY (subjectId) REFERENCES Subject (id) ON DELETE CASCADE
    );
`);

export default db;