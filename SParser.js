var exports = module.exports = {};
var parse_trees;
var start_pointers;
var conditions;
var verbose = 0; 
  // 0x1 - I/O
  // 0x2 - Parse trees
  // 0x4 - Context comprehension
var preset;
var latch_result;

exports.mock = function(x) {
  conditions = x;

  if (verbose & 0x1 == 1) {
    console.log('Factory Girl:');
    console.log(conditions);
  }
}

exports.set_verbose = function(x) {
  verbose = x;
  return this;
}

exports.expect = function(expectation, x) {
  if (preset == undefined) {
    throw new Error('Call set() first before running expect()');
  }

  this.mock(x.raw);
  this.parse(preset);
  if (latch_result != expectation) {
    throw new Error('INCORRECT TEST: expected ' + expectation);
  } else {
    console.log('Test passed!')
  }

  return this;
}

exports.set = function(x) {
  preset = x;
  return this;
}

exports.parse = function(x) {
  parse_trees = new Array();
  start_pointers = new Array();

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
    var end_quote;
    //var quotes = current[0] == undefined ? undefined : current[0].match(/^([\'\"])/);
    //quotes = quotes == undefined ? undefined : current[0].match(/^([\'\"])/);

    if (quotes == undefined) {
      if (current[0] != undefined) {
        quotes = current.match(/^([\'\"])/);

      }
    }

    if (current != undefined) {
      end_quote = current.match(/([\'\"'])$/);
      if (end_quote != undefined && quotes != undefined) { 
        if (quotes[1] == end_quote[1]) {
          return;
        }
      }
    }



    if (quotes) {
      var quote_type = quotes[1];
      i += 1;

      while(true) {
        if (i >= splits.length) {
          break;
        }

        actual += ' ' + splits[i];
        //console.log('appending ' + splits[i]);
        if (has_closing_quote(splits[i], quote_type)) {
          //quotes = undefined;
          break;
        }

        i += 1;
      }
    }
  }

  var handle_ellipsis = function() {
    if (current.match(/([\'\"])/)) {
      quotes = current.match(/([\'\"])/);
      //console.log(quotes);
    }

    if (current == '(' || next == ')') {
      actual += next;
      i++;
    }


  }

  if (verbose & 0x1 == 1) {
    console.log('Input: ' + x);
  }

  try {
    for (var i = 0; i < splits.length; i++) {
      var current = splits[i];
      var next = splits[i + 1];
      var actual = current;
      var quotes = undefined;

      handle_ellipsis();
      handle_parenthesis();

      
      //console.log(quotes);

      if (quotes != undefined) {
        var re = new RegExp(quotes[1], 'g');
        actual = actual.replace(re, '');
      }
      //console.log('inserting ' + actual);
      depth = insert_to_tree(actual, depth);
    }
  } catch(err) {
    switch(err.name) {
      case 'TypeError': console.log('Naked expression'); break;
    }
    console.log(err);
    throw(err);
  }

  if (start_pointers.length > 0) {
    throw new Error('Non-empty pointers, dangling expression: ' + start_pointers);
  }
};

var cond = function(x, val) {
  switch (x) {
    case 'profession':
      //console.log('Seeking ' + val);
      //console.log(conditions.professions);
      if (conditions.professions == undefined || conditions.professions.indexOf(val) == -1) {
        return false;
      }

      return true;
      break;
    default:
      if (conditions.x == undefined || conditions.x != val) {
        return false;
      }

      return true;
  }
}

var insert_to_tree = function(x, depth) {
  var is_opening = x[0] == '(';
  var is_closing = x[x.length - 1] == ')';
  //console.log('inserting ' + x);

  if (is_opening) {
    var subsplit = x.split(/\(/);
    var non_opening = subsplit[subsplit.length - 1];
    var opening_count = (x.match(/\(/g) || []).length;

    for (var i = 0; i < opening_count; i++) {
      var text = i < opening_count - 1 ? '(' : non_opening;
      debug(depth, 'open', text);
      create_node(text);
      depth = depth + 1;
    }
    return depth;
  } else if (is_closing) {
    var non_closing = x.split(/\)/)[0];
    var closing_count = (x.match(/\)/g) || []).length;

    if (non_closing.length > 0) {
      debug(depth, 'append', non_closing);
      append_node(non_closing);
      //append_node(non_closing);
    }

    for (var i = 0; i < closing_count; i++) {
      depth = depth - 1;
      debug(depth, 'close', '');
      close_node();
      //close_node();
    }

    return depth;
  } else {
    if (x.length > 0) {
      debug(depth, 'append', x);
      append_node(x);
    }
    //append_node(x);
    return depth;
  }
};

var debug = function(depth, type, x) {
  if ((verbose & 0x2) != 0x2) { return; }
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
  start_pointers.push(parse_trees.length);
  parse_trees.push(x);
}

var append_node = function(x) {
  parse_trees.push(x);
}

var close_node = function() {
  var previous_pointer = start_pointers.pop();
  var syntax = new Array();

  for (var i = previous_pointer; i < parse_trees.length; i++) {
    if (Array.isArray(parse_trees[i])) {
      parse_trees[i].forEach(function(x) { 
        syntax.push(x); 
      });

    } else {
      syntax.push(parse_trees[i]);
    }
  }

  var comprehension_result = context_comprehension(syntax);
  parse_trees.splice(previous_pointer, syntax.length + 1, comprehension_result);

  if ((verbose & 0x4) == 0x4) {
    console.log('Syntax: ' + syntax + ' => ' + comprehension_result);
  }
  latch_result = comprehension_result;
  // console.log('PT: ' + parse_trees);
}

var context_comprehension = function(l) {
  var head = l[0];
  var rest = l.slice(1);

  switch(head) {
    case 's':           return func_strain(rest);
    case 'p':           return func_profs(rest);
    //case 'k':           return func_skill(l);
    case 'xp_sum':      return func_xp_sum(rest);
    case 'stat_sum':    return func_stat_sum(rest);
    case 'and':         return func_and(rest);
    case 'or':          return func_or(rest);
    case 'not':         return func_not(rest);
    case '(':           return rest;
    default:            return l;
  }
}

var func_not = function(l) {
  return !l[0];
}

var func_and = function(l) {
  return l.every(function(x) {
    return x;
  })
}

var func_or = function(l) {
  return l.some(function(x) {
    return x;
  })
}

var func_strain = function(l) {
  check_arglength_exactly(l, 1);
  return cond('strain', l[0]);
}

var func_profs = function(l) {
  var local_satisfaction = l.some(function(x) {
    return cond('profession', x);
  })

  return local_satisfaction;
}

var func_xp_sum = function(l) {
  check_arglength_exactly(l, 1);
  return conditions.xp_sum >= l[0];
}

var func_stat_sum = function(l) {
  check_arglength_exactly(l, 2);

  switch(l[0]) {
    case 'hp':       return conditions.hp >= l[1];
    case 'mp':       return conditions.mp >= l[1];
    case 'hp_or_mp': return conditions.hp >= l[1] || conditions.mp >= l[1];
  }
}

var check_arglength_exactly = function(l, size) {
  if (l.length != size) {
    throw new Error(size + ' arguments required, received ' + l.length);
  }
}