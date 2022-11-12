/**
 * Reading time, expressed as WPM (words per minute).
 */
const readingSpeed = 238

/**
 * Return the page HTML.
 */
const getHtml = (content) => {
  return content.templateContent ?? content
}

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
const estimateReadingTime = (content) => {
  return Math.round(countWords(stripHtml(getHtml(content))) / readingSpeed) + ' min'
}

/**
 * Export public interface.
 */
module.exports = { estimateReadingTime }
