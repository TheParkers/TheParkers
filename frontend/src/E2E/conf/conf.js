//Config for screenshot reporter
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter(
  {
    dest: 'target/screenshots',
    filename: 'my-report.html',
    userCss: 'my-report-styles.css',
    reportTitle: "The Parkers E2E",
    //inlineImages: true
  }
);

// An example configuration file.
exports.config = 
{
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['../tests/parker.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts:
  {
    defaultTimeoutInterval: 1000000
  },

   // Setup the report before any tests start
   beforeLaunch: function() 
   {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },

  // Assign the test reporter to each running instance
  onPrepare: function() 
  {
    // jasmine.getEnv().addReporter(reporter);
    // var AllureReporter = require('jasmine-allure-reporter');
    // jasmine.getEnv().addReporter(new AllureReporter({
    //   resultsDir: 'allure-results'
    // }));

    //For adding screenshots in the allure reports
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter());
    jasmine.getEnv().afterEach(function(done)
      {
        browser.takeScreenshot().then(function (png) 
          {
            allure.createAttachment('Screenshot', function () 
              {
                return new Buffer(png, 'base64')
              }, 
              'image/png'
            )();
            done();
          }
        )
      }
    );

    //For generating HTML reports
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter(
        {
          consolidateAll: true,
          savePath: './',
          filePrefix: 'xmlresults'
        }
      )
    );

    
  },

  //For generating HTML reports

  onComplete: function() 
  {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) 
      {
        browserName = caps.get('browserName');
        browserVersion = caps.get('version');
        platform = caps.get('platform');

        var HTMLReport = require('protractor-html-reporter-2');

        testConfig = 
        {
            reportTitle: 'Protractor Test Execution Report',
            outputPath: './',
            outputFilename: 'ProtractorTestReport',
            screenshotPath: './screenshots',
            testBrowser: browserName,
            browserVersion: browserVersion,
            modifiedSuiteName: false,
            screenshotsOnlyOnFailure: true,
            testPlatform: platform
        };
        new HTMLReport().from('xmlresults.xml', testConfig);
      }
    );

  },

  // Close the report after all tests finish

  afterLaunch: function(exitCode) 
  {
    return new Promise(function(resolve)
      {
        reporter.afterLaunch(resolve.bind(this, exitCode));
      }
    );
  }
};
