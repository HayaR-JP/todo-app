export type FilterType = 'all' | 'active' | 'completed'
export type Priority = 'high' | 'medium' | 'low'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
  priority: Priority
  dueDate?: string
}
