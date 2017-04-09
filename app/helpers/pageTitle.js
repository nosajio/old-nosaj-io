/**
 * Page Title Helper
 * Easily change the page title while keeping the static parts of it.
 */
 
const pageTitle = (titleString) => {
  const staticAppend = 'nosaj.io';
  document.title = `${titleString} • ${staticAppend}`;
}

export default pageTitle;
