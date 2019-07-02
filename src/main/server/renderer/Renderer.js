const fs = require("fs")
const process = require("child_process")
const path = require("path")

const CONSTANTS = require("../Constants")

class Renderer {
    
    constructor() {
        this.units = this.loadUnits()
    }
    
    loadUnits() {
        
        // find all units
        let result = {}
        let units = fs.readdirSync(CONSTANTS.UNIT_PATH)
        
        // iterate over units and parse information
        units.forEach((unit) => {
            let unitPath = path.join(CONSTANTS.UNIT_PATH, unit, "/unit.js")
            console.log("Loaded", unitPath)
            result[unit] = require(unitPath)
        })
        
        return result
    }
    
    unitExists(unit) {
        return Object.keys(this.units).includes(unit)
    }
    
    render(unit, template, chartJson) {
        
        if (!this.unitExists(unit)) {
            return false
        }
        
        let unitHomeDir = path.join(CONSTANTS.UNIT_PATH, unit)
        
        // run unit and return result
        return this.units[unit](chartJson, template, unitHomeDir)
    }
    
}

module.exports = Renderer