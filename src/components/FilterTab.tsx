import { FilterType } from '../types'

interface Props {
  filter: FilterType
  onFilter: (filter: FilterType) => void
  counts: { all: number; active: number; completed: number }
  onClearCompleted: () => void
}

export const FilterTab = ({ filter, onFilter, counts, onClearCompleted }: Props) => {
  const tabs: { label: string; value: FilterType }[] = [
    { label: `すべて (${counts.all})`, value: 'all' },
    { label: `未完了 (${counts.active})`, value: 'active' },
    { label: `完了 (${counts.completed})`, value: 'completed' }
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => onFilter(tab.value)}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: filter === tab.value ? '#c8f542' : '#333',
              background: filter === tab.value ? '#c8f542' : 'transparent',
              color: filter === tab.value ? '#0e0e0e' : '#888',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {counts.completed > 0 && (
        <button
          onClick={onClearCompleted}
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid #333',
            background: 'transparent',
            color: '#888',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#E24B4A'; e.currentTarget.style.color = '#E24B4A' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#888' }}
        >
          完了済みを削除
        </button>
      )}
    </div>
  )
}
