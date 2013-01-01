#!/usr/bin/env node

var _ = require('underscore').
    fs = require('fs');

var nano = require('nano')('http://localhost:5984');
var registry = nano.db.use('registry');

registry.view('scratch', 'dependencies', function  (err, body) {
  var allPackages;
  if( err )throw err;
  allPackages = _.inject(body.rows, function (memo, item) {
    if (!item.value) item.value = {};
    if(typeof item.value  === "string") {
      console.log("xxxxx");
      data  = item.value
      item.value = {data: "*"};
    }
    console.log(item);
    memo[item.id] = _.keys(item.value);
    return memo;
  }, {});
  console.log(allPackages);
  fs.writeFileSync("./data.json", JSON.stringify(allPackages), 'utf8');
  process.exit(0);
});