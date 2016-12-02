var exports = module.exports = {};

exports.professions = function(a, b, c) {
  var s = new Array();

  if (a != undefined) { s.push(a); }
  if (b != undefined) { s.push(b); }
  if (c != undefined) { s.push(c); }

  return s;
}

exports.new = function(x) {
  this.raw = x;
  return this;
}

exports.modify = function(property, val) {
  var raw_clone = JSON.parse(JSON.stringify(this.raw));
  var clone = Object.assign({}, this);
  clone.raw = raw_clone;
  clone.raw[property] = val;

  return clone;
}