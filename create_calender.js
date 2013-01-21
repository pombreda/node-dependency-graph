#!/usr/bin/env node

var _ = require('underscore'),
    fs = require('fs'),
    dateformat = require('dateformat');

var nano = require('nano')('http://nodetoolbox.com:5984');
var registry = nano.db.use('registry');

var save_created_data = function (cb) {
  registry.view('ui', 'by_created',{reduce:true, level: 3, group:true}, function  (err, body) {
    console.log(body)
    vals = _.collect(body.rows, function  format(item) {
      var date = new Date(item.key[0] + 2000, item.key[1]+1, item.key[2]);
      console.log(item);
      console.log(dateformat(date, "yyyy-mm-dd"));
      return dateformat(date, "yyyy-mm-dd")+ "," + item.value;
    });
    fs.writeFile("./packages_by_date.csv", vals.join("\n"), 'utf8', cb);
  });
}
