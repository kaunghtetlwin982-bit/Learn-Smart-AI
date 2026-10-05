interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search questions...' }: Props) {
  const { t } = useLanguage();
  return (
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--app-faint)" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
      </span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder === 'Search questions...' ? t('common', 'search') : placeholder}
        className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all"
        style={{ background: 'var(--app-surface)', border: '1.5px solid var(--app-border)', color: 'var(--app-text)', fontFamily: 'var(--font-body)' }}
        onFocus={e => e.target.style.borderColor = 'var(--app-primary)'}
        onBlur={e => e.target.style.borderColor = 'var(--app-border)'}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full"
          style={{ background: 'var(--app-subtle)' }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
import { useLanguage } from '../i18n';
