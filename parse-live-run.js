var fs = require('fs');

var readPostmanFile = function() {
  var rawData = fs.readFileSync( __dirname + '/Portal Live Run 3.postman_collection.json')
  return JSON.parse(rawData)
}

var psFile = readPostmanFile()

var returnUniqueEndpoints = function(psFile, domain) {

  var existingEndpoints = {}
  var uniqueEndpoints = []
  var endpoints = psFile.item

  for (var i=0; i<endpoints.length; i++ ) {
    var currentEP = endpoints[i].request
    if (existingEndpoints[currentEP.method] && existingEndpoints[currentEP.method][currentEP.url]){
    } else {
      if(!existingEndpoints[currentEP.method]) { existingEndpoints[currentEP.method] = {}}
      existingEndpoints[currentEP.method][currentEP.url] = true

      if (domain) {
        currentEP.url = subURL(currentURL, domain)
      }

      uniqueEndpoints.push(currentEP)
    }
  }

  return uniqueEndpoints

}

var subURL = function(currentURL, domain) {

}

returnUniqueEndpoints(psFile)
