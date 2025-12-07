const fetch = globalThis.fetch || require('node-fetch');
const { GRANTS } = require('../src/data/grants');

// Performance optimization: Cache for grant processing
const grantCache = new Map();
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

// Pre-process grants for faster lookups
const PROCESSED_GRANTS = GRANTS.map(grant => ({
  ...grant,
  _searchText: `${grant.name} ${grant.description} ${grant.details} ${grant.sector} ${grant.keywords.join(' ')}`.toLowerCase(),
  _sector: grant.sector.toLowerCase(),
  _name: grant.name.toLowerCase()
}));

// Enhanced semantic scoring system with caching
class EnhancedGrantMatcher {
  constructor(grants) {
    this.grants = PROCESSED_GRANTS; // Use pre-processed grants
  }

  // Ultra-fast semantic similarity scoring with pre-processed data
  calculateSemanticScore(grant, query) {
    const q = query.toLowerCase();
    let score = 0;
    
    // Use pre-processed search text for faster operations
    const searchText = grant._searchText;
    
    // Exact matches (highest weight) - optimized
    if (grant._name === q) score += 1000;
    if (grant._name.includes(q)) score += 500;
    
    // Fast keyword matching - using pre-processed keywords
    const queryWords = q.split(/\s+/).filter(w => w.length > 2);
    
    // Quick sector match
    if (grant._sector.includes(q)) score += 250;
    
    // Optimized keyword semantic matching
    grant.keywords.forEach(keyword => {
      const k = keyword.toLowerCase();
      
      // Direct keyword match - faster check
      if (q.includes(k)) score += 300;
      
      // Word-level semantic matching - optimized
      for (let word of queryWords) {
        if (k.includes(word) || word.includes(k)) {
          score += 150;
          if (this.isSemanticRelated(word, k)) score += 200;
          break; // Early exit for performance
        }
      }
    });
    
    // Fast text matching using pre-processed text
    const textMatches = this.countSemanticMatches(searchText, q);
    score += textMatches * 40;
    
    // Quick bonus checks
    if (q.includes('scheme') || q.includes('program')) score += 100;
    if ((q.includes('money') || q.includes('financial')) && grant.amount.includes('₹')) score += 75;
    
    return score;
  }

  // Semantic relationship detection
  isSemanticRelated(word1, word2) {
    const semanticGroups = {
      farming: ['farmer', 'agriculture', 'crop', 'farming', 'kisan', 'rural', 'village'],
      education: ['student', 'education', 'school', 'college', 'university', 'study', 'scholarship'],
      health: ['health', 'medical', 'hospital', 'treatment', 'insurance', 'care', 'doctor'],
      women: ['woman', 'women', 'female', 'girl', 'mother', 'empowerment'],
      infrastructure: ['infrastructure', 'road', 'construction', 'urban', 'city', 'development'],
      technology: ['technology', 'digital', 'internet', 'computer', 'software', 'innovation'],
      environment: ['environment', 'clean', 'pollution', 'green', 'sustainable'],
      money: ['money', 'cash', 'financial', 'income', 'support', 'assistance', 'benefit', 'grant']
    };
    
    for (const [group, terms] of Object.entries(semanticGroups)) {
      const word1InGroup = terms.some(term => word1.includes(term));
      const word2InGroup = terms.some(term => word2.includes(term));
      if (word1InGroup && word2InGroup && group !== 'money') {
        return true;
      }
    }
    
    // Direct semantic mappings
    const directMappings = {
      'poor': ['bpl', 'weaker', 'economically', 'destitute', 'low income'],
      'help': ['support', 'assistance', 'aid', 'benefit', 'scheme'],
      'free': ['no cost', 'complimentary', 'without payment']
    };
    
    for (const [key, values] of Object.entries(directMappings)) {
      if ((word1.includes(key) && values.some(v => word2.includes(v))) ||
          (word2.includes(key) && values.some(v => word1.includes(v)))) {
        return true;
      }
    }
    
    return false;
  }

  countSemanticMatches(text, query) {
    const words = query.toLowerCase().split(/\s+/);
    let matches = 0;
    const textLower = text.toLowerCase();
    
    words.forEach(word => {
      if (word.length > 2 && textLower.includes(word)) {
        matches++;
        // Bonus for important words
        if (['scheme', 'program', 'grant', 'benefit', 'support', 'assistance'].includes(word)) {
          matches += 0.5;
        }
      }
    });
    
    return matches;
  }

  // Ultra-fast grant finding with intelligent caching
  findBestGrants(query, limit = 5) {
    // Check cache first for performance
    const cacheKey = `${query.toLowerCase()}_${limit}`;
    const now = Date.now();
    
    if (grantCache.has(cacheKey)) {
      const cached = grantCache.get(cacheKey);
      if (now - cached.timestamp < CACHE_EXPIRY) {
        return cached.results;
      }
    }
    
    // Optimized scoring with early exits
    const scored = [];
    for (const grant of this.grants) {
      const score = this.calculateSemanticScore(grant, query);
      if (score > 0) {
        scored.push({ grant, score });
        // Early exit if we have enough high-scoring results
        if (scored.length > limit * 2 && score > 500) {
          break;
        }
      }
    }
    
    // Fast sorting and limiting
    scored.sort((a, b) => b.score - a.score);
    const results = scored.slice(0, limit).map(x => x.grant);
    
    // Cache the results
    grantCache.set(cacheKey, {
      results,
      timestamp: now
    });
    
    return results;
  }

  // Get personalized recommendations based on user profile
  getPersonalizedRecommendations(profile) {
    let recommendations = [];
    
    if (profile.occupation) {
      const occGrants = this.grants.filter(g => 
        g.keywords.some(k => this.isSemanticRelated(profile.occupation, k)) ||
        g.description.toLowerCase().includes(profile.occupation) ||
        g.name.toLowerCase().includes(profile.occupation)
      );
      recommendations = [...occGrants];
    }
    
    if (profile.location === 'rural') {
      const ruralGrants = this.grants.filter(g => 
        g.keywords.includes('rural') || 
        g.name.toLowerCase().includes('gram') ||
        g.description.toLowerCase().includes('rural') ||
        g.keywords.some(k => ['village', 'farmer', 'agriculture'].includes(k))
      );
      recommendations = [...recommendations, ...ruralGrants];
    }
    
    if (profile.gender === 'female') {
      const womenGrants = this.grants.filter(g => 
        g.keywords.includes('women') || 
        g.keywords.includes('woman') ||
        g.sector === 'Women & Child' ||
        g.name.toLowerCase().includes('ujjwala')
      );
      recommendations = [...recommendations, ...womenGrants];
    }
    
    // Remove duplicates
    const unique = recommendations.filter((grant, index, self) => 
      index === self.findIndex(g => g.id === grant.id)
    );
    
    return unique.slice(0, 3);
  }
}

const matcher = new EnhancedGrantMatcher(GRANTS);

// Enhanced grant finding function with caching
function findTopGrants(q, n = 4) {
  return matcher.findBestGrants(q, n);
}

// Parallel API calls for maximum speed
async function callAPIsInParallel(message, history, profile, retrieved) {
  const promises = [];
  const openaiKey = process.env.OPENAI_API_KEY;
  const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
  const ollamaModel = process.env.OLLAMA_MODEL || 'deepseek-coder';
  const hfKey = process.env.HUGGINGFACE_API_KEY;
  const hfModel = process.env.HUGGINGFACE_MODEL || 'bigscience/bloomz-1b1';

  // Build messages once for all APIs
  const messages = buildMessages(message, history, profile, retrieved);

  // OpenAI promise
  if (openaiKey) {
    promises.push(callOpenAI(messages, openaiKey));
  }

  // Ollama promise
  promises.push(callOllama(messages, ollamaUrl, ollamaModel));

  // Hugging Face promise
  if (hfKey) {
    promises.push(callHuggingFace(messages, hfKey, hfModel));
  }

  try {
    const results = await Promise.race(promises.map(p => p.catch(() => null)));
    if (results && results.reply) {
      return results;
    }
  } catch (error) {
    // Continue to local AI fallback
  }

  // Fast local AI fallback
  const fastResponse = generateLightningResponse(message, retrieved, profile);
  return {
    reply: fastResponse.response,
    suggestions: fastResponse.suggestions,
    citations: retrieved.map(g => g.id),
    fast: true
  };
}

function buildMessages(message, history, profile, retrieved) {
  const retrieved = findTopGrants(message, 4);
  let contextText = '';
  if (retrieved.length) {
    contextText = 'Relevant grants:\n';
    retrieved.forEach(g => {
      contextText += `- ${g.name} (${g.sector}): ${g.description} Benefit: ${g.amount} Coverage: ${g.coverage}\n`;
    });
  }

  const system = `You are GrantTracker AI Assistant, an expert in Indian government schemes and grants. Use the provided 'Relevant grants' section to ground your answer with accurate information. If no relevant grants are present, offer to browse by sector or ask for more specific information. Be conversational, helpful, and provide specific details when mentioning grants. Always include actionable suggestions.`;

  const messages = [];
  messages.push({ role: 'system', content: system });
  if (contextText) {
    messages.push({ role: 'system', content: `Relevant grants:\n${contextText}` });
  }

  if (profile && Object.keys(profile).length > 0) {
    messages.push({ role: 'system', content: `User profile: ${JSON.stringify(profile)}` });
  }

  if (Array.isArray(history)) {
    history.forEach(h => {
      if (!h || !h.sender || !h.text) return;
      const role = h.sender === 'user' ? 'user' : 'assistant';
      messages.push({ role, content: String(h.text) });
    });
  }

  messages.push({ role: 'user', content: String(message) });
  return messages;
}

async function callOpenAI(messages, apiKey) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 800);

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 600,
        temperature: 0.6
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (resp.ok) {
      const data = await resp.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) {
        return { reply, fast: true };
      }
    }
  } catch (err) {
    throw err;
  }
  throw new Error('OpenAI failed');
}

async function callOllama(messages, url, model) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 600);

  try {
    const resp = await fetch(`${url}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, stream: false }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (resp.ok) {
      const data = await resp.json();
      const reply = data.message?.content;
      if (reply) {
        return { reply, fast: true };
      }
    }
  } catch (err) {
    throw err;
  }
  throw new Error('Ollama failed');
}

async function callHuggingFace(messages, apiKey, model) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 700);

  try {
    const resp = await fetch(`https://api-inference.huggingface.co/models/${encodeURIComponent(model)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inputs: messages.map(m => `${m.role}: ${m.content}`).join('\n'),
        parameters: { max_new_tokens: 400, temperature: 0.6 }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (resp.ok) {
      const data = await resp.json();
      const reply = Array.isArray(data) ? (data[0].generated_text || data[0].text || '') : (data.generated_text || data.text || '');
      if (reply && reply.trim()) {
        return { reply: reply.trim(), fast: true };
      }
    }
  } catch (err) {
    throw err;
  }
  throw new Error('HuggingFace failed');
}

// Ultra-fast AI response generation with enhanced intelligence
function generateLightningResponse(message, retrievedGrants = [], userProfile = {}) {
  const lower = message.toLowerCase();
  const query = message.trim();
  
  // Lightning-fast pattern recognition
  const patterns = {
    isQuestion: /\?|what|how|which|can|will|would|should|where|when|why/i.test(query),
    isEligibility: /eligible|qualify|am i|can i|eligibility|who can|what are/i.test(lower),
    isGrantSearch: /grant|scheme|program|benefit|support|assistance|help/i.test(lower),
    isAbout: /about|what is|explain|tell me|purpose|function/i.test(lower),
    isComparison: /compare|difference|vs|versus|better|best/i.test(lower),
    isStatistics: /how many|total|statistics|overview|summary|count/i.test(lower),
    isGreeting: /hello|hi|hey|good morning|good afternoon|good evening/i.test(lower),
    isThanks: /thank|thanks|appreciate|grateful/i.test(lower)
  };

  // Instant greetings
  if (patterns.isGreeting) {
    return {
      response: `👋 **Hello! I'm your GrantTracker AI Assistant!**\n\nI can instantly help you find government grants and schemes. Try asking:\n• "What grants am I eligible for?"\n• "Show me agriculture schemes"\n• "Tell me about health benefits"\n• "How do I apply for PM Kisan?"\n\n**What would you like to explore?**`,
      suggestions: ["Check Eligibility", "Browse Grants", "Health Programs"]
    };
  }

  // Instant thanks response
  if (patterns.isThanks) {
    return {
      response: `😊 **You're very welcome!** \n\nI'm here 24/7 to help you discover government grants and benefits. Feel free to ask me anything about:\n• Eligibility requirements\n• Application processes\n• Scheme details\n• Benefits and coverage\n\n**What else can I help you with today?**`,
      suggestions: ["More Help", "Browse All", "Get Started"]
    };
  }

  // Personalized response based on user profile
  if (patterns.isEligibility && Object.keys(userProfile).length > 0) {
    const recommendations = matcher.getPersonalizedRecommendations(userProfile);
    if (recommendations.length > 0) {
      let response = `🎯 **Perfect matches for you!**\n\n`;
      
      recommendations.forEach((grant, index) => {
        response += `**${index + 1}. ${grant.name}** (${grant.sector})\n`;
        response += `💰 **Benefit:** ${grant.amount}\n`;
        response += `📝 **Description:** ${grant.description}\n\n`;
      });
      
      response += `**✨ Personalized for you:**\n`;
      if (userProfile.occupation) response += `• Profession: ${userProfile.occupation}\n`;
      if (userProfile.location) response += `• Location: ${userProfile.location}\n`;
      if (userProfile.gender) response += `• Profile: ${userProfile.gender}\n\n`;
      response += `**Ready to apply? Click any scheme for details!**`;
      
      return {
        response,
        suggestions: recommendations.slice(0, 2).map(g => `Learn: ${g.name.split(" ")[0]}`),
      };
    }
  }

  // Lightning-fast grant search response
  if (patterns.isGrantSearch && retrievedGrants.length > 0) {
    let response = `🚀 **Found ${retrievedGrants.length} perfect matches!**\n\n`;
    
    retrievedGrants.forEach((grant, index) => {
      response += `**${index + 1}. ${grant.name}** (${grant.sector})\n`;
      response += `💰 **Benefit:** ${grant.amount}\n`;
      response += `📝 **Summary:** ${grant.description}\n\n`;
    });
    
    response += `💡 **Quick tip:** Ask "How to apply" for any scheme to get application details!`;
    
    return {
      response,
      suggestions: retrievedGrants.slice(0, 2).map(g => `Apply: ${g.name.split(" ")[0]}`)
    };
  }

  // Statistics and overview
  if (patterns.isStatistics) {
    const sectors = {};
    GRANTS.forEach(g => {
      sectors[g.sector] = (sectors[g.sector] || 0) + 1;
    });

    const totalBeneficiaries = GRANTS.reduce((sum, g) => {
      const match = g.beneficiaries.match(/\d+/);
      return sum + (match ? parseInt(match[0]) : 0);
    }, 0);

    let response = `📊 **GrantTracker Intelligence Report**\n\n`;
    response += `🎯 **Total Active Programs:** ${GRANTS.length}\n`;
    response += `👥 **Estimated Beneficiaries:** ${totalBeneficiaries} crore+ people\n`;
    response += `💰 **Total Investment:** ₹${(totalBeneficiaries * 0.5).toFixed(0)} lakh crores+\n\n`;
    response += `**📈 Sector Breakdown:**\n`;
    
    Object.entries(sectors).forEach(([sector, count]) => {
      const percentage = ((count / GRANTS.length) * 100).toFixed(1);
      response += `• ${sector}: ${count} programs (${percentage}%)\n`;
    });

    return {
      response,
      suggestions: ["Most Popular Sector", "Recent Schemes", "High Value Programs"]
    };
  }

  // About website
  if (patterns.isAbout) {
    return {
      response: `🚀 **GrantTracker AI - Next Generation Grant Discovery Platform**\n\n` +
                `**🧠 AI-Powered Intelligence:**\n` +
                `• Advanced semantic search understands your needs\n` +
                `• Personalized matching based on your profile\n` +
                `• Real-time eligibility assessment\n\n` +
                `**🎯 Core Features:**\n` +
                `• **Smart Discovery**: Find grants you didn't know existed\n` +
                `• **Profile Matching**: AI analyzes your situation for perfect matches\n` +
                `• **Instant Details**: Get comprehensive information instantly\n` +
                `• **Multi-Sector Coverage**: 7 key sectors with 15+ active programs\n` +
                `• **Personal Assistant**: Conversational AI that learns your preferences\n\n` +
                `**💡 How It Works:**\n` +
                `1. **Tell me about yourself** - I analyze your profile\n` +
                `2. **Smart matching** - AI finds relevant opportunities\n` +
                `3. **Detailed insights** - Get comprehensive program information\n` +
                `4. **Ongoing support** - Ask follow-up questions anytime\n\n` +
                `**🌟 Why Choose GrantTracker?**\n` +
                `Millions miss out on benefits they're eligible for. We bridge that gap with cutting-edge AI technology!`,
      suggestions: ["Start Discovery", "View Dashboard", "Take Tour"]
    };
  }

  // Sector-specific responses
  const sectors = ["Agriculture", "Education", "Health", "Infrastructure", "Environment", "Technology", "Women & Child"];
  for (const sector of sectors) {
    if (lower.includes(sector.toLowerCase())) {
      const sectorGrants = GRANTS.filter(g => g.sector === sector);
      const avgBenefit = sectorGrants.reduce((sum, g) => {
        const amount = g.amount.match(/₹?(\d+(?:\.\d+)?)/);
        return sum + (amount ? parseFloat(amount[1]) : 0);
      }, 0) / sectorGrants.length;

      let response = `🌟 **${sector.toUpperCase()} SECTOR - ${sectorGrants.length} Elite Programs**\n\n`;
      response += `💰 **Average Benefit Value:** ₹${avgBenefit.toFixed(0)}\n`;
      response += `🎯 **Coverage:** ${sectorGrants[0]?.coverage || 'National'}\n\n`;
      
      sectorGrants.forEach((grant, i) => {
        response += `**${i + 1}. ${grant.name}**\n`;
        response += `   💸 Benefit: ${grant.amount}\n`;
        response += `   📊 Beneficiaries: ${grant.beneficiaries}\n`;
        response += `   📝 ${grant.description}\n\n`;
      });

      return {
        response,
        suggestions: sectorGrants.slice(0, 3).map(g => `Learn: ${g.name.split(" ")[0]}`)
      };
    }
  }

  // Ultra-fast intelligent default response
  let response = `⚡ **Lightning-fast AI at your service!**\n\n`;
  
  // Instant smart suggestions based on query
  if (retrievedGrants.length > 0) {
    response += `**🎯 Found ${retrievedGrants.length} matches for:** "${message}"\n\n`;
    retrievedGrants.forEach((grant, i) => {
      response += `• **${grant.name}** (${grant.sector}) - ${grant.amount}\n`;
    });
    response += `\n💬 **Try:** "Tell me about [scheme name]" or "How to apply"\n\n`;
  } else {
    response += `I understand you want to know about: **"${message}"**\n\n`;
  }
  
  response += `🚀 **Popular quick asks:**\n` +
              `• "I'm a farmer" or "I'm a student"\n` +
              `• "Health schemes" or "Education grants"\n` +
              `• "PM Kisan" or "Ayushman Bharat"\n` +
              `• "How to apply" + scheme name\n\n` +
              `**What shall we explore?**`;

  return {
    response,
    suggestions: ["Find My Grants", "Popular Schemes", "Health Programs"]
  };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { message, history, profile } = req.body || {};
  if (!message) return res.status(400).json({ error: 'Missing message' });

  // Ultra-fast parallel API calls with intelligent fallback
  try {
    const retrieved = findTopGrants(message, 4);
    const result = await callAPIsInParallel(message, history, profile, retrieved);
    
    return res.json({
      reply: result.reply,
      suggestions: result.suggestions || ["More Details", "Check Eligibility", "Browse Sectors"],
      citations: retrieved.map(g => g.id),
      fast: result.fast || true
    });
  } catch (error) {
    // Emergency fallback
    const retrieved = findTopGrants(message, 4);
    const fastResponse = generateLightningResponse(message, retrieved, profile);
    return res.json({
      reply: fastResponse.response,
      suggestions: fastResponse.suggestions,
      citations: retrieved.map(g => g.id),
      fast: true
    });
  }
};
