#!/usr/bin/env node

var _ = require('underscore'),
    fs = require('fs');
    

fs.readFile("all_data.json", function (err, data) {
  var nodes = [],links = [];

  var modules = JSON.parse(data);
  var allModules = _.keys(modules);
  var count = 0;
  _.each(allModules, function (module) {
    var node = {
      name : module,
      id: count
    };
    nodes.push(node);
    count++;
  });
  // _.each(nodes, function writeNodesFile (node) {
  //   console.log(node.id +" "+ node.name);
  // });

  for (var i = 0; i <nodes.length; i++) {
    var dependencies = modules[nodes[i].name];
    _.each(dependencies, function setupLinks (depend) {
      var match = _.where(nodes, {name: depend});
      if( match && match.length === 1){
        links.push({source: i, type: "Directed", weight: 1, target: match[0].id});  
      }
    });
    // process.stdout.write('.');
  };
  var linkConter = 0;
  _.each(links, function writeNodesFile (link) {
    console.log(link.source +" "+ link.target + " " + link.type + " "+ linkConter++ + " " + link.weight);
  });

  //   fs.writeFileSync("./nodes.csv", _.join(), 'utf8');
  process.exit(0);
});