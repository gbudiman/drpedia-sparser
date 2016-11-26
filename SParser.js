'use strict';

var exports = module.exports = {};
var parse_trees = new Object();

exports.parse = function(x) {
  var depth = 0;
  var pointer = parse_trees;
  var splits = x.split(/\s+/);

  console.log('Input: ' + x);
  for (var i = 0; i < splits.length; i++) {
    var current = splits[i];
    var next = splits[i + 1];
    var actual = current;

    if (current == '(' || next == ')') {
      actual += next;
      i++;
    }

    depth = insert_to_tree(actual, pointer, depth);
  }

  console.log(' -- FIN --');
};

var insert_to_tree = function(x, pointer, depth) {
  var is_opening = x[0] == '(';
  var is_closing = x[x.length - 1] == ')';

  //console.log('inserting ' + x);

  if (is_opening) {
    //console.log(' > New list: ' + x);
    debug(depth, 'open', x);
    //create_node(x.slice(1), pointer);
    return depth + 1;
  } else if (is_closing) {
    var non_closing = x.split(/\)/)[0];
    var closing_count = (x.match(/\)/g) || []).length;

    if (non_closing.length > 0) {
      debug(depth, 'append', non_closing);
      //console.log(' > Append to list: ' + non_closing);
    }

    for (var i = 0; i < closing_count; i++) {
      debug(depth, 'close', '');
      depth = depth - 1;
      //console.log(' > Close list');
    }
    //close_node();

    return depth;
  } else {
    if (x.length > 0) {
      debug(depth, 'append', x);
    }
    //console.log(' > Append to list: ' + x);
    //append_node(x, pointer);
    return depth;
  }
};

var debug = function(depth, type, x) {
  var s = ' ';

  for (var i = 0; i < depth; i++) {
    s += '  ';
  }

  s += '> ';
  switch(type) {
    case 'open':      s += 'New list: '; break;
    case 'append':    s += 'Append  : '; break;
    case 'close':     s += 'Close'     ; break;
  }
  s += x;

  console.log(s);
}