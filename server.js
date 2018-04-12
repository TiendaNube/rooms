require('dotenv').config()

const moment = require('moment')
const calendar = require('./calendar')
const express = require('express')
const history = require('connect-history-api-fallback')
const cors = require('cors');
const path = require('path')
// use it before all route definitions
const app = express()
const port = process.env.PORT

const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

//TODO Esta linea se mata cuando damos de baja webpack server
app.use(cors());

app.get('/sala-*', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
})

app.get('/api/user/:email', function (req, res, next) {
  let email = req.params.email
  web.users.lookupByEmail({token, email}).then((resSlack) => {
    res.json({
      slackUser: resSlack.user,
    })
  }).catch(console.error)
})


app.get('/api/rooms/:room', function (req, res, next) {
  let roomSlug = req.params.room
  if (!calendar.roomExists(roomSlug)) { res.status(404).json({ error: "Room not found" }); next(); return; }

  var now = moment()

  calendar.getSchedule(req.params.room, now, (err, schedule) => {
    if (err) { res.status(500).json({ error: err }); next(); return; }


    var now = moment()
    var currentEvent = schedule.find(slot => now.isBetween(slot.start, slot.end)) || null
    var slackUser = null
    if(currentEvent != null){
      var owner = currentEvent.organizer
      if(owner != null){
        web.users.lookupByEmail({token: token, email: owner.email}).then((resSlack) => {
          res.json({
            name: calendar.getRoomName(roomSlug),
            slackUser: resSlack.user.name,
            schedule: schedule
          })
        }).catch(console.error)
      }else{
        res.json({
          name: calendar.getRoomName(roomSlug),
          slackUser: null,
          schedule: schedule
        })
      }
    }else{
      res.json({
        name: calendar.getRoomName(roomSlug),
        slackUser: null,
        schedule: schedule
      })
    }

  })
})


// Quickly book a room for 15'. No args needed (for the time being)
app.post('/api/rooms/:room/:time', function (req, res, next) {
  let roomSlug = req.params.room
  if (!calendar.roomExists(roomSlug)) { res.status(404).json({ error: "Room not found" }); next(); return; }

  let now = moment()

  calendar.getSchedule(req.params.room, now, (err, schedule) => {
    if (err) { res.status(500).json({ error: err}); next(); return; }

    let freeSlot = schedule.find((s) => now.isBetween(s.start, s.end) && s.available )
    if( ! freeSlot ) { res.status(409).json({ error: "Room is busy right now" }); next(); return; }

    let event = {
      start: now.startOf('minute'),
      end: moment.min(now.clone().add(req.params.time, 'minute'), freeSlot.end), // Make sure we don't overbook the room
      summary: "Reservada desde IONube"
    }

    calendar.bookEvent(req.params.room, event, (err, newEvent) => {
      if (err) { res.status(500).json({ error: err }); next(); return; }

      schedule.push(newEvent)
      schedule = calendar.unifySchedule(schedule)

      res.json({
        name: calendar.getRoomName(roomSlug),
        schedule: schedule
      })
    })

  })
})

app.use(history())
app.use(express.static('src'))

app.listen(port, function(err) {
  if (err) {
    console.error("Error starting server:\n", err.stack)
    process.exit(1)
  }
  console.log('API available at port '+ port);
});
