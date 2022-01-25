// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-docker-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: 'coverage/',
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ],
      check: {
        emitWarning: false,
        global: {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90,
          excludes: [
          ]
        },
        each: {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90,
          excludes: [
          ],
          overrides: {
          }
        }
      }
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessDocker', 'FirefoxHeadlessDocker'],
    singleRun: false,
    restartOnFileChange: true,
    customLaunchers: {
      ChromeHeadlessDocker: {
        base: 'Docker',   
        modemOptions: {
          socketPath: '/var/run/docker.sock'
        },
        createOptions: {
          Image: 'alpeware/chrome-headless-trunk',
          Env: ['CHROME_OPTS=$KARMA_URL'],
          HostConfig: {
            NetworkMode: 'host'
          }
        }
      },
      FirefoxHeadlessDocker: {
        base: 'Docker',
        modemOptions: {
          socketPath: '/var/run/docker.sock'
        },
        createOptions: {
          Image: 'rkuzsma/firefox-headless-stable:latest',
          Cmd: ['firefox', '-p', 'headless', '-headless', '-no-remote', '-url', '$KARMA_URL'],
          HostConfig: {
            NetworkMode: 'host'
          }
        }
      }
    } 
  });
};
