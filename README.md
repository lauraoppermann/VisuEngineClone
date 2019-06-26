# VisuEngine
Framework to use arbitary visualization tools on every platform / in every programming language

# Goal
I want to use Frameworks like D3.js, plot.ly, matplotlib while programming in Java, Rust or Go. So what do those programming languages have incommon? They have more or less nice networking and json libraries. So in the future there is no more to do than sending your data as a json object to the VisuEngine and you will receive a beautiful visualization as HTML, Image or whatever you can imagine so the only task you have to to is save it in a file.

#Architecture
Coming soon

# Specs

## Unit
Units are the heart of the VisuEngine. They live in /renderer/units. The are responsible for rendering the JSON data in a way you want it. A unit consists of the following components:

### Basic Structure
|Directory |                                 Usage                                   |
|----------|-------------------------------------------------------------------------|
|/         | Root directory for all your files (feel free to create new directories) |
|/unit.json| Describes the unit (required)                                           |
|/res      | Directory for public available resources like HTML files (optional)     |


### unit.json
Units must provide the following unit.json structure:

```json
{
  "cmd" : "myrenderer"
}
```

|JSON key  |                              Usage                             |
|----------|----------------------------------------------------------------|
|cmd       | is the command that gets executed in the unit's root directory |

**Note: Basically you could pass custom command line arguments to your programm but if you do that you have to adjust the command line argument processing shown in the example below (which is not very difficult)**

### How does a unit receive its data / what to return

A Unit is an arbitary program. So it could be a real binary compiled out of C code or a simple python script getting executed by the interpreter. To pass the data to the unit we simply use command line arguments. So VisuEngine passes 2 arguments to the unit:
1. the json encoded data
2. a parameter called template specifying what kind of visualization is wanted
To return the result to the user you have to save it in a file and print the file path to the standard output.

Python Unit Example
```python
import sys
import json

# check command line arguments
if len(sys.argv) != 3:
    sys.exit(1)

# parse and save the command line arguments
data = json.loads(sys.argv[1])
template = sys.argv[2]

# decide how to visualize depending on template
result = "default.html"

if template == "BAR_CHART":
    result = render_barchart()
else:
    result = render_histogram()
    
# print the file path / write it to stdout
print(result)
```

## Plugin
Plugins are also an important part of the VisuEngine because they can manipulate the data flow. They live in /plugins/. So they are a great starting point for adding new features eg. the html2image plugin converts the results being plain html from units to images. A plugin has the following structure:

### Basic Structure
| Directory   |                                 Usage                                   |
|-------------|-------------------------------------------------------------------------|
|/            | Root directory for all your files (feel free to create new directories) |
|/plugin.json | Describes the unit (required)                                           |
|/res         | Directory for public available resources like HTML files (optional)     |

### plugin.json
Plugins must provide the following plugin.json structure:

```json
{
  "subscribe" : {
      "before_database" : "myrenderer before_db",
      "after_database" : "myrenderer after_db",
      "before_renderer" : "myrenderer",
      "after_renderer" : "myrenderer after_renderer"
  }
}
```

|JSON key              |                                                Usage                                                 |
|----------------------|------------------------------------------------------------------------------------------------------|
|before_database       | is the command that gets executed in the plugin's root directory before database request (optional)  |
|after_database        | is the command that gets executed in the plugin's root directory after database request (optional)   |
|before_renderer       | is the command that gets executed in the plugin's root directory before data gets rendered by unit (optional)|
|after_renderer        | is the command that gets executed in the plugin's root directory after data got rendered by unit (optional)|


**Note: As you can see you can pass custom arguments to your commands in plugin.json which is nessecary to distinguish between different subscriptions like in the example.**

### How does a plugin receive its data / what to return
Coming soon
