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

// GET /sleep/:userId
app.get('/sleep/:userId', (req, res) => {
    const userId = req.params.userId;
    const userRecords = sleepRecords
                                  .filter(record => record.userId === userId)
                                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
    res.json(userRecords);
  });
  
  // DELETE /sleep/:recordId
  app.delete('/sleep/:recordId', (req, res) => {
    const recordId = parseInt(req.params.recordId);
    const recordIndex = sleepRecords.findIndex(record => record.id === recordId);
  
    if (recordIndex === -1) {
      return res.status(404).json({ error: 'Record not found' });
    }
  
    sleepRecords.splice(recordIndex, 1);
    res.status(204).send();
  });

  

// Start the server
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
