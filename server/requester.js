var http = require("http");
var https = require("https");

/**
 *
 * @param options
 * @param onResult
 */
exports.getJSON = function(options, onResult)
{

  var port = options.port === 443 ? https : http;
  var req = port.request(options, function(res) {
    var output = '';
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      output += chunk;
    });

    res.on('end', function() {
      var obj = JSON.parse(output);
      onResult(res.statusCode, obj);

      console.log('\x1b[32m','Data received : done');
    });
  });

  req.on('error', function(err) {
    console.log('\x1b[31m','error: ' + err.message);
  });

  req.end();
};