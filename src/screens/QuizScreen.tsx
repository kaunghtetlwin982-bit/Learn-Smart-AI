import { useEffect, useMemo, useState } from 'react';
import { QUIZ_QUESTIONS, SUBJECTS, type Difficulty, type QuizQuestion } from '../data/mockData';
import { useLanguage } from '../i18n';
import { useAudioSettings } from '../audio';

type Phase = 'setup' | 'play' | 'result';
type CountMode = '5' | '10' | 'all';

interface Props {
  onExit: () => void;
  onHome: () => void;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
}

export default function QuizScreen({ onExit, onHome }: Props) {
  const { t, subjectLabel, difficultyLabel } = useLanguage();
  const { playSoundEffect, beginQuizAudio, endQuizAudio } = useAudioSettings();
  const [phase, setPhase] = useState<Phase>('setup');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('');
  const [countMode, setCountMode] = useState<CountMode>('5');
  const [attempt, setAttempt] = useState<QuizQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const availableQuestions = useMemo(() => QUIZ_QUESTIONS.filter(question =>
    (!subject || question.subject === subject) && (!difficulty || question.difficulty === difficulty),
  ), [subject, difficulty]);

  const countChoices: { id: CountMode; count: number }[] = [
    ...(availableQuestions.length > 5 ? [{ id: '5' as const, count: 5 }] : []),
    ...(availableQuestions.length > 10 ? [{ id: '10' as const, count: 10 }] : []),
    { id: 'all', count: availableQuestions.length },
  ];
  const chosenCount = countMode === 'all'
    ? availableQuestions.length
    : Math.min(Number(countMode), availableQuestions.length);

  const currentQuestion = attempt[questionIndex];
  const correctOption = currentQuestion?.options.find(option => option.id === currentQuestion.correctOptionId);
  const percentage = attempt.length ? Math.round((score / attempt.length) * 100) : 0;

  useEffect(() => () => endQuizAudio(), [endQuizAudio]);

  const updateSubject = (value: string) => {
    const nextAvailable = QUIZ_QUESTIONS.filter(question =>
      (!value || question.subject === value) && (!difficulty || question.difficulty === difficulty),
    ).length;
    setSubject(value);
    setCountMode(nextAvailable > 5 ? '5' : 'all');
  };

  const updateDifficulty = (value: Difficulty | '') => {
    const nextAvailable = QUIZ_QUESTIONS.filter(question =>
      (!subject || question.subject === subject) && (!value || question.difficulty === value),
    ).length;
    setDifficulty(value);
    setCountMode(nextAvailable > 5 ? '5' : 'all');
  };

  const startQuiz = () => {
    if (!availableQuestions.length) return;
    const questions = shuffle(availableQuestions).slice(0, chosenCount).map(question => ({
      ...question,
      options: shuffle(question.options),
    }));
    setAttempt(questions);
    setQuestionIndex(0);
    setSelectedOptionId(null);
    setScore(0);
    beginQuizAudio();
    playSoundEffect('quizStart');
    setPhase('play');
  };

  const selectAnswer = (optionId: string) => {
    if (!currentQuestion || selectedOptionId !== null) return;
    setSelectedOptionId(optionId);
    if (optionId === currentQuestion.correctOptionId) {
      setScore(current => current + 1);
      playSoundEffect('correct');
    } else {
      playSoundEffect('wrong');
    }
  };

  const nextQuestion = () => {
    if (questionIndex === attempt.length - 1) {
      endQuizAudio();
      playSoundEffect('quizComplete');
      setPhase('result');
      return;
    }
    setQuestionIndex(index => index + 1);
    setSelectedOptionId(null);
  };

  const header = (title: string) => (
    <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ background: 'var(--app-surface)', borderBottom: '1px solid var(--app-border-soft)' }}>
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onExit} aria-label={t('quiz', 'exit')} className="w-10 h-10 flex items-center justify-center rounded-xl shrink-0" style={{ background: 'var(--app-bg)', border: 'none', color: 'var(--app-text)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h1 className="text-lg font-bold truncate" style={{ color: 'var(--app-text)', fontFamily: 'var(--font-display)' }}>{title}</h1>
      </div>
      {phase === 'play' && <span className="text-sm font-bold px-3 py-2 rounded-xl shrink-0" style={{ background: 'var(--app-primary-soft)', color: 'var(--app-primary-ink)' }}>⭐ {t('quiz', 'score')}: {score}</span>}
    </div>
  );

  if (phase === 'setup') {
    return (
      <div className="flex flex-col min-h-full" style={{ background: 'var(--app-bg)' }}>
        {header(t('quiz', 'title'))}
        <div className="flex-1 overflow-y-auto px-5 py-5 pb-8">
          <div className="rounded-2xl p-5 mb-5" style={{ background: 'linear-gradient(135deg, var(--app-primary) 0%, #6366F1 100%)' }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🎮</span>
              <div>
                <p className="text-base font-bold" style={{ color: '#fff', fontFamily: 'var(--font-display)' }}>{t('quiz', 'setup')}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.8)' }}>{t('quiz', 'cardDescription')}</p>
              </div>
            </div>
          </div>

          <section className="mb-5">
            <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--app-text)', fontFamily: 'var(--font-display)' }}>{t('quiz', 'chooseSubject')}</h2>
            <div className="flex flex-wrap gap-2">
              <ChoiceChip label={t('common', 'allSubjects')} active={!subject} onClick={() => updateSubject('')} />
              {SUBJECTS.map(item => <ChoiceChip key={item} label={subjectLabel(item)} active={subject === item} onClick={() => updateSubject(item)} />)}
            </div>
          </section>

          <section className="mb-5">
            <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--app-text)', fontFamily: 'var(--font-display)' }}>{t('quiz', 'chooseDifficulty')}</h2>
            <div className="flex flex-wrap gap-2">
              <ChoiceChip label={t('quiz', 'allDifficulties')} active={!difficulty} onClick={() => updateDifficulty('')} />
              {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(item => <ChoiceChip key={item} label={difficultyLabel(item)} active={difficulty === item} onClick={() => updateDifficulty(item)} />)}
            </div>
          </section>

          <section className="mb-5">
            <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--app-text)', fontFamily: 'var(--font-display)' }}>{t('quiz', 'numberQuestions')}</h2>
            <div className="flex flex-wrap gap-2">
              {countChoices.map(choice => (
                <ChoiceChip key={choice.id} label={choice.id === 'all' ? t('quiz', 'allAvailable', { count: choice.count }) : t('quiz', 'questionCount', { count: choice.count })} active={countMode === choice.id} onClick={() => setCountMode(choice.id)} />
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: 'var(--app-muted)' }}>{t('quiz', 'available', { count: availableQuestions.length })}</p>
          </section>

          {!availableQuestions.length && (
            <div className="rounded-xl p-4 mb-5" style={{ background: 'var(--app-warn-soft)', color: 'var(--app-warning-ink)' }}>
              <p className="text-sm font-semibold">{t('quiz', 'noAvailable')}</p>
              <p className="text-xs mt-1">{t('quiz', 'changeFilters')}</p>
            </div>
          )}

          <button onClick={startQuiz} disabled={!availableQuestions.length} className="w-full py-4 rounded-xl font-bold text-sm active:scale-[0.98] transition-all disabled:opacity-50" style={{ background: 'var(--app-primary)', color: '#fff', border: 'none', fontFamily: 'var(--font-display)' }}>
            🚀 {t('quiz', 'start')}
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'play' && currentQuestion) {
    const answered = selectedOptionId !== null;
    return (
      <div className="flex flex-col min-h-full" style={{ background: 'var(--app-bg)' }}>
        {header(t('quiz', 'title'))}
        <div className="flex-1 overflow-y-auto px-5 py-5 pb-8">
          <div className="flex items-center justify-between gap-3 mb-3">
            <p className="text-sm font-bold" style={{ color: 'var(--app-text)' }}>{t('quiz', 'questionOf', { current: questionIndex + 1, total: attempt.length })}</p>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--app-primary-soft)', color: 'var(--app-primary-ink)' }}>{subjectLabel(currentQuestion.subject)}</span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'var(--app-surface-alt)', color: 'var(--app-muted)' }}>{difficultyLabel(currentQuestion.difficulty)}</span>
            </div>
          </div>
          <div className="h-2 rounded-full mb-6 overflow-hidden" style={{ background: 'var(--app-border-soft)' }}>
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${((questionIndex + 1) / attempt.length) * 100}%`, background: 'var(--app-primary)' }} />
          </div>

          <div className="rounded-2xl p-5 mb-5" style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border-soft)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--app-muted)' }}>{currentQuestion.chapter}</p>
            <h2 className="text-lg font-bold leading-relaxed" style={{ color: 'var(--app-text)', fontFamily: 'var(--font-display)' }}>{currentQuestion.question}</h2>
          </div>

          <p className="text-xs font-medium mb-3" style={{ color: 'var(--app-muted)' }}>{t('quiz', 'selectAnswer')}</p>
          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option, index) => {
              const isCorrect = option.id === currentQuestion.correctOptionId;
              const isSelected = option.id === selectedOptionId;
              const style = !answered
                ? { background: 'var(--app-surface)', color: 'var(--app-text)', border: '1.5px solid var(--app-border)' }
                : isCorrect
                  ? { background: 'var(--app-success-soft)', color: 'var(--app-success-ink)', border: '1.5px solid var(--app-success-ink)' }
                  : isSelected
                    ? { background: 'var(--app-danger-soft)', color: 'var(--app-danger-ink)', border: '1.5px solid var(--app-danger-ink)' }
                    : { background: 'var(--app-surface)', color: 'var(--app-muted)', border: '1.5px solid var(--app-border)' };
              return (
                <button key={option.id} onClick={() => selectAnswer(option.id)} disabled={answered} className="w-full min-h-[58px] flex items-center gap-3 text-left px-4 py-3 rounded-xl transition-all active:scale-[0.99] disabled:cursor-default" style={style}>
                  <span className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--app-surface-alt)' }}>{String.fromCharCode(65 + index)}</span>
                  <span className="text-sm font-medium flex-1">{option.text}</span>
                  {answered && isCorrect && <span className="font-bold">✓</span>}
                  {answered && isSelected && !isCorrect && <span className="font-bold">✕</span>}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="rounded-xl p-4 mt-4" style={{ background: selectedOptionId === currentQuestion.correctOptionId ? 'var(--app-success-soft)' : 'var(--app-danger-soft)', color: selectedOptionId === currentQuestion.correctOptionId ? 'var(--app-success-ink)' : 'var(--app-danger-ink)' }}>
              <p className="font-bold text-sm">{selectedOptionId === currentQuestion.correctOptionId ? `✓ ${t('quiz', 'correctFeedback')} ${t('quiz', 'greatJob')}` : `✕ ${t('quiz', 'wrongFeedback')}`}</p>
              {selectedOptionId !== currentQuestion.correctOptionId && <p className="text-sm mt-1"><strong>{t('quiz', 'correctAnswer')}:</strong> {correctOption?.text}</p>}
              {currentQuestion.explanation && <p className="text-xs leading-relaxed mt-2">{currentQuestion.explanation}</p>}
            </div>
          )}

          {answered && (
            <button onClick={nextQuestion} className="w-full py-4 mt-5 rounded-xl font-bold text-sm active:scale-[0.98] transition-all" style={{ background: 'var(--app-primary)', color: '#fff', border: 'none', fontFamily: 'var(--font-display)' }}>
              {questionIndex === attempt.length - 1 ? t('quiz', 'finish') : t('quiz', 'next')} →
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--app-bg)' }}>
      {header(t('quiz', 'title'))}
      <div className="flex-1 overflow-y-auto px-5 py-8 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4" style={{ background: 'var(--app-primary-soft)' }}>🏆</div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--app-text)', fontFamily: 'var(--font-display)' }}>{t('quiz', 'complete')}</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--app-muted)' }}>{t('quiz', 'resultMessage')}</p>
        <div className="w-full rounded-2xl p-6 mb-5" style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border-soft)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <p className="text-4xl font-extrabold" style={{ color: 'var(--app-primary-ink)', fontFamily: 'var(--font-display)' }}>{score} / {attempt.length}</p>
          <p className="text-lg font-bold mt-1 mb-5" style={{ color: 'var(--app-muted)' }}>{t('quiz', 'percentage', { percent: percentage })}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-3" style={{ background: 'var(--app-success-soft)', color: 'var(--app-success-ink)' }}>
              <p className="text-2xl font-bold">{score}</p><p className="text-xs font-semibold">{t('quiz', 'correct')}</p>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'var(--app-danger-soft)', color: 'var(--app-danger-ink)' }}>
              <p className="text-2xl font-bold">{attempt.length - score}</p><p className="text-xs font-semibold">{t('quiz', 'wrong')}</p>
            </div>
          </div>
        </div>
        <button onClick={startQuiz} className="w-full py-4 rounded-xl font-bold text-sm mb-3 active:scale-[0.98]" style={{ background: 'var(--app-primary)', color: '#fff', border: 'none', fontFamily: 'var(--font-display)' }}>🔄 {t('quiz', 'retry')}</button>
        <button onClick={onHome} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ background: 'var(--app-surface)', color: 'var(--app-text)', border: '1.5px solid var(--app-border)' }}>{t('quiz', 'home')}</button>
      </div>
    </div>
  );
}

function ChoiceChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} aria-pressed={active} className="px-3.5 py-2 rounded-full text-xs font-semibold transition-all active:scale-95" style={{ background: active ? 'var(--app-primary)' : 'var(--app-surface)', color: active ? '#fff' : 'var(--app-muted)', border: active ? '1.5px solid var(--app-primary)' : '1.5px solid var(--app-border)' }}>
      {label}
    </button>
  );
}
