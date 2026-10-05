import { useState } from 'react';
import { QUESTIONS, SUBJECTS, CHAPTERS, Question } from '../data/mockData';
import QuestionCard from '../components/QuestionCard';
import SearchBar from '../components/SearchBar';
import FilterChip from '../components/FilterChip';
import EmptyState from '../components/EmptyState';
import { useLanguage } from '../i18n';

interface Props {
  savedIds: Set<string>;
  onToggleSave: (id: string) => void;
  onOpenQuestion: (id: string) => void;
  initialSubject?: string;
}

export default function QuestionBankScreen({ savedIds, onToggleSave, onOpenQuestion, initialSubject }: Props) {
  const { t, subjectLabel, difficultyLabel } = useLanguage();
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState(initialSubject || '');
  const [chapter, setChapter] = useState('');
  const [diff, setDiff] = useState('');

  const chapters = subject ? CHAPTERS[subject] : [];

  const filtered = QUESTIONS.filter((q: Question) => {
    const matchSearch = !search || q.title.toLowerCase().includes(search.toLowerCase()) || q.question.toLowerCase().includes(search.toLowerCase());
    const matchSubject = !subject || q.subject === subject;
    const matchChapter = !chapter || q.chapter === chapter;
    const matchDiff = !diff || q.difficulty === diff;
    return matchSearch && matchSubject && matchChapter && matchDiff;
  });

  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Header */}
      <div className="px-5 pt-10 pb-4" style={{ background: 'var(--app-surface)', borderBottom: '1px solid var(--app-border-soft)' }}>
        <h1 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--app-text)' }}>{t('bank', 'title')}</h1>
        <SearchBar value={search} onChange={v => { setSearch(v); }} placeholder={t('bank', 'search')} />
      </div>

      {/* Subject filter */}
      <div className="px-5 py-3 bg-white" style={{ borderBottom: '1px solid var(--app-border-soft)' }}>
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <FilterChip label={t('common', 'allSubjects')} active={!subject} onClick={() => { setSubject(''); setChapter(''); }} />
          {SUBJECTS.map(s => (
            <FilterChip key={s} label={subjectLabel(s)} active={subject === s} onClick={() => { setSubject(s); setChapter(''); }} />
          ))}
        </div>
      </div>

      {/* Chapter + difficulty filters */}
      {(chapters.length > 0 || diff) && (
        <div className="px-5 py-2.5 bg-white" style={{ borderBottom: '1px solid var(--app-border-soft)' }}>
          <div className="flex gap-2 overflow-x-auto mb-2" style={{ scrollbarWidth: 'none' }}>
            {chapters.length > 0 && (
              <>
                <FilterChip label={t('common', 'allChapters')} active={!chapter} onClick={() => setChapter('')} />
                {chapters.map(ch => (
                  <FilterChip key={ch} label={ch} active={chapter === ch} onClick={() => setChapter(ch)} />
                ))}
              </>
            )}
          </div>
          <div className="flex gap-2">
            <FilterChip label={t('common', 'allLevels')} active={!diff} onClick={() => setDiff('')} />
            {['Easy', 'Medium', 'Hard'].map(d => (
              <FilterChip key={d} label={difficultyLabel(d)} active={diff === d} onClick={() => setDiff(d)} />
            ))}
          </div>
        </div>
      )}

      {/* Results info */}
      <div className="px-5 py-3 flex items-center justify-between">
        <p className="text-xs font-semibold" style={{ color: 'var(--app-faint)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {t('bank', 'count', { count: filtered.length, plural: filtered.length !== 1 ? 's' : '' })}
          {subject ? ` · ${subjectLabel(subject)}` : ''}
          {chapter ? ` · ${chapter}` : ''}
        </p>
        {(subject || chapter || diff || search) && (
          <button onClick={() => { setSubject(''); setChapter(''); setDiff(''); setSearch(''); }}
            className="text-xs font-medium" style={{ color: 'var(--app-primary-ink)', background: 'none', border: 'none', cursor: 'pointer' }}>
            {t('common', 'clearFilters')}
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 px-5">
        {filtered.length === 0 ? (
          <EmptyState
            icon="🔍"
            title={t('bank', 'noQuestions')}
            description={t('bank', 'adjustSearch')}
            action={{ label: t('bank', 'clearFilters'), onClick: () => { setSubject(''); setChapter(''); setDiff(''); setSearch(''); } }}
          />
        ) : (
          <div className="flex flex-col gap-3 pb-4">
            {filtered.map(q => (
              <QuestionCard
                key={q.id}
                question={q}
                saved={savedIds.has(q.id)}
                onOpen={() => onOpenQuestion(q.id)}
                onToggleSave={e => { e.stopPropagation(); onToggleSave(q.id); }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
