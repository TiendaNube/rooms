'use strict';
const moment = require('moment')
const calendar = require('./calendar')

const { WebClient } = require('@slack/client');

module.exports.getRoomInfo = (event, context, callback) => {
  const now = moment()
  const room = event.queryStringParameters.number
  const allSchedule = event.queryStringParameters.allSchedule
  const roomSlug = `sala-${room}`
  if (!calendar.roomExists(roomSlug)) {
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

    const now = moment()

    const currentEvent = schedule.find(slot => now.isBetween(slot.start, slot.end)) || null

    console.log(allSchedule)
    console.log(`${allSchedule=="true"}`)

    const scheduleResponse=allSchedule=="true"?schedule:currentEvent

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        name: calendar.getRoomName(roomSlug),
        schedule: scheduleResponse
      }),
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      }
    }
    callback(null, response)
  })
}

module.exports.getSlackUser = (event, context, callback) => {
  const email = event.queryStringParameters.email
  const token = "xoxp-12084044420-43634838320-344247578066-b314680bd768de65cd672b22cf77660b"
  const web = new WebClient(token);

  web.users.lookupByEmail({token, email}).then((resSlack) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        slackUser: resSlack.user
      }),
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      }
    }
    callback(null, response)
  }).catch(console.error)
}
