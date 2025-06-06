import http from 'node:http'
import { routes } from './routes/index.js'
import { extractQueryParams } from './utils/extract-query-params.js'
import { json } from './middlewares/json.js'


const server = http.createServer(async (req, res) => {
  const { method, url } = req

  if (url !== '/upload') {
    await json(req, res)
  }
  
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (!route) return res.writeHead(404).end('Not found')

  const routeParams = req.url.match(route.path)

  const { query, ...params } = routeParams.groups
  req.params = params
  req.query = query ? extractQueryParams(query) : {}

  return route.handler(req, res)
})

server.listen(3333)