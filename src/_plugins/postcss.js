import postcss from 'postcss'
import postcssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default async function (ctx) {
  const plugins = [postcssImport(), autoprefixer()]

  if (ctx.profile === 'publishing') {
    plugins.push(cssnano({ preset: 'default' }))
  }

  const processor = postcss(plugins)
  const items = new Map()

  ctx.addProcess({ srcType: 'css' }, async (item) => {
    item.src.data = await ctx.read(item)
    items.set(item.src.path, item)
  })

  ctx.addProcess({ onFinalize: true }, async () => {
    for (const [path, item] of items.entries()) {
      const { src, out } = item
      out.path = ctx.rewritePath(src.path)
      const { css } = await processor.process(src.data, { from: src.path, to: out.path })
      await ctx.write(out, css)
    }
  })
}
