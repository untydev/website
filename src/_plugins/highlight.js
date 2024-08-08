import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index.js'

const chars = {
  '&lt;':   '<',
  '&gt;':   '>',
  '&amp;':  '&',
  '&quot;': '"',
  '&#39;':  "'",
  '&#x2F;': '/'
}

function unescape (html) {
  const p = Object.keys(chars).join('|')
  return html.replace(/(&lt;|&gt;|&amp;|&quot;|&#39;|&#x2F;)/g, (m) => {
    return chars[m]
  })
}

export default async function (ctx) {
  ctx.addProcess({ html: true }, ({ html }) => {
    html.match({ tag: 'code' }, (node) => {
      const lang = (() => {
        const matches  = `${node.attrs.class ?? ''}`.match(/(?:lang|language)-(\w*)/)
        return matches == null ? undefined : matches[1]
      })()

      if (lang == null) {
        return node
      }

      loadLanguages([lang])
      node.content = Prism.highlight(unescape(node.content[0]), Prism.languages[lang], lang)
      return node
    })
  })
}
