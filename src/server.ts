import { app } from './app'
import { env } from './env'
import { routes } from './http/routes'

const port = env.PORT || 3333

app.use(routes)

app.listen(port, () => {
  console.log(`🚀 Server HTTP is ready on port ${port}!`)
})
