const fileOpener = require('../../lib/file-opener');
const { handleFiles, orderPosts } = require('../file-helpers');

module.exports = nextPostAugment;

function nextPostAugment(item) {
  return new Promise(promiseHandler);
  
  function promiseHandler(resolve) {
    let nextIndex;
    
    fileOpener
      .openAll()
      
      // Add slugs and order posts chronologically
      .then(handleFiles)
      .then(orderPosts)
      
      // Find the post after item
      .then(posts => {
        posts.forEach((p, i) => {
          if (p.slug === item.slug) {
            nextIndex = i + 1;
          }
        });
        
        // When we're at the last index, just return the item as is
        if (nextIndex + 1 > posts.length) {
           return resolve(item);
        }
        
        // Embed the next post in with this one
        item.nextPost = posts[nextIndex];
        resolve(item);
      });
  }
}
