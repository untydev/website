/**
 * Render HTML for a note section of the post.
 */
const renderNote = (noteContent) => {
  return `
<aside role="note" class="note rounded-md bg-sky-100 dark:bg-sky-800 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-sky-400 dark:text-sky-500 mt-1">
        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="not-prose ml-3 flex-1 md:flex md:justify-between">
      <p class="text-lg text-sky-700 dark:text-sky-200 leading-8">
        ${noteContent.trim()}
      </p>
    </div>
  </div>
</aside>
`
}

/**
 * Export public interface.
 */
module.exports = { renderNote }
