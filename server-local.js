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

app.post('/api/rooms/:room/:time', function (req, res, next) {
  let roomSlug = req.params.room
  let minutesToBook = req.params.time
  if (!calendar.roomExists(roomSlug)) { res.status(404).json({ error: "Room not found" }); next(); return; }

  let now = moment()
  calendar.getSchedule(req.params.room, now, (err, schedule) => {
    if (err) { res.status(500).json({ error: err}); next(); return; }

    let freeSlot = schedule.find((slot) => canBookRoomFromNow(slot, minutesToBook))
    if( ! freeSlot ) { res.status(409).json({ error: "Room is busy right now" }); next(); return; }

    freeSlot = {
      start: moment().subtract(3, 'hours'),
      end: moment().add(minutesToBook, 'minutes').subtract(3, 'hours'),
      summary: 'Reservado por IoNube',
      organizer: JSON.stringify({
          email: '@IoNube'
        }),
      available: false,
      private: false
    }

    schedule.forEach(function(part, index, newSchedule) {
      if(moment().isBetween(part.start, part.end)){
        newSchedule[index].start = freeSlot.start;
        newSchedule[index].end = freeSlot.end;
        newSchedule[index].summary = freeSlot.summary;
        newSchedule[index].organizer = freeSlot.organizer;
        newSchedule[index].available = freeSlot.available;
        newSchedule[index].private = freeSlot.private;
      }
    });

    res.json({
      name: calendar.getRoomName(roomSlug),
      schedule: schedule
    })
  })
})

function canBookRoomFromNow(slot, minutesToBook){
  return moment().isBetween(slot.start, slot.end) && slot.available && slot.start.unix() + minutesToBook * 60 <= slot.end.unix()
}

app.use(history())
app.use(express.static('src'))

app.listen(port, function(err) {
  if (err) {
    console.error("Error starting server:\n", err.stack)
    process.exit(1)
  }
  console.log('API available at port '+ port);
});
