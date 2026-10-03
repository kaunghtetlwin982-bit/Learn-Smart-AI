import { SUBJECTS, SUBJECT_COLORS, SUBJECT_PROGRESS } from '../data/mockData';

interface Props {
  viewedCount: number;
  savedCount: number;
}

export default function ProgressScreen({ viewedCount, savedCount }: Props) {
  return (
    <div className="flex flex-col min-h-full pb-20">
      <div className="px-5 pt-10 pb-5" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)' }}>
        <h1 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>My Progress</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>Grade 11 · 2026 Academic Year</p>
      </div>

      <div className="px-5 -mt-4">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: 'Questions Viewed', value: viewedCount, icon: '👁', color: '#4F46E5', bg: '#EEF2FF' },
            { label: 'Questions Saved', value: savedCount, icon: '🔖', color: '#10B981', bg: '#D1FAE5' },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl p-4"
              style={{ background: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: stat.bg }}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold mb-0.5" style={{ fontFamily: 'var(--font-display)', color: stat.color }}>{stat.value}</p>
              <p className="text-xs leading-tight" style={{ color: '#64748B' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Subject progress */}
        <p className="text-sm font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#1E293B' }}>Subject Progress</p>
        <div className="flex flex-col gap-3 mb-5">
          {SUBJECTS.map(subject => {
            const s = SUBJECT_COLORS[subject];
            const progress = SUBJECT_PROGRESS[subject];
            return (
              <div key={subject} className="bg-white rounded-2xl p-4"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: s.bg }}>
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: '#1E293B' }}>{subject}</p>
                    <p className="text-xs" style={{ color: '#64748B' }}>Grade 11</p>
                  </div>
                  <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: s.text }}>{progress}%</span>
                </div>
                <div className="h-2.5 rounded-full" style={{ background: '#F1F5F9' }}>
                  <div className="h-full rounded-full transition-all" style={{ background: `linear-gradient(90deg, ${s.text}, ${s.text}88)`, width: `${progress}%` }} />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs" style={{ color: '#94A3B8' }}>Started</span>
                  <span className="text-xs font-medium" style={{ color: s.text }}>{progress >= 80 ? 'Excellent' : progress >= 60 ? 'Good' : 'Keep going!'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tip card */}
        <div className="rounded-2xl p-4 mb-5" style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A' }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: '#92400E' }}>Study Tip</p>
              <p className="text-xs leading-relaxed" style={{ color: '#78350F' }}>
                Focus on Physics this week — you're at 55%. Even 20 minutes of daily practice can significantly improve your score before exams!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
