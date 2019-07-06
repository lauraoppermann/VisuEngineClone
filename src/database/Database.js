const JsonDB = require("node-json-db").JsonDB
const JsonDBConfig = require("node-json-db/dist/lib/JsonDBConfig").Config

class Database {
    
    constructor(dbName) {
        this.db = new JsonDB(new JsonDBConfig(dbName, true, false, "/"))
        this.nextChartId = this.getNextChartId()
    }
    
    getNextChartId() {
        try {
            let charts = this.db.getData("/charts")
            return charts[Object.keys(charts).length -1].id + 1
        } catch(error) {
            return 0
        }
    }
    
    exists(chartId) {
        try {
            this.db.getData("/charts/" + chartId)
            return true
        } catch(error) {
            return false
        }
    }
    
    new(chartJson) {
        chartJson.id = this.nextChartId
        this.db.push("/charts/" + this.nextChartId, chartJson)
        this.nextChartId++
        return this.nextChartId - 1
    }
    
    set(chartId, chartJson) {
        if (!this.exists(chartId)) {
            return
        }
        
        this.db.push("/charts/" + chartId, chartJson)
    }
    
    add(chartId, chartJson) {
        this.db.push("/charts/" + chartId, chartJson, false)
    }
    
    get(chartId) {
        // this reload is nice for live debugging
        this.db.reload()
        
        return this.db.getData("/charts/" + chartId)
    }
    
    delete(chartId) {
        this.db.delete("/charts/" + chartId)
    }
    
    deleteAll() {
        this.db.delete("/charts")
    }
    
}

module.exports = Database