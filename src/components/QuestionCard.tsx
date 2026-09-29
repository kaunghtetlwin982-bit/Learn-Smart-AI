import { Question, SUBJECT_COLORS } from '../data/mockData';

interface Props {
  question: Question;
  saved: boolean;
  onOpen: () => void;
  onToggleSave: (e: React.MouseEvent) => void;
}

const DIFF_COLORS: Record<string, { bg: string; text: string }> = {
  Easy: { bg: '#D1FAE5', text: '#065F46' },
  Medium: { bg: '#FEF3C7', text: '#92400E' },
  Hard: { bg: '#FEE2E2', text: '#991B1B' },
};

export default function QuestionCard({ question, saved, onOpen, onToggleSave }: Props) {
  const subjectStyle = SUBJECT_COLORS[question.subject];
  const diffStyle = DIFF_COLORS[question.difficulty];

  return (
    <div
      onClick={onOpen}
      className="bg-white rounded-2xl p-4 cursor-pointer transition-all active:scale-[0.98]"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9' }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: subjectStyle.bg, color: subjectStyle.text, fontFamily: 'var(--font-display)' }}>
            {subjectStyle.icon} {question.subject}
          </span>
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: '#F1F5F9', color: '#475569' }}>
            {question.chapter}
          </span>
        </div>
        <button
          onClick={onToggleSave}
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90"
          style={{ background: saved ? '#EEF2FF' : '#F8FAFC' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? '#4F46E5' : 'none'} stroke={saved ? '#4F46E5' : '#94A3B8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </button>
      </div>

      <p className="text-sm font-medium leading-snug mb-3" style={{ color: '#1E293B' }}>
        {question.title}
      </p>
      <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: '#64748B' }}>
        {question.question}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: diffStyle.bg, color: diffStyle.text }}>
          {question.difficulty}
        </span>
        <span className="text-xs font-medium" style={{ color: '#4F46E5' }}>View →</span>
      </div>
    </div>
  );
}
