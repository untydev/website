export default function (ctx) {
  ctx.addProcess({ html: true }, ({ html }) => {
    html.match({ tag: 'x-note' }, (node) => {
      node.tag = 'aside'
      node.attrs = { role: 'note', class: 'alert is-info' }
      node.content = html.render(node.content)
      return node
    })
  })
}
