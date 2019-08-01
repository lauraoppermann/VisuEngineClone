const CONSTANTS = require("../Constants")

function deleteChartById(database, renderer, pluginManager) {
    return (req, res) => {
          
        let plugin = req.query.plugin
        
        // run pre database plugin and return if plugin handles request
        if (pluginManager.run(plugin, CONSTANTS.BEFORE_DB_ACTION, req, res, database, req.params.chartId, null, renderer, null, null, null)) {
            return
        }
        
        // check if the chart exists otherwise return error message
        if (!database.exists(req.params.chartId)) {
            res.status(404).send("Chart not found!")
            return
        }
        
        // delete chart
        database.delete(req.params.chartId)
        
        // run post database plugin and return if plugin handles request
        if (pluginManager.run(plugin, CONSTANTS.AFTER_DB_ACTION, req, res, database, chartId, null, renderer, null, null, null)) {
            return
        }
        
        res.send("OK")
    }
}

function deleteAll(database, renderer, pluginManager) {
    return (req, res) => {
        
        let plugin = req.query.plugin
        
        // run pre database plugin and return if plugin handles request
        if (pluginManager.run(plugin, CONSTANTS.BEFORE_DB_ACTION, req, res, database, null, null, renderer, null, null, null)) {
            return
        }
        
        database.deleteAll()
        
        // run post database plugin and return if plugin handles request
        if (pluginManager.run(plugin, CONSTANTS.AFTER_DB_ACTION, req, res, database, chartId, null, renderer, null, null, null)) {
            return
        }
        
        res.send("OK")
    }
}

module.exports = {
    "/chart/:chartId" : deleteChartById,
    "/chart" : deleteAll
}