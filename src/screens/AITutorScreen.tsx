import { useState, useRef, useEffect } from 'react';
import { Question } from '../data/mockData';

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

const AI_RESPONSES: Record<string, string> = {
  'explain': "Sure! Let me break this down step by step. First, identify the key information given in the question. Then, recall the relevant formula or concept that applies. Finally, substitute the values and solve carefully — check your answer makes sense in context! Would you like me to walk through a specific step in more detail?",
  'simply': "Of course! Think of it this way: imagine you have a real-world situation that matches this problem. The core idea is straightforward once you strip away the formal language. The key thing to remember is the main principle behind it. Does that simpler view help?",
  'example': "Great idea! Here's a related example: suppose we change the numbers slightly but keep the same structure. We'd follow the same logical steps. Working through examples like this is one of the most effective ways to build understanding. Want me to create another variation?",
  'default': "That's a great question! Let me think through this with you. The concept here relates to a fundamental principle in this subject. Start by identifying what's given, what's being asked, and which rule or formula connects them. Then solve step by step. Do you want me to go deeper on any part?",
};

function getTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('simply') || lower.includes('simple') || lower.includes('easier')) return AI_RESPONSES.simply;
  if (lower.includes('example')) return AI_RESPONSES.example;
  if (lower.includes('explain') || lower.includes('how') || lower.includes('why') || lower.includes('what')) return AI_RESPONSES.explain;
  return AI_RESPONSES.default;
}

export default function AITutorScreen({ contextQuestion, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const initial: Message[] = [];
    initial.push({
      id: 'welcome',
      role: 'ai',
      text: contextQuestion
        ? `Hi! I'm your AI Tutor 🤖\n\nI can see you're working on:\n\n"${contextQuestion.question}"\n\nHow would you like me to help? You can ask me to explain it, simplify it, or give you an example!`
        : "Hi! I'm your AI Tutor 🤖 I'm here to help you with any Grade 11 question. What topic would you like to explore today?",
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
    { label: '🔍 Explain this question', prompt: 'Can you explain this question step by step?' },
    { label: '✨ Explain simply', prompt: 'Can you explain this in a simpler way?' },
    { label: '📝 Give an example', prompt: 'Can you give me a similar example to practice?' },
  ];

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: text.trim(), time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: getAIResponse(text), time: getTime() };
      setMessages(prev => [...prev, aiMsg]);
      setTyping(false);
    }, 1200 + Math.random() * 600);
  };

  return (
    <div className="flex flex-col h-full screen-enter" style={{ maxHeight: '100dvh' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 shrink-0"
        style={{ background: '#fff', borderBottom: '1px solid #F1F5F9' }}>
        <button onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-xl"
          style={{ background: '#F4F6FB', border: 'none', cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex items-center gap-2.5 flex-1">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ background: 'linear-gradient(135deg, #4F46E5, #818CF8)' }}>
            🤖
          </div>
          <div>
            <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: '#1E293B' }}>AI Tutor</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
              <p className="text-xs" style={{ color: '#10B981' }}>Online · Demo Mode</p>
            </div>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: '#FEF3C7', color: '#92400E' }}>Mock AI</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4" style={{ background: '#F4F6FB' }}>
        {messages.map(msg => (
          <div key={msg.id} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'ai' && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm mr-2 shrink-0 mt-1"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #818CF8)' }}>
                🤖
              </div>
            )}
            <div className="max-w-[80%]">
              <div className={`rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                style={{
                  background: msg.role === 'user' ? '#4F46E5' : '#fff',
                  color: msg.role === 'user' ? '#fff' : '#1E293B',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}>
                <p className="text-sm leading-relaxed" style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
              </div>
              <p className="text-xs mt-1 px-1" style={{ color: '#94A3B8', textAlign: msg.role === 'user' ? 'right' : 'left' }}>{msg.time}</p>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex items-end gap-2 mb-4">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #4F46E5, #818CF8)' }}>🤖</div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm" style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: '#94A3B8', animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="px-5 py-3 shrink-0" style={{ background: '#F4F6FB' }}>
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {quickActions.map(qa => (
              <button key={qa.label} onClick={() => send(qa.prompt)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all active:scale-95"
                style={{ background: '#fff', border: '1.5px solid #E2E8F0', color: '#4F46E5', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
                {qa.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-5 py-3 shrink-0" style={{ background: '#fff', borderTop: '1px solid #F1F5F9', paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask me anything..."
            rows={1}
            className="flex-1 resize-none rounded-xl px-4 py-3 text-sm outline-none"
            style={{ border: '1.5px solid #E2E8F0', color: '#1E293B', fontFamily: 'var(--font-body)', maxHeight: '96px', lineHeight: '1.5' }}
            onFocus={e => e.target.style.borderColor = '#4F46E5'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'}
          />
          <button onClick={() => send(input)} disabled={!input.trim() || typing}
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-90"
            style={{ background: input.trim() && !typing ? '#4F46E5' : '#E2E8F0', border: 'none', cursor: input.trim() && !typing ? 'pointer' : 'default' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !typing ? '#fff' : '#94A3B8'} strokeWidth="2.5" strokeLinecap="round">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-center mt-2" style={{ color: '#94A3B8' }}>Demo mode · Responses are pre-written</p>
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
