import { Todo } from '../types'
import { TodoItem } from './TodoItem'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SortableItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const SortableItem = ({ todo, onToggle, onDelete, onEdit }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* ドラッグハンドル */}
        <div
          {...listeners}
          style={{
            cursor: 'grab',
            color: '#333',
            fontSize: '16px',
            padding: '4px',
            flexShrink: 0,
            userSelect: 'none'
          }}
        >
          ⠿
        </div>
        <div style={{ flex: 1 }}>
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      </div>
    </div>
  )
}

interface Props {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  onReorder: (todos: Todo[]) => void
}

const priorityOrder = { high: 0, medium: 1, low: 2 }

export const TodoList = ({ todos, onToggle, onDelete, onEdit, onReorder }: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const sortedTodos = [...todos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = sortedTodos.findIndex(t => t.id === active.id)
    const newIndex = sortedTodos.findIndex(t => t.id === over.id)
    onReorder(arrayMove(sortedTodos, oldIndex, newIndex))
  }

  if (todos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0', color: '#444', fontSize: '14px' }}>
        タスクがありません
      </div>
    )
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sortedTodos.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div>
          {sortedTodos.map(todo => (
            <SortableItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
