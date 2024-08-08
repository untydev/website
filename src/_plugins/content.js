export default function (ctx) {
  ctx.addProcess({ srcPath: '{{src}}/blog.html', html: true }, ({ html }) => {
    ctx.data.posts.sort((a, b) => (
      new Date(b.data.date) - new Date(a.data.date)
    ))
  })
}
