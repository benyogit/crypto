const db = require('../util/database');

module.exports = class Rates {
  constructor(id, item) {
    this.id = id;
    this.item = item;
  }

  static fetchAllCurrentRates() {
    return db.execute('SELECT * FROM rates');
  }

  static fetchAllHistoricalRates() {
    return db.execute('SELECT * FROM rates_history');
  }

  static post(item) {
    return db.execute('INSERT INTO groceries (item) VALUES (?)', [item]);
  }

  static updateRates(crypto_code, rate) {
    return db.execute('UPDATE rates SET rate = ? WHERE crypto_code = ?', [rate, crypto_code]);
  }

  static addRatesToHistory() {
    return db.execute('INSERT INTO rates_history (fiat_code,crypto_code,rate)  SELECT fiat_code,crypto_code,rate FROM rates');
  }
};
