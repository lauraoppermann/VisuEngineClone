function deleteChartById(database) {
    return (req, res) => {
        console.log("DeleteChartById()")
        // database.delete()
        res.send("OK")
    }
}

function deleteAll(database) {
    return (req, res) => {
        database.deleteAll()
        res.send("OK")
    }
}

module.exports = {
    "/chart/:clientId" : deleteChartById,
    "/chart" : deleteAll
}