const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

const { formatPublishDate } = require('./utils/publish-date')
const { extractTextExcerpt } = require('./utils/text-excerpt')
const { estimateReadingTime } = require('./utils/reading-time')
const { addPosts } = require('./utils/add-posts')
const { minifyHtml } = require('./utils/minify-html')

module.exports = (config) => {
  config.addPassthroughCopy('./site/images')
  config.addPassthroughCopy('./site/fonts')
  config.addPassthroughCopy('./site/scripts')

  config.addPlugin(syntaxHighlight)

  config.addFilter('publishDate', formatPublishDate)
  config.addFilter('textExcerpt', extractTextExcerpt)
  config.addFilter('readingTime', estimateReadingTime)
  config.addCollection('posts', addPosts)
  config.addTransform('minifyHtml', minifyHtml)

  return {
    dir: { input: 'site', output: 'www' },
    markdownTemplateEngine: 'njk'
  }
}
