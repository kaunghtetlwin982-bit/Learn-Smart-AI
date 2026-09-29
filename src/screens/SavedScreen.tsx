import { QUESTIONS, SUBJECT_COLORS } from '../data/mockData';
import EmptyState from '../components/EmptyState';

interface Props {
  savedIds: Set<string>;
  onToggleSave: (id: string) => void;
  onOpenQuestion: (id: string) => void;
  onBrowse: () => void;
}

export default function SavedScreen({ savedIds, onToggleSave, onOpenQuestion, onBrowse }: Props) {
  const saved = QUESTIONS.filter(q => savedIds.has(q.id));

  return (
    <div className="flex flex-col min-h-full pb-20">
      <div className="px-5 pt-10 pb-5" style={{ background: '#fff', borderBottom: '1px solid #F1F5F9' }}>
        <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#1E293B' }}>Saved Questions</h1>
        <p className="text-sm mt-1" style={{ color: '#64748B' }}>
          {saved.length > 0 ? `${saved.length} question${saved.length !== 1 ? 's' : ''} saved` : 'No saved questions yet'}
        </p>
      </div>

      <div className="flex-1 px-5 pt-4">
        {saved.length === 0 ? (
          <EmptyState
            icon="🔖"
            title="Nothing saved yet"
            description="Save important questions to review them later. Tap the bookmark icon on any question."
            action={{ label: 'Browse Question Bank', onClick: onBrowse }}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {saved.map(q => {
              const s = SUBJECT_COLORS[q.subject];
              return (
                <div key={q.id} onClick={() => onOpenQuestion(q.id)}
                  className="bg-white rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-all"
                  style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9' }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: s.bg, color: s.text, fontFamily: 'var(--font-display)' }}>
                        {s.icon} {q.subject}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full" style={{ background: '#F1F5F9', color: '#475569' }}>{q.chapter}</span>
                    </div>
                    <button onClick={e => { e.stopPropagation(); onToggleSave(q.id); }}
                      className="w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90 shrink-0"
                      style={{ background: '#EEF2FF', border: 'none', cursor: 'pointer' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#4F46E5" stroke="#4F46E5" strokeWidth="0">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm font-semibold mb-1.5" style={{ color: '#1E293B', fontFamily: 'var(--font-display)' }}>{q.title}</p>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#64748B' }}>{q.question}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
