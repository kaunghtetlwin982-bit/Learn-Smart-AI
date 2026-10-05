interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'questions', label: 'Questions', icon: BookIcon },
  { id: 'saved', label: 'Saved', icon: BookmarkIcon },
  { id: 'me', label: 'Me', icon: UserIcon },
];

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'var(--app-primary-ink)' : 'none'} stroke={active ? 'var(--app-primary-ink)' : 'var(--app-faint)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function BookIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--app-primary-ink)' : 'var(--app-faint)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      {active && <path d="M8 7h8M8 11h5" strokeWidth="2" />}
    </svg>
  );
}

function BookmarkIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'var(--app-primary-ink)' : 'none'} stroke={active ? 'var(--app-primary-ink)' : 'var(--app-faint)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  );
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--app-primary-ink)' : 'var(--app-faint)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" fill={active ? 'var(--app-primary-soft)' : 'none'} />
    </svg>
  );
}

export default function BottomNav({ activeTab, onTabChange }: Props) {
  const { t } = useLanguage();
  const labels: Record<string, string> = { home: t('common', 'home'), questions: t('common', 'questions'), saved: t('common', 'saved'), me: t('common', 'me') };
  return (
    <nav style={{ borderTop: '1px solid var(--app-border)', background: 'var(--app-surface)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      className="fixed bottom-0 left-0 right-0 z-50 flex">
      {tabs.map(tab => {
        const active = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-xl transition-all"
              style={{ background: active ? 'var(--app-primary-soft)' : 'transparent' }}>
              <Icon active={active} />
            </span>
            <span className="text-xs font-medium whitespace-nowrap" style={{ fontFamily: 'var(--font-display)', color: active ? 'var(--app-primary-ink)' : 'var(--app-faint)' }}>
              {labels[tab.id] || tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
import { useLanguage } from '../i18n';
