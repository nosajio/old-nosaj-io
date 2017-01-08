const path = require('path');

module.exports = augment;

function augment(augmenters, writing) {
  'use strict';
  if (! augmenters) {
    return console.error('Augmenters array required for augment to work');
  }

  const augmentersDir = path.join('..', 'api', 'augmenters');
  const augmentedwriting = writing.map(augmentNote);

  return augmentedwriting;

  function augmentNote(note) {
    let clonedNote = Object.assign({}, note);
    augmenters.forEach((aug) => {
      clonedNote = require( path.join(augmentersDir, aug) )(clonedNote);
    });
    return clonedNote;
  }
}
