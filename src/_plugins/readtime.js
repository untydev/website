/**
 * Reading time, expressed as WPM (words per minute).
 */
const readingSpeed = 238

/**
 * Strip HTML tags and return text.
 */
const stripHtml = (htmlContent) => {
  return htmlContent.replace(new RegExp(String.raw`<\/?[a-z0-9]+\b[^>]*>|<!--[^]*?-->`, 'gi'), '')
}

/**
 * Count the number of words in text.
 */
const countWords = (textContent) => {
  return textContent.split(/\s+/).length
}

/**
 * Estimate reading time of the content.
 */
const estimateReadingTime = (html) => {
  const estimated = Math.round(countWords(stripHtml(html)) / readingSpeed)
  return estimated < 1 ? 1 : estimated
}

export default async function htmlReadTimePlugin (ctx) {
  ctx.addProcess({ html: true, beforeRender: true }, ({ html }) => {
    html.match({ tag: 'readtime', attrs: { src: true } }, (node) => {
      const post = ctx.filterSource(({ src }) => src.path === node.attrs.src)
      node.content = estimateReadingTime(post[0].html.render())
      node.tag = false
      return node
    })
  })
}
