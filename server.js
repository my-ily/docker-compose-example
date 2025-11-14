import express from 'express';
import pool from './db';

const app = express();
const port = 3000;

app.use(express.json());

// اختبار السيرفر
app.get("/", async (req, res) => {
  res.status(200).send("Hello World");
});

// إنشاء جدول schools
app.get("/setup", async (req, res) => {
  try {
    await pool.query(
      'CREATE TABLE IF NOT EXISTS schools(id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))'
    );
    res.status(200).send({ message: "Table created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});


// إضافة مدرسة جديدة
app.post("/", async (req, res) => {
  const { name, location } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO schools(name, address) VALUES($1, $2) RETURNING *',
      [name, location]
    );

    res.status(201).send({
      message: "School added successfully",
      school: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
