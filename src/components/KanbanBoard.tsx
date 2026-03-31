import { Todo } from '../types'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDroppable,
  useDraggable
} from '@dnd-kit/core'

interface DraggableCardProps {
  todo: Todo
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const priorityConfig = {
  high:   { label: '高', color: '#E24B4A', bg: 'rgba(226,75,74,0.15)' },
  medium: { label: '中', color: '#EF9F27', bg: 'rgba(239,159,39,0.15)' },
  low:    { label: '低', color: '#1D9E75', bg: 'rgba(29,158,117,0.15)' }
}

const DraggableCard = ({ todo, onDelete, onEdit }: DraggableCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: todo.id })
  const p = priorityConfig[todo.priority]

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.4 : 1,
    cursor: 'grab',
    background: '#161616',
    border: '1px solid #1e1e1e',
    borderRadius: '10px',
    padding: '14px 16px',
    marginBottom: '8px',
    transition: isDragging ? 'none' : 'border-color 0.2s',
    userSelect: 'none' as const
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <span style={{ fontSize: '14px', color: todo.completed ? '#555' : '#f0ede6', textDecoration: todo.completed ? 'line-through' : 'none', flex: 1 }}>
          {todo.text}
        </span>
        <button
          onPointerDown={e => e.stopPropagation()}
          onClick={() => onDelete(todo.id)}
          style={{
            background: 'none',
            border: 'none',
            color: '#444',
            cursor: 'pointer',
            fontSize: '14px',
            padding: '0 0 0 8px',
            flexShrink: 0
          }}
        >
          ✕
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontSize: '11px',
          padding: '2px 8px',
          borderRadius: '20px',
          background: p.bg,
          color: p.color
        }}>
          {p.label}
        </span>
        {todo.dueDate && (
          <span style={{ fontSize: '11px', color: '#555' }}>{todo.dueDate}</span>
        )}
      </div>
    </div>
  )
}

interface DroppableColumnProps {
  id: string
  title: string
  todos: Todo[]
  count: number
  accentColor: string
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const DroppableColumn = ({ id, title, todos, count, accentColor, onDelete, onEdit }: DroppableColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        background: isOver ? '#1a1a1a' : '#111',
        border: `1px solid ${isOver ? accentColor : '#1e1e1e'}`,
        borderRadius: '12px',
        padding: '20px',
        minHeight: '400px',
        transition: 'border-color 0.2s, background 0.2s'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ fontSize: '13px', color: '#888', fontWeight: 500 }}>{title}</span>
        <span style={{
          fontSize: '11px',
          padding: '2px 8px',
          borderRadius: '20px',
          background: `${accentColor}22`,
          color: accentColor,
          fontFamily: 'monospace'
        }}>
          {count}
        </span>
      </div>
      {todos.map(todo => (
        <DraggableCard
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
      {todos.length === 0 && (
        <div style={{ textAlign: 'center', padding: '32px 0', color: '#333', fontSize: '13px' }}>
          タスクをここにドロップ
        </div>
      )}
    </div>
  )
}

interface Props {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export const KanbanBoard = ({ todos, onToggle, onDelete, onEdit }: Props) => {
  const sensors = useSensors(useSensor(PointerSensor))

  const activeTodos = todos.filter(t => !t.completed)
  const completedTodos = todos.filter(t => t.completed)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const todo = todos.find(t => t.id === active.id)
    if (!todo) return

    if (over.id === 'completed' && !todo.completed) {
      onToggle(todo.id)
    } else if (over.id === 'active' && todo.completed) {
      onToggle(todo.id)
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: '16px', height: '100%' }}>
        <DroppableColumn
          id="active"
          title="未完了"
          todos={activeTodos}
          count={activeTodos.length}
          accentColor="#EF9F27"
          onDelete={onDelete}
          onEdit={onEdit}
        />
        <DroppableColumn
          id="completed"
          title="完了済み"
          todos={completedTodos}
          count={completedTodos.length}
          accentColor="#c8f542"
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </DndContext>
  )
}
