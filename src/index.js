const Database = require("./database/Database")
const Server = require("./api/Server")
const Renderer = require("./renderer/Renderer")
const PluginManager = require("./pluginmanager/PluginManager")
const CONSTANTS = require("./Constants")

// create instances
const database = new Database(CONSTANTS.DB_PATH)
const renderer = new Renderer()
const pluginManager = new PluginManager()
const server = new Server(CONSTANTS.SERVER_PORT, database, renderer, pluginManager)

// launch server
server.start()