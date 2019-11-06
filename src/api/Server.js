const express = require("express")
const bodyParser = require("body-parser")
const CONSTANTS = require("../Constants")

const GetRequestListener = require("./GetRequestListener")
const PostRequestListener = require("./PostRequestListener")
const PutRequestListener = require("./PutRequestListener")
const DeleteRequestListener = require("./DeleteRequestListener")

class Server {

    constructor(port, database, renderer, pluginManager) {
        this.port = port
        this.database = database
        this.renderer = renderer
        this.pluginManager = pluginManager

        this.server = express()
        this.registerMiddleware()
        this.registerListeners()
    }

    registerMiddleware() {
        this.server.use(bodyParser.json({limit: '50mb', extended: true}))
        this.server.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
    }

    registerListeners() {
        Object.keys(GetRequestListener).forEach( path => { this.server.get(path, GetRequestListener[path](this.database, this.renderer, this.pluginManager)) })
        Object.keys(PostRequestListener).forEach( path => { this.server.post(path, PostRequestListener[path](this.database, this.renderer, this.pluginManager)) })
        Object.keys(PutRequestListener).forEach( path => { this.server.put(path, PutRequestListener[path](this.database, this.renderer, this.pluginManager)) })
        Object.keys(DeleteRequestListener).forEach( path => { this.server.delete(path, DeleteRequestListener[path](this.database, this.renderer, this.pluginManager)) })
    }

    start() {
        this.server.listen(this.port)
    }
}

module.exports = Server
