import { SUBJECTS, SUBJECT_COLORS, SUBJECT_PROGRESS } from '../data/mockData';

interface Props {
  savedCount: number;
  viewedCount: number;
  onNavigate: (tab: string) => void;
}

const SETTINGS = [
  { icon: '🔔', label: 'Notifications', detail: 'Study reminders on' },
  { icon: '🌐', label: 'Language', detail: 'English' },
  { icon: '🎨', label: 'Appearance', detail: 'Light theme' },
  { icon: '📊', label: 'Progress', detail: 'View detailed progress' },
];

const ABOUT_ITEMS = [
  { icon: 'ℹ️', label: 'About Learn Smart AI', detail: 'v1.0 · Demo Build' },
  { icon: '🔒', label: 'Privacy Policy', detail: '' },
  { icon: '⭐', label: 'Rate the App', detail: '' },
  { icon: '💬', label: 'Send Feedback', detail: '' },
];

export default function ProfileScreen({ savedCount, viewedCount, onNavigate }: Props) {
  const overallProgress = Math.round(Object.values(SUBJECT_PROGRESS).reduce((a, b) => a + b, 0) / SUBJECTS.length);

  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Profile header */}
      <div className="px-5 pt-10 pb-6" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)' }}>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'var(--font-display)', border: '2px solid rgba(255,255,255,0.3)' }}>
            JD
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: '#fff', fontFamily: 'var(--font-display)' }}>Jamie Davis</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>Grade 11 Student</p>
            <span className="inline-block mt-1 text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              2024 Academic Year
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Viewed', value: viewedCount },
            { label: 'Saved', value: savedCount },
            { label: 'Progress', value: `${overallProgress}%` },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <p className="text-lg font-bold" style={{ color: '#fff', fontFamily: 'var(--font-display)' }}>{stat.value}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pt-5">
        {/* Overall progress ring */}
        <div className="bg-white rounded-2xl p-4 mb-4 flex items-center gap-4"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9' }}>
          <div className="relative w-16 h-16 shrink-0">
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#F1F5F9" strokeWidth="8" />
              <circle cx="32" cy="32" r="26" fill="none" stroke="#4F46E5" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - overallProgress / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 32 32)" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold" style={{ color: '#4F46E5', fontFamily: 'var(--font-display)' }}>{overallProgress}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold mb-0.5" style={{ fontFamily: 'var(--font-display)', color: '#1E293B' }}>Overall Progress</p>
            <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>Across all 5 subjects. Keep it up!</p>
            <button onClick={() => onNavigate('progress')}
              className="text-xs font-semibold mt-1"
              style={{ color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-display)' }}>
              View detailed progress →
            </button>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { icon: '📚', label: 'Question Bank', color: '#EEF2FF', textColor: '#4F46E5', tab: 'questions' },
            { icon: '🔖', label: `Saved (${savedCount})`, color: '#D1FAE5', textColor: '#10B981', tab: 'saved' },
          ].map(item => (
            <button key={item.label} onClick={() => onNavigate(item.tab)}
              className="rounded-2xl p-4 flex flex-col items-center gap-2 transition-all active:scale-95"
              style={{ background: item.color, border: 'none', cursor: 'pointer' }}>
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-bold" style={{ color: item.textColor, fontFamily: 'var(--font-display)' }}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Settings section */}
        <p className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: '#94A3B8', fontFamily: 'var(--font-display)' }}>Settings</p>
        <div className="bg-white rounded-2xl overflow-hidden mb-4"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9' }}>
          {SETTINGS.map((item, i) => (
            <div key={item.label}
              className="flex items-center gap-3 px-4 py-3.5 cursor-pointer active:bg-gray-50 transition-all"
              style={{ borderBottom: i < SETTINGS.length - 1 ? '1px solid #F1F5F9' : 'none' }}
              onClick={() => item.label === 'Progress' && onNavigate('progress')}>
              <span className="text-lg w-8">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: '#1E293B' }}>{item.label}</p>
                {item.detail && <p className="text-xs" style={{ color: '#94A3B8' }}>{item.detail}</p>}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          ))}
        </div>

        {/* About section */}
        <p className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: '#94A3B8', fontFamily: 'var(--font-display)' }}>About</p>
        <div className="bg-white rounded-2xl overflow-hidden mb-5"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9' }}>
          {ABOUT_ITEMS.map((item, i) => (
            <div key={item.label}
              className="flex items-center gap-3 px-4 py-3.5 cursor-pointer active:bg-gray-50 transition-all"
              style={{ borderBottom: i < ABOUT_ITEMS.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
              <span className="text-lg w-8">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: '#1E293B' }}>{item.label}</p>
                {item.detail && <p className="text-xs" style={{ color: '#94A3B8' }}>{item.detail}</p>}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          ))}
        </div>

        <div className="text-center py-2 mb-4">
          <p className="text-xs" style={{ color: '#CBD5E1' }}>Learn Smart AI · Grade 11 Demo · v1.0</p>
          <p className="text-xs mt-1" style={{ color: '#CBD5E1' }}>Built for student project competition</p>
        </div>
      </div>
    </div>
  );
}
