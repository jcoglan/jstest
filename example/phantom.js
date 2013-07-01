phantom.injectJs('build/jstest.js')

var reporter = new JS.Test.Reporters.Headless()
reporter.open('example/browser.html')

