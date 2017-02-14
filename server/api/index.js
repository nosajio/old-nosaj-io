const express         = require('express');
const fileOpener      = require('../lib/file-opener');
const augmentItems    = require('../lib/augment');
const {
  handleFiles,
  orderPosts,
  findOnePost
} = require('./file-helpers');

const api = express();

api.get('/posts', postsHandler)
api.get('/posts/:slug', postHandler)
api.get('/posts/:slug/css', require('./styles-handler'))
api.post('/messages', require('./messages-handler'))

module.exports = api;

function postHandler(req, res) {
  const {slug} = req.params;
  const augmentWith = ['friendlyDate', 'readingTime'];
  fileOpener
    .openAll()
    .then(findOnePost.bind(this, slug))
    .then(handleFiles)
    .then(augmentItems.bind(this, augmentWith))
    .then(post => {
      res.json(post[0])
    });
}


function postsHandler(req, res) {
  const augmentWith = ['friendlyDate', 'readingTime'];
  fileOpener
    .openAll()
    .then(handleFiles)
    .then(orderPosts)
    .then(augmentItems.bind(this, augmentWith))
    .then(posts => {
      if (! posts.length) {
        return res.status(404).json([]);
      }
      res.json(posts)
    });
}
