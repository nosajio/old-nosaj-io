const fs = require('fs');

/**
 * Use this helper to add OpenGraph meta tags to the index.html file for the
 * current URL
 */
 
/**
 * OG Helper
 * @param {String} indexFile
 * @param {String} url
 * @param {String} title
 * @param {String} description
 * @param {String} image
 * @return {String} indexHTML
 */
const ogHelper = (htmlFile, type='website', url='/', title='Jason makes the internet',  image='http://a.nosaj.io/og-nosaj.png' ) => {
  const tags = `
    <meta name="og:url" property="og:url" content="https://nosaj.io${url}" />
    <meta name="og:type" property="og:type" content="${type}" />
    <meta name="og:title" property="og:title" content="${title}" />
    <meta name="og:image" property="og:image" content="${image}" />
  `;
  const indexHTML = fs.readFileSync(htmlFile, 'utf8');
  return indexHTML.replace('<!-- {{OpenGraph}} -->', tags);
}

module.exports = ogHelper;
