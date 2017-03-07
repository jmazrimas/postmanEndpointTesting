var fs = require('fs');

var readRequiredEndpoints = function() {
  var rawData = fs.readFileSync( __dirname + '/requiredEndpoints.json')
  return JSON.parse(rawData)
}

var requiredEndpoints = readRequiredEndpoints()

var writeMissing = function(requiredE, returnedE) {
  
}
