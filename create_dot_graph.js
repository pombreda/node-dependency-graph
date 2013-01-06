#!/usr/bin/env node

var _ = require('underscore'),
    fs = require('fs'),
    graphviz = require('graphviz');

fs.readFile("all_data.json", function (err, data) {
  var nodes = [],links = [];
  var modules = JSON.parse(data);



  var g = graphviz.digraph("G");

  var allModules = _.keys(modules);
  var nodeModuleMap ={};
  _.each(allModules, function (module) {
    var n1 = g.addNode(module,{"color" : "blue"});
    n1.set( "style", "filled" );
    nodeModuleMap[module] = n1;
  });
  _.each(allModules, function  (module) {
    var deps = modules[module];
    
    _.each(deps, function  (dep) {
      g.addEdge(nodeModuleMap[module], dep).set( "color", "red" );
    });
  });

  console.log(g.to_dot());
  g.setGraphVizPath( "/opt/local/bin/" );
  // Generate a PNG output
  g.output( "png", "viz.png" );
  process.exit(0);
});