var fs = require('fs');

module.exports = {
  writeTested: function(endpointList) {

    var listString = "";

    Object.keys(endpointList).map(function(objectKey, index) {
        var verb = objectKey;
        var endpoints = endpointList[objectKey];

        Object.keys(endpoints).map(function(objectKey, index) {
          listString += verb
          listString += objectKey
          listString += '\n'
        });

    });


    fs.writeFile("testedWhitelist.txt", listString, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("Write tested whitelist successful");
    });

  }
}
