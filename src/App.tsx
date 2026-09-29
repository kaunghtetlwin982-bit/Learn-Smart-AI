import { useState } from 'react';
import { QUESTIONS } from './data/mockData';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import QuestionBankScreen from './screens/QuestionBankScreen';
import QuestionDetailScreen from './screens/QuestionDetailScreen';
import SavedScreen from './screens/SavedScreen';
import AITutorScreen from './screens/AITutorScreen';
import LearningResourcesScreen from './screens/LearningResourcesScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';

type Screen =
  | { id: 'home' }
  | { id: 'questions'; subject?: string }
  | { id: 'questionDetail'; questionId: string; from: string }
  | { id: 'saved' }
  | { id: 'aiTutor'; questionId?: string }
  | { id: 'resources'; subject?: string }
  | { id: 'progress' }
  | { id: 'profile' };

const TAB_SCREENS: Record<string, Screen> = {
  home: { id: 'home' },
  questions: { id: 'questions' },
  saved: { id: 'saved' },
  me: { id: 'profile' },
};

function activeTab(screen: Screen): string {
  if (screen.id === 'home') return 'home';
  if (screen.id === 'questions' || screen.id === 'questionDetail') return 'questions';
  if (screen.id === 'saved') return 'saved';
  if (screen.id === 'profile') return 'me';
  return '';
}

export default function App() {
  const [screen, setScreen] = useState<Screen>({ id: 'home' });
  const [history, setHistory] = useState<Screen[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set(['m3', 'p1', 'c3']));
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());

  const navigate = (next: Screen) => {
    setHistory(h => [...h, screen]);
    setScreen(next);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      setScreen(prev);
    } else {
      setScreen({ id: 'home' });
    }
  };

  const handleTabChange = (tab: string) => {
    setHistory([]);
    setScreen(TAB_SCREENS[tab] || { id: 'home' });
  };

  const handleOpenQuestion = (id: string) => {
    setViewedIds(prev => new Set([...prev, id]));
    navigate({ id: 'questionDetail', questionId: id, from: screen.id });
  };

  const handleToggleSave = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleNavigateFromHome = (tab: string, subject?: string) => {
    setHistory([]);
    if (tab === 'questions' && subject) {
      setScreen({ id: 'questions', subject });
    } else {
      setScreen(TAB_SCREENS[tab] || { id: 'home' });
    }
  };

  const currentQuestion =
    screen.id === 'questionDetail'
      ? QUESTIONS.find(q => q.id === screen.questionId) ?? null
      : null;

  const aiContextQuestion =
    screen.id === 'aiTutor' && screen.questionId
      ? QUESTIONS.find(q => q.id === screen.questionId) ?? null
      : null;

  const showBottomNav = !['aiTutor', 'resources', 'questionDetail'].includes(screen.id) ||
    (screen.id === 'questionDetail');
  const isFullScreen = screen.id === 'aiTutor' || screen.id === 'resources';

  return (
    <div className="flex flex-col" style={{ height: '100dvh', maxWidth: '430px', margin: '0 auto', background: '#F4F6FB', position: 'relative', overflow: 'hidden' }}>
      <div className={`flex-1 overflow-y-auto ${isFullScreen ? '' : ''}`} style={{ height: isFullScreen ? '100%' : undefined }}>
        {screen.id === 'home' && (
          <HomeScreen
            savedIds={savedIds}
            onOpenQuestion={handleOpenQuestion}
            onNavigate={handleNavigateFromHome}
            viewedCount={viewedIds.size + 42}
          />
        )}

        {screen.id === 'questions' && (
          <QuestionBankScreen
            key={screen.subject || 'all'}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onOpenQuestion={handleOpenQuestion}
            initialSubject={screen.subject}
          />
        )}

        {screen.id === 'questionDetail' && currentQuestion && (
          <QuestionDetailScreen
            question={currentQuestion}
            saved={savedIds.has(currentQuestion.id)}
            onToggleSave={() => handleToggleSave(currentQuestion.id)}
            onBack={goBack}
            onAskAI={() => navigate({ id: 'aiTutor', questionId: currentQuestion.id })}
            onResources={() => navigate({ id: 'resources', subject: currentQuestion.subject })}
          />
        )}

        {screen.id === 'saved' && (
          <SavedScreen
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onOpenQuestion={handleOpenQuestion}
            onBrowse={() => setScreen({ id: 'questions' })}
          />
        )}

        {screen.id === 'aiTutor' && (
          <AITutorScreen
            contextQuestion={aiContextQuestion}
            onBack={goBack}
          />
        )}

        {screen.id === 'resources' && (
          <LearningResourcesScreen
            contextSubject={screen.subject}
            onBack={goBack}
          />
        )}

        {screen.id === 'progress' && (
          <ProgressScreen
            viewedCount={viewedIds.size + 42}
            savedCount={savedIds.size}
          />
        )}

        {screen.id === 'profile' && (
          <ProfileScreen
            savedCount={savedIds.size}
            viewedCount={viewedIds.size + 42}
            onNavigate={tab => {
              if (tab === 'progress') {
                navigate({ id: 'progress' });
              } else {
                handleTabChange(tab);
              }
            }}
          />
        )}
      </div>

      {!isFullScreen && (
        <BottomNav
          activeTab={activeTab(screen)}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
}
