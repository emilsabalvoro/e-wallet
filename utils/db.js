const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE wallet (
            userId TEXT PRIMARY KEY,
            balance INTEGER NOT NULL
          )`);

  // Seed function to insert sample data
  const seedData = [
    { userId: 'user1', balance: 1000 },
    { userId: 'user2', balance: 2000 },
    { userId: 'user3', balance: 3000 }
  ];

  const stmt = db.prepare(`INSERT INTO wallet (userId, balance) VALUES (?, ?)`);
  seedData.forEach(data => {
    stmt.run(data.userId, data.balance);
  });
  stmt.finalize();

  console.log('Sample data has been inserted into the database.');
});

module.exports = db;
