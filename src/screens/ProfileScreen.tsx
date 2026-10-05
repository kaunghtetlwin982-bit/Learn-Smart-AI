import { useState } from 'react';
import { SUBJECTS, SUBJECT_COLORS, SUBJECT_PROGRESS } from '../data/mockData';
import { useLanguage, type Language } from '../i18n';
import { useAppearance, type Appearance } from '../appearance';
import { useAudioSettings } from '../audio';

interface Props {
  savedCount: number;
  viewedCount: number;
  onNavigate: (tab: string) => void;
}

const SETTINGS = [
  { icon: '🔔', label: 'Notifications', detail: 'Study reminders on' },
  { icon: '🌐', label: 'Language', detail: 'English' },
  { icon: '🎨', label: 'Appearance', detail: 'Light theme' },
  { icon: '🔊', label: 'Sound Effects', detail: '' },
  { icon: '🎵', label: 'Background Music', detail: '' },
  { icon: '📊', label: 'Progress', detail: 'View detailed progress' },
];

const ABOUT_ITEMS = [
  { icon: 'ℹ️', label: 'About Learn Smart AI', detail: 'v1.0' },
  { icon: '🔒', label: 'Privacy Policy', detail: '' },
  { icon: '⭐', label: 'Rate the App', detail: '' },
  { icon: '💬', label: 'Send Feedback', detail: '' },
];

export default function ProfileScreen({ savedCount, viewedCount, onNavigate }: Props) {
  const { language, setLanguage, t } = useLanguage();
  const { appearance, setAppearance } = useAppearance();
  const { soundEffectsEnabled, backgroundMusicEnabled, setSoundEffectsEnabled, setBackgroundMusicEnabled } = useAudioSettings();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    try { return localStorage.getItem('learn-smart-notifications') !== 'off'; } catch { return true; }
  });
  const overallProgress = Math.round(Object.values(SUBJECT_PROGRESS).reduce((a, b) => a + b, 0) / SUBJECTS.length);

  const toggleNotifications = () => setNotificationsEnabled(enabled => {
    const next = !enabled;
    try { localStorage.setItem('learn-smart-notifications', next ? 'on' : 'off'); } catch { /* storage may be unavailable */ }
    return next;
  });

  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Profile header */}
      <div className="px-5 pt-10 pb-6" style={{ background: 'linear-gradient(135deg, var(--app-primary) 0%, #6366F1 100%)' }}>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'var(--font-display)', border: '2px solid rgba(255,255,255,0.3)' }}>
            KM
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: '#fff', fontFamily: 'var(--font-display)' }}>Khin Eaidra Min</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{t('profile', 'student')}</p>
            <span className="inline-block mt-1 text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              {t('profile', 'academicYear')}
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: t('common', 'viewed'), value: viewedCount },
            { label: t('common', 'saved'), value: savedCount },
            { label: t('common', 'progress'), value: `${overallProgress}%` },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <p className="text-lg font-bold" style={{ color: '#fff', fontFamily: 'var(--font-display)' }}>{stat.value}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pt-5">
        {/* Overall progress ring */}
        <div className="bg-white rounded-2xl p-4 mb-4 flex items-center gap-4"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid var(--app-border-soft)' }}>
          <div className="relative w-16 h-16 shrink-0">
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="var(--app-border-soft)" strokeWidth="8" />
              <circle cx="32" cy="32" r="26" fill="none" stroke="var(--app-primary)" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - overallProgress / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 32 32)" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold" style={{ color: 'var(--app-primary-ink)', fontFamily: 'var(--font-display)' }}>{overallProgress}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold mb-0.5" style={{ fontFamily: 'var(--font-display)', color: 'var(--app-text)' }}>{t('progress', 'subjectProgress')}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--app-muted)' }}>{t('profile', 'across')}</p>
            <button onClick={() => onNavigate('progress')}
              className="text-xs font-semibold mt-1"
              style={{ color: 'var(--app-primary-ink)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-display)' }}>
              {t('profile', 'detailedProgress')} →
            </button>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { icon: '📚', label: t('profile', 'questionBank'), color: 'var(--app-primary-soft)', textColor: 'var(--app-primary-ink)', tab: 'questions' },
            { icon: '🔖', label: `${t('common', 'saved')} (${savedCount})`, color: '#D1FAE5', textColor: '#10B981', tab: 'saved' },
          ].map(item => (
            <button key={item.label} onClick={() => onNavigate(item.tab)}
              className="rounded-2xl p-4 flex flex-col items-center gap-2 transition-all active:scale-95"
              style={{ background: item.color, border: 'none', cursor: 'pointer' }}>
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-bold" style={{ color: item.textColor, fontFamily: 'var(--font-display)' }}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Settings section */}
        <p className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: 'var(--app-faint)', fontFamily: 'var(--font-display)' }}>{t('profile', 'settings')}</p>
        <div className="bg-white rounded-2xl overflow-hidden mb-4"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid var(--app-border-soft)' }}>
          {SETTINGS.map((item, i) => (
            <div key={item.label}
              className="flex items-center gap-3 px-4 py-3.5 cursor-pointer active:bg-gray-50 transition-all"
              style={{ borderBottom: i < SETTINGS.length - 1 ? '1px solid var(--app-border-soft)' : 'none' }}
              onClick={() => item.label === 'Progress' ? onNavigate('progress') : item.label === 'Notifications' ? toggleNotifications() : item.label === 'Language' ? setLanguageOpen(true) : item.label === 'Appearance' ? setAppearanceOpen(true) : item.label === 'Sound Effects' ? setSoundEffectsEnabled(!soundEffectsEnabled) : item.label === 'Background Music' ? setBackgroundMusicEnabled(!backgroundMusicEnabled) : undefined}>
              <span className="text-lg w-8">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: 'var(--app-text)' }}>{item.label === 'Notifications' ? t('profile', 'notifications') : item.label === 'Language' ? t('profile', 'language') : item.label === 'Appearance' ? t('profile', 'appearance') : item.label === 'Sound Effects' ? t('profile', 'soundEffects') : item.label === 'Background Music' ? t('profile', 'backgroundMusic') : t('common', 'progress')}</p>
                {item.label === 'Notifications' ? <p className="text-xs" style={{ color: 'var(--app-faint)' }}>{t('profile', 'reminders', { state: notificationsEnabled ? (language === 'my' ? 'ဖွင့်ထားသည်' : 'on') : (language === 'my' ? 'ပိတ်ထားသည်' : 'off') })}</p> : item.label === 'Language' ? <p className="text-xs" style={{ color: 'var(--app-faint)' }}>{language === 'my' ? 'မြန်မာ' : 'English'}</p> : item.label === 'Appearance' ? <p className="text-xs" style={{ color: 'var(--app-faint)' }}>{appearance === 'dark' ? t('profile', 'darkTheme') : t('profile', 'lightTheme')}</p> : ['Sound Effects', 'Background Music'].includes(item.label) ? <p className="text-xs" style={{ color: 'var(--app-faint)' }}>{(item.label === 'Sound Effects' ? soundEffectsEnabled : backgroundMusicEnabled) ? t('profile', 'on') : t('profile', 'off')}</p> : <p className="text-xs" style={{ color: 'var(--app-faint)' }}>{t('profile', 'detailedProgress')}</p>}
              </div>
              {['Notifications', 'Sound Effects', 'Background Music'].includes(item.label) ? <button type="button" role="switch" aria-checked={item.label === 'Notifications' ? notificationsEnabled : item.label === 'Sound Effects' ? soundEffectsEnabled : backgroundMusicEnabled} aria-label={item.label === 'Notifications' ? t('profile', 'notifications') : item.label === 'Sound Effects' ? t('profile', 'soundEffects') : t('profile', 'backgroundMusic')} onClick={event => { event.stopPropagation(); if (item.label === 'Notifications') toggleNotifications(); else if (item.label === 'Sound Effects') setSoundEffectsEnabled(!soundEffectsEnabled); else setBackgroundMusicEnabled(!backgroundMusicEnabled); }} className="relative w-10 h-6 rounded-full transition-colors shrink-0" style={{ background: (item.label === 'Notifications' ? notificationsEnabled : item.label === 'Sound Effects' ? soundEffectsEnabled : backgroundMusicEnabled) ? 'var(--app-primary)' : 'var(--app-subtle)', border: 'none', cursor: 'pointer' }}><span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all" style={{ left: (item.label === 'Notifications' ? notificationsEnabled : item.label === 'Sound Effects' ? soundEffectsEnabled : backgroundMusicEnabled) ? '22px' : '4px' }} /></button> :
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--app-subtle)" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>}
            </div>
          ))}
        </div>

        {/* About section */}
        <p className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: 'var(--app-faint)', fontFamily: 'var(--font-display)' }}>{t('profile', 'about')}</p>
        <div className="bg-white rounded-2xl overflow-hidden mb-5"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid var(--app-border-soft)' }}>
          {ABOUT_ITEMS.map((item, i) => (
            <div key={item.label}
              className="flex items-center gap-3 px-4 py-3.5 cursor-pointer active:bg-gray-50 transition-all"
              style={{ borderBottom: i < ABOUT_ITEMS.length - 1 ? '1px solid var(--app-border-soft)' : 'none' }}>
              <span className="text-lg w-8">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: 'var(--app-text)' }}>{item.label === 'About Learn Smart AI' ? t('profile', 'aboutApp') : item.label === 'Privacy Policy' ? t('profile', 'privacy') : item.label === 'Rate the App' ? t('profile', 'rate') : t('profile', 'feedback')}</p>
                {item.detail && <p className="text-xs" style={{ color: 'var(--app-faint)' }}>{item.detail}</p>}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--app-subtle)" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          ))}
        </div>

      <div className="text-center py-2 mb-4">
            <p className="text-xs" style={{ color: 'var(--app-subtle)' }}>Learn Smart AI · {t('common', 'grade11')} · v1.0</p>
        </div>
      </div>
      {languageOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center px-4 pb-4" style={{ background: 'rgba(15,23,42,0.45)' }} onClick={() => setLanguageOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label={t('profile', 'selectLanguage')} className="w-full max-w-[430px] rounded-2xl p-5" style={{ background: 'var(--app-surface)' }} onClick={event => event.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold" style={{ color: 'var(--app-text)', fontFamily: 'var(--font-display)' }}>{t('profile', 'selectLanguage')}</h2>
              <button onClick={() => setLanguageOpen(false)} className="text-sm" style={{ background: 'none', border: 'none', color: 'var(--app-muted)' }}>{t('common', 'close')}</button>
            </div>
            {(['en', 'my'] as Language[]).map(option => (
              <button key={option} onClick={() => { setLanguage(option); setLanguageOpen(false); }} className="w-full flex items-center justify-between px-4 py-3 rounded-xl mb-2 text-left" style={{ background: language === option ? 'var(--app-primary-soft)' : 'var(--app-surface-alt)', border: language === option ? '1.5px solid #C7D2FE' : '1.5px solid var(--app-border)', color: 'var(--app-text)' }}>
                <span>{option === 'en' ? '🇬🇧 English' : '🇲🇲 မြန်မာ'}</span>
                {language === option && <span aria-label={t('common', 'selected')} style={{ color: 'var(--app-primary-ink)', fontWeight: 700 }}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
      {appearanceOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center px-4 pb-4" style={{ background: 'rgba(15,23,42,0.55)' }} onClick={() => setAppearanceOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label={t('profile', 'selectAppearance')} className="w-full max-w-[430px] rounded-2xl p-5" style={{ background: 'var(--app-surface)' }} onClick={event => event.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold" style={{ color: 'var(--app-text)', fontFamily: 'var(--font-display)' }}>{t('profile', 'selectAppearance')}</h2>
              <button onClick={() => setAppearanceOpen(false)} className="text-sm" style={{ background: 'none', border: 'none', color: 'var(--app-muted)' }}>{t('common', 'close')}</button>
            </div>
            {(['light', 'dark'] as Appearance[]).map(option => (
              <button key={option} aria-pressed={appearance === option} onClick={() => { setAppearance(option); setAppearanceOpen(false); }} className="w-full flex items-center justify-between px-4 py-3 rounded-xl mb-2 text-left" style={{ background: appearance === option ? 'var(--app-primary-soft)' : 'var(--app-surface-alt)', border: appearance === option ? '1.5px solid var(--app-primary-ink)' : '1.5px solid var(--app-border)', color: 'var(--app-text)' }}>
                <span>{option === 'light' ? `☀️ ${t('profile', 'lightTheme')}` : `🌙 ${t('profile', 'darkTheme')}`}</span>
                {appearance === option && <span aria-label={t('common', 'selected')} style={{ color: 'var(--app-primary-ink)', fontWeight: 700 }}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
