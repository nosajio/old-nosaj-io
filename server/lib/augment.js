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
    // To properly manage both pure and async augment functions, wrap every response 
    // in a promise so that the result can be handled by Promise.all. This makes for 
    // more predictable behaviour.
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
