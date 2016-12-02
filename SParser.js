SParser.prototype.mock = function(x) {
  this.conditions = x;

  if (this.verbose & 0x1 == 1) {
    console.log('Factory Girl:');
    console.log(this.conditions);
  }
}

SParser.prototype.set_verbose = function(x) {
  this.verbose = x;
  return this;
}

SParser.prototype.expect = function(expectation, x) {
  if (this.preset == undefined) {
    throw new Error('Call set() first before running expect()');
  }

  this.mock(x.raw);
  this.parse(this.preset);
  if (this.latch_result != expectation) {
    throw new Error('INCORRECT TEST: expected ' + expectation);
  } else {
    console.log('Test passed!')
  }

  return this;
}

SParser.prototype.parse = function(x) {
  this.parse_trees = new Array();
  this.start_pointers = new Array();

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

  if ((this.verbose & 0x1) == 1) {
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

      if (quotes != undefined) {
        var re = new RegExp(quotes[1], 'g');
        actual = actual.replace(re, '');
      }
      //console.log('inserting ' + actual);
      depth = this.insert_to_tree(actual, depth);
    }
  } catch(err) {
    switch(err.name) {
      case 'TypeError': console.log('Naked expression'); break;
    }
    console.log(err);
    throw(err);
  }

  if (this.start_pointers.length > 0) {
    throw new Error('Non-empty pointers, dangling expression: ' + start_pointers);
  }
};

SParser.prototype.cond = function(x, val) {
  switch (x) {
    case 'profession':
      if (this.conditions.professions == undefined || 
          this.conditions.professions.indexOf(val) == -1) {
        return false;
      }

      return true;
      break;
    case 'skill':
      if (this.conditions.skills == undefined || 
          this.conditions.skills.indexOf(val) == -1) {
        return false;
      }

      return true;
      break;
    default:
      //console.log(this.conditions);
      //console.log('checking condition ' + x + ' | ' + val + ' << ' + this.conditions.x);
      if (this.conditions[x] == undefined || 
          this.conditions[x] != val) {
        return false;
      }

      return true;
  }
}

SParser.prototype.insert_to_tree = function(x, depth) {
  var is_opening = x[0] == '(';
  var is_closing = x[x.length - 1] == ')';
  //console.log('inserting ' + x);

  if (is_opening) {
    var subsplit = x.split(/\(/);
    var non_opening = subsplit[subsplit.length - 1];
    var opening_count = (x.match(/\(/g) || []).length;

    for (var i = 0; i < opening_count; i++) {
      var text = i < opening_count - 1 ? '(' : non_opening;
      this.debug(depth, 'open', text);
      this.create_node(text);
      depth = depth + 1;
    }
    return depth;
  } else if (is_closing) {
    var non_closing = x.split(/\)/)[0];
    var closing_count = (x.match(/\)/g) || []).length;

    if (non_closing.length > 0) {
      this.debug(depth, 'append', non_closing);
      this.append_node(non_closing);
    }

    for (var i = 0; i < closing_count; i++) {
      depth = depth - 1;
      this.debug(depth, 'close', '');
      this.close_node();
    }

    return depth;
  } else {
    if (x.length > 0) {
      this.debug(depth, 'append', x);
      this.append_node(x);
    }
    return depth;
  }
};

SParser.prototype.debug = function(depth, type, x) {
  if ((this.verbose & 0x2) != 0x2) { return; }
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

SParser.prototype.create_node = function(x) {
  this.start_pointers.push(this.parse_trees.length);
  this.parse_trees.push(x);
}

SParser.prototype.append_node = function(x) {
  this.parse_trees.push(x);
}

SParser.prototype.close_node = function() {
  var previous_pointer = this.start_pointers.pop();
  var syntax = new Array();

  for (var i = previous_pointer; i < this.parse_trees.length; i++) {
    if (Array.isArray(this.parse_trees[i])) {
      this.parse_trees[i].forEach(function(x) { 
        syntax.push(x); 
      });

    } else {
      syntax.push(this.parse_trees[i]);
    }
  }

  var comprehension_result = this.context_comprehension(syntax);
  this.parse_trees.splice(previous_pointer, syntax.length + 1, comprehension_result);

  if ((this.verbose & 0x4) == 0x4) {
    console.log('Syntax: ' + syntax + ' => ' + comprehension_result);
  }
  this.latch_result = comprehension_result;
  // console.log('PT: ' + parse_trees);
}

SParser.prototype.check_arglength_exactly = function(l, size) {
  if (l.length != size) {
    throw new Error(size + ' arguments required, received ' + l.length);
  }
}

SParser.prototype.context_comprehension = function(l) {
  var head = l[0];
  var rest = l.slice(1);

  switch(head) {
    case 's':           return this.func_strain(rest);
    case 'p':           return this.func_profs(rest);
    case 'k':           return this.func_skills(rest);
    case 'xp_sum':      return this.func_xp_sum(rest);
    case 'stat_sum':    return this.func_stat_sum(rest);
    case 'and':         return this.func_and(rest);
    case 'or':          return this.func_or(rest);
    case 'not':         return this.func_not(rest);
    case '(':           return rest;
    default:            return l;
  }
}

module.exports = SParser;
function SParser(x) {
  this.parse_trees;
  this.start_pointers;
  this.conditions;
  this.verbose = 0;
    // 0x1 - I/O
    // 0x2 - Parse trees
    // 0x4 - Context comprehension
  this.latch_result;
  this.preset = x;

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
    // this.check_arglength_exactly(l, 1);
    // return this.cond('strain', l[0]);
    var that = this;
    var local_satisfaction = l.some(function(x) {
      return that.cond('strain', x);
    })

    return local_satisfaction;
  }

  var func_profs = function(l) {
    var that = this;
    var local_satisfaction = l.some(function(x) {
      return that.cond('profession', x);
    })

    return local_satisfaction;
  }

  var func_skills = function(l) {
    var that = this;
    var local_satisfaction = l.some(function(x) {
      return that.cond('skill', x);
    })

    return local_satisfaction;
  }

  var func_xp_sum = function(l) {
    this.check_arglength_exactly(l, 1);
    return this.conditions.xp_sum >= l[0];
  }

  var func_stat_sum = function(l) {
    this.check_arglength_exactly(l, 2);

    switch(l[0]) {
      case 'hp':       return this.conditions.hp >= l[1];
      case 'mp':       return this.conditions.mp >= l[1];
      case 'hp_or_mp': return this.conditions.hp >= l[1] || 
                              this.conditions.mp >= l[1];
    }
  }

  this.func_strain = func_strain;
  this.func_profs = func_profs;
  this.func_skills = func_skills;
  this.func_xp_sum = func_xp_sum;
  this.func_stat_sum = func_stat_sum;
  this.func_and = func_and;
  this.func_or = func_or;
  this.func_not = func_not;

  return this;
}