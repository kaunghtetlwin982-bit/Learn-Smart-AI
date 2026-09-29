import { Question, SUBJECT_COLORS } from '../data/mockData';

interface Props {
  question: Question;
  saved: boolean;
  onToggleSave: () => void;
  onBack: () => void;
  onAskAI: () => void;
  onResources: () => void;
}

const DIFF_COLORS: Record<string, { bg: string; text: string }> = {
  Easy: { bg: '#D1FAE5', text: '#065F46' },
  Medium: { bg: '#FEF3C7', text: '#92400E' },
  Hard: { bg: '#FEE2E2', text: '#991B1B' },
};

export default function QuestionDetailScreen({ question, saved, onToggleSave, onBack, onAskAI, onResources }: Props) {
  const subjectStyle = SUBJECT_COLORS[question.subject];
  const diffStyle = DIFF_COLORS[question.difficulty];

  return (
    <div className="flex flex-col min-h-full pb-6 screen-enter">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 px-5 py-4"
        style={{ background: '#fff', borderBottom: '1px solid #F1F5F9' }}>
        <button onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-90"
          style={{ background: '#F4F6FB', border: 'none', cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs" style={{ color: '#64748B' }}>{question.subject} · {question.chapter}</p>
          <p className="text-sm font-semibold truncate" style={{ color: '#1E293B', fontFamily: 'var(--font-display)' }}>{question.title}</p>
        </div>
        <button onClick={onToggleSave}
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-90"
          style={{ background: saved ? '#EEF2FF' : '#F4F6FB', border: 'none', cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? '#4F46E5' : 'none'} stroke={saved ? '#4F46E5' : '#94A3B8'} strokeWidth="2" strokeLinecap="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </button>
      </div>

      <div className="px-5 py-5 flex flex-col gap-4">
        {/* Meta badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: subjectStyle.bg, color: subjectStyle.text, fontFamily: 'var(--font-display)' }}>
            {subjectStyle.icon} {question.subject}
          </span>
          <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: '#F1F5F9', color: '#475569' }}>{question.chapter}</span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: diffStyle.bg, color: diffStyle.text }}>{question.difficulty}</span>
        </div>

        {/* Question */}
        <div className="rounded-2xl p-4" style={{ background: '#EEF2FF', border: '1.5px solid #C7D2FE' }}>
          <p className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: '#6366F1' }}>Question</p>
          <p className="text-base font-medium leading-relaxed" style={{ color: '#1E293B', fontFamily: 'var(--font-display)' }}>
            {question.question}
          </p>
        </div>

        {/* Answer */}
        <div className="rounded-2xl p-4" style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0' }}>
          <div className="flex items-center gap-2 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#16A34A' }}>Answer</p>
          </div>
          <p className="text-sm font-semibold leading-relaxed" style={{ color: '#1E293B', fontFamily: 'var(--font-display)' }}>
            {question.answer}
          </p>
        </div>

        {/* Explanation */}
        <div className="rounded-2xl p-4" style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">💡</span>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#D97706' }}>Explanation</p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#1E293B' }}>
            {question.explanation}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2.5 mt-1">
          <button onClick={onToggleSave}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-[0.98]"
            style={{ background: saved ? '#EEF2FF' : '#4F46E5', color: saved ? '#4F46E5' : '#fff', border: saved ? '1.5px solid #C7D2FE' : 'none', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? '#4F46E5' : '#fff'} stroke={saved ? '#4F46E5' : '#fff'} strokeWidth="0">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
            {saved ? 'Question Saved ✓' : 'Save Question'}
          </button>
          <div className="grid grid-cols-2 gap-2.5">
            <button onClick={onAskAI}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95"
              style={{ background: '#F4F6FB', border: '1.5px solid #E2E8F0', color: '#1E293B', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
              <span>🤖</span> Ask AI
            </button>
            <button onClick={onResources}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95"
              style={{ background: '#F4F6FB', border: '1.5px solid #E2E8F0', color: '#1E293B', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
              <span>▶️</span> Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
