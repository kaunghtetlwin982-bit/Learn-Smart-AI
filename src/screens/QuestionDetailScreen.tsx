import { Question, SUBJECT_COLORS } from '../data/mockData';
import { useLanguage } from '../i18n';

interface Props {
  question: Question;
  saved: boolean;
  onToggleSave: () => void;
  onBack: () => void;
  onAskAI: () => void;
  onResources: () => void;
}

const DIFF_COLORS: Record<string, { bg: string; text: string }> = {
  Easy: { bg: 'var(--app-success-soft)', text: 'var(--app-success-ink)' },
  Medium: { bg: '#FEF3C7', text: 'var(--app-warning-ink)' },
  Hard: { bg: '#FEE2E2', text: 'var(--app-danger-ink)' },
};

export default function QuestionDetailScreen({ question, saved, onToggleSave, onBack, onAskAI, onResources }: Props) {
  const { t, subjectLabel, difficultyLabel } = useLanguage();
  const subjectStyle = SUBJECT_COLORS[question.subject];
  const diffStyle = DIFF_COLORS[question.difficulty];

  return (
    <div className="flex flex-col min-h-full pb-6 screen-enter">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 px-5 py-4"
        style={{ background: 'var(--app-surface)', borderBottom: '1px solid var(--app-border-soft)' }}>
        <button onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-90"
          style={{ background: 'var(--app-bg)', border: 'none', cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--app-text)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs" style={{ color: 'var(--app-muted)' }}>{subjectLabel(question.subject)} · {question.chapter}</p>
          <p className="text-sm font-semibold truncate" style={{ color: 'var(--app-text)', fontFamily: 'var(--font-display)' }}>{question.title}</p>
        </div>
        <button onClick={onToggleSave}
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-90"
          style={{ background: saved ? 'var(--app-primary-soft)' : 'var(--app-bg)', border: 'none', cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? 'var(--app-primary-ink)' : 'none'} stroke={saved ? 'var(--app-primary-ink)' : 'var(--app-faint)'} strokeWidth="2" strokeLinecap="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </button>
      </div>

      <div className="px-5 py-5 flex flex-col gap-4">
        {/* Meta badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: subjectStyle.bg, color: subjectStyle.text, fontFamily: 'var(--font-display)' }}>
            {subjectStyle.icon} {subjectLabel(question.subject)}
          </span>
          <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'var(--app-border-soft)', color: 'var(--app-muted)' }}>{question.chapter}</span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: diffStyle.bg, color: diffStyle.text }}>{difficultyLabel(question.difficulty)}</span>
        </div>

        {/* Question */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--app-primary-soft)', border: '1.5px solid #C7D2FE' }}>
          <p className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: 'var(--app-primary-ink)' }}>{t('common', 'question')}</p>
          <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--app-text)', fontFamily: 'var(--font-display)' }}>
            {question.question}
          </p>
        </div>

        {/* Answer */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--app-success-soft)', border: '1.5px solid #BBF7D0' }}>
          <div className="flex items-center gap-2 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--app-success-ink)' }}>{t('common', 'answer')}</p>
          </div>
          <p className="text-sm font-semibold leading-relaxed" style={{ color: 'var(--app-text)', fontFamily: 'var(--font-display)' }}>
            {question.answer}
          </p>
        </div>

        {/* Explanation */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--app-warn-soft)', border: '1.5px solid #FDE68A' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">💡</span>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--app-warning-ink)' }}>{t('common', 'explanation')}</p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--app-text)' }}>
            {question.explanation}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2.5 mt-1">
          <button onClick={onToggleSave}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-[0.98]"
            style={{ background: saved ? 'var(--app-primary-soft)' : 'var(--app-primary)', color: saved ? 'var(--app-primary-ink)' : '#fff', border: saved ? '1.5px solid #C7D2FE' : 'none', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? 'var(--app-primary-ink)' : '#fff'} stroke={saved ? 'var(--app-primary-ink)' : '#fff'} strokeWidth="0">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
            {saved ? t('detail', 'saved') : t('detail', 'save')}
          </button>
          <div className="grid grid-cols-2 gap-2.5">
            <button onClick={onAskAI}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95"
              style={{ background: 'var(--app-bg)', border: '1.5px solid var(--app-border)', color: 'var(--app-text)', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
              <span>🤖</span> {t('detail', 'askAI')}
            </button>
            <button onClick={onResources}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95"
              style={{ background: 'var(--app-bg)', border: '1.5px solid var(--app-border)', color: 'var(--app-text)', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
              <span>▶️</span> {t('detail', 'resources')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
