const path = require('path');

module.exports = augment;

function augment(augmenters, writing) {
  if (! augmenters) {
    return console.error('Augmenters array required for augment to work');
  }

  const augmentersDir = path.join('..', 'api', 'augmenters');
  const augmentedPosts = writing.map(augmentPost);

  return Promise.all(augmentedPosts);

  function augmentPost(post) {
    const asyncOutputs = [];
    let clonedPost = Object.assign({}, post);
    augmenters.forEach(augFile => {
      let augmentedOutput = require( path.join(augmentersDir, augFile) )(clonedPost);
      if ('then' in augmentedOutput) {
        asyncOutputs.push(augmentedOutput);
        return;
      }
      clonedPost = augmentedOutput;
      return clonedPost;
    });
    // In order to properly manage both pure augment functions and async ones, 
    // wrap every response in a promise so that they can be handled by Promise.all
    // and passed back to the then.then.then... stream as the expected array of posts.
    if (asyncOutputs.length) {
      return new Promise(resolve => {
        Promise.all(asyncOutputs).then(asyncAugs => {
          asyncAugs.forEach(a => Object.assign(clonedPost, a));
          resolve(clonedPost);
        });
      });
    } else {
      return Promise.resolve(clonedPost);
    }
  }
}
