const path = require("path")

const CONSTANTS = require("../Constants")

function getChartById(database, renderer, pluginManager) {
    return (req, res) => {
        console.log("GetChartById()")
        let unit = req.query.unit
        let template = req.query.template
        let plugin = req.query.plugin
        
        if (!unit || !template) {
            res.status(404).send("Please provide unit and template")
            return
        }
        
        // run pre renderer plugin and return if plugin handles request
        if (pluginManager.run(plugin, CONSTANTS.BEFORE_RENDERER_ACTION, req, res, database, req.params.chartId, null, renderer, unit, template, null)) {
            return
        }
        
        // run renderer
        let result = renderer.render(unit, template, database.get(req.params.chartId))
        
        // run post renderer lugin and return if plugin handles request
        if (pluginManager.run(plugin, CONSTANTS.AFTER_RENDERER_ACTION, req, res, database, req.params.chartId, null, renderer, unit, template, result)) {
            return
        }
        
        res.sendFile(result)
    }
}

function getResource() {
    return (req, res) => {
        console.log("GetResource()")
        res.sendFile(path.join(CONSTANTS.UNIT_PATH,req.params.unit,"/res/",req.params[0]))
    }
}

module.exports = {
    "/chart/:chartId" : getChartById,
    "/unit/:unit/*" : getResource
}