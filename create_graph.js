#!/usr/bin/env node

var _ = require('underscore'),
    fs = require('fs'),
    ;

fs.readFile("all_data.json", function (err, data) {
  var nodes = [],links = [];
  var modules = JSON.parse(data);
  var allModules = _.keys(modules);
  _.each(allModules, function (module) {
    var node = {
      label : module
    };
    nodes.push(node);
  });

  for (var i = 0; i <nodes.length; i++) {
    var dependencies = modules[nodes[i].label];
    _.each(dependencies, function setupLinks (depend) {
      var match = _.where(nodes, {label: depend});
      if( match){
        var targetIndex = _.indexOf(nodes,match[0]);
        if(targetIndex!= -1){
          links.push({source: i, weight: 1, target: targetIndex});  
        }
        
      }
    });
    process.stdout.write('.');
  };
    fs.writeFileSync("./all_package_graph.json", JSON.stringify({nodes: nodes, links: links}), 'utf8');
  process.exit(0);
});