const path = require("path")
const process = require("process")

// path constants
const APP_ROOT = path.dirname(process.argv[1])
const UNIT_PATH = path.join(APP_ROOT, "renderer/units/")
const PLUGIN_PATH = path.join(APP_ROOT, "pluginmanager/plugins")

// plugin manager actions
const BEFORE_DB_ACTION = "before_database"
const AFTER_DB_ACTION = "after_database"
const BEFORE_RENDERER_ACTION = "before_renderer"
const AFTER_RENDERER_ACTION = "after_renderer"

// debug messages
console.log("CONSTANTS")
console.log(APP_ROOT)
console.log(UNIT_PATH)
console.log(PLUGIN_PATH)

module.exports = {
    APP_ROOT : APP_ROOT,
    UNIT_PATH : UNIT_PATH,
    PLUGIN_PATH : PLUGIN_PATH,
    BEFORE_DB_ACTION : BEFORE_DB_ACTION,
    AFTER_DB_ACTION : AFTER_DB_ACTION,
    BEFORE_RENDERER_ACTION : BEFORE_RENDERER_ACTION,
    AFTER_RENDERER_ACTION : AFTER_RENDERER_ACTION
}