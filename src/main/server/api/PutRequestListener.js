function modifyChart(database) {
    return (req, res) => {
        console.log("ModifyChart()")
        res.send("OK")
    }
}

module.exports = {
    "/chart/:clientId" : modifyChart
}