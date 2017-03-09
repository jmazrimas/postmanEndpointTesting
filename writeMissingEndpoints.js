var fs = require('fs');
var cleanUrls = require('./cleanUrls');
var dfData = require('./cleanDF');

module.exports = {

  writeMissing: function(createdImport) {

    var readRequiredEndpoints = function() {
      var rawData = fs.readFileSync( __dirname + '/requiredEndpoints.json')
      return JSON.parse(rawData)
    }

    requiredEndP = readRequiredEndpoints()

    var importEndpoints = createdImport.item
    var targetUrls = {}
    var requiredUrls = {}
    var requiredUrlList = []
    var missingUrls = {}
    var capturedUrls = []

    // filter down to unique endpoint from import
    for (var i=0; i<importEndpoints.length; i++) {
      var currentRequest = importEndpoints[i].request
      var currentURL = importEndpoints[i].request.url
      currentURL = cleanUrls.stripDomainAndParams(currentURL)


      if (targetUrls[currentURL]) {

      } else {
        targetUrls[currentURL] = true
      }

    }

    // filter down to unique endpoint from required endpoints
    for (var i=0; i<requiredEndP.length; i++) {
      var currentRequest = requiredEndP[i].request
      var currentURL = requiredEndP[i].endpoint
      currentURL = cleanUrls.stripDomainAndParams(currentURL)

      if (requiredUrls[currentURL]) {

      } else {
        requiredUrls[currentURL] = true
        requiredUrlList.push(currentURL)
      }

    }

    var datafactoryList = dfData.returnDFData()

    for (i=0; i<requiredUrlList.length; i++) {
      var addressToCheck = requiredUrlList[i]

      if (!targetUrls[addressToCheck] && !missingUrls[requiredEndP[i].endpoint]) {
        // missingUrls.push()
        var note = ""
        if (datafactoryList.indexOf(requiredEndP[i].endpoint) == -1) {
          note = "possible not in DF"
        }

        missingUrls[requiredEndP[i].endpoint] = {
          notes: note
        }
      }

      if (targetUrls[addressToCheck]) {
        capturedUrls.push(addressToCheck)
      }
    }

    var fileContents = JSON.stringify(missingUrls)

    fs.writeFile("missingEndpoints.json", fileContents, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("Write missing successful, missing=", Object.keys(missingUrls).length, "total=", requiredUrlList.length);
    });

  }
}
