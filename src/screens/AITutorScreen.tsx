import { useState, useRef, useEffect } from 'react';
import { Question } from '../data/mockData';
import { useLanguage } from '../i18n';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  time: string;
}

interface Props {
  contextQuestion: Question | null;
  onBack: () => void;
}

function getTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export default function AITutorScreen({ contextQuestion, onBack }: Props) {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>(() => {
    const initial: Message[] = [];
    initial.push({
      id: 'welcome',
      role: 'ai',
      text: contextQuestion
        ? t('tutor', 'welcomeContext', { question: contextQuestion.question })
        : t('tutor', 'welcome'),
      time: getTime(),
    });
    return initial;
  });

  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const quickActions = [
    { label: t('tutor', 'explainQuestion'), prompt: language === 'my' ? t('tutor', 'explainPrompt') : 'Can you explain this question step by step?' },
    { label: t('tutor', 'explainSimply'), prompt: language === 'my' ? t('tutor', 'simplePrompt') : 'Can you explain this in a simpler way?' },
    { label: t('tutor', 'giveExample'), prompt: language === 'my' ? t('tutor', 'examplePrompt') : 'Can you give me a similar example to practice?' },
  ];

  const send = async (text: string) => {
    if (!text.trim() || typing) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: text.trim(), time: getTime() };
    const conversation = [...messages, userMsg];
    setMessages(conversation);
    setInput('');
    setTyping(true);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text.trim(),
          history: conversation.filter(message => message.id !== 'welcome').slice(0, -1).map(message => ({ role: message.role === 'ai' ? 'assistant' : 'user', content: message.text })),
          question: contextQuestion ? {
            subject: contextQuestion.subject,
            chapter: contextQuestion.chapter,
            question: contextQuestion.question,
            answer: contextQuestion.answer,
            explanation: contextQuestion.explanation,
          } : null,
        }),
      });
      if (!response.ok) throw new Error('AI request failed');
      const result = await response.json() as { answer?: string };
      if (!result.answer) throw new Error('AI response was empty');
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: result.answer, time: getTime() };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: t('tutor', 'failed'), time: getTime() };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full screen-enter" style={{ maxHeight: '100dvh' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 shrink-0"
        style={{ background: 'var(--app-surface)', borderBottom: '1px solid var(--app-border-soft)' }}>
        <button onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-xl"
          style={{ background: 'var(--app-bg)', border: 'none', cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--app-text)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex items-center gap-2.5 flex-1">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ background: 'linear-gradient(135deg, var(--app-primary), #818CF8)' }}>
            🤖
          </div>
          <div>
            <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--app-text)' }}>{t('tutor', 'title')}</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
            <p className="text-xs" style={{ color: '#10B981' }}>{t('tutor', 'assistant')}</p>
            </div>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: 'var(--app-primary-soft)', color: 'var(--app-primary-ink)' }}>{t('tutor', 'aiHelp')}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4" style={{ background: 'var(--app-bg)' }}>
        {messages.map(msg => (
          <div key={msg.id} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'ai' && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm mr-2 shrink-0 mt-1"
                style={{ background: 'linear-gradient(135deg, var(--app-primary), #818CF8)' }}>
                🤖
              </div>
            )}
            <div className="max-w-[80%]">
              <div className={`rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                style={{
                  background: msg.role === 'user' ? 'var(--app-primary)' : 'var(--app-surface)',
                  color: msg.role === 'user' ? '#fff' : 'var(--app-text)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}>
                <p className="text-sm leading-relaxed" style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
              </div>
              <p className="text-xs mt-1 px-1" style={{ color: 'var(--app-faint)', textAlign: msg.role === 'user' ? 'right' : 'left' }}>{msg.time}</p>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex items-end gap-2 mb-4">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, var(--app-primary), #818CF8)' }}>🤖</div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm" style={{ background: 'var(--app-surface)', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <p className="text-xs" style={{ color: 'var(--app-muted)' }}>{t('tutor', 'thinking')}</p>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="px-5 py-3 shrink-0" style={{ background: 'var(--app-bg)' }}>
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {quickActions.map(qa => (
              <button key={qa.label} onClick={() => send(qa.prompt)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all active:scale-95"
                style={{ background: 'var(--app-surface)', border: '1.5px solid var(--app-border)', color: 'var(--app-primary-ink)', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
                {qa.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-5 py-3 shrink-0" style={{ background: 'var(--app-surface)', borderTop: '1px solid var(--app-border-soft)', paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder={t('tutor', 'placeholder')}
            rows={1}
            className="flex-1 resize-none rounded-xl px-4 py-3 text-sm outline-none"
            style={{ border: '1.5px solid var(--app-border)', color: 'var(--app-text)', fontFamily: 'var(--font-body)', maxHeight: '96px', lineHeight: '1.5' }}
            onFocus={e => e.target.style.borderColor = 'var(--app-primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--app-border)'}
          />
          <button onClick={() => send(input)} disabled={!input.trim() || typing}
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-90"
            style={{ background: input.trim() && !typing ? 'var(--app-primary)' : 'var(--app-border)', border: 'none', cursor: input.trim() && !typing ? 'pointer' : 'default' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !typing ? '#fff' : 'var(--app-faint)'} strokeWidth="2.5" strokeLinecap="round">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-center mt-2" style={{ color: 'var(--app-faint)' }}>{t('tutor', 'support')}</p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
