import { useState } from 'react';
import { VIDEOS, SUBJECTS, SUBJECT_COLORS } from '../data/mockData';
import VideoCard from '../components/VideoCard';
import FilterChip from '../components/FilterChip';
import { useLanguage } from '../i18n';

interface Props {
  contextSubject?: string;
  contextChapter?: string;
  contextTopic?: string;
  onBack: () => void;
}

export default function LearningResourcesScreen({ contextSubject, contextChapter, contextTopic, onBack }: Props) {
  const { t, subjectLabel } = useLanguage();
  const [subject, setSubject] = useState(contextSubject || '');
  const [chapter, setChapter] = useState(contextChapter || '');
  const [topic, setTopic] = useState(contextTopic || '');
  const [playing, setPlaying] = useState<string | null>(null);

  const filtered = VIDEOS.filter(v => (!subject || v.subject === subject) && (!chapter || v.chapter === chapter) && (!topic || v.title.toLowerCase() === topic.toLowerCase()));

  const playingVideo = VIDEOS.find(v => v.id === playing);

  return (
    <div className="flex flex-col min-h-full pb-6 screen-enter">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4"
        style={{ background: 'var(--app-surface)', borderBottom: '1px solid var(--app-border-soft)' }}>
        <button onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-xl"
          style={{ background: 'var(--app-bg)', border: 'none', cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--app-text)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--app-text)' }}>{t('resources', 'title')}</h1>
          <p className="text-xs" style={{ color: 'var(--app-muted)' }}>{t('resources', 'subtitle')}</p>
        </div>
      </div>

      {/* Video modal overlay */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5 fade-in" style={{ background: 'rgba(0,0,0,0.75)' }}>
          <div className="w-full max-w-sm rounded-2xl overflow-hidden" style={{ background: 'var(--app-surface)' }}>
            <div className="relative" style={{ background: '#000', height: '200px' }}>
              <img src={playingVideo.thumbnail} alt={playingVideo.title} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center"><span className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg></span></div>
            </div>
            <div className="p-4">
              <p className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--app-text)' }}>{playingVideo.title}</p>
                <p className="text-xs mb-4" style={{ color: 'var(--app-muted)' }}>{playingVideo.subject} · {playingVideo.chapter}</p>
              <button onClick={() => window.open(playingVideo.url, '_blank', 'noopener,noreferrer')}
                className="w-full py-3 rounded-xl font-semibold text-sm mb-2"
                style={{ background: '#FF0000', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
                {t('resources', 'watch')}
              </button>
              <button onClick={() => setPlaying(null)}
                className="w-full py-3 rounded-xl font-semibold text-sm"
                style={{ background: 'var(--app-primary)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
                {t('common', 'close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subject filter */}
      <div className="px-5 py-3" style={{ background: 'var(--app-surface)', borderBottom: '1px solid var(--app-border-soft)' }}>
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <FilterChip label={t('common', 'allSubjects')} active={!subject} onClick={() => { setSubject(''); setChapter(''); setTopic(''); }} />
          {SUBJECTS.map(s => (
            <FilterChip key={s} label={subjectLabel(s)} active={subject === s} onClick={() => { setSubject(s); setChapter(''); setTopic(''); }} />
          ))}
        </div>
      </div>

      {/* Video count */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-xs font-semibold" style={{ color: 'var(--app-faint)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {t('resources', 'count', { count: filtered.length, plural: filtered.length !== 1 ? 's' : '' })}
          {subject ? ` · ${subjectLabel(subject)}` : ''}
        </p>
      </div>

      {/* Featured banner */}
      {!subject && (
        <div className="px-5 mb-4">
          <div className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgba(255,255,255,0.15)' }}>
              ▶️
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: '#fff', fontFamily: 'var(--font-display)' }}>{t('resources', 'integration')}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>{t('resources', 'demo')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Subject header when filtered */}
      {subject && (
        <div className="px-5 mb-4">
          <div className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: SUBJECT_COLORS[subject]?.bg || 'var(--app-border-soft)' }}>
            <span className="text-3xl">{SUBJECT_COLORS[subject]?.icon}</span>
            <div>
              <p className="text-sm font-bold" style={{ color: SUBJECT_COLORS[subject]?.text, fontFamily: 'var(--font-display)' }}>{subjectLabel(subject)}</p>
              <p className="text-xs" style={{ color: 'var(--app-muted)' }}>{t('resources', 'lessons')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Videos */}
      <div className="px-5 flex flex-col gap-3">
        {filtered.map(v => (
          <VideoCard key={v.id} video={v} onPlay={() => setPlaying(v.id)} />
        ))}
      </div>
    </div>
  );
}
