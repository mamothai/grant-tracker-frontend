import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import santaImg from "../assets/santa.svg";
import { GRANTS } from "../data/grants";

// Ultra-fast Grant Matching with Caching
class GrantMatcher {
  constructor(grants) {
    this.grants = grants;
    this.userProfile = {
      occupations: new Set(),
      locations: new Set(),
      needs: new Set(),
      previousQueries: []
    };
    // Cache for performance
    this.searchCache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
  }

  // Semantic similarity scoring using word embeddings concept
  calculateSemanticScore(grant, query) {
    const q = query.toLowerCase();
    let score = 0;
    
    // Exact matches (highest weight)
    if (grant.name.toLowerCase() === q) score += 1000;
    if (grant.name.toLowerCase().includes(q)) score += 500;
    
    // Keyword semantic matching
    const queryWords = q.split(/\s+/);
    grant.keywords.forEach(keyword => {
      const k = keyword.toLowerCase();
      // Exact keyword match
      if (q.includes(k)) score += 300;
      
      // Partial word matching
      queryWords.forEach(word => {
        if (word.length > 2 && (k.includes(word) || word.includes(k))) {
          score += 150;
        }
      });
      
      // Synonyms and related terms
      if (this.isRelatedTerm(word, k)) score += 100;
    });
    
    // Sector semantic matching
    if (grant.sector.toLowerCase().includes(q)) score += 250;
    
    // Description semantic matching
    const descMatches = this.countSemanticMatches(grant.description, q);
    score += descMatches * 50;
    
    // Details matching
    const detailMatches = this.countSemanticMatches(grant.details, q);
    score += detailMatches * 30;
    
    return score;
  }

  isRelatedTerm(word1, word2) {
    // Simple synonym/related term mapping
    const related = {
      'farmer': ['agriculture', 'crop', 'farming', 'kisan', 'rural'],
      'student': ['education', 'school', 'college', 'study', 'scholarship'],
      'woman': ['women', 'female', 'girl', 'mother', 'empowerment'],
      'health': ['medical', 'hospital', 'treatment', 'insurance', 'care'],
      'money': ['cash', 'financial', 'income', 'support', 'assistance'],
      'help': ['support', 'assistance', 'aid', 'benefit', 'scheme'],
      'poor': ['low income', 'bpl', 'weaker', 'economically', 'destitute']
    };
    
    for (const [key, values] of Object.entries(related)) {
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
      }
    });
    
    return matches;
  }

  // Enhanced user profile analysis
  analyzeUserProfile(message, previousProfile = {}) {
    const profile = { ...previousProfile };
    const q = message.toLowerCase();
    
    // Occupation detection with confidence scoring
    const occupations = {
      farmer: ['farmer', 'agriculture', 'crop', 'farming', 'kisan', 'village'],
      student: ['student', 'study', 'school', 'college', 'university', 'education'],
      teacher: ['teacher', 'professor', 'educator', 'instructor'],
      doctor: ['doctor', 'physician', 'medical', 'hospital'],
      engineer: ['engineer', 'technical', 'construction'],
      business: ['business', 'entrepreneur', 'company', 'startup'],
      worker: ['worker', 'employee', 'labor', 'job']
    };
    
    let maxScore = 0;
    let detectedOccupation = null;
    
    for (const [occ, keywords] of Object.entries(occupations)) {
      const score = keywords.reduce((acc, keyword) => 
        acc + (q.includes(keyword) ? 1 : 0), 0);
      if (score > maxScore) {
        maxScore = score;
        detectedOccupation = occ;
      }
    }
    
    if (detectedOccupation) {
      profile.occupation = detectedOccupation;
      this.userProfile.occupations.add(detectedOccupation);
    }
    
    // Location detection
    if (q.includes('rural') || q.includes('village') || q.includes('countryside')) {
      profile.location = 'rural';
      this.userProfile.locations.add('rural');
    } else if (q.includes('urban') || q.includes('city') || q.includes('town')) {
      profile.location = 'urban';
      this.userProfile.locations.add('urban');
    }
    
    // Family situation
    if (q.includes('child') || q.includes('children') || q.includes('kid') || q.includes('family')) {
      profile.hasFamily = true;
    }
    
    // Income level inference
    if (q.includes('poor') || q.includes('low income') || q.includes('bpl') || q.includes('weaker')) {
      profile.income = 'low';
    } else if (q.includes('middle class') || q.includes('comfortable')) {
      profile.income = 'middle';
    }
    
    // Gender detection
    if (q.includes('woman') || q.includes('women') || q.includes('female') || q.includes('mother')) {
      profile.gender = 'female';
    } else if (q.includes('man') || q.includes('men') || q.includes('male') || q.includes('father')) {
      profile.gender = 'male';
    }
    
    // Needs analysis
    const needs = ['money', 'financial help', 'support', 'assistance', 'benefit', 'scheme', 'loan', 'grant'];
    needs.forEach(need => {
      if (q.includes(need)) {
        profile.needs = profile.needs || new Set();
        profile.needs.add(need);
        this.userProfile.needs.add(need);
      }
    });
    
    return profile;
  }

  // Ultra-fast grant finding with intelligent caching
  findBestGrants(query, limit = 5) {
    const cacheKey = `${query.toLowerCase()}_${limit}`;
    const now = Date.now();
    
    // Check cache first
    if (this.searchCache.has(cacheKey)) {
      const cached = this.searchCache.get(cacheKey);
      if (now - cached.timestamp < this.cacheExpiry) {
        return cached.results;
      }
    }
    
    // Optimized scoring with early exits
    const scored = [];
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
    
    for (const grant of this.grants) {
      let score = 0;
      const grantName = grant.name.toLowerCase();
      const grantDesc = grant.description.toLowerCase();
      
      // Fast exact matches
      if (grantName === queryLower) score += 1000;
      else if (grantName.includes(queryLower)) score += 500;
      
      // Quick sector match
      if (grant.sector.toLowerCase().includes(queryLower)) score += 250;
      
      // Fast keyword matching
      for (const keyword of grant.keywords) {
        const k = keyword.toLowerCase();
        if (queryLower.includes(k)) score += 300;
        
        // Word-level matching
        for (const word of queryWords) {
          if (k.includes(word) || word.includes(k)) {
            score += 150;
            break;
          }
        }
        
        // Early exit for high scores
        if (score > 600) break;
      }
      
      // Text matching
      if ((grantDesc.includes(queryLower)) || 
          (queryWords.some(word => grantDesc.includes(word)))) {
        score += 100;
      }
      
      if (score > 0) {
        scored.push({ grant, score });
      }
    }
    
    // Fast sorting and limiting
    scored.sort((a, b) => b.score - a.score);
    const results = scored.slice(0, limit).map(x => x.grant);
    
    // Cache results
    this.searchCache.set(cacheKey, {
      results,
      timestamp: now
    });
    
    return results;
  }

  // Personalized recommendations based on user profile
  getPersonalizedRecommendations(profile, limit = 3) {
    let recommendations = [];
    
    if (profile.occupation) {
      const occGrants = this.grants.filter(g => 
        g.keywords.some(k => 
          this.isRelatedTerm(profile.occupation, k) || 
          g.description.toLowerCase().includes(profile.occupation)
        )
      );
      recommendations = [...occGrants];
    }
    
    if (profile.location === 'rural') {
      const ruralGrants = this.grants.filter(g => 
        g.keywords.includes('rural') || 
        g.name.toLowerCase().includes('gram') ||
        g.description.toLowerCase().includes('rural')
      );
      recommendations = [...recommendations, ...ruralGrants];
    }
    
    if (profile.gender === 'female') {
      const womenGrants = this.grants.filter(g => 
        g.keywords.includes('women') || 
        g.keywords.includes('woman') ||
        g.sector === 'Women & Child'
      );
      recommendations = [...recommendations, ...womenGrants];
    }
    
    // Remove duplicates and sort by relevance
    const unique = recommendations.filter((grant, index, self) => 
      index === self.findIndex(g => g.id === grant.id)
    );
    
    return unique.slice(0, limit);
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 **Welcome to GrantTracker AI!** 🤖\n\nI'm your intelligent grant discovery assistant, powered by advanced AI that understands your needs and helps you find the perfect government schemes.\n\n🎯 **What makes me special:**\n• **Smart Matching**: I analyze your profile to find relevant grants\n• **Personalized Recommendations**: Tailored suggestions based on your situation\n• **Instant Answers**: Get detailed information about any scheme\n• **Smart Search**: Find grants by name, sector, or benefit type\n\n💡 **Try asking me:**\n• \"I'm a farmer, what grants am I eligible for?\"\n• \"Tell me about health insurance schemes\"\n• \"Which schemes provide financial assistance?\"\n• \"Show me women empowerment programs\"\n\n**What would you like to explore today?**",
      sender: "bot",
      timestamp: new Date(),
      suggestions: ["Check My Eligibility", "Browse All Grants", "Health Programs"]
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
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [fastMode, setFastMode] = useState(true);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // Initialize grant matcher
  const grantMatcher = useRef(new GrantMatcher(GRANTS));

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

  // Enhanced scroll to bottom with smooth animation
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

  // Keyboard shortcuts and accessibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Alt + V for voice input
      if (event.altKey && event.key === 'v') {
        event.preventDefault();
        toggleVoiceInput();
      }
      
      // Alt + T to toggle chat
      if (event.altKey && event.key === 't') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
      
      // Escape to close chat
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleVoiceInput]);

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
    }, 8); // Ultra-fast typing speed (20ms -> 8ms)
  }, []);

  // Enhanced response generation with AI-like intelligence
  const generateEnhancedResponse = useCallback((message, profile = userProfile) => {
    const lower = message.toLowerCase();
    const query = message.trim();
    
    // Enhanced pattern recognition
    const patterns = {
      isQuestion: /\?|what|how|which|can|will|would|should|where|when|why/i.test(query),
      isEligibility: /eligible|qualify|am i|can i|eligibility|who can|what are/i.test(lower),
      isGrantSearch: /grant|scheme|program|benefit|support|assistance|help/i.test(lower),
      isAbout: /about|what is|explain|tell me|purpose|function/i.test(lower),
      isComparison: /compare|difference|vs|versus|better|best/i.test(lower),
      isStatistics: /how many|total|statistics|overview|summary|count/i.test(lower)
    };

    // Advanced profile-based responses
    if (patterns.isEligibility && Object.keys(profile).length > 0) {
      const recommendations = grantMatcher.current.getPersonalizedRecommendations(profile);
      let text = `🎯 **Based on your profile, here are your best matches:**\n\n`;
      
      if (recommendations.length > 0) {
        recommendations.forEach((grant, index) => {
          text += `**${index + 1}. ${grant.name}** (${grant.sector})\n`;
          text += `💰 **Benefit:** ${grant.amount}\n`;
          text += `📝 **Description:** ${grant.description}\n\n`;
        });
        
        text += `**Personalized for you because:**\n`;
        if (profile.occupation) text += `• Your profession: ${profile.occupation}\n`;
        if (profile.location) text += `• Your location: ${profile.location}\n`;
        if (profile.gender) text += `• Your profile: ${profile.gender}\n`;
        
        return {
          text,
          suggestions: ["More Details", "Other Sectors", "Check Different Profile"]
        };
      }
    }

    // Smart grant search with semantic matching
    if (patterns.isGrantSearch) {
      const matchingGrants = grantMatcher.current.findBestGrants(query, 4);
      
      if (matchingGrants.length > 0) {
        let text = `🔍 **Found ${matchingGrants.length} relevant grants for you:**\n\n`;
        
        matchingGrants.forEach((grant, index) => {
          text += `**${index + 1}. ${grant.name}**\n`;
          text += `📊 **Sector:** ${grant.sector}\n`;
          text += `💰 **Benefit:** ${grant.amount}\n`;
          text += `🎯 **Coverage:** ${grant.coverage}\n`;
          text += `📝 **Details:** ${grant.description}\n\n`;
        });
        
        text += `**Want to know more about any specific scheme?**`;
        
        return {
          text,
          suggestions: matchingGrants.slice(0, 2).map(g => `About ${g.name.split(" ")[0]}`)
        };
      }
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

      let text = `📊 **GrantTracker Intelligence Report**\n\n`;
      text += `🎯 **Total Active Programs:** ${GRANTS.length}\n`;
      text += `👥 **Estimated Beneficiaries:** ${totalBeneficiaries} crore+ people\n`;
      text += `💰 **Total Investment:** ₹${(totalBeneficiaries * 0.5).toFixed(0)} lakh crores+\n\n`;
      text += `**📈 Sector Breakdown:**\n`;
      
      Object.entries(sectors).forEach(([sector, count]) => {
        const percentage = ((count / GRANTS.length) * 100).toFixed(1);
        text += `• ${sector}: ${count} programs (${percentage}%)\n`;
      });

      return {
        text,
        suggestions: ["Most Popular Sector", "Recent Schemes", "High Value Programs"]
      };
    }

    // Sector-specific intelligent responses
    const sectors = ["Agriculture", "Education", "Health", "Infrastructure", "Environment", "Technology", "Women & Child"];
    for (const sector of sectors) {
      if (lower.includes(sector.toLowerCase())) {
        const sectorGrants = GRANTS.filter(g => g.sector === sector);
        const avgBenefit = sectorGrants.reduce((sum, g) => {
          const amount = g.amount.match(/₹?(\d+(?:\.\d+)?)/);
          return sum + (amount ? parseFloat(amount[1]) : 0);
        }, 0) / sectorGrants.length;

        let text = `🌟 **${sector.toUpperCase()} SECTOR - ${sectorGrants.length} Elite Programs**\n\n`;
        text += `💰 **Average Benefit Value:** ₹${avgBenefit.toFixed(0)}\n`;
        text += `🎯 **Coverage:** ${sectorGrants[0]?.coverage || 'National'}\n\n`;
        
        sectorGrants.forEach((grant, i) => {
          text += `**${i + 1}. ${grant.name}**\n`;
          text += `   💸 Benefit: ${grant.amount}\n`;
          text += `   📊 Beneficiaries: ${grant.beneficiaries}\n`;
          text += `   📝 ${grant.description}\n\n`;
        });

        return {
          text,
          suggestions: sectorGrants.slice(0, 3).map(g => `Learn: ${g.name.split(" ")[0]}`)
        };
      }
    }

    // About website with enhanced details
    if (patterns.isAbout) {
      return {
        text: `🚀 **GrantTracker AI - Next Generation Grant Discovery Platform**\n\n` +
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

    // Default intelligent response
    const contextualGrants = grantMatcher.current.findBestGrants(query, 2);
    let text = `🤖 **I'm your AI Grant Discovery Assistant!**\n\n`;
    text += `I understand you're asking about: **"${message}"**\n\n`;
    
    if (contextualGrants.length > 0) {
      text += `**🔍 Based on your query, I found:**\n`;
      contextualGrants.forEach((grant, i) => {
        text += `• ${grant.name} (${grant.sector}) - ${grant.amount}\n`;
      });
      text += `\n**💡 Try asking more specifically:**\n`;
    }
    
    text += `• "What grants am I eligible for?"\n` +
            `• "Show me [sector] programs"\n` +
            `• "Tell me about [scheme name]"\n` +
            `• "Which schemes provide financial help?"\n\n` +
            `**What would you like to explore?**`;

    return {
      text,
      suggestions: ["Find My Grants", "Browse Sectors", "Get General Help"]
    };
  }, [userProfile]);

  // Lightning-fast message handling
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

    // Instant response for simple queries
    const lowerText = text.toLowerCase();
    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
      setTimeout(() => {
        const instantResponse = {
          id: Date.now() + 1,
          text: `👋 **Hello! I'm your Lightning-Fast GrantTracker AI!**\n\nI can instantly help you find government grants and schemes. Try asking:\n• "What grants am I eligible for?"\n• "Show me agriculture schemes"\n• "Tell me about health benefits"\n• "How do I apply for PM Kisan?"\n\n**What would you like to explore?**`,
          sender: 'bot',
          suggestions: ["Check Eligibility", "Browse Grants", "Health Programs"],
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
          text: `😊 **You're very welcome!** \n\nI'm here 24/7 to help you discover government grants and benefits. Feel free to ask me anything about eligibility, applications, or scheme details.\n\n**What else can I help you with today?**`,
          sender: 'bot',
          suggestions: ["More Help", "Browse All", "Get Started"],
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
      // Try remote AI first with faster timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200); // 1.2 second timeout
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text, 
          history: messages.slice(-4).map(m => ({ sender: m.sender, text: m.text })),
          profile: newProfile
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
            suggestions: data.suggestions || generateEnhancedResponse(text, newProfile).suggestions,
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
      // Instant fallback to enhanced local response
      const local = generateEnhancedResponse(text, newProfile);
      const botMsg = {
        id: Date.now() + 1,
        text: local.text + (error.name === 'AbortError' ? `\n\n⚡ *(Fast local AI response)*` : `\n\n🤖 *(Using local AI)*`),
        sender: 'bot',
        suggestions: local.suggestions,
        timestamp: new Date(),
        type: "bot-message"
      };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);
    }
  }, [inputValue, messages, userProfile, generateEnhancedResponse]);

  // Enhanced suggestion handling with navigation
  const handleSuggestion = useCallback((suggestion) => {
    const navigationMap = {
      "View Dashboard": "/chart",
      "Submit Feedback": "/suggestions", 
      "About Us": "/about",
      "Check My Eligibility": "eligibility_check",
      "Browse All Grants": "browse_all",
      "Health Programs": "health_sector",
      "Agriculture Grants": "agriculture_sector",
      "View All Programs": "browse_all",
      "Start Discovery": "start_discovery",
      "Take Tour": "guided_tour"
    };

    if (navigationMap[suggestion]) {
      const route = navigationMap[suggestion];
      if (route.startsWith('/')) {
        navigate(route);
      } else {
        // Handle special actions
        handleSend(suggestion);
      }
    } else {
      handleSend(suggestion);
    }
  }, [navigate, handleSend]);

  // Enhanced text formatting with animations
  const formatText = useCallback((text) => {
    const parts = [];
    let lastIndex = 0;
    
    // Enhanced regex for better formatting
    const regex = /\*\*([^*]+)\*\*|•|(\n)|\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        const textPart = text.substring(lastIndex, match.index);
        parts.push(
          <span key={`text-${match.index}`} style={{ animation: 'fadeIn 0.3s ease-in' }}>
            {textPart}
          </span>
        );
      }

      if (match[1]) {
        // Bold text with hover effect
        parts.push(
          <strong 
            key={`bold-${match.index}`} 
            style={{ 
              color: "#06b6d4",
              cursor: "pointer",
              transition: "all 0.2s ease",
              textShadow: "0 0 10px rgba(6, 182, 212, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#a855f7";
              e.target.style.textShadow = "0 0 15px rgba(168, 85, 247, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#06b6d4";
              e.target.style.textShadow = "0 0 10px rgba(6, 182, 212, 0.3)";
            }}
          >
            {match[1]}
          </strong>
        );
      } else if (match[0] === "•") {
        // Animated bullet
        parts.push(
          <span 
            key={`bullet-${match.index}`} 
            style={{ 
              color: "#a855f7",
              animation: "pulse 2s infinite"
            }}
          >
            •
          </span>
        );
      } else if (match[0] === "\n") {
        // Enhanced line break
        parts.push(<br key={`br-${match.index}`} />);
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
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
      {/* Premium Modern Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          width: "72px",
          height: "72px",
          padding: 0,
          borderRadius: "50%",
          background: isOpen 
            ? "linear-gradient(135deg, #ff6b6b, #ee5a52)"
            : "linear-gradient(135deg, #667eea, #764ba2)",
          border: "3px solid rgba(255, 255, 255, 0.2)",
          cursor: "pointer",
          boxShadow: isOpen 
            ? "0 8px 32px rgba(255, 107, 107, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
            : "0 8px 32px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isOpen ? "scale(1)" : "scale(1)",
          animation: !isOpen ? "float 3s ease-in-out infinite" : "none",
          backdropFilter: "blur(10px)",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px) scale(1.05)";
          e.currentTarget.style.boxShadow = isOpen 
            ? "0 16px 48px rgba(255, 107, 107, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.2)"
            : "0 16px 48px rgba(102, 126, 234, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = isOpen 
            ? "0 8px 32px rgba(255, 107, 107, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
            : "0 8px 32px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)";
        }}
      >
        {/* Animated background effect */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isOpen 
            ? "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1), transparent)"
            : "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15), transparent)",
          transition: "all 0.3s ease"
        }} />
        
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
            fontWeight: "bold",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            animation: "scaleIn 0.3s ease-out"
          }}>
            ✕
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            <img 
              src={santaImg} 
              alt="AI Assistant" 
              style={{ 
                width: 52, 
                height: 52, 
                borderRadius: "50%", 
                display: "block",
                filter: "drop-shadow(0 0 15px rgba(255,255,255,0.4))",
                animation: "bounce 2s infinite",
                border: "2px solid rgba(255, 255, 255, 0.2)"
              }} 
            />
            {/* Enhanced notification dot */}
            <div style={{
              position: "absolute",
              top: -3,
              right: -3,
              width: 20,
              height: 20,
              background: "linear-gradient(135deg, #ff4757, #ff3838)",
              borderRadius: "50%",
              border: "3px solid white",
              animation: "pulse 1.5s infinite",
              boxShadow: "0 4px 12px rgba(255, 71, 87, 0.4)"
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
          </div>
        )}
      </button>

      {/* Optimized Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "clamp(320px, 85vw, 400px)",
            height: "500px",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
            backdropFilter: "blur(20px) saturate(180%)",
            animation: "slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            overflow: "hidden"
          }}
        >
          {/* Compact Header */}
          <div style={{ 
            padding: "16px 20px", 
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)", 
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))",
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Enhanced background pattern */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              zIndex: 0
            }} />
            
            {/* Floating orbs for visual appeal */}
            <div style={{
              position: "absolute",
              top: "20%",
              right: "15%",
              width: "80px",
              height: "80px",
              background: "radial-gradient(circle, rgba(102, 126, 234, 0.1), transparent)",
              borderRadius: "50%",
              animation: "float 6s ease-in-out infinite",
              zIndex: 0
            }} />
            <div style={{
              position: "absolute",
              bottom: "30%",
              left: "10%",
              width: "60px",
              height: "60px",
              background: "radial-gradient(circle, rgba(118, 75, 162, 0.1), transparent)",
              borderRadius: "50%",
              animation: "float 8s ease-in-out infinite reverse",
              zIndex: 0
            }} />
            
            {/* Chat Stats */}
            <div style={{
              position: "absolute",
              top: "12px",
              right: "16px",
              display: "flex",
              gap: "12px",
              fontSize: "11px",
              color: "rgba(255, 255, 255, 0.7)",
              zIndex: 2
            }}>
              <span title={`${messages.length} messages`} style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 8px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                💬 {messages.length}
              </span>
              {isListening && (
                <span title="Voice input active" style={{ 
                  color: "#ff6b6b",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                  background: "rgba(255, 107, 107, 0.1)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 107, 107, 0.2)",
                  animation: "pulse 0.5s infinite"
                }}>
                  🎤 Live
                </span>
              )}
            </div>
            
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  animation: "pulse 3s infinite",
                  boxShadow: "0 6px 24px rgba(102, 126, 234, 0.4)",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)"
                }}>
                  🤖
                </div>
                <div>
                  <h3 style={{ 
                    margin: 0, 
                    color: "#ffffff", 
                    fontSize: "16px",
                    fontWeight: "600",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    GrantTracker AI
                  </h3>
                  <p style={{ 
                    margin: "2px 0 0 0", 
                    color: "rgba(255, 255, 255, 0.8)", 
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: "500"
                  }}>
                    <span style={{
                      width: "8px",
                      height: "8px",
                      background: isListening ? "#ff6b6b" : fastMode ? "#51cf66" : "#ffd43b",
                      borderRadius: "50%",
                      animation: isListening ? "pulse 0.5s infinite" : "pulse 2s infinite",
                      boxShadow: `0 0 6px ${isListening ? '#ff6b6b' : fastMode ? '#51cf66' : '#ffd43b'}`
                    }} />
                    {isListening ? "Listening..." : fastMode ? "⚡ Fast AI" : "AI Online"}
                  </p>
                  
                  {/* Compact Keyboard Shortcuts */}
                  <div style={{
                    marginTop: "3px",
                    fontSize: "9px",
                    color: "rgba(255, 255, 255, 0.5)",
                    display: "flex",
                    gap: "6px"
                  }}>
                    <span title="Alt+V for voice input">🎤 Alt+V</span>
                    <span title="Alt+T to toggle chat">💬 Alt+T</span>
                    <span title="Esc to close">✕ Esc</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Messages Container */}
          <div style={{ 
            flex: 1, 
            overflowY: "auto", 
            padding: "16px", 
            display: "flex", 
            flexDirection: "column", 
            gap: "12px",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(6, 182, 212, 0.3) transparent"
          }}>
            {messages.map(msg => (
              <div 
                key={msg.id} 
                style={{ 
                  display: "flex", 
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  animation: "slideIn 0.3s ease-out",
                  marginBottom: "8px"
                }}
              >
                <div style={{
                  maxWidth: "88%",
                  padding: "12px 16px",
                  borderRadius: msg.sender === "user" 
                    ? "18px 4px 18px 18px" 
                    : "4px 18px 18px 18px",
                  background: msg.sender === "user" 
                    ? "linear-gradient(135deg, #667eea, #764ba2)" 
                    : "rgba(255, 255, 255, 0.08)",
                  color: "#ffffff",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  border: msg.sender === "user" 
                    ? "none" 
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  wordWrap: "break-word",
                  backdropFilter: msg.sender === "user" ? "none" : "blur(12px)",
                  boxShadow: msg.sender === "user" 
                    ? "0 6px 24px rgba(102, 126, 234, 0.3)" 
                    : "0 3px 12px rgba(0, 0, 0, 0.15)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Subtle gradient overlay for depth */}
                  {msg.sender !== "user" && (
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01))",
                      pointerEvents: "none"
                    }} />
                  )}
                  
                  {/* Message tail effect */}
                  <div style={{
                    position: "absolute",
                    bottom: "8px",
                    right: msg.sender === "user" ? "-2px" : "auto",
                    left: msg.sender === "user" ? "auto" : "-2px",
                    width: "12px",
                    height: "12px",
                    background: msg.sender === "user" 
                      ? "linear-gradient(135deg, #667eea, #764ba2)" 
                      : "rgba(255, 255, 255, 0.08)",
                    transform: `rotate(45deg)`,
                    borderRadius: "0 0 0 2px",
                    border: msg.sender === "user" 
                      ? "none" 
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    borderTop: "none",
                    borderLeft: "none"
                  }} />
                  <div style={{ animation: "fadeIn 0.4s ease-in" }}>
                    {formatText(msg.text)}
                  </div>
                  
                  {/* Compact Suggestions */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div style={{ 
                      marginTop: "8px", 
                      display: "flex", 
                      flexDirection: "column", 
                      gap: "6px",
                      animation: "slideUp 0.3s ease-out"
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
                            transition: "all 0.2s ease",
                            backdropFilter: "blur(10px)"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(6, 182, 212, 0.3)";
                            e.currentTarget.style.transform = "translateX(2px)";
                            e.currentTarget.style.boxShadow = "0 3px 8px rgba(6, 182, 212, 0.3)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(6, 182, 212, 0.15)";
                            e.currentTarget.style.transform = "translateX(0)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          → {s}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Compact Timestamp */}
                  <div style={{
                    marginTop: "6px",
                    fontSize: "9px",
                    color: "rgba(255, 255, 255, 0.4)",
                    textAlign: msg.sender === "user" ? "right" : "left"
                  }}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Enhanced Loading and Typing Indicators */}
            {(isLoading || isTyping) && (
              <div style={{ 
                display: "flex", 
                justifyContent: "flex-start",
                animation: "slideIn 0.3s ease-out"
              }}>
                <div style={{
                  padding: "12px 16px",
                  borderRadius: "0 18px 18px 18px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(6, 182, 212, 0.2)",
                  backdropFilter: "blur(10px)"
                }}>
                  {isLoading ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#06b6d4" }}>
                      <div style={{
                        width: 16,
                        height: 16,
                        border: "2px solid rgba(6, 182, 212, 0.3)",
                        borderTop: "2px solid #06b6d4",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite"
                      }} />
                      ⚡ Ultra-fast AI processing...
                    </div>
                  ) : (
                    <div style={{ color: "#06b6d4", fontSize: "14px" }}>
                      {currentTypingText}
                      <span style={{
                        animation: "blink 1s infinite",
                        color: "#06b6d4"
                      }}>|</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Compact Input Section */}
          <div style={{ 
            padding: "12px", 
            borderTop: "1px solid rgba(255, 255, 255, 0.1)", 
            display: "flex", 
            gap: "8px",
            background: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ position: "relative", flex: 1 }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about grants..."
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  paddingRight: "36px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(6, 182, 212, 0.2)",
                  borderRadius: "10px",
                  color: "#e5e7eb",
                  fontSize: "13px",
                  outline: "none",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(10px)"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#06b6d4";
                  e.target.style.boxShadow = "0 0 15px rgba(6, 182, 212, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(6, 182, 212, 0.2)";
                  e.target.style.boxShadow = "none";
                }}
              />
              
              {/* Compact Voice input */}
              <button
                onClick={toggleVoiceInput}
                disabled={!recognition}
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
                role="button"
                style={{
                  position: "absolute",
                  right: "6px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: isListening 
                    ? "linear-gradient(135deg, #ef4444, #dc2626)"
                    : "rgba(6, 182, 212, 0.1)",
                  border: `1px solid ${isListening ? "#ef4444" : "#06b6d4"}`,
                  color: isListening ? "#fff" : "#06b6d4",
                  cursor: recognition ? "pointer" : "not-allowed",
                  padding: "4px",
                  borderRadius: "50%",
                  transition: "all 0.3s ease",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: isListening ? "pulse 1s infinite" : "none",
                  opacity: recognition ? 1 : 0.5
                }}
                onMouseEnter={(e) => {
                  if (recognition) {
                    e.target.style.transform = "translateY(-50%) scale(1.05)";
                    e.target.style.background = isListening 
                      ? "linear-gradient(135deg, #dc2626, #b91c1c)"
                      : "rgba(6, 182, 212, 0.2)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (recognition) {
                    e.target.style.transform = "translateY(-50%) scale(1)";
                    e.target.style.background = isListening 
                      ? "linear-gradient(135deg, #ef4444, #dc2626)"
                      : "rgba(6, 182, 212, 0.1)";
                  }
                }}
                title={recognition 
                  ? (isListening ? "Listening... Click to stop" : "Click to speak")
                  : "Voice input not supported in this browser"
                }
              >
                {isListening ? (
                  <span style={{ fontSize: "12px", animation: "blink 1s infinite" }}>🔴</span>
                ) : (
                  <span style={{ fontSize: "12px" }}>🎤</span>
                )}
              </button>
            </div>
            
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              style={{
                padding: "10px 16px",
                background: inputValue.trim() 
                  ? "linear-gradient(135deg, #06b6d4, #a855f7)" 
                  : "rgba(6, 182, 212, 0.2)",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                cursor: inputValue.trim() ? "pointer" : "not-allowed",
                opacity: inputValue.trim() ? 1 : 0.5,
                transition: "all 0.2s ease",
                boxShadow: inputValue.trim() 
                  ? "0 3px 10px rgba(6, 182, 212, 0.3)" 
                  : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "40px"
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim()) {
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow = "0 4px 12px rgba(6, 182, 212, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = inputValue.trim() 
                  ? "0 3px 10px rgba(6, 182, 212, 0.3)" 
                  : "none";
              }}
            >
              <span style={{
                transition: "transform 0.2s ease",
                transform: inputValue.trim() ? "scale(1.05)" : "scale(1)"
              }}>
                ➤
              </span>
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
        
        /* Custom scrollbar for chat */
        div::-webkit-scrollbar {
          width: 6px;
        }
        
        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }
      `}</style>
    </>
  );
}
