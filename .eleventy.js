const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginRss = require('@11ty/eleventy-plugin-rss')

const { formatPublishDate } = require('./utils/publish-date')
const { estimateReadingTime } = require('./utils/reading-time')
const { renderNote } = require('./utils/render-note')
const { addPosts } = require('./utils/add-posts')
const { minifyHtml } = require('./utils/minify-html')

module.exports = (config) => {
  config.addPassthroughCopy('./site/images')
  config.addPassthroughCopy('./site/files')
  config.addPassthroughCopy('./site/fonts')
  config.addPassthroughCopy('./site/scripts')

  config.addPlugin(pluginSyntaxHighlight)
  config.addPlugin(pluginRss)

  config.addFilter('publishDate', formatPublishDate)
  config.addFilter('readingTime', estimateReadingTime)
  config.addPairedNunjucksShortcode('note', renderNote)
  config.addCollection('posts', addPosts)
  config.addTransform('minifyHtml', minifyHtml)
  config.setFrontMatterParsingOptions({ excerpt: true, excerpt_alias: 'excerpt' })

  return {
    dir: { input: 'site', output: 'www' },
    markdownTemplateEngine: 'njk'
  }
}
