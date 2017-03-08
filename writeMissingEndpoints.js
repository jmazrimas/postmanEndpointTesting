var fs = require('fs');

module.exports = {

  stripDomainAndParams: function(url) {
      var subStart = url.indexOf('/rest') == -1 ? 0 : url.indexOf('/rest') + 5
      var subLen = url.indexOf('?')
      subLen = subLen == -1 ? url.length : subLen

      var stringToReturn = url.substring(subStart, subLen)

      var idLocation = stringToReturn.search(/\d/)

      if (idLocation != -1) {
        stringToReturn = stringToReturn.substring(0,idLocation-1)
      }

      return stringToReturn.replace(/\/$/, '');
  },

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
      currentURL = this.stripDomainAndParams(currentURL)


      if (targetUrls[currentURL]) {

      } else {
        targetUrls[currentURL] = true
      }

    }

    // filter down to unique endpoint from required endpoints
    for (var i=0; i<requiredEndP.length; i++) {
      var currentRequest = requiredEndP[i].request
      var currentURL = requiredEndP[i].endpoint
      currentURL = this.stripDomainAndParams(currentURL)

      if (requiredUrls[currentURL]) {

      } else {
        requiredUrls[currentURL] = true
        requiredUrlList.push(currentURL)
      }

    }

    for (i=0; i<requiredUrlList.length; i++) {
      var addressToCheck = requiredUrlList[i]

      if (!targetUrls[addressToCheck] && !missingUrls[requiredEndP[i].endpoint]) {
        // missingUrls.push()
        missingUrls[requiredEndP[i].endpoint] = {
          notes: ""
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
