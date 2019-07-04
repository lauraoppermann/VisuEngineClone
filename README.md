# VisuEngine
Framework to use arbitary visualization tools on every platform / in every programming language

# Goal
I want to use Frameworks like D3.js, plot.ly, matplotlib while programming in Java, Rust or Go. So what do those programming languages have incommon? They have more or less nice networking and json libraries. So in the future there is no more to do than sending your data as a json object to the VisuEngine and you will receive a beautiful visualization as HTML, Image or whatever you can imagine so the only task you have to to is save it in a file.

#Architecture
Coming soon

# Specs

## Unit
Units are the heart of the VisuEngine. They live in /renderer/units. The are responsible for rendering the JSON data in a way you want it. Basically a unit is a javascript module that can do whatever you want e.g. call other binaries / frameworks to render data. A unit consists of the following components:

| File / Directory | Info |
|------------------|------|
| /                | root directory of the unit |
| /unit.js         | entrypoint for programming |
| /res/            | resource folder for via http accessable files e.g. css files, images |

### unit.js

#### Interface Overview
A unit has a small interface. It's only one function with the following signature:

| Parameter | Info |
|-----------|------|
| chartJson | string containing the chart to render |
| template  | string containing the the template that shall be used to present the data |
| unitHomeDir | string containing the absolute path to the unit's root which you need for file i/o |

Return Value: absolute file path to the result of rendering of type **String**

#### Example unit.js

```js
// you can use every js library by installing it for example using npm
const path = require("path")

// take your favorite visualization library
const fancyLib = require("fancy-lib")

function myunit(chartJson, template, unitHomeDir) {

	// make sure to have a default result
	let result = path.join(unitHomeDir, "defaultResult.png")

	if (template === "histogram") {
		result = fancyLib.drawHist(chartJson)
	}
	else if (template == "barchart") {
		result = fancyLib.drawBar(chartJson)
	}
	else {
		return result
	}

	// write result to a file
	let filepath = path.join(unitHomeDir, "result.png")
	fs.writeFileSync(filepath, result)

	// return absolute file path to result
	return filepath
}

// export your rendering function
module.exports = myunit

```

### How To Use Your Unit
Put your unit directory into /renderer/units and it will be automatically loaded on server start. Then you can use your unit by calling the following url: http://hostname:port/chart/<chartId>?unit=your unit&template=some template handled by your unit

## Plugin
Plugins are also an important part of the VisuEngine because they can manipulate the data flow. They live in /plugins/. So they are a great starting point for adding new features eg. the html2image plugin converts the results being plain html from units to images. A plugin has the following structure:

| File / Directory | Info |
|------------------|------|
| /                | root directory of the unit |
| /plugin.js         | entrypoint for programming |
| /res/            | resource folder for via http accessable files e.g. css files, images |

### plugin.js

#### Interface Overview
A plugin can implement up to 4 functions to extend the functionality of the VisuEngine. The functions have the following signature:

| Function        | req | res | database | chartId | jsonData | renderer | unit | template | rendererResult | pluginHomeDir |
|-----------------|:---:|:---:|:--------:|:-------:|:--------:|:--------:|:----:|:--------:|:--------------:|:-------------:|
| before_database |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:x:|:x:|:x:|:heavy_check_mark:|
| after_database  |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:x:|:x:|:x:|:heavy_check_mark:|                |               |
| before_renderer |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:x:|:heavy_check_mark:|
| after_renderer |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|

Return Value: Boolean, if true the further request handling of VisuEngine is skipped

| Parameter | Info | Further Documentation |
|-----------|------|-----------------------|
| req       | express req object | https://expressjs.com/de/api.html#req |
| res       | express res object | https://expressjs.com/de/api.html#res |
| database  | database object see Database section | Coming Soon |
| chartId   | integer of chartId | |
| jsonData  | string containing the data to save / chart to render | |
| renderer  | renderer object see Renderer section | Coming Soon |
| unit      | string containing unit name | |
| template  | string containing the the template that shall be used to present the data | |
| rendererResult | string containing absolute file path to the renderer result file | |
| pluginHomeDir | string containing the absolute path to the plugin's root which you need for file i/o | |

**Note: returning true in before_database / before_renderer will also skip your after_database / after_renderer!**

#### Example plugin.js

```js
const fs = require("fs")
const path = require("path")

function my_before_database(req, res, database, chartId, jsonData, renderer, pluginHomeDir) {
	res.status(500).send("No database today")
	
	// skip further database actions
	return true
}

function my_after_database(req, res, database, chartId, jsonData, renderer, pluginHomeDir) {
	// save json to file
	let filepath = path.require(pluginHomeDir, "lastJson.data")
	fs.writeFileSync(filepath, jsonData)
	
	// don't change anything
	return false
}

function my_before_renderer(req, res, database, chartId, renderer, unit, template, pluginHomeDir) {
	// Your code
}

function my_after_renderer(req, res, database, chartId, renderer, unit, template, rendererResult, pluginHomeDir) {
	// Your code
}

// export your plugin functions
module.exports = {
    "before_database" : my_before_database,
    "after_database" : my_after_database,
    "before_renderer" : my_before_renderer,
    "after_renderer" : my_after_renderer
}

```

### How To Use Your Plugin
Put your unit directory into /pluginmanager/plugins and it will be automatically loaded on server start. Then you can use your plugin by calling the following url: http://hostname:port/chart/<chartId>?unit=unit&template=template&plugin=your plugin
