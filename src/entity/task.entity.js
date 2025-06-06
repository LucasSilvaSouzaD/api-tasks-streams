export class Task {
  constructor({ id, title, description, completed_at = null, created_at, updated_at }) {
    if (!id) throw new Error('O campo "id" é obrigatório.')
    if (!title) throw new Error('O campo "title" é obrigatório.')
    if (!description) throw new Error('O campo "description" é obrigatório.')

    const now = new Date()

    this.id = id
    this.title = title
    this.description = description
    this.completed_at = completed_at
    this.created_at = created_at || now
    this.updated_at = updated_at || now
  }

  complete() {
    this.completed_at = new Date()
    this.updated_at = new Date()
  }

  updateTitle(newTitle) {
    if (!newTitle) throw new Error('O novo título não pode ser vazio.')
    this.title = newTitle
    this.updated_at = new Date()
  }

  updateDescription(newDescription) {
    if (!newDescription) throw new Error('A nova descrição não pode ser vazia.')
    this.description = newDescription
    this.updated_at = new Date()
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed_at: this.completed_at,
      created_at: this.created_at,
      updated_at: this.updated_at,
    }
  }
}
