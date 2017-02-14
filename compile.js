/* global require */
const webpack = require('webpack');
const clear = require('clear');

// Parse args
const watch = process.argv.filter((val) => val === '--watch').length > 0;
const release = process.argv.filter((val) => val === '--release').length > 0;

const ENV = process.env.NODE_ENV || 'development';
const config = (ENV === 'production' || release) ?
  require('./config/webpack.production.config.js') :
  require('./config/webpack.config.js')

outputStartupSuccess();
const compiler = webpack(config);

if (watch) {
  compiler.watch({}, handleCompiled);
  return;
}

compiler.run(handleCompiled);

function handleCompiled(err, stats) {
  if (err) {
    // Throw for fatal errors
    throw err;
  }
  const statsObj = stats.toJson();
  if (statsObj.errors.length > 0) {
    return console.error(statsObj.errors[0]);
  }
  if (statsObj.warnings.length > 0) {
    console.warn(statsObj.warnings);
  }
  clear(); // Clear the console of previous output to keep stuff clean
  console.log(`🙌   Built in ${stats.endTime - stats.startTime}ms`);
}

function outputStartupSuccess() {
  clear();
  console.log('⚙️   Running first compilation...');
}
