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
        background: active ? '#4F46E5' : '#F1F5F9',
        color: active ? '#fff' : '#64748B',
        border: 'none',
        fontFamily: 'var(--font-display)',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}
