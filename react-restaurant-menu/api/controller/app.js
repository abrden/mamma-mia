let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let loginResponse = require('../login/router');

const port = 9000;

    createServer();

function createServer() {
    var app = express();

    app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Credentials', "true");
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Methods', 'GET,POST');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, api_key, token');
      if ('OPTIONS' == req.method) {
          res.sendStatus(200);
      } else {
          next();
      }
  });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.set('port', port);

    app.use(express.static(path.join(__dirname, 'static')));

    var router = express.Router();
    router.use('/login', loginResponse);
    app.use('/login', router);


    var server = app.listen(app.get('port'), () => {
      console.log("Express server listening on port %d ", port);
    });

}