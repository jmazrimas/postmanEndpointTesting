module.exports = {
  returnUniqueEndpoints: function(psFile, domain) {

    var existingEndpoints = {}
    var uniqueEndpoints = []
    var endpoints = psFile.item

    for (var i=0; i<endpoints.length; i++ ) {
      var currentEP = endpoints[i]
      var currentRequest = endpoints[i].request

      if (existingEndpoints[currentRequest.method] && existingEndpoints[currentRequest.method][currentRequest.url]){
      } else {
        if(!existingEndpoints[currentRequest.method]) { existingEndpoints[currentRequest.method] = {}}
        existingEndpoints[currentRequest.method][currentRequest.url] = true

        if (domain) {
          currentRequest.url = this.subURL(currentRequest.url, domain)
          currentEP.name = currentRequest.url
        }

        uniqueEndpoints.push(currentEP)
      }
    }

    return uniqueEndpoints

  },

  subURL: function(currentURL, domain) {
    return currentURL.replace('portal',domain)
  }

}
