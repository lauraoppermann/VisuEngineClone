const process = require("child_process")
const path = require("path")

function htmlToImage(req, res, database, chartId, renderer, unit, template, pluginHomeDir) {
    
    let phantomjs = path.join(pluginHomeDir, "phantomjs")
    let script = path.join(pluginHomeDir, "screencap.js")
    let resultFile = path.join(pluginHomeDir, "result.png")
    
    process.exec(phantomjs + " " + [script, chartId, unit, template, resultFile].join(" "), (err, stdout, stderr) => {
    //process.exec(phantomjs + " " + [script, resultFile].join(" "), (err, stdout, stderr) => {
                
        if (err) {
            console.log(err)
            res.send("NOOK")
        }
        else {
            res.sendFile(resultFile)
        }    
    })
    
    // request was handled
    return true
}

module.exports = {
    "before_renderer" : htmlToImage
}