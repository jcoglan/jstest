if (typeof JS === "undefined") {
  var JS  = require("../../build/jstest"),
      Set = require("../lib/set").Set
}

JS.Test.describe("Set", function() { with(this) {
  before(function() { with(this) {
    this.set = new Set(["foo"])
  }})

  describe("hasMember", function() { with(this) {
    it("returns true for members", function() { with(this) {
      assert( set.hasMember("foo") )
    }})

    it("returns false for non-members", function() { with(this) {
      assertNot( set.hasMember("bar") )
    }})
  }})
}})

