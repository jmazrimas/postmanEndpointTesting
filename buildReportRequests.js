var auth = "";

var requestTemplate = function(uuid) {
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
        "raw": "{\n\t\"url\": \"https://app.amper.xyz/#/reports/"+uuid+"/auth/"+auth+"\",\n\t\"waitFor\": \"div.report-heading\",\n\t\"pdf\": {\n\t\t\"format\": \"Letter\"\n\t}\n}"
      },
      "description": ""
    },
    "response": []
  }
}

var curlTemplate = function(uuid, authToken) {
  return "curl -o ~/Downloads/pdftest/"+uuid+".pdf -XPOST -d'{\n\t\"url\": \"https://app.amper.xyz/#/reports/"+uuid+"/auth/"+authToken+"\",\n\t\"waitFor\": \"div.report-heading\",\n\t\"pdf\": {\n\t\t\"format\": \"Letter\"\n\t}\n}' -H\"content-type: application/json\" http://localhost:9000/api/render"
}

module.exports = {
  returnRequests: function(reportData, limit) {
    return reportData.data.reports.map((report) => {
      return requestTemplate(report.uuid);
    }).slice(0, limit || reportData.length)
  },
  returnCurlBash: function(reportData, limit) {
    return reportData.data.reports.map((report, i) => {
      if (!(i % 3)) {
        return curlTemplate(report.uuid, auth+'xxx');
      }
      return curlTemplate(report.uuid, auth);
    }).slice(0, limit || reportData.length).join(" && echo \"done\" &\n")
  }
}
