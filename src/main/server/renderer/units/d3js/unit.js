const ejs = require("ejs")
const process = require("process")
const path = require("path")
const fs = require("fs")

function render(chartJson, template, unitHomeDir) {
    
    const DEFAULT_RESULT = path.join(unitHomeDir, "default.html")
    const RESULT_FILE = path.join(unitHomeDir, "result.html")

    // select ejs
    let ejsPath = path.join(unitHomeDir, "ejs", template + ".ejs")

    // generate html
    let ejsFile = fs.readFileSync(ejsPath, "utf8")
    let html = ejs.render(ejsFile, {chart : JSON.stringify(chartJson)})
    fs.writeFileSync(RESULT_FILE, html)
    
    return RESULT_FILE
}

// export render function
module.exports = render