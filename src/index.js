const Database = require("./database/Database")
const Server = require("./api/Server")
const Renderer = require("./renderer/Renderer")
const PluginManager = require("./pluginmanager/PluginManager")

const SERVER_PORT = 8000
const DB_NAME = "ChartDatabase.json"

// create instances
const database = new Database(DB_NAME)
const renderer = new Renderer()
const pluginManager = new PluginManager()
const server = new Server(SERVER_PORT, database, renderer, pluginManager)


// launch server
server.start()