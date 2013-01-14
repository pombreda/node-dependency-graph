#!/usr/bin/env node

var _ = require('underscore'),
    fs = require('fs');

var nano = require('nano')('http://localhost:5984');
var database = nano.db.use('package_metadata');

database.view('ui', 'by_geolocation', function  (err, body) {
  var allPackages;
  if( err )throw err;
  allPackages = _.collect(body.rows, function (item) {
    return [item.id, '"'+item.value.string+'"', item.value.lat, item.value.long, item.value.login, "'"+item.value.name+"'"].join(', ')
  });
  console.log( allPackages.join("\n"));
  fs.writeFileSync("./package_locations.csv", allPackages.join("\n"), 'utf8');
  process.exit(0);
});