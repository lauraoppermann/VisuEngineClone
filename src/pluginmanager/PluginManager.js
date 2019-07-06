const fs = require("fs")
const process = require("child_process")
const path = require("path")

const CONSTANTS = require("../Constants")

class PluginManager {
    
    constructor() {
        this.plugins = this.loadPlugins()
    }
    
    loadPlugins() {
        
        // find all units
        let result = {}
        let plugins = fs.readdirSync(CONSTANTS.PLUGIN_PATH)
        
        // iterate over plugins and parse information
        plugins.forEach((plugin) => {
            
            let pluginPath = path.join(CONSTANTS.PLUGIN_PATH, plugin, "/plugin.js")
            result[plugin] = require(pluginPath)
            
            console.log("Loaded Plugin:", plugin)
        })
        
        return result
    }
    
    pluginExists(plugin) {
        return Object.keys(this.plugins).includes(plugin)
    }
    
    run(plugin, action, req, res, database, chartId, jsonData, renderer, unit, template, rendererResult) {
        
        // check if the plugin exists and can handle the action
        if (!this.pluginExists(plugin) || this.plugins[plugin][action] == undefined) {
            return false
        }
        
        let pluginHomeDir = path.join(CONSTANTS.PLUGIN_PATH, plugin)
        let handle = false
        
        // run the given plugin
        switch (action) {
            case CONSTANTS.BEFORE_DB_ACTION:
                handle = this.plugins[plugin][action](req, res, database, chartId, jsonData, renderer, pluginHomeDir)
                break
                
            case CONSTANTS.AFTER_DB_ACTION:
                handle = this.plugins[plugin][action](req, res, database, chartId, jsonData, renderer, pluginHomeDir)
                break
                
            case CONSTANTS.BEFORE_RENDERER_ACTION:
                handle = this.plugins[plugin][action](req, res, database, chartId, renderer, unit, template, pluginHomeDir)
                break
            
            case CONSTANTS.AFTER_RENDERER_ACTION:
                handle = this.plugins[plugin][action](req, res, database, chartId, renderer, unit, template, rendererResult, pluginHomeDir)
                break
        }
        
        return handle
    }
    
}

module.exports = PluginManager