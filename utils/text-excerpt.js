/**
 * Return the page HTML.
 */
const getHtml = (value) => {
  return value.templateContent ?? value
}

/**
 * Strip HTML tags and return text.
 */
const stripHtml = (htmlContent) => {
  return htmlContent.replace(new RegExp(String.raw`<\/?[a-z0-9]+\b[^>]*>|<!--[^]*?-->`, 'gi'), '')
}

/**
 *
 */
const trimText = (text) => {
  return text.substring(0, 200)
}

/**
 *
 */
const removeChars = (text) => {
  return text.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
}

/**
 *
 */
const trimWhitespaces = (text) => {
  return text.trim()
}

/**
 *
 */
const addEllipsis = (text) => {
  return text.concat('...')
}

/**
 * Extract excerpt from any content.
 */
const extractTextExcerpt = (value) => {
  return addEllipsis(trimWhitespaces(trimText(removeChars(stripHtml(getHtml(value))))))
}

/**
 * Export public interface.
 */
module.exports = { extractTextExcerpt }
