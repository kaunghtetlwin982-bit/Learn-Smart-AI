# Learn-Smart-AI

## AI Tutor API

The browser sends chat context to the same-origin `POST /api/ai` endpoint. The serverless handler in `api/ai.ts` calls an OpenAI-compatible Chat Completions API. Configure these variables **on the server/runtime only** (never as `VITE_*` variables):

- `AI_API_KEY` — provider secret
- `AI_API_BASE_URL` — provider API base, such as `https://api.openai.com/v1`
- `AI_MODEL` — model name supported by that provider

This repository is a Vite frontend and does not include a backend runtime or deployment configuration. The `api/ai.ts` handler must be deployed in a Node serverless environment that maps `api/ai.ts` to `/api/ai` (or adapted to the chosen host's equivalent). The existing Vite preview does not run serverless functions, so AI requests there will show the friendly unavailable message until a compatible backend is deployed. No API key is included in the client or repository.
