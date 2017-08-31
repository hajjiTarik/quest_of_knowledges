var http = require("http");
var https = require("https");

/**
 *
 * @param options
 * @param onResult
 */
exports.getJSON = function(options, onResult)
{
  console.log("rest::getJSON");

  var port = options.port == 443 ? https : http;
  var req = port.request(options, function(res)
  {
    var output = '';
    console.log(options.host + ':' + res.statusCode);
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      output += chunk;
    });

    res.on('end', function() {
      console.log('output', output);
      var obj = JSON.parse(output);
      onResult(res.statusCode, obj);
    });
  });

  req.on('error', function(err) {
    console.log('error: ' + err.message);
  });

  req.end();
};