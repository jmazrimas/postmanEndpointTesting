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
        "raw": "{\n\t\"url\": \"https://app.amper.xyz/#/reports/"+uuid+"/auth/a78d1e7176f34e318f9f68770c03973e\",\n\t\"waitFor\": 5000,\n\t\"pdf\": {\n\t\t\"format\": \"Letter\"\n\t}\n}"
      },
      "description": ""
    },
    "response": []
  }
}

module.exports = {
  returnRequests: function(reportData, limit) {
    return reportData.data.reports.map((report) => {
      return requestTemplate(report.uuid);
    }).slice(0, limit || reportData.length)
  }
}
