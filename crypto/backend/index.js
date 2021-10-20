const bodyParser       = require("body-parser");
const cors             = require("cors");
const express          = require("express");
const axios            = require('axios');
const cron             = require('node-cron');
const Rates = require('./models/rates');

const ratesRoutes      = require("./routes/ratesRoutes");

const app = express();
///0 */45 * * * *

// proccess.env in production/staging/development for replacing to sandbox/production URI ...
const COIN_MARKET_URI = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

/// this 'cron Job' SHOULD BE PART OF AN AWS LAMBDA FUNCTION OR OUTER SERVICE
cron.schedule('0 */5 * * * *', () => {
    fetchRatesFromCryptoMarketAndUpdateTable();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.use("/api/rates", ratesRoutes);

app.listen(5000, () => {
    console.log(`listening on port ${5000}!`);
});


/// The 'CRON' PART SHOULD BE PART OF AN AWS LAMBDA FUNCTION OR OUTER SERVICE
//  I guess there were  get params that can give just the 3 COIN and not all of them
const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
      'start': '1',
      'limit': '5',
      'convert': 'USD',
      
    },
    headers: {
      'X-CMC_PRO_API_KEY': 'YOUR_API_KEY'
    },
    json: true,
    gzip: true
  };

const fetchRatesFromCryptoMarketAndUpdateTable = async () => {
    try {
        const resp = await axios.get(COIN_MARKET_URI ,requestOptions);
        const allCryptos = resp.data.data;
        //  I guess there were get params that can give just the 3 COIN and not all of them
        //  BUT I WAS SHORT IN TIME SO I did the filtering manually  
        const filtered   = allCryptos.filter((coin) => { return ['ETH','BTC','LTC'].indexOf(coin.symbol) > -1 ;});
        const mapped     = filtered.map((coin) => { return {crypto_code: coin.symbol, rate: coin.quote['USD']['price']};});
        insertToRatesHistoryAndUpdateRates(mapped);
    } catch (err) {
        console.error(err);
    }
};

const insertToRatesHistoryAndUpdateRates =  async (newestRates) => {
    try {
        await Rates.addRatesToHistory();
        for(let rate of newestRates){
            await Rates.updateRates(rate.crypto_code, rate.rate);
        }
    } catch (err) {
        console.error(err);
    }
};

