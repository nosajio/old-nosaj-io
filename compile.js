const webpack = require('webpack');
const clear = require('clear');

// Parse args
const watch = process.argv.filter((val) => val === '--watch').length > 0;
const release = process.argv.filter((val) => val === '--release').length > 0;

const ENV = process.env.NODE_ENV || 'development';
const config = (ENV === 'production') ?
  require('./config/webpack.production.config.js') :
  require('./config/webpack.config.js')

outputStartupSuccess();
const compiler = webpack(config);
compiler.run(handleComplete);

if (watch) {
  compiler.watch({}, handleComplete);
}

function handleComplete(err, stats) {
  if (err) {
    console.log('----------');
    console.warn(err);
    console.log('----------');
    return;
  }
  clear(); // Clear the console of previous output to keep stuff clean
  console.log(`🙌   Built in ${stats.endTime - stats.startTime}ms`);
}


function outputStartupSuccess() {
  clear();
  console.log('⚙️   Running first compilation...');
}
