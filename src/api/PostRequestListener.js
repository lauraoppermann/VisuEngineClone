const CONSTANTS = require("../Constants")

function createNewChart(database, renderer, pluginManager) {
    return (req, res) => {

        let plugin = req.query.plugin

        // run pre database plugin and return if plugin handles request
        if (pluginManager.run(plugin, CONSTANTS.BEFORE_DB_ACTION, req, res, database, null, req.body, renderer, null, null, null)) {
            return
        }

        let chartId = database.new(req.body)

        // run post database plugin and return if plugin handles request
        if (pluginManager.run(plugin, CONSTANTS.AFTER_DB_ACTION, req, res, database, chartId, req.body, renderer, null, null, null)) {
            return
        }

        // send success message
        res.set("Location", chartId)
        res.status(200).send("OK")
    }
}

function modifyChart(database, renderer, pluginManager) {
    return (req, res) => {

        let chartId = req.params.chartId
        let plugin = req.query.plugin

        // run pre database plugin and return if plugin handles request
        if (pluginManager.run(plugin, CONSTANTS.BEFORE_DB_ACTION, req, res, database, chartId, req.body, renderer, null, null, null)) {
            return
        }

        // check if chart exists and return if not
        if (!database.exists(chartId)) {
            res.status(404).send("Chart not found!")
            return
        }

        // append data to current chart
        database.add(chartId, req.body)

        // run post database plugin and return if plugin handles request
        if (pluginManager.run(plugin, CONSTANTS.AFTER_DB_ACTION, req, res, database, chartId, req.body, renderer, null, null, null)) {
            return
        }

        // send success message
        res.status(200).send("OK")
    }
}

module.exports = {
    "/chart" : createNewChart,
    "/chart/:chartId" : modifyChart
}
