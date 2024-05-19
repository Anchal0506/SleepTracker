// index.js
const express = require("express");
const app = express();


// Middleware to parse JSON
app.use(express.json());

// In-memory data store
let sleepRecords = [];
let recordIdCounter = 1;

app.locals.sleepRecords = sleepRecords;

// API Endpoints

// POST /sleep
// can add new record with timestamp and duration
app.post("/sleep", (req, res) => {
  // grab user id , hours and timestamp from body
  const { userId, hours, timestamp } = req.body;

  // if any one of them is missing , send a error
  if (!userId || !hours || !timestamp) {
    return res
      .status(400)
      .json({ error: "userId, hours, and timestamp are required" });
  }

  // function to check valid timestamp
  function isValidTimestamp(timestamp) {
    const date = new Date(timestamp);
    return (
      !isNaN(date.getTime()) && !isNaN(new Date(Number(timestamp)).getTime())
    );
  }

  // Check if the timestamp is a valid number or a valid date string
  if (!isValidTimestamp(timestamp)) {
    return res.status(400).json({ error: "Time Stamp is not valid." });
  }

  // make a new record
  const newRecord = {
    id: recordIdCounter++,
    userId,
    hours,
    timestamp,
  };

  // add new record to records
  sleepRecords.push(newRecord);

  // send status 201 and added record
  res.status(201).json(newRecord);
});

// GET /sleep/:userId
// get all records with specific user id
app.get("/sleep/:userId", (req, res) => {
  // grad user id from params
  const userId = req.params.userId;

  // get user records with user id and sort them by date
  const userRecords = sleepRecords
    .filter((record) => record.userId === userId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // return array of records
  res.json(userRecords);
});

// DELETE /sleep/:recordId
// delete particular record with record id
app.delete("/sleep/:recordId", (req, res) => {
  // grab a record id from params
  const recordId = parseInt(req.params.recordId);

  // find record index using record id
  const recordIndex = sleepRecords.findIndex(
    (record) => record.id === recordId
  );

  // if no record is found return error
  if (recordIndex === -1) {
    return res.status(404).json({ error: "Record not found" });
  }

  // remove record using record index
  sleepRecords.splice(recordIndex, 1);

  // return 204 status for success
  res.status(204).send();
});

// Start the server
module.exports = app;
