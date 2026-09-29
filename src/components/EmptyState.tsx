interface Props {
  icon?: string;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export default function EmptyState({ icon = '🔍', title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#1E293B' }}>{title}</h3>
      <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748B' }}>{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95"
          style={{ background: '#4F46E5', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)' }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
