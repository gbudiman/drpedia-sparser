'use strict';

var exports = module.exports = {};
var parse_trees = new Object();
var current_id;

exports.parse = function(x) {
  parse_trees = new Object();
  current_id = 0;
  console.log('Parse array: ');
  console.log(x.split(/\s+/));
  x.split(/\s+/).forEach(insert_to_tree);
  console.log(parse_trees);
};

var insert_to_tree = function(x) {
  //console.log('processing ' + x);

  var opening_ellipses = x.split(/^\(/);
  var closing_ellipses = x.split(/\)$/);

  switch (opening_ellipses.length) {
    case 1: // No opening ellipses found
      check_naked_expression();

      switch (closing_ellipses.length) {
        case 1: // No closing ellipses either, literal is in middle
          append_node(closing_ellipses[0], current_id);
          break;
        default: // There is closing ellipses
          if (closing_ellipses[0].length > 0) {
            append_node(closing_ellipses[0], current_id);
          }

          close_node(current_id);
      }

      break;
    default: // Opening ellipses found, process the literal following that
      create_node(opening_ellipses[1], current_id++);
  }
};

var close_node = function(id) {
  current_id = parse_trees[id].parent_id;
};

var create_node = function(x, id) {
  var node = new Object();
  node.head = x.length == 0 ? null : x;
  node.parent_id = id;
  node.args = new Array();

  parse_trees[id + 1] = node;
};

var append_node = function(x, id) {
  if (parse_trees[id].head == null) {
    parse_trees[id].head = x;
  } else {
    parse_trees[id].args.push(x);
  }
};

var check_naked_expression = function() {
  if (current_id == 0) {
    throw new Error('Naked expression. All S-Expression must start with \'(\'');
  }
};