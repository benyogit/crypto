const Rates = require('../models/rates');

exports.getCurrentRates = async (req, res, next) => {
  try {
    const [allRates] = await Rates.fetchAllCurrentRates();
    res.status(200).json(allRates);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

function manipulateDataToJSONStracture(allHistoricalRates){
  let json = {}
  for (let rate of allHistoricalRates){
    if(json[`${rate.fiat_code}-${rate.crypto_code}`]){
      const temp = json[`${rate.fiat_code}-${rate.crypto_code}`].concat([{rate:rate.rate, time:rate.time}]);
      json[`${rate.fiat_code}-${rate.crypto_code}`] = temp;
    }
    else{
      json[`${rate.fiat_code}-${rate.crypto_code}`] = [{rate:rate.rate, time:rate.time}];
    }
    
  }
  return json;
}

exports.getHistoricalRates = async (req, res, next) => {
  try {
    const [allHistoricalRates] = await Rates.fetchAllHistoricalRates();
    const responseData         = manipulateDataToJSONStracture(allHistoricalRates);
    res.status(200).json(responseData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};




