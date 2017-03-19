const getHitsFor = require('../../lib/hitcount').getFor;

module.exports = hitCountAugment;

function hitCountAugment(item) {
  return new Promise(promiseHandler);
  
  function promiseHandler(resolve) {
    getHitsFor(item.slug).then(hits => {
      const hitCount = hits.length + 1; // plus one for this hit, as it will be recorded separately
      item.hits = hitCount;
      resolve(item);
    });
  }
}
