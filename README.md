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

## Plugin
Plugins are also an important part of the VisuEngine because they can manipulate the data flow. They live in /plugins/. So they are a great starting point for adding new features eg. the html2image plugin converts the results being plain html from units to images. A plugin has the following structure:

### Basic Structure
