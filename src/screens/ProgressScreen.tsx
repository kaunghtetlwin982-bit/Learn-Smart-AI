import { SUBJECTS, SUBJECT_COLORS, SUBJECT_PROGRESS } from '../data/mockData';
import { useLanguage } from '../i18n';

interface Props {
  viewedCount: number;
  savedCount: number;
}

export default function ProgressScreen({ viewedCount, savedCount }: Props) {
  const { t, subjectLabel } = useLanguage();
  return (
    <div className="flex flex-col min-h-full pb-20">
      <div className="px-5 pt-10 pb-5" style={{ background: 'linear-gradient(135deg, var(--app-primary) 0%, #6366F1 100%)' }}>
        <h1 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>{t('progress', 'title')}</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{t('progress', 'year')}</p>
      </div>

      <div className="px-5 -mt-4">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: t('progress', 'viewed'), value: viewedCount, icon: '👁', color: 'var(--app-primary-ink)', bg: 'var(--app-primary-soft)' },
            { label: t('progress', 'saved'), value: savedCount, icon: '🔖', color: '#10B981', bg: 'var(--app-success-soft)' },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl p-4"
              style={{ background: 'var(--app-surface)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: stat.bg }}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold mb-0.5" style={{ fontFamily: 'var(--font-display)', color: stat.color }}>{stat.value}</p>
              <p className="text-xs leading-tight" style={{ color: 'var(--app-muted)' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Subject progress */}
        <p className="text-sm font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--app-text)' }}>{t('progress', 'subjectProgress')}</p>
        <div className="flex flex-col gap-3 mb-5">
          {SUBJECTS.map(subject => {
            const s = SUBJECT_COLORS[subject];
            const progress = SUBJECT_PROGRESS[subject];
            return (
              <div key={subject} className="bg-white rounded-2xl p-4"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid var(--app-border-soft)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: s.bg }}>
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--app-text)' }}>{subjectLabel(subject)}</p>
                    <p className="text-xs" style={{ color: 'var(--app-muted)' }}>{t('common', 'grade11')}</p>
                  </div>
                  <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: s.text }}>{progress}%</span>
                </div>
                <div className="h-2.5 rounded-full" style={{ background: 'var(--app-border-soft)' }}>
                  <div className="h-full rounded-full transition-all" style={{ background: `linear-gradient(90deg, ${s.text}, ${s.text}88)`, width: `${progress}%` }} />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs" style={{ color: 'var(--app-faint)' }}>{t('progress', 'started')}</span>
                  <span className="text-xs font-medium" style={{ color: s.text }}>{progress >= 80 ? t('progress', 'excellent') : progress >= 60 ? t('progress', 'good') : t('progress', 'keepGoing')}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tip card */}
        <div className="rounded-2xl p-4 mb-5" style={{ background: 'var(--app-warn-soft)', border: '1.5px solid #FDE68A' }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--app-warning-ink)' }}>{t('progress', 'tip')}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--app-warning-ink)' }}>
                {t('progress', 'tipText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
