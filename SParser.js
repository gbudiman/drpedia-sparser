'use strict';

var exports = module.exports = {};
var parse_trees = new Object();
var pointer = parse_trees;

exports.parse = function(x) {
  parse_trees = new Object();
  pointer = parse_trees;
  var depth = 0;
  var splits = x.split(/\s+/);
  var has_closing_quote = function(y, matcher_quote) {
    var quotes = y.match(/([\'\"])/);
    if (quotes) {
      var closing_quote = quotes[0];
      if (closing_quote == matcher_quote) { return true; }
    }

    return false;
  };

  var handle_parenthesis = function() {
    var current = splits[i];
    var quotes = current[0] == undefined ? undefined : current[0].match(/^([\'\"])/);

    if (quotes) {
      var quote_type = quotes[1];
      i += 1;

      while(true) {
        if (i >= splits.length) {
          break;
        }

        actual += ' ' + splits[i];
        if (has_closing_quote(splits[i], quote_type)) {
          break;
        }

        i += 1;
      }
    }
  }

  var handle_ellipsis = function() {
    if (current == '(' || next == ')') {
      actual += next;
      i++;
    }
  }

  console.log('Input: ' + x);
  try {
    for (var i = 0; i < splits.length; i++) {
      var current = splits[i];
      var next = splits[i + 1];
      var actual = current;


      handle_ellipsis();
      handle_parenthesis();
      //console.log('inserting: ' + actual);
      depth = insert_to_tree(actual, pointer, depth);
    }
  } catch(err) {
    switch(err.name) {
      case 'TypeError': console.log('Naked expression'); break;
    }
    console.log(err);
    throw(err);
  }

  console.log(' -- FIN --');
};

var insert_to_tree = function(x, pointer, depth) {
  var is_opening = x[0] == '(';
  var is_closing = x[x.length - 1] == ')';

  //console.log('inserting ' + x);

  if (is_opening) {
    var subsplit = x.split(/\(/);
    var non_opening = subsplit[subsplit.length - 1];
    var opening_count = (x.match(/\(/g) || []).length;

    for (var i = 0; i < opening_count; i++) {
      debug(depth, 'open', i < opening_count - 1 ? '(' : non_opening);
      depth = depth + 1;
    }
    //console.log(' > New list: ' + x);

    //create_node(x.split(/\(/)[1]);
    return depth;
  } else if (is_closing) {
    var non_closing = x.split(/\)/)[0];
    var closing_count = (x.match(/\)/g) || []).length;

    if (non_closing.length > 0) {
      debug(depth, 'append', non_closing);
      //append_node(non_closing);
    }

    for (var i = 0; i < closing_count; i++) {
      depth = depth - 1;
      debug(depth, 'close', '');
      //close_node();
    }

    return depth;
  } else {
    if (x.length > 0) {
      debug(depth, 'append', x);
    }
    //append_node(x);
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

var create_node = function(x) {
  var enclosure = new Object();
  var list = new Array();
  list.push(x);

  enclosure.list = list;
  pointer.pred = pointer;
  pointer.data = enclosure;
  //pointer = pointer.data;
}

var append_node = function(x) {
  pointer.data.list.push(x);
}

var close_node = function() {
  pointer = pointer.pred;
}