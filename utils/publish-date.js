const dayjs = require("dayjs")

/**
 * Format and return a publishing date.
 */
const formatPublishDate = (value) => {
  return dayjs(value).format('MMM DD, YYYY')
}

/**
 * Export public interface.
 */
module.exports = { formatPublishDate }
