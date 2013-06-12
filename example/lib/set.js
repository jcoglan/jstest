var Set = function(members) {
  this._members = {}
  for (var i = 0, n = members.length; i < n; i++) {
    this._members[members[i]] = true
  }
}

Set.prototype.hasMember = function(value) {
  return this._members.hasOwnProperty(value)
}

if (typeof exports === 'object' && typeof WScript === 'undefined')
  exports.Set = Set
else
  this.Set = Set

