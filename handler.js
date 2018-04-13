'use strict';
const moment = require('moment')
const calendar = require('./calendar')

module.exports.getSalaInfo = (event, context, callback) => {
  const now = moment()
  const room=event.queryStringParameters.number
  const roomSlug = `sala-${room}`
  if (!calendar.roomExists(roomSlug)) {
    console.log("entro")
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        error: "Room not found"
      }),
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      }
    }
    callback(null, response)
  }

  calendar.getSchedule(roomSlug, now, (err, schedule) => {
    if (err) {
      const responseError = {
        statusCode: 500,
        body: JSON.stringify({
          err
        }),
        headers: {
          "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        }
      }
      callback(null, responseError)
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        name: calendar.getRoomName(roomSlug),
        schedule: schedule
      }),
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      }
    }
    callback(null, response)

    })
}
