var Widget = function(selector) {
  this._element = $(selector)
  this._element.find('p').click($.proxy(this.update, this))
};

Widget.prototype.update = function() {
  var ul = this._element.find('ul')
  $.get('/message').then(function(response) {
    ul.append('<li>' + response + '</li>')
  })
}

