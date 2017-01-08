const {parseFilename, parseFile} = require('../lib/markdown-parser');

module.exports = {
  handleFiles,
  handleFile,
  findOnePost,
  orderPosts,
};

function handleFiles(files) {
  return files.map(handleFile)
}

function handleFile(file) {
  const fname = parseFilename(file.name);
  const fbody = parseFile(file.body);
  return Object.assign({}, fname, fbody);
}

function findOnePost(slug, files) {
  return files.filter(file => parseFilename(file.name).slug === slug);
}

// Order posts by date, newest first
function orderPosts(posts) {
  return posts.sort((a, b) => {
    a = new Date(a.date);
    b = new Date(b.date);
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  });
}
