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
  }
}
