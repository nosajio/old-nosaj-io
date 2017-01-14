const fs            = require('fs');
const sass          = require('node-sass');
const path          = require('path');
const fileOpener    = require('../lib/file-opener');
const {
  handleFiles,
  findOnePost
} = require('./file-helpers');

const scssLocation = path.join(__dirname);

module.exports = postStylesHandler;

function postStylesHandler(req, res) {
  const {slug} = req.params;
  fileOpener
    .openAll()
    .then(findOnePost.bind(this, slug))
    .then(handleFiles)
    .then(post =>
      createStylesheetForPost(post[0])
    );

  function createStylesheetForPost(post) {
    if (! post.color) {
      return res.status(404).end();
    }

    const postScssFile = path.join(scssLocation, 'post-styles.scss');
    fs.readFile(postScssFile, 'utf8', readFileCallback)

    function readFileCallback(err, data) {
      if (err) {
        throw err;
      }
      // Replace all template tags
      let primedScss = data.replace(new RegExp('{{primary-color}}', 'g'), post.color);
      primedScss = primedScss.replace(new RegExp('{{post-slug}}', 'g'), post.slug);
      const sassOptions = {
        data: primedScss
      };
      sass.render(sassOptions, handleResponse);
    }
  }

  function handleResponse(err, sassRes) {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res
      .header('Content-Type', 'text/css')
      .send(sassRes.css.toString());
  }
}
