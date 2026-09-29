import { QUESTIONS, SUBJECTS, SUBJECT_COLORS, SUBJECT_PROGRESS } from '../data/mockData';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';

interface Props {
  savedIds: Set<string>;
  onOpenQuestion: (id: string) => void;
  onNavigate: (tab: string, subject?: string) => void;
  viewedCount: number;
}

export default function HomeScreen({ savedIds, onOpenQuestion, onNavigate, viewedCount }: Props) {
  const [search, setSearch] = useState('');

  const recentQuestions = QUESTIONS.slice(0, 5);
  const continueQuestion = QUESTIONS[2];

  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Header */}
      <div className="px-5 pt-10 pb-6" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)' }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-display)' }}>Grade 11 • 2024</p>
            <h1 className="text-2xl font-bold" style={{ color: '#fff', fontFamily: 'var(--font-display)' }}>Learn Smart AI</h1>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'var(--font-display)' }}>
            JD
          </div>
        </div>
        <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.85)' }}>Ready to learn today? 📚</p>
        <SearchBar value={search} onChange={setSearch} placeholder="Search questions, topics..." />
      </div>

      {/* Filtered search results */}
      {search && (
        <div className="px-5 pt-4 screen-enter">
          <p className="text-xs font-semibold mb-3" style={{ color: '#64748B', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Search Results
          </p>
          {QUESTIONS.filter(q =>
            q.title.toLowerCase().includes(search.toLowerCase()) ||
            q.question.toLowerCase().includes(search.toLowerCase()) ||
            q.subject.toLowerCase().includes(search.toLowerCase())
          ).slice(0, 6).map(q => (
            <div key={q.id} onClick={() => onOpenQuestion(q.id)}
              className="bg-white rounded-xl p-3 mb-2 cursor-pointer flex items-center gap-3 active:scale-[0.98] transition-all"
              style={{ border: '1px solid #F1F5F9' }}>
              <span className="text-2xl">{SUBJECT_COLORS[q.subject].icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: '#1E293B' }}>{q.title}</p>
                <p className="text-xs" style={{ color: '#64748B' }}>{q.subject} · {q.chapter}</p>
              </div>
            </div>
          ))}
          {QUESTIONS.filter(q =>
            q.title.toLowerCase().includes(search.toLowerCase()) ||
            q.question.toLowerCase().includes(search.toLowerCase()) ||
            q.subject.toLowerCase().includes(search.toLowerCase())
          ).length === 0 && (
            <p className="text-sm text-center py-8" style={{ color: '#94A3B8' }}>No results for "{search}"</p>
          )}
        </div>
      )}

      {!search && (
        <>
          {/* Stats row */}
          <div className="px-5 pt-4 grid grid-cols-3 gap-3">
            {[
              { label: 'Viewed', value: viewedCount, icon: '👁' },
              { label: 'Saved', value: savedIds.size, icon: '🔖' },
              { label: 'Subjects', value: 5, icon: '📚' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl p-3 flex flex-col items-center"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9' }}>
                <span className="text-xl mb-1">{stat.icon}</span>
                <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#1E293B' }}>{stat.value}</span>
                <span className="text-xs" style={{ color: '#94A3B8' }}>{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Continue Learning */}
          <div className="px-5 pt-5">
            <p className="text-sm font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#1E293B' }}>Continue Learning</p>
            <div onClick={() => onOpenQuestion(continueQuestion.id)}
              className="rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-all"
              style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.25)', color: '#fff' }}>
                  {continueQuestion.subject}
                </span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{continueQuestion.chapter}</span>
              </div>
              <p className="text-sm font-semibold mb-3" style={{ color: '#fff', fontFamily: 'var(--font-display)' }}>{continueQuestion.title}</p>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-3">
                  <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }}>
                    <div className="h-full rounded-full" style={{ background: '#fff', width: '65%' }} />
                  </div>
                </div>
                <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>65%</span>
              </div>
            </div>
          </div>

          {/* Subject Shortcuts */}
          <div className="px-5 pt-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: '#1E293B' }}>Subjects</p>
              <button onClick={() => onNavigate('questions')} className="text-xs font-medium" style={{ color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer' }}>View all</button>
            </div>
            <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {SUBJECTS.map(subject => {
                const s = SUBJECT_COLORS[subject];
                const progress = SUBJECT_PROGRESS[subject];
                return (
                  <button key={subject} onClick={() => onNavigate('questions', subject)}
                    className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer transition-all active:scale-95"
                    style={{ background: 'none', border: 'none' }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: s.bg, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                      {s.icon}
                    </div>
                    <span className="text-xs font-medium text-center leading-tight" style={{ color: '#1E293B', fontFamily: 'var(--font-display)', maxWidth: '56px' }}>
                      {subject.split(' ')[0]}
                    </span>
                    <div className="w-14 h-1 rounded-full" style={{ background: '#E2E8F0' }}>
                      <div className="h-full rounded-full" style={{ background: s.text, width: `${progress}%` }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="px-5 pt-5">
            <p className="text-sm font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#1E293B' }}>Progress Overview</p>
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9' }}>
              {SUBJECTS.map((subject, i) => {
                const s = SUBJECT_COLORS[subject];
                const progress = SUBJECT_PROGRESS[subject];
                return (
                  <div key={subject} className={i < SUBJECTS.length - 1 ? 'mb-3' : ''}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium" style={{ color: '#1E293B', fontFamily: 'var(--font-display)' }}>
                        {s.icon} {subject}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: s.text }}>{progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: '#F1F5F9' }}>
                      <div className="h-full rounded-full transition-all" style={{ background: s.text, width: `${progress}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Questions */}
          <div className="px-5 pt-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: '#1E293B' }}>Recent Questions</p>
              <button onClick={() => onNavigate('questions')} className="text-xs font-medium" style={{ color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer' }}>See all</button>
            </div>
            <div className="flex flex-col gap-2.5">
              {recentQuestions.map(q => {
                const s = SUBJECT_COLORS[q.subject];
                return (
                  <div key={q.id} onClick={() => onOpenQuestion(q.id)}
                    className="bg-white rounded-xl p-3 cursor-pointer flex items-center gap-3 active:scale-[0.98] transition-all"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: s.bg }}>
                      {s.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: '#1E293B', fontFamily: 'var(--font-display)' }}>{q.title}</p>
                      <p className="text-xs" style={{ color: '#64748B' }}>{q.subject} · {q.chapter}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Saved summary */}
          {savedIds.size > 0 && (
            <div className="px-5 pt-5">
              <div onClick={() => onNavigate('saved')}
                className="rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-all flex items-center gap-3"
                style={{ background: '#EEF2FF', border: '1.5px dashed #A5B4FC' }}>
                <span className="text-2xl">🔖</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: '#4F46E5', fontFamily: 'var(--font-display)' }}>
                    {savedIds.size} Saved Question{savedIds.size !== 1 ? 's' : ''}
                  </p>
                  <p className="text-xs" style={{ color: '#6366F1' }}>Tap to review your saved questions</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
