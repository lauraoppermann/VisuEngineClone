function createNewChart(database) {
    return (req, res) => {
        console.log("CreateNewChart()")
        database.new({data:[1,2,3,4,5], height: 100, width: 100, buckets: 5})
        res.status(200).send("OK")
    }
}

module.exports = {
    "/chart" : createNewChart
}