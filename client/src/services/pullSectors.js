import http from './httpService'
import { apiUrl } from '../config.json'
import testsData from '../model/testSector.json'
import $ from 'jquery'
var CronJob = require('cron').CronJob;

export function updateSectorData() {
  //cron job runs every Friday at 18:00
  const job = new CronJob('0 18 * * 5', function() {

    const apiKey = '07S5MN2IBXDCQAGB'
    let counter = 0
    let thisStockData = {
      name: testsData[counter].Company,
      symbol: testsData[counter].Stock,
      priceData: [],
      adxData: [],
      macdData: []
    }

  //kick off
  const getAdxData = () => {
    $.ajax({
      /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
      url: `https://www.alphavantage.co/query?function=ADX&symbol=${testsData[counter].Stock}&interval=weekly&time_period=10&apikey=${apiKey}`,
      async: true,
      dataType: 'json',
      success: function(res) {
        console.log(thisStockData.symbol)
        // console.log('ADX:')
        // console.log(res)
        Object.entries(res['Technical Analysis: ADX']).forEach(
          ([key, value], index) => {
            thisStockData.adxData.push(Number(value['ADX']))
          }
        )
        getMacdData()
      }
    })
  }

  const getMacdData = () => {
    $.ajax({
      /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
      url: `https://www.alphavantage.co/query?function=MACD&symbol=${testsData[counter].Stock}&interval=weekly&series_type=close&apikey=${apiKey}`,
      async: true,
      dataType: 'json',
      success: function(res) {
        // console.log('MACD:')
        // console.log(res)
        Object.entries(res['Technical Analysis: MACD']).forEach(
          ([key, value], index) => {
            thisStockData.macdData.push(Number(value['MACD']))
          }
        )

        console.log(thisStockData)


        let apiEndpoint = apiUrl + '/updateSectors'
        http.put(apiEndpoint, thisStockData)

        counter++
        if (counter < testsData.length) {
          getPriceData()
          thisStockData = {
            name: testsData[counter].Company,
            symbol: testsData[counter].Stock,
            priceData: [],
            adxData: [],
            macdData: []
          }
        }
      }
    })
  }

  const getPriceData = () => {
    //price data first
    $.ajax({
      /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
      url: `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${testsData[counter].Stock}&apikey=${apiKey}`,
      async: true,
      dataType: 'json',
      success: function(res) {
        // console.log("PRICE: ")
        Object.entries(res['Weekly Time Series']).forEach(
          ([key, value], index) => {
            thisStockData.priceData.push(Number(value['4. close']))
          }
        )
        getAdxData()
      }
    })
  }
  getPriceData()
});

job.start();
}


export async function pullSectorData() {
  let apiEndpoint = apiUrl + '/pullSectors'
  const sectorData = await http.get(apiEndpoint)
  // console.log(sectorData)
  return sectorData
}
