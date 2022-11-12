const addPosts = (collection) => {
  return collection
    .getFilteredByGlob('**/*.md')
    .filter((post) => {
      return !process.env.ELEVENTY_PRODUCTION || (process.env.ELEVENTY_PRODUCTION && post.data.draft === false)
    })
    .sort((a, b) => {
      return a < b ? 1 : -1
    })
}

module.exports = { addPosts }
