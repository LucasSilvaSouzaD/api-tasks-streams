import { buildRoutePath } from "../../utils/build-route-path.js"
import { importTasksFromCSV } from "../../utils/import-tasks-from-csv.js"

export const uploadFileTasks = {
  method: 'POST',
  path: buildRoutePath('/upload'),
  handler: (req, res) => {
    try {
      const contentType = req.headers['content-type']
      const boundary = contentType?.match(/boundary=(.+)$/)?.[1]

      if (!boundary) throw new Error('Boundary não encontrado')

      const chunks = []
      req.on('data', chunk => chunks.push(chunk))
      req.on('end', async () => {
        const buffer = Buffer.concat(chunks)
        const result = await importTasksFromCSV(buffer, boundary)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: `Importado ${result} tarefas` }))
      })

    } catch (error) {
      return res.writeHead(400).end(JSON.stringify({ message: error.message }))
    }
  }
}