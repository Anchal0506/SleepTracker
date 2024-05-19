const getSampleSleepRecord = (userId) => {
  return {
    userId: userId ?? Math.floor(Math.random() * 1000) + 1,
    hours: Math.floor(Math.random() * 12) + 1,
    timestamp: new Date().getTime(),
  };
};

const getArrayOfSleepRecord = (userId, count) => {
  userId = userId ?? Math.floor(Math.random() * 1000) + 1;
  count = count ?? 10;
  const records = [];
  while (count--) {
    records.push(getSampleSleepRecord(userId));
  }
  return records;
};

module.exports = {
  sampleSleepRecord: getSampleSleepRecord,
  getArrayOfSleepRecord,
};
