// server.js
// where your node app starts

// init project
const express = require('express');

const app = express();
const sassMiddleware = require('node-sass-middleware');

app.use(
  sassMiddleware({
    src: `${__dirname}/public`,
    dest: '/tmp',
  })
);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('/tmp'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(`${__dirname}/views/index.html`);
});

app.get('*', function(request, response) {
  response.redirect(`https://${request.headers.host}${request.url}`);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
