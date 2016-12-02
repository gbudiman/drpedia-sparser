module.exports = {
  professions: function(a, b, c) {
    var s = new Array();

    if (a != undefined) { s.push(a); }
    if (b != undefined) { s.push(b); }
    if (c != undefined) { s.push(c); }

    return s;
  },
  FactoryGirl: FactoryGirl
}

FactoryGirl.prototype.modify = function(property, val) {
  // perform deep copy
  // modify must NOT cause side-effect
  var raw_clone = JSON.parse(JSON.stringify(this.raw));
  var clone = new FactoryGirl(raw_clone);
  clone.raw[property] = val;
  
  return clone;
}

function FactoryGirl(x) {
  this.raw = x;
  return this;
}