require('dotenv').config()

const express = require('express')
const history = require('connect-history-api-fallback')
const cors = require('cors');
const path = require('path')
// use it before all route definitions
const app = express()
const port = process.env.PORT


//TODO Esta linea se mata cuando damos de baja webpack server
app.use(cors());
app.get('/sala-*', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
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
