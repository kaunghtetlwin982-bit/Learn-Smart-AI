interface Props {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function FilterChip({ label, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95"
      style={{
        background: active ? 'var(--app-primary)' : 'var(--app-border-soft)',
        color: active ? '#fff' : 'var(--app-muted)',
        border: 'none',
        fontFamily: 'var(--font-display)',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}
