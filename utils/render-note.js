/**
 * Render HTML for a note section of the post.
 */
const renderNote = (noteContent) => {
  return `
<aside role="note" class="my-10 bg-blue-200 dark:bg-blue-900 px-6 py-6">
  <div class="not-prose text-zinc-900 dark:text-zinc-100">
    → ${noteContent.trim()}
  </div>
</aside>
`
}

/**
 * Export public interface.
 */
module.exports = { renderNote }
