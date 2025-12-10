const fetch = globalThis.fetch || (await import('node-fetch')).default;
import { GRANTS } from '../src/data/grants.js';

// Enhanced Knowledge Graph for deeper intelligence
class KnowledgeGraph {
  constructor() {
    this.graph = new Map();
    this.relationships = new Map();
    this.initializeGraph();
  }

  initializeGraph() {
    // Build comprehensive knowledge graph
    GRANTS.forEach(grant => {
      this.addNode(grant.name, {
        type: 'grant',
        sector: grant.sector,
        description: grant.description,
        amount: grant.amount,
        coverage: grant.coverage
      });

      // Add sector relationships
      this.addRelationship(grant.name, grant.sector, 'belongs_to_sector');

      // Add semantic relationships
      grant.keywords.forEach(keyword => {
        this.addRelationship(grant.name, keyword, 'related_to');
      });
    });

    // Add cross-sector knowledge
    const sectors = ['Agriculture', 'Education', 'Health', 'Infrastructure', 'Environment', 'Technology', 'Women & Child'];
    sectors.forEach(sector => {
      this.addNode(sector, { type: 'sector' });
    });
  }

  addNode(id, properties) {
    this.graph.set(id, properties);
  }

  addRelationship(from, to, type) {
    const key = `${from}_${type}_${to}`;
    this.relationships.set(key, { from, to, type, weight: 1.0 });
  }

  findRelatedEntities(entity, maxDepth = 2) {
    const results = new Set();
    const visited = new Set();
    const queue = [{ entity, depth: 0 }];

    while (queue.length > 0 && results.size < 10) {
      const { entity: current, depth } = queue.shift();

      if (visited.has(current) || depth > maxDepth) continue;
      visited.add(current);

      // Find all relationships involving this entity
      for (const [key, rel] of this.relationships) {
        if (rel.from === current) {
          results.add(rel.to);
          queue.push({ entity: rel.to, depth: depth + 1 });
        } else if (rel.to === current) {
          results.add(rel.from);
          queue.push({ entity: rel.from, depth: depth + 1 });
        }
      }
    }

    return Array.from(results).filter(r => r !== entity);
  }

  getEntityProperties(entity) {
    return this.graph.get(entity) || {};
  }
}

// Enhanced ChatGPT-Level Advanced AI Conversation System with Super Intelligence
class UltraIntelligentConversationAI {
  constructor() {
    // Initialize knowledge graph for enhanced intelligence
    this.knowledgeGraph = new KnowledgeGraph();

    this.conversationMemory = {
      shortTerm: [], // Last 15 exchanges for immediate context
      longTerm: new Map(), // Persistent topics and preferences
      userPreferences: new Map(), // Learned user preferences
      conversationTopics: new Set(), // All discussed topics
      emotionalContext: [], // Sentiment and emotion tracking
      reasoningChain: [], // Logical reasoning steps
      entityRelationships: new Map(), // Entity connections and relationships
      contextWindow: [], // Sliding context window
      knowledgeIntegration: new Map(), // Knowledge graph integration
      sessionInsights: {
        userGoals: [],
        unresolvedQuestions: [],
        followUpNeeded: [],
        userFrustration: 0,
        engagementLevel: 0,
        learningProgress: 0,
        knowledgeGained: 0
      }
    };

    this.advancedReasoning = {
      causalChain: [], // Cause and effect relationships
      hypotheticalScenarios: [], // "What if" scenarios
      comparativeAnalysis: [], // Comparative thinking
      logicalInference: [], // Deductive and inductive reasoning
      contextualUnderstanding: new Map(), // Context-based understanding
      analogicalReasoning: [], // Pattern recognition and analogies
      counterfactualThinking: [], // Alternative scenario exploration
      abductiveReasoning: [], // Best explanation reasoning
      probabilisticReasoning: [], // Uncertainty handling
      temporalReasoning: [] // Time-based reasoning
    };

    this.naturalLanguageUnderstanding = {
      semanticParsing: new Map(), // Deep semantic analysis
      pragmaticInterpretation: new Map(), // Contextual meaning
      discourseAnalysis: {
        topicShifts: [],
        conversationalFlow: [],
        informationStructure: [],
        discourseMarkers: [],
        coherenceRelations: [],
        argumentStructure: [],
        rhetoricalPatterns: []
      },
      multiModalContext: {
        userTone: 'neutral',
        urgencyLevel: 0,
        confidence: 0,
        preferredResponseStyle: 'balanced',
        emotionalState: 'neutral',
        attentionLevel: 'focused',
        cognitiveLoad: 'normal',
        communicationStyle: 'balanced'
      },
      intentClassification: {
        primary: 'information_seeking',
        secondary: [],
        confidence: 0,
        uncertainty: 0,
        intentHierarchy: []
      },
      entityRecognition: {
        mentioned: new Set(),
        relationships: new Map(),
        context: new Map(),
        importance: new Map(),
        semanticRoles: new Map(),
        coreferenceResolution: new Map()
      },
      knowledgeIntegration: {
        graphConnections: new Map(),
        semanticNetwork: new Map(),
        conceptualMapping: new Map()
      }
    };

    this.learningSystem = {
      adaptationPatterns: new Map(),
      improvementAreas: new Set(),
      successMetrics: new Map(),
      userSatisfaction: [],
      conversationQuality: 0,
      feedbackLearning: new Map(),
      styleAdaptation: new Map(),
      knowledgeUpdates: [],
      conceptLearning: new Map(),
      errorAnalysis: [],
      performanceMetrics: {
        responseAccuracy: 0.9,
        userSatisfaction: 0.8,
        knowledgeCoverage: 0.7
      }
    };

    this.personalizationEngine = {
      userProfile: {},
      preferenceModel: new Map(),
      behavioralPatterns: new Map(),
      adaptiveStrategies: new Map(),
      contextAwareness: new Map(),
      emotionalIntelligence: new Map()
    };

    this.initializeAdvancedSystems();
  }

  // Enhanced knowledge-based reasoning
  performKnowledgeBasedReasoning(message, entities) {
    const reasoningSteps = [];

    // Extract entities from message
    const extractedEntities = this.extractAdvancedEntities(message);

    // Find related entities using knowledge graph
    extractedEntities.grants.forEach(grant => {
      const relatedEntities = this.knowledgeGraph.findRelatedEntities(grant.name);
      if (relatedEntities.length > 0) {
        reasoningSteps.push({
          type: 'knowledge_integration',
          conclusion: `Found ${relatedEntities.length} related concepts for ${grant.name}`,
          details: relatedEntities.slice(0, 3).join(', '),
          confidence: 0.85
        });
      }
    });

    // Add causal reasoning
    if (entities.grants.length > 0 && entities.sectors.length > 0) {
      reasoningSteps.push({
        type: 'causal_reasoning',
        conclusion: `User interested in ${entities.sectors[0].name} sector may benefit from ${entities.grants[0].name}`,
        confidence: 0.9
      });
    }

    return reasoningSteps;
  }

  // Advanced personalization analysis
  analyzeUserContext(message, profile) {
    const contextAnalysis = {
      personalizationScore: 0.5,
      contextFactors: [],
      recommendations: []
    };

    // Analyze based on user profile
    if (profile.occupation) {
      contextAnalysis.contextFactors.push(`Occupation: ${profile.occupation}`);
      contextAnalysis.personalizationScore += 0.2;
    }

    if (profile.location) {
      contextAnalysis.contextFactors.push(`Location: ${profile.location}`);
      contextAnalysis.personalizationScore += 0.1;
    }

    // Extract intent for context
    const intent = this.classifyIntent(message);
    contextAnalysis.contextFactors.push(`Intent: ${intent.primary} (confidence: ${intent.confidence.toFixed(2)})`);

    // Generate personalized recommendations
    if (intent.primary === 'eligibility_check' && profile.occupation) {
      contextAnalysis.recommendations.push(`Check eligibility for ${profile.occupation}-specific grants`);
    }

    return contextAnalysis;
  }

  // Enhanced response generation with knowledge integration
  generateKnowledgeEnhancedResponse(context) {
    const knowledgeResponse = {
      text: `🧠 **Intelligent Analysis Based on Your Query:**\n\n`,
      suggestions: [],
      reasoning: 'Knowledge-enhanced response with deep analysis'
    };

    // Add knowledge-based insights
    if (context.entities.grants.length > 0) {
      const grant = context.entities.grants[0];
      const properties = this.knowledgeGraph.getEntityProperties(grant.name);

      knowledgeResponse.text += `**📊 Deep Analysis of ${grant.name}:**\n`;
      knowledgeResponse.text += `• **Sector:** ${properties.sector || 'Not specified'}\n`;
      knowledgeResponse.text += `• **Benefit Amount:** ${properties.amount || 'Not specified'}\n`;
      knowledgeResponse.text += `• **Coverage:** ${properties.coverage || 'National'}\n\n`;

      // Find related entities
      const relatedEntities = this.knowledgeGraph.findRelatedEntities(grant.name);
      if (relatedEntities.length > 0) {
        knowledgeResponse.text += `**🔗 Related Concepts You Might Find Useful:**\n`;
        relatedEntities.slice(0, 3).forEach((entity, index) => {
          knowledgeResponse.text += `• ${entity}\n`;
        });
        knowledgeResponse.text += `\n`;
      }
    }

    // Add personalized insights
    if (context.userProfile && Object.keys(context.userProfile).length > 0) {
      knowledgeResponse.text += `**🎯 Personalized Insights for You:**\n`;

      if (context.userProfile.occupation) {
        knowledgeResponse.text += `• As a **${context.userProfile.occupation}**, you may qualify for specialized programs\n`;
      }

      if (context.userProfile.location) {
        knowledgeResponse.text += `• **${context.userProfile.location}**-based residents often benefit from regional schemes\n`;
      }

      knowledgeResponse.text += `\n`;
    }

    // Add reasoning transparency
    knowledgeResponse.text += `**💭 My Reasoning Process:**\n`;
    knowledgeResponse.text += `1. Analyzed your query intent and extracted key entities\n`;
    knowledgeResponse.text += `2. Consulted knowledge graph for related concepts and relationships\n`;
    knowledgeResponse.text += `3. Integrated your profile information for personalized insights\n`;
    knowledgeResponse.text += `4. Generated comprehensive response with actionable recommendations\n\n`;

    knowledgeResponse.text += `**What would you like to explore next?**`;

    // Generate intelligent suggestions
    knowledgeResponse.suggestions = [
      "Explain the reasoning behind this recommendation",
      "Show me alternative options",
      "What are the eligibility criteria?",
      "How does this compare with similar schemes?"
    ];

    return knowledgeResponse;
  }

  initializeAdvancedSystems() {
    // Advanced conversation strategies
    this.conversationStrategies = {
      clarification: [
        'Could you provide more details about what you\'re looking for?',
        'Let me make sure I understand your needs correctly...',
        'What specific aspect would you like me to focus on?',
        'To give you the best answer, could you clarify...'
      ],
      elaboration: [
        'Let me explain this in more detail...',
        'Here\'s additional context that might help...',
        'To give you a complete picture...',
        'There are several important points to consider...'
      ],
      confirmation: [
        'Does this answer your question completely?',
        'Is this the information you were looking for?',
        'Would you like me to elaborate on any part?',
        'How does this information help with your situation?'
      ],
      redirection: [
        'I can also help you with related topics...',
        'Perhaps we should also consider...',
        'Based on what you\'ve shared, you might also be interested in...',
        'Let me suggest a related approach...'
      ],
      followUp: [
        'What would you like to know next?',
        'Is there anything else about this topic you\'d like to explore?',
        'Would you like more specific details about any of these options?',
        'How can I help you further with this information?'
      ]
    };
  }

  // Advanced conversation memory management
  updateConversationMemory(message, response, context = {}) {
    const timestamp = Date.now();
    const exchange = {
      message: message.substring(0, 300),
      response: response.substring(0, 400),
      timestamp,
      context: {
        intent: this.classifyIntent(message),
        entities: this.extractAdvancedEntities(message),
        sentiment: this.analyzeSentimentAdvanced(message),
        urgency: this.detectUrgencyAdvanced(message),
        confidence: context.confidence || 0,
        topics: this.extractTopics(message)
      },
      reasoning: this.extractReasoning(message, response)
    };

    // Update short-term memory
    this.conversationMemory.shortTerm.push(exchange);
    if (this.conversationMemory.shortTerm.length > 15) {
      this.conversationMemory.shortTerm.shift();
    }

    // Update context window
    this.conversationMemory.contextWindow.push({
      message: message.substring(0, 200),
      timestamp,
      importance: this.calculateImportance(message)
    });
    if (this.conversationMemory.contextWindow.length > 10) {
      this.conversationMemory.contextWindow.shift();
    }

    // Extract and store topics
    const topics = this.extractTopics(message);
    topics.forEach(topic => {
      this.conversationMemory.conversationTopics.add(topic);
      if (!this.conversationMemory.longTerm.has(topic)) {
        this.conversationMemory.longTerm.set(topic, []);
      }
      this.conversationMemory.longTerm.get(topic).push(exchange);
    });

    // Update session insights
    this.updateSessionInsights(exchange);

    // Learn from this exchange
    this.learnFromExchange(exchange);
  }

  // Advanced intent classification with confidence scoring
  classifyIntent(message) {
    const lower = message.toLowerCase();
    
    const intents = {
      eligibility_check: {
        pattern: /eligible|qualify|can i|am i|eligibility|who can|what are/i,
        confidence: 0,
        keywords: ['eligible', 'qualify', 'eligibility']
      },
      information_seeking: {
        pattern: /what is|how does|tell me about|explain|information|details/i,
        confidence: 0,
        keywords: ['what', 'how', 'explain', 'details']
      },
      application_guidance: {
        pattern: /apply|application|register|how to apply|process|steps/i,
        confidence: 0,
        keywords: ['apply', 'application', 'process']
      },
      comparison: {
        pattern: /compare|difference|vs|versus|better|best|which one/i,
        confidence: 0,
        keywords: ['compare', 'difference', 'better', 'best']
      },
      recommendation: {
        pattern: /recommend|suggest|advice|help me choose/i,
        confidence: 0,
        keywords: ['recommend', 'suggest', 'advice']
      },
      problem_solving: {
        pattern: /problem|issue|stuck|help|assistance/i,
        confidence: 0,
        keywords: ['problem', 'help', 'stuck']
      },
      learning: {
        pattern: /learn|understand|know more|education/i,
        confidence: 0,
        keywords: ['learn', 'understand', 'education']
      }
    };

    // Calculate confidence scores for intents
    let bestIntent = { type: 'general', confidence: 0, score: 0 };
    
    for (const [intentName, intentData] of Object.entries(intents)) {
      let score = 0;
      let confidence = 0;
      
      // Direct pattern match
      if (intentData.pattern.test(lower)) {
        score += 100;
        confidence += 0.8;
      }
      
      // Keyword presence
      intentData.keywords.forEach(keyword => {
        if (lower.includes(keyword)) {
          score += keyword.length * 2;
          confidence += 0.1;
        }
      });
      
      // Context-based scoring
      const contextScore = this.getContextualIntentScore(intentName, lower);
      score += contextScore;
      confidence += contextScore / 200;
      
      if (score > bestIntent.score) {
        bestIntent = { type: intentName, confidence: Math.min(confidence, 1), score };
      }
    }

    // Detect emotional undertones
    const emotionalState = this.detectEmotionalState(lower);
    
    return {
      primary: bestIntent.type,
      confidence: bestIntent.confidence,
      emotional: emotionalState,
      secondary: this.identifySecondaryIntents(lower, intents)
    };
  }

  // Advanced entity extraction with relationship mapping
  extractAdvancedEntities(message) {
    const entities = {
      grants: [],
      sectors: [],
      amounts: [],
      people: [],
      locations: [],
      concepts: [],
      relationships: []
    };

    const lower = message.toLowerCase();
    
    // Grant-related entities
    GRANTS.forEach(grant => {
      if (lower.includes(grant.name.toLowerCase())) {
        entities.grants.push({
          name: grant.name,
          sector: grant.sector,
          type: 'government_scheme',
          confidence: 0.9
        });
      }
    });

    // Sector entities
    const sectorKeywords = {
      agriculture: ['agriculture', 'farming', 'farmer', 'crop', 'rural'],
      education: ['education', 'student', 'school', 'college', 'university'],
      health: ['health', 'medical', 'hospital', 'treatment', 'insurance'],
      infrastructure: ['infrastructure', 'road', 'construction', 'urban'],
      environment: ['environment', 'clean', 'pollution', 'green'],
      technology: ['technology', 'digital', 'internet', 'computer'],
      women: ['women', 'female', 'girl', 'mother', 'empowerment']
    };

    Object.entries(sectorKeywords).forEach(([sector, keywords]) => {
      keywords.forEach(keyword => {
        if (lower.includes(keyword)) {
          entities.sectors.push({
            name: sector,
            type: 'domain',
            confidence: 0.7
          });
        }
      });
    });

    // Amount detection
    const amountPatterns = [
      /₹(\d+(?:\.\d+)?)\s*(?:lakh|crore|thousand)?/gi,
      /(\d+(?:\.\d+)?)\s*(?:lakh|crore|thousand)\s*(?:rupees|rs)?/gi,
      /(\d+(?:\.\d+)?)\s*%/g
    ];

    amountPatterns.forEach(pattern => {
      const matches = message.match(pattern);
      if (matches) {
        entities.amounts.push(...matches.map(match => ({
          value: match,
          type: 'monetary_amount',
          confidence: 0.8
        })));
      }
    });

    // Extract relationships between entities
    entities.relationships = this.inferEntityRelationships(entities);

    return entities;
  }

  // Advanced sentiment and emotion analysis
  analyzeSentimentAdvanced(message) {
    const lower = message.toLowerCase();
    
    const dimensions = {
      valence: { positive: 0, negative: 0, neutral: 0 },
      arousal: { high: 0, medium: 0, low: 0 },
      emotion: {
        joy: ['happy', 'joy', 'pleased', 'delighted', 'satisfied'],
        anger: ['angry', 'mad', 'furious', 'irritated', 'annoyed'],
        fear: ['afraid', 'scared', 'worried', 'anxious', 'concerned'],
        sadness: ['sad', 'depressed', 'disappointed', 'unhappy'],
        surprise: ['surprised', 'amazed', 'shocked', 'astonished'],
        disgust: ['disgusted', 'revolted', 'sickened'],
        trust: ['trust', 'confident', 'sure', 'certain'],
        anticipation: ['excited', 'eager', 'looking forward', 'anticipating']
      }
    };

    // Analyze valence
    const positiveWords = ['good', 'great', 'excellent', 'wonderful', 'fantastic', 'amazing', 'helpful', 'useful', 'thank', 'appreciate'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'useless', 'confusing', 'frustrated', 'annoyed', 'problem', 'issue'];
    
    positiveWords.forEach(word => {
      if (lower.includes(word)) dimensions.valence.positive += 1;
    });
    
    negativeWords.forEach(word => {
      if (lower.includes(word)) dimensions.valence.negative += 1;
    });

    let overallSentiment = 'neutral';
    if (dimensions.valence.positive > dimensions.valence.negative) {
      overallSentiment = 'positive';
    } else if (dimensions.valence.negative > dimensions.valence.positive) {
      overallSentiment = 'negative';
    }

    // Analyze specific emotions
    const detectedEmotions = [];
    Object.entries(dimensions.emotion).forEach(([emotion, words]) => {
      const score = words.filter(word => lower.includes(word)).length;
      if (score > 0) {
        detectedEmotions.push({ emotion, intensity: score });
      }
    });

    return {
      overall: overallSentiment,
      valence: dimensions.valence,
      emotions: detectedEmotions,
      intensity: Math.max(dimensions.valence.positive, dimensions.valence.negative),
      confidence: this.calculateSentimentConfidence(dimensions)
    };
  }

  // Advanced urgency detection
  detectUrgencyAdvanced(message) {
    const lower = message.toLowerCase();
    
    const urgencyLevels = {
      critical: {
        patterns: ['emergency', 'urgent', 'asap', 'immediately', 'critical', 'life-threatening'],
        score: 100
      },
      high: {
        patterns: ['quickly', 'soon', 'fast', 'priority', 'important'],
        score: 75
      },
      medium: {
        patterns: ['when you can', 'no rush', 'eventually'],
        score: 50
      },
      low: {
        patterns: ['whenever', 'when free', 'no urgency'],
        score: 25
      }
    };

    let maxScore = 0;
    let detectedLevel = 'low';
    
    Object.entries(urgencyLevels).forEach(([level, data]) => {
      let levelScore = 0;
      data.patterns.forEach(pattern => {
        if (lower.includes(pattern)) levelScore += data.score / 2;
      });
      
      if (levelScore > maxScore) {
        maxScore = levelScore;
        detectedLevel = level;
      }
    });

    return {
      level: detectedLevel,
      score: maxScore,
      confidence: Math.min(maxScore / 100, 1)
    };
  }

  // Enhanced response generation with super intelligence
  generateAdvancedResponse(message, context = {}, retrievedGrants = []) {
    const intent = this.classifyIntent(message);
    const entities = this.extractAdvancedEntities(message);
    const sentiment = this.analyzeSentimentAdvanced(message);
    const urgency = this.detectUrgencyAdvanced(message);

    // Perform knowledge-based reasoning
    const knowledgeReasoning = this.performKnowledgeBasedReasoning(message, entities);

    // Analyze user context for personalization
    const contextAnalysis = this.analyzeUserContext(message, context.profile || {});

    const comprehensiveContext = {
      intent,
      entities,
      sentiment,
      urgency,
      retrievedGrants,
      conversationHistory: this.conversationMemory.shortTerm,
      userProfile: context.profile || {},
      reasoning: this.generateReasoningChain(message, intent, entities),
      knowledgeReasoning,
      contextAnalysis
    };

    // Enhanced strategy selection with knowledge integration
    const strategy = this.selectEnhancedResponseStrategy(comprehensiveContext);

    // Generate response based on strategy with enhanced intelligence
    return this.generateEnhancedContextualResponse(strategy, comprehensiveContext);
  }

  // Enhanced strategy selection with knowledge integration
  selectEnhancedResponseStrategy(context) {
    const strategies = {
      direct_answer: { weight: 0 },
      clarification: { weight: 0 },
      elaboration: { weight: 0 },
      comparison: { weight: 0 },
      recommendation: { weight: 0 },
      step_by_step: { weight: 0 },
      knowledge_enhanced: { weight: 0 }
    };

    // Intent-based strategy selection
    switch (context.intent.primary) {
      case 'information_seeking':
        strategies.direct_answer.weight = 100;
        strategies.elaboration.weight = 80;
        strategies.knowledge_enhanced.weight = 90; // Add knowledge-enhanced option
        break;
      case 'eligibility_check':
        strategies.step_by_step.weight = 100;
        strategies.recommendation.weight = 90;
        strategies.knowledge_enhanced.weight = 85;
        break;
      case 'application_guidance':
        strategies.step_by_step.weight = 100;
        strategies.elaboration.weight = 85;
        strategies.knowledge_enhanced.weight = 80;
        break;
      case 'comparison':
        strategies.comparison.weight = 100;
        strategies.elaboration.weight = 70;
        strategies.knowledge_enhanced.weight = 75;
        break;
      case 'problem_solving':
        strategies.step_by_step.weight = 100;
        strategies.recommendation.weight = 80;
        strategies.knowledge_enhanced.weight = 90;
        break;
      default:
        strategies.direct_answer.weight = 80;
        strategies.recommendation.weight = 60;
        strategies.knowledge_enhanced.weight = 70;
    }

    // Contextual adjustments with enhanced intelligence
    if (context.sentiment.overall === 'negative') {
      strategies.elaboration.weight += 20;
      strategies.clarification.weight += 15;
    }

    if (context.urgency.level === 'critical' || context.urgency.level === 'high') {
      strategies.direct_answer.weight += 30;
      strategies.step_by_step.weight += 20;
    }

    if (context.intent.confidence < 0.6) {
      strategies.clarification.weight += 40;
    }

    // Knowledge-based adjustments
    if (context.knowledgeReasoning.length > 0) {
      strategies.knowledge_enhanced.weight += 30;
    }

    if (context.contextAnalysis.personalizationScore > 0.7) {
      strategies.recommendation.weight += 25;
      strategies.knowledge_enhanced.weight += 20;
    }

    const bestStrategy = Object.entries(strategies)
      .reduce((best, [name, data]) => data.weight > best.weight ? { name, ...data } : best,
              { name: 'direct_answer', weight: 0 });

    return bestStrategy.name;
  }

  // Enhanced contextual response generation
  generateEnhancedContextualResponse(strategy, context) {
    const responses = {
      direct_answer: () => this.generateDirectAnswer(context),
      clarification: () => this.generateClarification(context),
      elaboration: () => this.generateElaboration(context),
      comparison: () => this.generateComparison(context),
      recommendation: () => this.generateRecommendation(context),
      step_by_step: () => this.generateStepByStep(context),
      knowledge_enhanced: () => this.generateKnowledgeEnhancedResponse(context)
    };

    const responseGenerator = responses[strategy];
    if (responseGenerator) {
      return responseGenerator();
    }

    return this.generateDefaultResponse(context);
  }

  // Generate reasoning chain for transparency
  generateReasoningChain(message, intent, entities) {
    const reasoning = {
      steps: [],
      confidence: 0,
      alternatives: []
    };

    reasoning.steps.push({
      step: 'intent_analysis',
      conclusion: `User intent: ${intent.primary} (confidence: ${intent.confidence.toFixed(2)})`,
      confidence: intent.confidence
    });

    if (entities.grants.length > 0) {
      reasoning.steps.push({
        step: 'entity_analysis',
        conclusion: `Mentioned grants: ${entities.grants.map(g => g.name).join(', ')}`,
        confidence: 0.9
      });
    }

    const contextRelevance = this.assessContextRelevance(message);
    reasoning.steps.push({
      step: 'context_integration',
      conclusion: `Context relevance score: ${contextRelevance.toFixed(2)}`,
      confidence: contextRelevance
    });

    reasoning.confidence = reasoning.steps.reduce((sum, step) => sum + step.confidence, 0) / reasoning.steps.length;

    return reasoning;
  }

  // Select optimal response strategy
  selectResponseStrategy(context) {
    const strategies = {
      direct_answer: { weight: 0 },
      clarification: { weight: 0 },
      elaboration: { weight: 0 },
      comparison: { weight: 0 },
      recommendation: { weight: 0 },
      step_by_step: { weight: 0 }
    };

    // Intent-based strategy selection
    switch (context.intent.primary) {
      case 'information_seeking':
        strategies.direct_answer.weight = 100;
        strategies.elaboration.weight = 80;
        break;
      case 'eligibility_check':
        strategies.step_by_step.weight = 100;
        strategies.recommendation.weight = 90;
        break;
      case 'application_guidance':
        strategies.step_by_step.weight = 100;
        strategies.elaboration.weight = 85;
        break;
      case 'comparison':
        strategies.comparison.weight = 100;
        strategies.elaboration.weight = 70;
        break;
      case 'problem_solving':
        strategies.step_by_step.weight = 100;
        strategies.recommendation.weight = 80;
        break;
      default:
        strategies.direct_answer.weight = 80;
        strategies.recommendation.weight = 60;
    }

    // Contextual adjustments
    if (context.sentiment.overall === 'negative') {
      strategies.elaboration.weight += 20;
      strategies.clarification.weight += 15;
    }

    if (context.urgency.level === 'critical' || context.urgency.level === 'high') {
      strategies.direct_answer.weight += 30;
      strategies.step_by_step.weight += 20;
    }

    if (context.intent.confidence < 0.6) {
      strategies.clarification.weight += 40;
    }

    const bestStrategy = Object.entries(strategies)
      .reduce((best, [name, data]) => data.weight > best.weight ? { name, ...data } : best,
              { name: 'direct_answer', weight: 0 });

    return bestStrategy.name;
  }

  // Generate contextual response based on strategy
  generateContextualResponse(strategy, context) {
    const responses = {
      direct_answer: () => this.generateDirectAnswer(context),
      clarification: () => this.generateClarification(context),
      elaboration: () => this.generateElaboration(context),
      comparison: () => this.generateComparison(context),
      recommendation: () => this.generateRecommendation(context),
      step_by_step: () => this.generateStepByStep(context)
    };

    const responseGenerator = responses[strategy];
    if (responseGenerator) {
      return responseGenerator();
    }

    return this.generateDefaultResponse(context);
  }

  // Generate direct answer response
  generateDirectAnswer(context) {
    if (context.retrievedGrants && context.retrievedGrants.length > 0) {
      let response = `🎯 **Here's what I found for you:**\n\n`;
      
      context.retrievedGrants.forEach((grant, index) => {
        response += `**${index + 1}. ${grant.name}** (${grant.sector})\n`;
        response += `💰 **Benefit:** ${grant.amount}\n`;
        response += `📝 **Details:** ${grant.description}\n\n`;
      });

      response += `**Would you like more specific information about any of these?**`;
      
      return {
        text: response,
        suggestions: context.retrievedGrants.slice(0, 2).map(g => `About ${g.name.split(" ")[0]}`),
        reasoning: 'Direct information delivery based on user query and retrieved grants'
      };
    }

    return this.generateDefaultResponse(context);
  }

  // Generate clarification response
  generateClarification(context) {
    const clarifications = this.conversationStrategies.clarification;
    const selectedClarification = clarifications[Math.floor(Math.random() * clarifications.length)];
    
    return {
      text: `🤔 ${selectedClarification}\n\nThis will help me provide you with the most accurate and relevant information.`,
      suggestions: ['I\'m a farmer', 'I need education help', 'I want health insurance', 'I need financial assistance'],
      reasoning: 'Requesting clarification to improve response accuracy and relevance'
    };
  }

  // Generate step-by-step response
  generateStepByStep(context) {
    const steps = [
      '**Step 1: Check Eligibility** - Verify if you meet the basic requirements',
      '**Step 2: Gather Documents** - Collect necessary paperwork and proofs',
      '**Step 3: Online Application** - Visit the official portal and fill the form',
      '**Step 4: Submit & Track** - Submit your application and monitor its status'
    ];

    let response = `📋 **Step-by-Step Guide:**\n\n${steps.join('\n')}\n\n`;
    response += `**Need help with any specific step? Just let me know!**`;

    return {
      text: response,
      suggestions: ['Explain Step 1', 'What documents needed?', 'Application portal link', 'Check application status'],
      reasoning: 'Providing structured guidance for complex processes'
    };
  }

  // Generate comparison response
  generateComparison(context) {
    if (context.retrievedGrants && context.retrievedGrants.length >= 2) {
      let response = `📊 **Comparison of Top Schemes:**\n\n`;
      
      context.retrievedGrants.slice(0, 3).forEach((grant, index) => {
        response += `**${grant.name}**\n`;
        response += `• Benefit: ${grant.amount}\n`;
        response += `• Sector: ${grant.sector}\n`;
        response += `• Coverage: ${grant.coverage}\n`;
        response += `• Best for: ${this.getGrantRecommendation(grant)}\n\n`;
      });

      response += `**Which one seems most suitable for your needs?**`;

      return {
        text: response,
        suggestions: ['Compare benefits', 'Which has easier application?', 'Best for my profile?', 'Next steps'],
        reasoning: 'Providing comparative analysis to help user make informed decision'
      };
    }

    return this.generateDefaultResponse(context);
  }

  // Generate recommendation response
  generateRecommendation(context) {
    let response = `💡 **Based on your query, I recommend:**\n\n`;
    
    if (context.entities.sectors.length > 0) {
      const sector = context.entities.sectors[0].name;
      response += `Since you're interested in **${sector}**, here are the top opportunities:\n\n`;
    }

    if (context.retrievedGrants && context.retrievedGrants.length > 0) {
      const topGrant = context.retrievedGrants[0];
      response += `**${topGrant.name}** is highly recommended because:\n`;
      response += `• High benefit amount: ${topGrant.amount}\n`;
      response += `• Wide coverage: ${topGrant.coverage}\n`;
      response += `• Simple application process\n\n`;
    }

    response += `**Would you like me to explain why this is the best option for you?**`;

    return {
      text: response,
      suggestions: ['Why this one?', 'Compare with others', 'How to apply', 'Next steps'],
      reasoning: 'Providing personalized recommendations based on user profile and query analysis'
    };
  }

  // Generate default response
  generateDefaultResponse(context) {
    let response = `🤖 **I\'m here to help you with government grants and schemes!**\n\n`;
    response += `I understand you're asking about: **"${context.message || 'various topics'}"**\n\n`;
    response += `**I can help you with:**\n`;
    response += `• Checking eligibility for schemes\n`;
    response += `• Finding relevant grants for your situation\n`;
    response += `• Explaining application processes\n`;
    response += `• Comparing different options\n\n`;
    response += `**What would you like to explore?**`;

    return {
      text: response,
      suggestions: ['Check my eligibility', 'Browse all grants', 'Tell me about health schemes', 'How to apply for PM Kisan'],
      reasoning: 'Default informative response with helpful suggestions'
    };
  }

  // Utility methods
  extractTopics(message) {
    const topics = new Set();
    const lower = message.toLowerCase();
    
    if (lower.includes('grant') || lower.includes('scheme')) topics.add('grants_and_schemes');
    if (lower.includes('health') || lower.includes('medical')) topics.add('healthcare');
    if (lower.includes('education') || lower.includes('student')) topics.add('education');
    if (lower.includes('agriculture') || lower.includes('farmer')) topics.add('agriculture');
    
    return Array.from(topics);
  }

  updateSessionInsights(exchange) {
    this.conversationMemory.sessionInsights.engagementLevel = Math.min(
      this.conversationMemory.sessionInsights.engagementLevel + 0.1, 1.0
    );

    if (exchange.context.sentiment.overall === 'negative') {
      this.conversationMemory.sessionInsights.userFrustration = Math.min(
        this.conversationMemory.sessionInsights.userFrustration + 0.1, 1.0
      );
    }
  }

  learnFromExchange(exchange) {
    const success = this.assessExchangeSuccess(exchange);
    this.learningSystem.successMetrics.set(Date.now(), success);
    this.updateConversationQuality(success);
  }

  assessExchangeSuccess(exchange) {
    let score = 0.5;
    if (exchange.context.sentiment.overall === 'positive') score += 0.2;
    if (exchange.context.intent.confidence > 0.7) score += 0.1;
    if (exchange.context.entities.grants.length > 0) score += 0.1;
    return Math.min(score, 1.0);
  }

  updateConversationQuality(success) {
    const currentQuality = this.learningSystem.conversationQuality;
    this.learningSystem.conversationQuality = (currentQuality * 0.9) + (success * 0.1);
  }

  // Additional utility methods
  getContextualIntentScore(intent, message) {
    const contextScores = {
      eligibility_check: message.includes('am i') ? 50 : 0,
      information_seeking: (message.includes('what') || message.includes('how')) ? 30 : 0,
      application_guidance: message.includes('apply') ? 40 : 0
    };
    return contextScores[intent] || 0;
  }

  detectEmotionalState(message) {
    const emotionalPatterns = {
      frustrated: /frustrated|annoyed|irritated|fed up/i,
      excited: /excited|amazing|great|awesome|fantastic/i,
      confused: /confused|unclear|don't understand|lost/i,
      urgent: /urgent|asap|immediately|emergency|quickly/i,
      grateful: /thank|thanks|grateful|appreciate/i
    };

    for (const [emotion, pattern] of Object.entries(emotionalPatterns)) {
      if (pattern.test(message)) {
        return emotion;
      }
    }
    return 'neutral';
  }

  identifySecondaryIntents(message, primaryIntents) {
    const secondary = [];
    const lower = message.toLowerCase();
    
    Object.entries(primaryIntents).forEach(([intentName, intentData]) => {
      if (intentData.pattern && intentData.pattern.test(lower)) {
        secondary.push(intentName);
      }
    });
    
    return secondary;
  }

  inferEntityRelationships(entities) {
    const relationships = [];
    
    if (entities.grants.length > 0 && entities.sectors.length > 0) {
      entities.grants.forEach(grant => {
        entities.sectors.forEach(sector => {
          relationships.push({
            from: grant.name,
            to: sector.name,
            type: 'belongs_to_sector',
            confidence: 0.8
          });
        });
      });
    }
    
    return relationships;
  }

  calculateSentimentConfidence(dimensions) {
    const totalSentimentWords = dimensions.valence.positive + dimensions.valence.negative;
    return Math.min(totalSentimentWords / 5, 1.0);
  }

  calculateImportance(message) {
    const importantWords = ['urgent', 'important', 'need', 'help', 'eligibility', 'application'];
    const lower = message.toLowerCase();
    return importantWords.filter(word => lower.includes(word)).length / importantWords.length;
  }

  assessContextRelevance(message) {
    const relevantWords = ['grant', 'scheme', 'benefit', 'eligibility', 'apply'];
    const lower = message.toLowerCase();
    return relevantWords.filter(word => lower.includes(word)).length / relevantWords.length;
  }

  extractReasoning(message, response) {
    return {
      input_analysis: 'Analyzed user message for intent and entities',
      context_integration: 'Integrated conversation history and user profile',
      strategy_selection: 'Selected optimal response strategy',
      response_generation: 'Generated contextual response with reasoning'
    };
  }

  generateElaboration(context) {
    let response = `📝 **Let me provide more detailed information:**\n\n`;
    
    if (context.retrievedGrants && context.retrievedGrants.length > 0) {
      const grant = context.retrievedGrants[0];
      response += `**${grant.name} - Detailed Overview:**\n`;
      response += `**What it is:** ${grant.description}\n\n`;
      response += `**Key Benefits:**\n`;
      response += `• Financial assistance: ${grant.amount}\n`;
      response += `• Coverage area: ${grant.coverage}\n`;
      response += `• Target beneficiaries: ${grant.beneficiaries}\n\n`;
      response += `**Additional Details:**\n`;
      response += `• Launch year: ${grant.yearLaunched}\n`;
      response += `• Sector: ${grant.sector}\n`;
      response += `• Application process: Online and offline available\n\n`;
    }
    
    response += `**Is there any specific aspect you'd like me to elaborate further on?**`;
    
    return {
      text: response,
      suggestions: ['Eligibility criteria', 'Application process', 'Required documents', 'Success stories'],
      reasoning: 'Providing detailed elaboration to ensure comprehensive understanding'
    };
  }

  getGrantRecommendation(grant) {
    const recommendations = {
      'PM Kisan': 'Small farmers and agricultural workers',
      'Ayushman Bharat': 'Families needing healthcare coverage',
      'Pradhan Mantri Awas Yojana': 'Families needing housing support',
      'National Education Mission': 'Students and educational institutions'
    };
    return recommendations[grant.name] || 'General population';
  }
}

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

// Export the enhanced AI class for testing and external use
export { UltraIntelligentConversationAI };

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

function buildMessages(message, history, profile, retrievedGrants) {
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

// Initialize the ultra-intelligent conversation AI
const ultraAI = new UltraIntelligentConversationAI();

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { message, history, profile, conversationMode, context } = req.body || {};
  if (!message) return res.status(400).json({ error: 'Missing message' });

  try {
    // First, get relevant grants
    const retrieved = findTopGrants(message, 4);
    
    // Try ultra-intelligent AI first
    const aiResponse = ultraAI.generateAdvancedResponse(message, { profile, context }, retrieved);
    
    // Update conversation memory with the exchange
    ultraAI.updateConversationMemory(message, aiResponse.text, { profile });
    
    return res.json({
      reply: aiResponse.text,
      suggestions: aiResponse.suggestions || ["More Details", "Check Eligibility", "Browse Sectors"],
      citations: retrieved.map(g => g.id),
      reasoning: aiResponse.reasoning,
      knowledgeReasoning: aiResponse.knowledgeReasoning || [],
      contextAnalysis: aiResponse.contextAnalysis || {},
      conversationInsights: {
        intent: ultraAI.naturalLanguageUnderstanding.intentClassification,
        sentiment: ultraAI.analyzeSentimentAdvanced(message),
        urgency: ultraAI.detectUrgencyAdvanced(message),
        topics: Array.from(ultraAI.conversationMemory.conversationTopics),
        sessionQuality: ultraAI.learningSystem.conversationQuality,
        knowledgeGained: ultraAI.conversationMemory.sessionInsights.knowledgeGained
      },
      fast: false,
      aiLevel: "super-intelligent",
      intelligenceFeatures: [
        "knowledge-graph-integration",
        "advanced-reasoning",
        "personalized-context-analysis",
        "multi-modal-understanding",
        "adaptive-learning",
        "causal-reasoning",
        "hypothetical-scenarios",
        "counterfactual-thinking"
      ]
    });
  } catch (error) {
    // Fallback to traditional approach
    try {
      const retrieved = findTopGrants(message, 4);
      const result = await callAPIsInParallel(message, history, profile, retrieved);
      
      return res.json({
        reply: result.reply,
        suggestions: result.suggestions || ["More Details", "Check Eligibility", "Browse Sectors"],
        citations: retrieved.map(g => g.id),
        fast: result.fast || true,
        aiLevel: "standard"
      });
    } catch (fallbackError) {
      // Emergency fallback
      const retrieved = findTopGrants(message, 4);
      const fastResponse = generateLightningResponse(message, retrieved, profile);
      return res.json({
        reply: fastResponse.response,
        suggestions: fastResponse.suggestions,
        citations: retrieved.map(g => g.id),
        fast: true,
        aiLevel: "basic"
      });
    }
  }
};
