import { Question, SUBJECT_COLORS } from '../data/mockData';
import { useLanguage } from '../i18n';

interface Props {
  question: Question;
  saved: boolean;
  onOpen: () => void;
  onToggleSave: (e: React.MouseEvent) => void;
}

const DIFF_COLORS: Record<string, { bg: string; text: string }> = {
  Easy: { bg: 'var(--app-success-soft)', text: 'var(--app-success-ink)' },
  Medium: { bg: '#FEF3C7', text: 'var(--app-warning-ink)' },
  Hard: { bg: '#FEE2E2', text: 'var(--app-danger-ink)' },
};

export default function QuestionCard({ question, saved, onOpen, onToggleSave }: Props) {
  const { subjectLabel, difficultyLabel, t } = useLanguage();
  const subjectStyle = SUBJECT_COLORS[question.subject];
  const diffStyle = DIFF_COLORS[question.difficulty];

  return (
    <div
      onClick={onOpen}
      className="bg-white rounded-2xl p-4 cursor-pointer transition-all active:scale-[0.98]"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid var(--app-border-soft)' }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: subjectStyle.bg, color: subjectStyle.text, fontFamily: 'var(--font-display)' }}>
            {subjectStyle.icon} {subjectLabel(question.subject)}
          </span>
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--app-border-soft)', color: 'var(--app-muted)' }}>
            {question.chapter}
          </span>
        </div>
        <button
          onClick={onToggleSave}
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90"
          style={{ background: saved ? 'var(--app-primary-soft)' : 'var(--app-surface-alt)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? 'var(--app-primary-ink)' : 'none'} stroke={saved ? 'var(--app-primary-ink)' : 'var(--app-faint)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </button>
      </div>

      <p className="text-sm font-medium leading-snug mb-3" style={{ color: 'var(--app-text)' }}>
        {question.title}
      </p>
      <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: 'var(--app-muted)' }}>
        {question.question}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: diffStyle.bg, color: diffStyle.text }}>
          {difficultyLabel(question.difficulty)}
        </span>
        <span className="text-xs font-medium" style={{ color: 'var(--app-primary-ink)' }}>{t('bank', 'view')}</span>
      </div>
    </div>
  );
}
