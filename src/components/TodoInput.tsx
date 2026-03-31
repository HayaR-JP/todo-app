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
    <form onSubmit={handleSubmit} style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="タスクを入力..."
          style={{
            flex: 1,
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid #333',
            background: '#1e1e1e',
            color: '#f0ede6',
            fontSize: '12px',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #c8f542',
            background: 'transparent',
            color: '#c8f542',
            fontSize: '11px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          追加
        </button>
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        <select
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
          style={{
            padding: '4px 8px',
            borderRadius: '6px',
            border: '1px solid #333',
            background: '#1e1e1e',
            color: '#888',
            fontSize: '11px',
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
            padding: '4px 8px',
            borderRadius: '6px',
            border: '1px solid #333',
            background: '#1e1e1e',
            color: '#888',
            fontSize: '11px',
            outline: 'none',
            flex: 1
          }}
        />
      </div>
    </form>
  )
}
