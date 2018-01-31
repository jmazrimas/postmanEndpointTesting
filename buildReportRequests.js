var auth = "";
var urlString = function (uuid, authToken) {

  var urlString = {
    "url": "https://app.amper.xyz/#/reports/"+uuid+"/auth/"+authToken,
    "pdf": {
      "format": "Letter"
    },
    // "goto": {
    //   "waitUntil": "networkidle",
    //   "networkIdleTimeout": 1000,
    //   "networkIdleInflight": 0
    // }
    "waitFor": 10000,
  }

  return JSON.stringify(urlString, null, "\t")+"' -H\"content-type: application/json\" http://localhost:9000/api/render"
  // return "{\n\t\"url\": \"https://app.amper.xyz/#/reports/"+uuid+"/auth/"+authToken+"\",\n\t\"pdf\": {\n\t\t\"format\": \"Letter\"\n\t}\n}' -H\"content-type: application/json\" http://localhost:9000/api/render"
}

var requestTemplate = function(uuid, authToken) {
  return {
    "name": "url-to-pdf-api "+uuid,
    "request": {
      "url": "http://localhost:9000/api/render",
      "method": "POST",
      "header": [
        {
          "key": "Content-Type",
          "value": "application/json",
          "description": ""
        }
      ],
      "body": {
        "mode": "raw",
        "raw": urlString(uuid, authToken)
      },
      "description": ""
    },
    "response": []
  }
}

var curlTemplate = function(uuid, authToken) {
  return "curl -o ~/Downloads/pdftest/"+uuid+".pdf -XPOST -d'"+urlString(uuid, auth);
}

module.exports = {
  returnRequests: function(reportData, limit) {
    return reportData.data.reports.map((report) => {
      return requestTemplate(report.uuid, auth);
    }).slice(0, limit || reportData.length)
  },
  returnCurlBash: function(reportData, limit) {
    return reportData.data.reports
    .map((report, i) => {
      return curlTemplate(report.uuid, auth);
    }).slice(0, limit || reportData.length).join(" && echo \"done\" &\n")+"\n wait \n exit"
  }
}
//
