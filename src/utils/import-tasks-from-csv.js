import { Readable } from 'stream'
import readline from 'readline'
import { randomUUID } from 'crypto'
import { Database } from '../database/index.js'
import { Task } from '../entity/task.entity.js'

const database = new Database()

export async function importTasksFromCSV(buffer, boundary) {
  const body = buffer.toString()

  const filePart = body
    .split(`--${boundary}`)
    .find(part => part.includes('filename'))

  const csvStart = filePart.indexOf('\r\n\r\n') + 4
  const csvContent = filePart.slice(csvStart).trimEnd()


  const csvStream = Readable.from(csvContent.split('\n'))
  console.log("csvStream", csvStream)
  const rl = readline.createInterface({ input: csvStream })

  let isFirstLine = true
  let count = 0

  for await (const line of rl) {
    if (isFirstLine) {
      isFirstLine = false
      continue
    }

    const [id, title, description] = line.split(',')

    if (!title || !description) continue
    const task = new Task({
      id: randomUUID(),
      title: title.trim(),
      description: description.trim(),
    })

    database.insert('tasks', task)
    count++
  }

  return count
}
