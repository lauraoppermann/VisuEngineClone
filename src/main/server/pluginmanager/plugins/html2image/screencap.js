var page = require("webpage").create();
var system = require('system');

var url = "http://localhost:8000/chart/" + system.args[1] + "?unit=" + system.args[2] + "&template=" + system.args[3];
//var url = "http://localhost:8000/chart/1?unit=d3js&template=histogram"

page.open(url, function(status) {
	if (status === "success") {
		page.render(system.args[4]);
	}
	phantom.exit();
})
