const striptags = require('striptags');

module.exports = readingTime;

function readingTime(item) {
  const augmentedItem = Object.assign({}, item);
  const text = striptags(augmentedItem.body);
  const avgWpm = 200; // The average words per minute that a person reads at
  const wordCount = text.split(' ').length;
  const readingTime = wordCount / avgWpm;
  augmentedItem.readingTime = Math.ceil(readingTime);
  return augmentedItem;
}
