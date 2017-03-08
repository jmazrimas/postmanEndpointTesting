var fs = require('fs');
var buildEndpoints = require('./buildEndpoints')
var writeMissingEndpoints = require('./writeMissingEndpoints')

var readPostmanFile = function() {
  var rawData = fs.readFileSync( __dirname + '/Portal Live Run 3.postman_collection.json')
  return JSON.parse(rawData)
}

var psFile = readPostmanFile()

var endpointList = buildEndpoints.returnUniqueEndpoints(psFile,'dev-web2')

var postmanImportShell = {
	"variables": [],
	"info": {
		"name": "PostmanImport",
		"_postman_id": "0266b793-8efc-b01d-66fc-e98098fcc985",
		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json"
	},
	"item": [
	]
}

postmanImportShell.item = endpointList

var fileContents = JSON.stringify(postmanImportShell)

fs.writeFile("NEWpostman-import.json", fileContents, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Write import successful");
});

writeMissingEndpoints.writeMissing(postmanImportShell)
