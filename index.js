/**
 * Created by JoshuaStroup on 3/13/2016.
 */
var https = require('https');

var Recaptcha = {};

Recaptcha.verify = function(key, response, callback) {
  var opts = {
    host: 'www.google.com',
    port: 443,
    path: '/recaptcha/api/siteverify',
    method: 'POST',
	headers: { 'Content-Type': 'application,json' },
	json: { secret: key, response: response }
    //body: JSON.stringify({ secret: key, response: response })
  };

  var req = https.request(opts, function(res) {
    var body = [];
    res.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      response = JSON.parse(body);

      if(response.success) {
        callback.call(this, true);
      } else {
        for(var i = 0; i < response['error-codes'].length; i++)
          console.log(response['error-codes'][i]);
        callback.call(this, false);
      }
    });
  });
  req.end();

  req.on('error', function(error) {
    console.log(error);
    callback.call(this, false);
  });
};

module.exports = Recaptcha;