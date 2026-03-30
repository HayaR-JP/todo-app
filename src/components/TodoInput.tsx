import { useState } from 'react'
import { Priority } from '../types'

interface Props {
  onAdd: (text: string, priority: Priority, dueDate?: string) => void
}

export const TodoInput = ({ onAdd }: Props) => {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() === '') return
    onAdd(text.trim(), priority, dueDate || undefined)
    setText('')
    setPriority('medium')
    setDueDate('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="タスクを入力..."
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #333',
            background: '#1e1e1e',
            color: '#f0ede6',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid #c8f542',
            background: 'transparent',
            color: '#c8f542',
            fontSize: '14px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          追加
        </button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <select
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid #333',
            background: '#1e1e1e',
            color: '#888',
            fontSize: '12px',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          <option value="high">🔴 高</option>
          <option value="medium">🟡 中</option>
          <option value="low">🟢 低</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid #333',
            background: '#1e1e1e',
            color: '#888',
            fontSize: '12px',
            outline: 'none'
          }}
        />
      </div>
    </form>
  )
}
