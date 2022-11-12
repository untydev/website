const htmlMinifier = require("html-minifier")

const minifyHtml = (content, outputPath) => {
  if (
    process.env.ELEVENTY_PRODUCTION &&
    outputPath &&
    outputPath.endsWith('.html')
  ) {
    let minified = htmlMinifier.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
    })
    return minified
  }

  return content
}

module.exports = { minifyHtml }
