JS.Test.describe('Widget', function() { with(this) {
  fixture(' <div class="test-widget">\
              <p>Hello world!</p>\
              <ul></ul>\
            </div>' )

  before(function() { with(this) {
    new Widget('.test-widget')

    var promise = new $.Deferred()
    promise.resolve('added')
    stub($, 'get').given('/message').returns(promise)
  }})

  it('adds a list item when the text is clicked', function() { with(this) {
    $('.test-widget p').click()
    assertEqual( 'added', $('.test-widget ul li').html() )
  }})
}})

