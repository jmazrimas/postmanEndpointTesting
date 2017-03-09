var fs = require('fs');

module.exports = {
  returnDFData: function() {

    var cleanLines = []
    var lines = fs.readFileSync('./datafactory.json').toString().split('\n')

    for (var i=0; i<lines.length; i++) {
      var currentLine = lines[i]
      currentLine = currentLine.replace(/'/g, "")
      currentLine = currentLine.replace(/\/$/, '')
      currentLine = '/'+currentLine

      if (cleanLines.indexOf(currentLine) == -1) {
        cleanLines.push(currentLine)
      }
    }

    return cleanLines
  }
}
