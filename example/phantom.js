phantom.injectJs('build/jstest.js')

var page     = new WebPage(),
    reporter = new JS.Test.Reporters.PhantomJS({}, page)

page.open('example/browser.html')

