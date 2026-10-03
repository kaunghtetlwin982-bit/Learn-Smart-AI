type ApiRequest = { method?: string; body?: unknown };
type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
};

/** Node serverless handler for an OpenAI-compatible chat completions API. */
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.AI_API_KEY;
  const baseUrl = process.env.AI_API_BASE_URL;
  const model = process.env.AI_MODEL;
  if (!apiKey || !baseUrl || !model) {
    return res.status(503).json({ error: 'AI service is not configured' });
  }

  const body = req.body as {
    prompt?: unknown;
    history?: unknown;
    question?: Record<string, unknown> | null;
  } | undefined;
  if (!body || typeof body.prompt !== 'string' || !body.prompt.trim()) {
    return res.status(400).json({ error: 'A prompt is required' });
  }

  const question = body.question;
  const context = question ? [
    `Subject: ${String(question.subject ?? '')}`,
    `Chapter: ${String(question.chapter ?? '')}`,
    `Question: ${String(question.question ?? '')}`,
    `Answer: ${String(question.answer ?? '')}`,
    `Explanation: ${String(question.explanation ?? '')}`,
  ].join('\n') : 'No specific question is selected.';

  const history = Array.isArray(body.history) ? body.history.slice(-12) : [];
  const messages = [
    { role: 'system', content: `You are a friendly Grade 11 study tutor. Explain concepts clearly in simple Grade 11 language. Break difficult questions into manageable steps, avoid unnecessary complexity, and help the student understand rather than only giving a final answer. Use the selected question context when relevant.\n\nSelected question context:\n${context}` },
    ...history.filter((item): item is { role: string; content: string } => Boolean(item && typeof item === 'object' && ['user', 'assistant'].includes((item as { role?: string }).role ?? '') && typeof (item as { content?: unknown }).content === 'string')),
    { role: 'user', content: body.prompt.trim() },
  ];

  try {
    const upstream = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, temperature: 0.5 }),
    });
    if (!upstream.ok) return res.status(502).json({ error: 'AI provider request failed' });

    const result = await upstream.json() as { choices?: Array<{ message?: { content?: unknown } }> };
    const answer = result.choices?.[0]?.message?.content;
    if (typeof answer !== 'string' || !answer.trim()) return res.status(502).json({ error: 'AI provider returned no answer' });
    return res.status(200).json({ answer: answer.trim() });
  } catch {
    return res.status(502).json({ error: 'AI provider is unavailable' });
  }
}
