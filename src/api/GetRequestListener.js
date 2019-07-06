const path = require("path")
const fs = require("fs")

const CONSTANTS = require("../Constants")

function getChartById(database, renderer, pluginManager) {
    return (req, res) => {
        
        let unit = req.query.unit
        let template = req.query.template
        let plugin = req.query.plugin
        
        // run pre renderer plugin and return if plugin handles request
        if (pluginManager.run(plugin, CONSTANTS.BEFORE_RENDERER_ACTION, req, res, database, req.params.chartId, null, renderer, unit, template, null)) {
            return
        }
        
        // check if unit and template are given otherwise return error message
        if (!unit || !template) {
            res.status(404).send("Please provide unit and template!")
            return
        }
        
        // check if the chart exists otherwise return error message
        if (!database.exists(req.params.chartId)) {
            res.status(404).send("Chart not found!")
            return
        }
        
        // run renderer
        let result = renderer.render(unit, template, database.get(req.params.chartId))
        
        // run post renderer plugin and return if plugin handles request
        if (pluginManager.run(plugin, CONSTANTS.AFTER_RENDERER_ACTION, req, res, database, req.params.chartId, null, renderer, unit, template, result)) {
            return
        }
        
        // send result file back to client
        res.sendFile(result)
    }
}

function getResource() {
    return (req, res) => {
        let resource = path.join(CONSTANTS.UNIT_PATH,req.params.unit,"/res/",req.params[0])
        
        // send resource if it exists
        if (fs.existsSync(resource)) {
            res.sendFile(resource)
        }
        
        // send error message
        else {
            res.status(404).send("Resource not found!")
        }
        
    }
}

module.exports = {
    "/chart/:chartId" : getChartById,
    "/unit/:unit/*" : getResource
}