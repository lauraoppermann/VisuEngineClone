const CONSTANTS = require("../Constants")

function modifyChart(database, renderer, pluginManager) {
    return (req, res) => {
        
        let chartId = req.params.chartId
        let plugin = req.query.plugin
        
        // run pre database plugin and return if plugin handles request
        if (pluginManager.run(plugin, CONSTANTS.BEFORE_DB_ACTION, req, res, database, req.params.chartId, null, renderer, null, null, null)) {
            return
        }
        
        // check if the chart exists otherwise return error message
        if (!database.exists(chartId)) {
            res.status(404).send("Chart not found!")
            return
        }
        
        // modify chart
        database.set(chartId, req.body)
        
        // run post database plugin and return if plugin handles request
        if (pluginManager.run(plugin, CONSTANTS.AFTER_DB_ACTION, req, res, database, chartId, null, renderer, null, null, null)) {
            return
        }
        
        res.send("OK")
    }
}

module.exports = {
    "/chart/:chartId" : modifyChart
}