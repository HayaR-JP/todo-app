import { useTodos } from './hooks/useTodos'
import { TodoInput } from './components/TodoInput'
import { KanbanBoard } from './components/KanbanBoard'

function App() {
  const {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    reorderTodos
  } = useTodos()

  const counts = {
    all: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  }

  const progress = todos.length === 0 ? 0 : Math.round((counts.completed / todos.length) * 100)

  return (
    <div style={{ minHeight: '100vh', background: '#0e0e0e', display: 'flex' }}>

      {/* サイドバー */}
      <div style={{
        width: '260px',
        flexShrink: 0,
        background: '#111',
        borderRight: '1px solid #1e1e1e',
        padding: '32px 20px',
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#c8f542', letterSpacing: '0.15em', marginBottom: '4px' }}>
            TASK MANAGER
          </p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', color: '#f0ede6', fontWeight: 400 }}>
            Todo App
          </h1>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: '#555', fontFamily: 'monospace' }}>進捗</span>
            <span style={{ fontSize: '11px', color: '#c8f542', fontFamily: 'monospace' }}>{progress}%</span>
          </div>
          <div style={{ height: '3px', background: '#1e1e1e', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: '#c8f542',
              borderRadius: '2px',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'すべて', count: counts.all, color: '#f0ede6' },
            { label: '未完了', count: counts.active, color: '#EF9F27' },
            { label: '完了', count: counts.completed, color: '#c8f542' },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              borderRadius: '8px',
              background: '#161616',
            }}>
              <span style={{ fontSize: '12px', color: '#888' }}>{item.label}</span>
              <span style={{ fontSize: '14px', fontFamily: 'monospace', color: item.color, fontWeight: 500 }}>{item.count}</span>
            </div>
          ))}
        </div>

        <div>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#555', letterSpacing: '0.1em', marginBottom: '12px' }}>
            NEW TASK
          </p>
          <TodoInput onAdd={addTodo} />
        </div>
      </div>

      {/* メインコンテンツ */}
      <div style={{ flex: 1, padding: '40px 32px', overflowY: 'auto' }}>
        <KanbanBoard
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>

    </div>
  )
}

export default App
