// index.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory data store
let sleepRecords = [];
let recordIdCounter = 1;

// API Endpoints

// POST /sleep
app.post('/sleep', (req, res) => {
  const { userId, hours, timestamp } = req.body;

  if (!userId || !hours || !timestamp) {
    return res.status(400).json({ error: 'userId, hours, and timestamp are required' });
  }

  const newRecord = {
    id: recordIdCounter++,
    userId,
    hours,
    timestamp
  };

  sleepRecords.push(newRecord);
  res.status(201).json(newRecord);
});

// Start the server
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
