const mongoose = require('mongoose');

const StatisticSchema = new mongoose.Schema({
  firstStats: { type: Number},
  secondStats: { type: Number},
  thirdStats: { type: Number},
  lastUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Statistic', StatisticSchema);
