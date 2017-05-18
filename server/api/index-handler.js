const path = require('path');
const og = require('../lib/og');
const { openAll } = require('../lib/file-opener');
const {
  handleFiles,
  findOnePost
} = require('./file-helpers');

const staticDir = path.resolve(__dirname, '..', '..', 'app', 'static');

module.exports = (req, res) => {
  const htmlFile = path.join(staticDir, 'index.html');
  
  // Hydrate post OG data
  if (req.url.indexOf('/r/') > -1) {
    const slug = req.url.replace('/r/', '');
    openAll()
      .then(p => findOnePost(slug, p))
      .then(handleFiles)
      .then(p => res.end(
        og(htmlFile, 'article', req.url, p[0].title, p[0].coverImg)
      ));
  } else {
    res.end(
      og(htmlFile, 'website', req.url)
    );
  }
};
