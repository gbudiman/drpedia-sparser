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
  var raw_clone = JSON.parse(JSON.stringify(this.data));
  var clone = new FactoryGirl(raw_clone);

  if (property == 'add_profession') {
    if (clone.data.professions == undefined) {
      clone.data.professions = new Array();
    }

    clone.data.professions.push(val);
  } else {
    clone.data[property] = val;
  }

  return clone;
}

FactoryGirl.prototype.add_profession = function(_val) {
  if (this.data.profession != undefined && 
      this.data.professions.length > 3) {
    throw new Error('Can only have a maximum of 3 professions');
  }

  return this.modify('add_profession', _val);
}

function FactoryGirl(x) {
  this.data = x;
  return this;
}