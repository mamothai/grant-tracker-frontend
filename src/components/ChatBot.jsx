import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import santaImg from "../assets/santa.svg";
import { GRANTS } from "../data/grants";

// ChatGPT-Level Advanced Conversation Intelligence
class UltraIntelligentConversationEngine {
  constructor() {
    this.conversationMemory = {
      shortTerm: [], // Last 15 exchanges
      longTerm: new Map(), // Persistent topics
      userPreferences: new Map(),
      conversationTopics: new Set(),
      reasoningChain: [],
      sessionInsights: {
        userGoals: [],
        unresolvedQuestions: [],
        userFrustration: 0,
        engagementLevel: 0
      }
    };
    
    this.advancedReasoning = {
      causalChain: [],
      logicalInference: [],
      contextualUnderstanding: new Map(),
      analogicalReasoning: []
    };
    
    this.naturalLanguageUnderstanding = {
      intentClassification: {
        primary: 'information_seeking',
        confidence: 0,
        uncertainty: 0
      },
      entityRecognition: {
        mentioned: new Set(),
        relationships: new Map(),
        importance: new Map()
      },
      multiModalContext: {
        userTone: 'neutral',
        urgencyLevel: 0,
        confidence: 0,
        preferredResponseStyle: 'balanced'
      }
    };
    
    this.conversationStrategies = {
      clarification: [
        'Could you provide more details about what you\'re looking for?',
        'Let me make sure I understand your needs correctly...',
        'What specific aspect would you like me to focus on?'
      ],
      elaboration: [
        'Let me explain this in more detail...',
        'Here\'s additional context that might help...',
        'To give you a complete picture...'
      ],
      confirmation: [
        'Does this answer your question completely?',
        'Is this the information you were looking for?',
        'Would you like me to elaborate on any part?'
      ],
      followUp: [
        'What would you like to know next?',
        'Is there anything else about this topic you\'d like to explore?',
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
        entities: this.extractEntities(message),
        sentiment: this.analyzeSentiment(message),
        urgency: this.detectUrgency(message),
        confidence: context.confidence || 0
      }
    };

    // Update short-term memory
    this.conversationMemory.shortTerm.push(exchange);
    if (this.conversationMemory.shortTerm.length > 15) {
      this.conversationMemory.shortTerm.shift();
    }

    // Extract and store topics
    const topics = this.extractTopics(message);
    topics.forEach(topic => {
      this.conversationMemory.conversationTopics.add(topic);
    });

    // Update session insights
    this.updateSessionInsights(exchange);
  }

  // Advanced intent classification
  classifyIntent(message) {
    const lower = message.toLowerCase();
    
    const intents = {
      eligibility_check: { 
        pattern: /eligible|qualify|can i|am i|eligibility|who can|what are/i, 
        score: 0 
      },
      information_seeking: { 
        pattern: /what is|how does|tell me about|explain|information|details/i, 
        score: 0 
      },
      application_guidance: { 
        pattern: /apply|application|register|how to apply|process|steps/i, 
        score: 0 
      },
      comparison: { 
        pattern: /compare|difference|vs|versus|better|best|which one/i, 
        score: 0 
      },
      recommendation: { 
        pattern: /recommend|suggest|advice|help me choose/i, 
        score: 0 
      }
    };

    // Calculate confidence scores
    Object.entries(intents).forEach(([intentName, intentData]) => {
      if (intentData.pattern.test(lower)) {
        intentData.score = 1.0;
      } else {
        // Partial matching
        const keywords = this.getIntentKeywords(intentName);
        const matchCount = keywords.filter(keyword => lower.includes(keyword)).length;
        intentData.score = Math.min(matchCount * 0.2, 0.8);
      }
    });

    // Find best intent
    const bestIntent = Object.entries(intents)
      .reduce((best, [name, data]) => data.score > best.score ? { name, ...data } : best, 
              { name: 'general', score: 0 });

    return {
      primary: bestIntent.name,
      confidence: bestIntent.score,
      allScores: intents
    };
  }

  getIntentKeywords(intent) {
    const keywords = {
      eligibility_check: ['eligible', 'qualify', 'eligibility', 'can i', 'am i'],
      information_seeking: ['what', 'how', 'explain', 'details', 'information'],
      application_guidance: ['apply', 'application', 'process', 'register', 'steps'],
      comparison: ['compare', 'difference', 'better', 'best', 'which'],
      recommendation: ['recommend', 'suggest', 'advice', 'help choose']
    };
    return keywords[intent] || [];
  }

  // Advanced entity extraction
  extractEntities(message) {
    const entities = {
      grants: [],
      sectors: [],
      amounts: [],
      people: [],
      locations: []
    };

    const lower = message.toLowerCase();
    
    // Grant detection
    GRANTS.forEach(grant => {
      if (lower.includes(grant.name.toLowerCase())) {
        entities.grants.push({
          name: grant.name,
          sector: grant.sector,
          confidence: 0.9
        });
      }
    });

    // Sector detection
    const sectors = ['agriculture', 'education', 'health', 'infrastructure', 'environment', 'technology', 'women'];
    sectors.forEach(sector => {
      if (lower.includes(sector)) {
        entities.sectors.push({ name: sector, confidence: 0.8 });
      }
    });

    // Amount detection
    const amountPatterns = [/₹(\d+(?:\.\d+)?)/gi, /(\d+(?:\.\d+)?)\s*lakh/gi, /(\d+(?:\.\d+)?)\s*crore/gi];
    amountPatterns.forEach(pattern => {
      const matches = message.match(pattern);
      if (matches) {
        entities.amounts.push(...matches.map(match => ({ value: match, confidence: 0.8 })));
      }
    });

    return entities;
  }

  // Advanced sentiment analysis
  analyzeSentiment(message) {
    const lower = message.toLowerCase();
    
    const positiveWords = ['good', 'great', 'excellent', 'helpful', 'thank', 'appreciate', 'love', 'amazing'];
    const negativeWords = ['bad', 'terrible', 'confusing', 'frustrated', 'annoyed', 'problem', 'hate', 'awful'];
    
    const positiveScore = positiveWords.filter(word => lower.includes(word)).length;
    const negativeScore = negativeWords.filter(word => lower.includes(word)).length;
    
    let overall = 'neutral';
    if (positiveScore > negativeScore) overall = 'positive';
    else if (negativeScore > positiveScore) overall = 'negative';

    return {
      overall,
      positive: positiveScore,
      negative: negativeScore,
      confidence: Math.min((positiveScore + negativeScore) / 5, 1)
    };
  }

  // Advanced urgency detection
  detectUrgency(message) {
    const lower = message.toLowerCase();
    
    const urgentWords = ['urgent', 'asap', 'immediately', 'emergency', 'critical'];
    const highWords = ['quickly', 'soon', 'priority', 'important', 'fast'];
    const mediumWords = ['when you can', 'eventually', 'no rush'];
    
    let level = 'low';
    let score = 0;
    
    if (urgentWords.some(word => lower.includes(word))) {
      level = 'critical';
      score = 100;
    } else if (highWords.some(word => lower.includes(word))) {
      level = 'high';
      score = 75;
    } else if (mediumWords.some(word => lower.includes(word))) {
      level = 'medium';
      score = 50;
    }

    return { level, score, confidence: Math.min(score / 100, 1) };
  }

  // Extract conversation topics
  extractTopics(message) {
    const topics = new Set();
    const lower = message.toLowerCase();
    
    if (lower.includes('grant') || lower.includes('scheme')) topics.add('grants');
    if (lower.includes('health') || lower.includes('medical')) topics.add('healthcare');
    if (lower.includes('education') || lower.includes('student')) topics.add('education');
    if (lower.includes('agriculture') || lower.includes('farmer')) topics.add('agriculture');
    if (lower.includes('apply') || lower.includes('application')) topics.add('application_process');
    
    return Array.from(topics);
  }

  // Update session insights
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

  // Generate advanced response with reasoning
  generateAdvancedResponse(message, context = {}, retrievedGrants = []) {
    const intent = this.classifyIntent(message);
    const entities = this.extractEntities(message);
    const sentiment = this.analyzeSentiment(message);
    const urgency = this.detectUrgency(message);
    
    const comprehensiveContext = {
      intent,
      entities,
      sentiment,
      urgency,
      retrievedGrants,
      conversationHistory: this.conversationMemory.shortTerm,
      userProfile: context.profile || {}
    };

    // Select optimal response strategy
    const strategy = this.selectResponseStrategy(comprehensiveContext);
    
    // Generate contextual response
    return this.generateContextualResponse(strategy, comprehensiveContext);
  }

  // Select optimal response strategy
  selectResponseStrategy(context) {
    const strategies = {
      direct_answer: { weight: 0 },
      clarification: { weight: 0 },
      step_by_step: { weight: 0 },
      comparison: { weight: 0 },
      recommendation: { weight: 0 }
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
        strategies.clarification.weight = 70;
        break;
      case 'comparison':
        strategies.comparison.weight = 100;
        strategies.elaboration.weight = 70;
        break;
      case 'recommendation':
        strategies.recommendation.weight = 100;
        strategies.direct_answer.weight = 80;
        break;
      default:
        strategies.direct_answer.weight = 80;
        strategies.recommendation.weight = 60;
    }

    // Contextual adjustments
    if (context.sentiment.overall === 'negative') {
      strategies.clarification.weight += 30;
      strategies.elaboration.weight += 20;
    }

    if (context.urgency.level === 'critical' || context.urgency.level === 'high') {
      strategies.direct_answer.weight += 30;
      strategies.step_by_step.weight += 20;
    }

    if (context.intent.confidence < 0.6) {
      strategies.clarification.weight += 40;
    }

    // Select best strategy
    const bestStrategy = Object.entries(strategies)
      .reduce((best, [name, data]) => data.weight > best.weight ? { name, ...data } : best, 
              { name: 'direct_answer', weight: 0 });

    return bestStrategy.name;
  }

  // Generate contextual response
  generateContextualResponse(strategy, context) {
    const responses = {
      direct_answer: () => this.generateDirectAnswer(context),
      clarification: () => this.generateClarification(context),
      step_by_step: () => this.generateStepByStep(context),
      comparison: () => this.generateComparison(context),
      recommendation: () => this.generateRecommendation(context)
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

  // Utility method for grant recommendations
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

// Simple grant matcher class
class AdvancedGrantMatcher {
  constructor(grants) {
    this.grants = grants;
  }

  findBestGrants(query, limit = 4) {
    const lower = query.toLowerCase();
    const matches = this.grants.filter(grant => 
      grant.name.toLowerCase().includes(lower) ||
      grant.description.toLowerCase().includes(lower) ||
      grant.sector.toLowerCase().includes(lower) ||
      grant.keywords.some(keyword => lower.includes(keyword.toLowerCase()))
    );
    return matches.slice(0, limit);
  }

  analyzeUserProfile(message, currentProfile) {
    const profile = { ...currentProfile };
    const lower = message.toLowerCase();
    
    if (lower.includes('farmer') || lower.includes('agriculture')) {
      profile.occupation = 'farmer';
      profile.location = 'rural';
    } else if (lower.includes('student') || lower.includes('education')) {
      profile.occupation = 'student';
    } else if (lower.includes('woman') || lower.includes('female')) {
      profile.gender = 'female';
    }
    
    return profile;
  }
}

// Enhanced ChatGPT-Level ChatBot Component
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Grant Assistant. How can I help you find information about government grants and schemes today?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: ["Check my eligibility", "Browse available grants", "Tell me about health schemes"]
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [fastMode, setFastMode] = useState(true);
  const [conversationMode, setConversationMode] = useState('intelligent');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Initialize ultra-intelligent conversation engine
  const conversationEngine = useRef(new UltraIntelligentConversationEngine());

  // Initialize grant matcher (existing)
  const grantMatcher = useRef(new AdvancedGrantMatcher(GRANTS));

  // Mobile detection and responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-IN';
        
        recognitionInstance.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
        };
        
        recognitionInstance.onerror = () => {
          setIsListening(false);
          alert("Voice recognition error. Please try again.");
        };
        
        recognitionInstance.onend = () => {
          setIsListening(false);
        };
        
        setRecognition(recognitionInstance);
      }
    }
  }, []);

  // Voice input toggle
  const toggleVoiceInput = useCallback(() => {
    if (!recognition) {
      alert("Voice recognition not supported in this browser. Please try Chrome or Edge.");
      return;
    }
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognition.start();
    }
  }, [recognition, isListening]);

  // Enhanced scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end"
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === 'v') {
        event.preventDefault();
             }
      
      toggleVoiceInput();
 if (event.altKey && event.key === 't') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }

      if (event.altKey && event.key === 'c') {
        event.preventDefault();
        const modes = ['intelligent', 'detailed', 'quick'];
        const currentIndex = modes.indexOf(conversationMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        setConversationMode(modes[nextIndex]);
      }
      
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleVoiceInput, conversationMode]);

  // Enhanced typing animation
  const typeText = useCallback((text, callback) => {
    setIsTyping(true);
    setCurrentTypingText("");
    let index = 0;
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setCurrentTypingText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setCurrentTypingText("");
        callback?.();
      }
    }, conversationMode === 'quick' ? 5 : 10);
  }, [conversationMode]);

  // Ultra-intelligent message handling
  const handleSend = useCallback(async (text = inputValue) => {
    if (!text.trim()) return;

    const userMsg = { 
      id: Date.now(), 
      text, 
      sender: "user", 
      timestamp: new Date(),
      type: "user-message"
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(false);

    // Casual greeting responses
    const lowerText = text.toLowerCase();
    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
      setTimeout(() => {
        const instantResponse = {
          id: Date.now() + 1,
          text: `Hello! How can I assist you with government grants and schemes today?`,
          sender: 'bot',
          suggestions: ["Check my eligibility", "Browse available grants", "Tell me about health schemes"],
          timestamp: new Date(),
          type: "bot-message"
        };
        setMessages(prev => [...prev, instantResponse]);
        setIsLoading(false);
      }, 50);
      return;
    }

    if (lowerText.includes('thank') || lowerText.includes('thanks')) {
      setTimeout(() => {
        const thanksResponse = {
          id: Date.now() + 1,
          text: `😊 **You're very welcome!** \n\nI'm designed to provide intelligent, contextual assistance. Each conversation helps me understand you better and provide more personalized recommendations.\n\n**Is there anything else you'd like to explore or understand better?**`,
          sender: 'bot',
          suggestions: ["More Complex Queries", "How You Work", "Advanced Features", "Different Scenarios"],
          timestamp: new Date(),
          type: "bot-message"
        };
        setMessages(prev => [...prev, thanksResponse]);
        setIsLoading(false);
      }, 50);
      return;
    }

    // Update user profile
    const newProfile = grantMatcher.current.analyzeUserProfile(text, userProfile);
    setUserProfile(newProfile);

    try {
      // Enhanced API call with conversation context
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text, 
          history: messages.slice(-6).map(m => ({ sender: m.sender, text: m.text })),
          profile: newProfile,
          conversationMode: conversationMode
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data?.reply) {
          const botMsg = {
            id: Date.now() + 1,
            text: data.reply,
            sender: 'bot',
            suggestions: data.suggestions || generateEnhancedSuggestions(text, newProfile),
            timestamp: new Date(),
            type: "bot-message"
          };
          setMessages(prev => [...prev, botMsg]);
          setIsLoading(false);
          return;
        }
      }
      
      throw new Error('Remote AI unavailable');
    } catch (error) {
      // Ultra-intelligent fallback with advanced reasoning
      const retrievedGrants = grantMatcher.current.findBestGrants(text, 4);
      const aiResponse = conversationEngine.current.generateAdvancedResponse(text, { profile: newProfile }, retrievedGrants);
      
      const botMsg = {
        id: Date.now() + 1,
        text: aiResponse.text + `\n\n🧠 *(Ultra-intelligent local AI response)*`,
        sender: 'bot',
        suggestions: aiResponse.suggestions,
        timestamp: new Date(),
        type: "bot-message",
        reasoning: aiResponse.reasoning
      };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);
    }
  }, [inputValue, messages, userProfile, conversationMode]);

  // Generate enhanced suggestions
  const generateEnhancedSuggestions = useCallback((message, profile) => {
    const suggestions = [];
    const lower = message.toLowerCase();
    
    if (lower.includes('eligibility')) {
      suggestions.push("Explain eligibility criteria", "Check specific requirements", "Compare with similar schemes");
    } else if (lower.includes('apply')) {
      suggestions.push("Step-by-step process", "Required documents", "Application deadlines");
    } else if (lower.includes('compare')) {
      suggestions.push("Side-by-side comparison", "Pros and cons", "Which is better for me?");
    } else {
      suggestions.push("More details", "Related schemes", "Application guidance");
    }
    
    suggestions.push("What-if scenarios", "Expert advice", "Complex queries");
    return suggestions.slice(0, 4);
  }, []);

  // Enhanced suggestion handling
  const handleSuggestion = useCallback((suggestion) => {
    const navigationMap = {
      "View Dashboard": "/chart",
      "Submit Feedback": "/suggestions", 
      "About Us": "/about"
    };

    if (navigationMap[suggestion]) {
      const route = navigationMap[suggestion];
      if (route.startsWith('/')) {
        navigate(route);
      } else {
        handleSend(suggestion);
      }
    } else {
      handleSend(suggestion);
    }
  }, [navigate, handleSend]);

  // Enhanced text formatting
  const formatText = useCallback((text) => {
    const parts = [];
    let lastIndex = 0;
    
    const regex = /\*\*([^*]+)\*\*|•|(\n)|`([^`]+)`/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const textPart = text.substring(lastIndex, match.index);
        parts.push(
          <span key={`text-${match.index}`} style={{ animation: 'fadeIn 0.3s ease-in' }}>
            {textPart}
          </span>
        );
      }

      if (match[1]) {
        parts.push(
          <strong 
            key={`bold-${match.index}`} 
            style={{ 
              color: "#06b6d4",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {match[1]}
          </strong>
        );
      } else if (match[3]) {
        parts.push(
          <code 
            key={`code-${match.index}`}
            style={{
              background: "rgba(6, 182, 212, 0.1)",
              padding: "2px 4px",
              borderRadius: "4px",
              fontFamily: "monospace",
              fontSize: "0.9em",
              color: "#06b6d4"
            }}
          >
            {match[3]}
          </code>
        );
      } else if (match[0] === "\n") {
        parts.push(<br key={`br-${match.index}`} />);
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex)}
        </span>
      );
    }

    return parts;
  }, []);

  return (
    <>
      {/* Enhanced Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          bottom: "clamp(15px, 4vw, 25px)",
          right: "clamp(15px, 4vw, 25px)",
          width: "clamp(56px, 12vw, 72px)",
          height: "clamp(56px, 12vw, 72px)",
          borderRadius: "50%",
          background: isOpen
            ? "linear-gradient(135deg, #ff6b6b, #ee5a52)"
            : "linear-gradient(135deg, #667eea, #764ba2)",
          border: "3px solid rgba(255, 255, 255, 0.2)",
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          animation: !isOpen ? "float 3s ease-in-out infinite" : "none",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          touchAction: "manipulation",
          userSelect: "none",
          WebkitUserSelect: "none"
        }}
      >
        {isOpen ? (
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: "12px", 
            background: "rgba(255,255,255,0.2)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            color: "#fff", 
            fontSize: 20,
            fontWeight: "bold"
          }}>
            ✕
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            <img 
              src={santaImg} 
              alt="Ultra-Intelligent AI Assistant" 
              style={{ 
                width: 52, 
                height: 52, 
                borderRadius: "50%", 
                animation: "bounce 2s infinite"
              }} 
            />
            <div style={{
              position: "absolute",
              top: -3,
              right: -3,
              width: 20,
              height: 20,
              background: "linear-gradient(135deg, #51cf66, #40c057)",
              borderRadius: "50%",
              border: "3px solid white",
              animation: "pulse 1.5s infinite"
            }}>
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 6,
                height: 6,
                background: "white",
                borderRadius: "50%",
                animation: "blink 1s infinite"
              }} />
            </div>
            <div style={{
              position: "absolute",
              bottom: -3,
              left: -3,
              width: 16,
              height: 16,
              background: "linear-gradient(135deg, #ffd43b, #fab005)",
              borderRadius: "50%",
              border: "2px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8px",
              fontWeight: "bold",
              color: "#fff"
            }}>
              🧠
            </div>
          </div>
        )}
      </button>

      {/* Improved Responsive Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat Assistant"
          aria-modal="false"
          style={{
            position: "fixed",
            bottom: "clamp(80px, 20vh, 120px)",
            right: "clamp(10px, 4vw, 25px)",
            left: isMobile ? "10px" : "auto",
            width: isMobile
              ? "calc(100vw - 20px)"
              : "clamp(320px, 90vw, 420px)",
            height: "clamp(400px, 70vh, 600px)",
            maxHeight: "85vh",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.98))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "clamp(12px, 3vw, 20px)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            animation: "slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            overflow: "hidden",
            touchAction: "manipulation",
            userSelect: "none",
            WebkitUserSelect: "none"
          }}
        >
          {/* Modern Clean Header */}
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)"
              }}>
                🤖
              </div>
              <div>
                <h3 style={{
                  margin: 0,
                  color: "#1e293b",
                  fontSize: "16px",
                  fontWeight: "600",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  Grant Assistant
                </h3>
                <p style={{
                  margin: "4px 0 0 0",
                  color: "#64748b",
                  fontSize: "12px",
                  fontWeight: "400"
                }}>
                  {isListening ? "🎤 Listening..." : "💡 Ready to help"}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#10b981",
                animation: "pulse 2s infinite"
              }} />
              <span style={{
                color: "#10b981",
                fontSize: "11px",
                fontWeight: "500"
              }}>
                Online
              </span>
            </div>
          </div>

          {/* Enhanced Messages Container */}
          <div style={{ 
            flex: 1, 
            overflowY: "auto", 
            padding: "16px", 
            display: "flex", 
            flexDirection: "column", 
            gap: "12px"
          }}>
            {messages.map(msg => (
              <div 
                key={msg.id} 
                style={{ 
                  display: "flex", 
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  animation: "slideIn 0.3s ease-out"
                }}
              >
                <div style={{
                  maxWidth: "85%",
                  padding: "14px 18px",
                  borderRadius: msg.sender === "user"
                    ? "20px 4px 20px 20px"
                    : "4px 20px 20px 20px",
                  background: msg.sender === "user"
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : "linear-gradient(135deg, rgba(241, 245, 249, 0.9), rgba(241, 245, 249, 0.7))",
                  color: msg.sender === "user" ? "#ffffff" : "#1e293b",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  wordWrap: "break-word",
                  boxShadow: msg.sender === "user"
                    ? "0 4px 12px rgba(99, 102, 241, 0.3)"
                    : "0 2px 8px rgba(0, 0, 0, 0.08)",
                  border: msg.sender === "user"
                    ? "none"
                    : "1px solid rgba(148, 163, 184, 0.1)"
                }}>
                  <div style={{ animation: "fadeIn 0.4s ease-in" }}>
                    {formatText(msg.text)}
                  </div>
                  
                  {msg.reasoning && (
                    <div style={{
                      marginTop: "6px",
                      padding: "4px 8px",
                      background: "rgba(6, 182, 212, 0.1)",
                      borderRadius: "6px",
                      fontSize: "10px",
                      color: "#06b6d4",
                      fontStyle: "italic"
                    }}>
                      💭 {msg.reasoning}
                    </div>
                  )}
                  
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div style={{ 
                      marginTop: "8px", 
                      display: "flex", 
                      flexDirection: "column", 
                      gap: "6px"
                    }}>
                      {msg.suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestion(s)}
                          style={{
                            padding: "6px 10px",
                            background: "rgba(6, 182, 212, 0.15)",
                            border: "1px solid rgba(6, 182, 212, 0.4)",
                            borderRadius: "6px",
                            color: "#06b6d4",
                            fontSize: "11px",
                            cursor: "pointer",
                            textAlign: "left",
                            transition: "all 0.2s ease"
                          }}
                        >
                          → {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {(isLoading || isTyping) && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "12px 16px",
                  borderRadius: "0 18px 18px 18px",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#06b6d4"
                }}>
                  {isLoading ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: 16,
                        height: 16,
                        border: "2px solid rgba(6, 182, 212, 0.3)",
                        borderTop: "2px solid #06b6d4",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite"
                      }} />
                      🧠 Ultra-intelligent AI processing...
                    </div>
                  ) : (
                    <div>
                      {currentTypingText}
                      <span style={{ animation: "blink 1s infinite" }}>|</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Mobile-Friendly Input Section */}
          <div style={{ 
            padding: isMobile ? "8px" : "12px", 
            borderTop: "1px solid rgba(255, 255, 255, 0.1)", 
            display: "flex", 
            gap: isMobile ? "6px" : "8px",
            background: "rgba(15, 23, 42, 0.8)",
            paddingBottom: isMobile ? "12px" : "12px"
          }}>
            <div style={{ position: "relative", flex: 1 }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder={isMobile ? "Type your question..." : "Ask me anything about grants..."}
                aria-label="Chat input field"
                style={{
                  width: "100%",
                  padding: isMobile ? "12px 40px 12px 12px" : "10px 36px 10px 12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(6, 182, 212, 0.2)",
                  borderRadius: isMobile ? "12px" : "10px",
                  color: "#e5e7eb",
                  fontSize: isMobile ? "16px" : "13px",
                  outline: "none",
                  WebkitAppearance: "none",
                  appearance: "none",
                  touchAction: "manipulation"
                }}
              />
              
              <button
                onClick={toggleVoiceInput}
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
                style={{
                  position: "absolute",
                  right: isMobile ? "8px" : "6px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: isListening 
                    ? "linear-gradient(135deg, #ff6b6b, #ee5a52)" 
                    : "rgba(6, 182, 212, 0.1)",
                  border: `1px solid ${isListening ? '#ff6b6b' : '#06b6d4'}`,
                  color: isListening ? "#fff" : "#06b6d4",
                  padding: isMobile ? "8px" : "4px",
                  borderRadius: "50%",
                  width: isMobile ? "32px" : "28px",
                  height: isMobile ? "32px" : "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  touchAction: "manipulation"
                }}
              >
                🎤
              </button>
            </div>
            
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              aria-label="Send message"
              style={{
                padding: isMobile ? "12px 16px" : "10px 16px",
                background: inputValue.trim() 
                  ? "linear-gradient(135deg, #06b6d4, #a855f7)" 
                  : "rgba(6, 182, 212, 0.2)",
                border: "none",
                borderRadius: isMobile ? "12px" : "10px",
                color: "#fff",
                cursor: inputValue.trim() ? "pointer" : "not-allowed",
                minWidth: isMobile ? "48px" : "40px",
                fontSize: isMobile ? "16px" : "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                touchAction: "manipulation"
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
      
      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* Mobile-specific styles */
        @media (max-width: 768px) {
          .chatbot-input {
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
        }
      `}</style>
    </>
  );
}
