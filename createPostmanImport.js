var fs = require('fs');
var buildEndpoints = require('./buildEndpoints')
var buildReportRequests =  require('./buildReportRequests')
var writeMissingEndpoints = require('./writeMissingEndpoints')



// var readPostmanFile = function() {
//   var rawData = fs.readFileSync( __dirname + '/marcin.postman_collectionV2.json')
//   return JSON.parse(rawData)
// }

var readReportList = function() {
  var rawData = fs.readFileSync( __dirname + '/reportList.json')
  return JSON.parse(rawData)
}

buildReportRequests.returnRequests(readReportList());

// var psFile = readReportList()
//
// var endpointList = buildEndpoints.returnUniqueEndpoints(psFile,'dev-web2')
//
// var postmanImportShell = {
// 	"variables": [],
// 	"info": {
// 		"name": "PostmanImport",
// 		"_postman_id": "0266b793-8efc-b01d-66fc-e98098fcc985",
// 		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json"
// 	},
// 	"item": [
// 	]
// }
//
// postmanImportShell.item = endpointList
//
// var fileContents = JSON.stringify(postmanImportShell)
//
// fs.writeFile("PORTALpostman-import.json", fileContents, function(err) {
//     if(err) {
//         return console.log(err);
//     }
//
//     console.log("Write import successful");
// });

// writeMissingEndpoints.writeMissing(postmanImportShell)
