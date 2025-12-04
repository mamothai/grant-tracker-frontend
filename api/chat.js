const fetch = globalThis.fetch || require('node-fetch');
const { GRANTS } = require('../src/data/grants');

// Simple scoring for relevance
function scoreGrant(grant, q) {
  const query = q.toLowerCase();
  let score = 0;
  if (grant.name.toLowerCase() === query) score += 100;
  if (grant.name.toLowerCase().includes(query)) score += 50;
  grant.keywords.forEach(k => {
    if (query.includes(k)) score += 30;
    if (k.includes(query.split(' ')[0])) score += 10;
  });
  if (grant.sector.toLowerCase().includes(query)) score += 20;
  if (grant.description.toLowerCase().includes(query)) score += 15;
  if (grant.details.toLowerCase().includes(query)) score += 8;
  return score;
}

function findTopGrants(q, n = 3) {
  const scored = GRANTS.map(g => ({ g, s: scoreGrant(g, q) })).filter(x => x.s > 0).sort((a,b) => b.s - a.s);
  return scored.slice(0, n).map(x => x.g);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { message, history } = req.body || {};
  if (!message) return res.status(400).json({ error: 'Missing message' });

  // Build prompt with retrieved grants
  const retrieved = findTopGrants(message, 4);
  let contextText = '';
  if (retrieved.length) {
    contextText = 'Relevant grants:\n';
    retrieved.forEach(g => {
      contextText += `- ${g.name} (${g.sector}): ${g.description} Benefit: ${g.amount} Coverage: ${g.coverage}\n`;
    });
  }

  const system = `You are GrantTracker Assistant. Use the provided 'Relevant grants' section to ground your answer. If no relevant grants are present say you couldn't find a direct match and offer to browse by sector. Answer concisely and include citations when mentioning specific grants.`;

  // Build messages array for the chat completion using client history for continuity
  const messages = [];
  messages.push({ role: 'system', content: system });
  if (contextText) {
    messages.push({ role: 'system', content: `Relevant grants:\n${contextText}` });
  }

  // history is expected as array of { sender: 'user'|'bot', text }
  if (Array.isArray(history)) {
    history.forEach(h => {
      if (!h || !h.sender || !h.text) return;
      const role = h.sender === 'user' ? 'user' : 'assistant';
      messages.push({ role, content: String(h.text) });
    });
  }

  // Add the current user message
  messages.push({ role: 'user', content: String(message) });

  // Call OpenAI (requires OPENAI_API_KEY in env)
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY not configured. Please set the OPENAI_API_KEY environment variable.' });
  }

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages, max_tokens: 900 }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      return res.status(502).json({ error: 'LLM error', details: txt });
    }

    const data = await resp.json();
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I had no response.';
    return res.json({ reply, citations: retrieved.map(g => g.id) });
  } catch (err) {
    return res.status(500).json({ error: 'Request failed', details: err.message });
  }
};
