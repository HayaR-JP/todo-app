import { useState } from 'react'
import { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const priorityConfig = {
  high:   { label: '高', color: '#E24B4A', bg: 'rgba(226,75,74,0.1)' },
  medium: { label: '中', color: '#EF9F27', bg: 'rgba(239,159,39,0.1)' },
  low:    { label: '低', color: '#1D9E75', bg: 'rgba(29,158,117,0.1)' }
}

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const p = priorityConfig[todo.priority]

  const handleEdit = () => {
    if (editText.trim() === '') return
    onEdit(todo.id, editText.trim())
    setIsEditing(false)
  }

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date()

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 16px',
      borderRadius: '10px',
      border: `1px solid ${isOverdue ? 'rgba(226,75,74,0.4)' : '#1e1e1e'}`,
      background: '#161616',
      marginBottom: '8px',
      transition: 'border-color 0.2s'
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = isOverdue ? 'rgba(226,75,74,0.6)' : '#333'}
      onMouseLeave={e => e.currentTarget.style.borderColor = isOverdue ? 'rgba(226,75,74,0.4)' : '#1e1e1e'}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#c8f542', flexShrink: 0 }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        {isEditing ? (
          <input
            autoFocus
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={e => { if (e.key === 'Enter') handleEdit(); if (e.key === 'Escape') setIsEditing(false) }}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid #c8f542',
              color: '#f0ede6',
              fontSize: '14px',
              outline: 'none',
              padding: '2px 0'
            }}
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            style={{
              fontSize: '14px',
              color: todo.completed ? '#444' : '#f0ede6',
              textDecoration: todo.completed ? 'line-through' : 'none',
              transition: 'all 0.2s',
              cursor: 'text',
              display: 'block'
            }}
          >
            {todo.text}
          </span>
        )}
        {todo.dueDate && (
          <span style={{
            fontSize: '11px',
            color: isOverdue ? '#E24B4A' : '#555',
            marginTop: '2px',
            display: 'block'
          }}>
            {isOverdue ? '⚠ ' : ''}{todo.dueDate}
          </span>
        )}
      </div>

      <span style={{
        fontSize: '11px',
        padding: '2px 8px',
        borderRadius: '20px',
        background: p.bg,
        color: p.color,
        flexShrink: 0
      }}>
        {p.label}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        style={{
          padding: '4px 10px',
          borderRadius: '6px',
          border: '1px solid #333',
          background: 'transparent',
          color: '#888',
          fontSize: '11px',
          cursor: 'pointer',
          flexShrink: 0
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#E24B4A'; e.currentTarget.style.color = '#E24B4A' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#888' }}
      >
        削除
      </button>
    </div>
  )
}
