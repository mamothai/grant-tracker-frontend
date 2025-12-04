import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import santaImg from "../assets/santa.svg";
import { GRANTS } from "../data/grants";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Welcome to **GrantTracker**! I'm your AI Assistant. This website helps you discover and track government grants across **7 sectors** - Agriculture, Education, Health, Infrastructure, Environment, Technology, and Women & Child welfare.\n\nI can help you:\n• Find grants matching your profile\n• Check eligibility for specific schemes\n• Get detailed information about benefits\n• Browse by sector or search by name\n\nWhat would you like to explore?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Calculate relevance score for grant matching
  const scoreGrant = (grant, query) => {
    const q = query.toLowerCase();
    let score = 0;

    // Exact name match
    if (grant.name.toLowerCase() === q) score += 100;
    
    // Name contains query
    if (grant.name.toLowerCase().includes(q)) score += 50;
    
    // Query contains grant keywords
    grant.keywords.forEach(k => {
      if (q.includes(k)) score += 30;
      if (k.includes(q.split(" ")[0])) score += 15;
    });
    
    // Sector match
    if (grant.sector.toLowerCase().includes(q)) score += 25;
    
    // Description/details match
    if (grant.description.toLowerCase().includes(q)) score += 20;
    if (grant.details.toLowerCase().includes(q)) score += 10;

    return score;
  };

  // Find best matching grant
  const findBestGrant = (query) => {
    const scored = GRANTS.map(g => ({ grant: g, score: scoreGrant(g, query) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score);
    
    return scored.length > 0 ? scored[0].grant : null;
  };

  // Find multiple related grants
  const findRelatedGrants = (query) => {
    const scored = GRANTS.map(g => ({ grant: g, score: scoreGrant(g, query) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score);
    
    return scored.map(x => x.grant).slice(0, 5);
  };

  // Get grants by sector
  const getGrantsBySector = (sector) => {
    return GRANTS.filter(g => g.sector.toLowerCase().includes(sector.toLowerCase()));
  };

  // Analyze user profile from message
  const analyzeUserProfile = (query) => {
    const profile = {};
    const q = query.toLowerCase();

    if (q.includes("farmer") || q.includes("agriculture") || q.includes("crop") || q.includes("farming")) profile.occupation = "farmer";
    if (q.includes("student") || q.includes("study") || q.includes("school") || q.includes("college")) profile.occupation = "student";
    if (q.includes("woman") || q.includes("women") || q.includes("female") || q.includes("girl")) profile.gender = "female";
    if (q.includes("child") || q.includes("children") || q.includes("kid") || q.includes("infant")) profile.hasChildren = true;
    if (q.includes("poor") || q.includes("low income") || q.includes("weaker") || q.includes("bpl")) profile.income = "low";
    if (q.includes("rural") || q.includes("village")) profile.location = "rural";
    if (q.includes("urban") || q.includes("city")) profile.location = "urban";

    return profile;
  };

  // Generate ChatGPT-like response
  const generateResponse = (msg) => {
    const lower = msg.toLowerCase();
    const profile = analyzeUserProfile(msg);

    // Question patterns
    const isQuestion = msg.includes("?") || lower.includes("what") || lower.includes("how") || lower.includes("which") || lower.includes("can");
    const isEligibilityQ = lower.includes("eligible") || lower.includes("qualify") || lower.includes("am i") || lower.includes("can i");
    const isGrantQ = lower.includes("grant") || lower.includes("scheme") || lower.includes("support") || lower.includes("benefit");
    const isAboutWebsite = lower.includes("about") || lower.includes("website") || lower.includes("what is") || lower.includes("tell me about this") || lower.includes("purpose");

    // About website query
    if (isAboutWebsite) {
      return {
        text: "📱 **GrantTracker - Your Personal Grant Discovery Platform**\n\n**What We Do:**\nGrantTracker is an intelligent platform that helps Indians find and track government grants they're eligible for. No more missing opportunities!\n\n**Our Features:**\n• **Smart Search**: AI-powered grant discovery based on your profile\n• **Multiple Schemes**: Agriculture, Education, Health, Infrastructure, Environment, Tech, Women & Child\n• **Full Details**: Benefits, eligibility, coverage, and implementation details\n• **Dashboard**: Track all available grants in one place\n• **AI Assistant**: Me! I can answer any question about grants\n\n**How It Works:**\n1. Tell me about yourself (occupation, location, needs)\n2. I find matching grants for you\n3. Get detailed info and eligibility criteria\n4. Access the dashboard for comprehensive view\n\n**Why GrantTracker?**\nMillions of Indians miss out on benefits they're eligible for. We bridge that gap with smart technology!",
        suggestions: ["Check Eligibility", "View All Grants", "Agriculture Grants"],
      };
    }

    // Try to find a specific grant
    const bestGrant = findBestGrant(msg);

    // Specific grant query - detailed response
    if (bestGrant && isQuestion && isGrantQ) {
      return {
        text: `✅ **${bestGrant.name}**\n\n**💰 Benefit:** ${bestGrant.amount}\n**📍 Sector:** ${bestGrant.sector}\n**📝 What it offers:** ${bestGrant.description}\n\n**Complete Details:**\n${bestGrant.details}\n\n**📋 Key Information:**\n• **Launched:** ${bestGrant.yearLaunched}\n• **Who benefits:** ${bestGrant.beneficiaries}\n• **Coverage:** ${bestGrant.coverage}\n• **Nodal Agency:** ${bestGrant.nodalAgency}\n\nThis grant is perfect for you! Would you like to know more or explore similar programs?`,
        suggestions: ["Check My Eligibility", `Similar ${bestGrant.sector}`, "View Dashboard"],
      };
    }

    // Eligibility check
    if (isEligibilityQ) {
      let text = "✅ **Let me find the best grants for you!**\n\n";
      
      if (profile.occupation === "farmer") {
        text += "🚜 **Perfect! As a farmer, you qualify for:**\n\n";
        const farmGrants = GRANTS.filter(g => g.keywords.includes("agriculture") || g.keywords.includes("farmer") || g.keywords.includes("kisan"));
        farmGrants.slice(0, 3).forEach(g => {
          text += `✓ **${g.name}** → ${g.amount}\n  ${g.description}\n\n`;
        });
      } else if (profile.occupation === "student") {
        text += "🎓 **Excellent! As a student, you can benefit from:**\n\n";
        const studGrants = GRANTS.filter(g => g.keywords.includes("student") || g.keywords.includes("education") || g.keywords.includes("school"));
        studGrants.slice(0, 3).forEach(g => {
          text += `✓ **${g.name}** → ${g.amount}\n  ${g.description}\n\n`;
        });
      } else if (profile.hasChildren) {
        text += "👶 **Great! With children, you're eligible for:**\n\n";
        const childGrants = GRANTS.filter(g => g.keywords.includes("child") || g.keywords.includes("children") || g.keywords.includes("icds"));
        childGrants.slice(0, 3).forEach(g => {
          text += `✓ **${g.name}** → ${g.amount}\n  ${g.description}\n\n`;
        });
      } else if (profile.gender === "female") {
        text += "👩 **Perfect! As a woman, these programs are for you:**\n\n";
        const womenGrants = GRANTS.filter(g => g.keywords.includes("woman") || g.keywords.includes("women") || g.keywords.includes("ujjwala"));
        womenGrants.slice(0, 3).forEach(g => {
          text += `✓ **${g.name}** → ${g.amount}\n  ${g.description}\n\n`;
        });
      } else {
        text += "To help you better, tell me about yourself:\n• Your profession (farmer, student, worker, etc.)\n• Your location (rural or urban)\n• Family situation (children, dependents)\n• Any specific needs\n\nI'll match you with the best grants!";
      }

      return {
        text,
        suggestions: ["Show All Grants", "Health Programs", "Agriculture Support"],
      };
    }

    // Sector search
    for (const sector of ["Agriculture", "Education", "Health", "Infrastructure", "Environment", "Technology", "Women & Child"]) {
      if (lower.includes(sector.toLowerCase())) {
        const grants = getGrantsBySector(sector);
        let text = `📊 **${sector.toUpperCase()} SECTOR - ${grants.length} ACTIVE PROGRAMS**\n\n`;
        grants.forEach((g, i) => {
          text += `${i + 1}. **${g.name}**\n   Benefit: ${g.amount} | Coverage: ${g.coverage}\n   ${g.description}\n\n`;
        });
        return {
          text,
          suggestions: grants.slice(0, 3).map(g => `More: ${g.name}`),
        };
      }
    }

    // Statistics/Info questions
    if (lower.includes("total") || lower.includes("how many") || lower.includes("statistics")) {
      const sectors = {};
      GRANTS.forEach(g => {
        sectors[g.sector] = (sectors[g.sector] || 0) + 1;
      });

      let text = `📊 **GrantTracker Database Overview**\n\n🎯 **Total Active Programs:** ${GRANTS.length}\n\n**By Sector:**\n`;
      Object.entries(sectors).forEach(([sector, count]) => {
        text += `• ${sector}: ${count} programs\n`;
      });

      text += `\nAll programs offer substantial benefits ranging from ₹6,000 to ₹5 lakhs+ in various forms of support. Browse any sector to explore!`;

      return {
        text,
        suggestions: ["Agriculture Programs", "Health Programs", "Education Support"],
      };
    }

    // Related grants search
    const related = findRelatedGrants(msg);
    if (related.length > 0 && isGrantQ) {
      let text = `🔍 **Found ${related.length} matching grant(s) for your query:**\n\n`;
      related.slice(0, 4).forEach((g, i) => {
        text += `${i + 1}. **${g.name}** (${g.sector})\n   ${g.description}\n   💰 ${g.amount}\n\n`;
      });
      text += "Which one would you like to know more about?";

      return {
        text,
        suggestions: related.slice(0, 3).map(g => `About ${g.name.split(" ")[0]}`),
      };
    }

    // Conversational/general help
    return {
      text: `👋 **Hi! I'm your GrantTracker AI Assistant powered by ChatGPT-like intelligence.**\n\nI can help you:\n\n✨ **What I can do:**\n• Search for specific grants by name or benefit\n• Check your eligibility based on your profile\n• Browse grants by sector (Agriculture, Health, Education, etc.)\n• Compare different schemes\n• Answer questions about benefits and coverage\n\n💬 **Try asking me:**\n• "Tell me about PM Kisan Yojana"\n• "I'm a farmer, what grants am I eligible for?"\n• "Show me health sector grants"\n• "Which grants provide cash benefits?"\n• "How many schemes are available?"\n\n**What would you like to know?**`,
      suggestions: ["Search Grants", "Check Eligibility", "View All Programs"],
    };
  };

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), text, sender: "user", timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    // Try remote LLM via serverless endpoint; fallback to local generator on error
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: messages.slice(-6) }),
    }).then(async (r) => {
      if (!r.ok) throw new Error('remote error');
      const data = await r.json();
      const botMsg = {
        id: Date.now() + 1,
        text: data.reply || 'Sorry, no response from the remote model.',
        sender: 'bot',
        suggestions: data.suggestions || [],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);
    }).catch(() => {
      // fallback local response
      const response = generateResponse(text);
      const botMsg = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'bot',
        suggestions: response.suggestions,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);
    });
  };

  const handleSuggestion = (suggestion) => {
    // Navigation
    const routes = {
      "View Dashboard": "/chart",
      "Submit Feedback": "/suggestions",
      "About Us": "/about",
    };

    if (routes[suggestion]) {
      navigate(routes[suggestion]);
    }

    handleSend(suggestion);
  };

  // Format markdown text into JSX
  const formatText = (text) => {
    const parts = [];
    let lastIndex = 0;

    // Match **bold**, • bullets, and line breaks
    const regex = /\*\*([^*]+)\*\*|•|(\n)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      if (match[1]) {
        // Bold text
        parts.push(<strong key={`bold-${match.index}`} style={{ color: "#06b6d4" }}>{match[1]}</strong>);
      } else if (match[0] === "•") {
        // Bullet
        parts.push(<span key={`bullet-${match.index}`} style={{ color: "#a855f7" }}>• </span>);
      } else if (match[0] === "\n") {
        // Line break
        parts.push(<br key={`br-${match.index}`} />);
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  return (
    <>
      {/* Toggle Button */}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "64px",
          height: "64px",
          padding: 0,
          borderRadius: "50%",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
          transition: "transform 0.18s ease, box-shadow 0.18s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px) scale(1.06)";
          e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.32)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
        }}
      >
        {isOpen ? (
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18 }}>
            ✕
          </div>
        ) : (
          <img src={santaImg} alt="Santa" style={{ width: 48, height: 48, borderRadius: "50%", display: "block" }} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "clamp(280px, 90vw, 450px)",
            height: "600px",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))",
            border: "1px solid rgba(6, 182, 212, 0.2)",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(6, 182, 212, 0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Header */}
          <div style={{ padding: "16px", borderBottom: "1px solid rgba(6, 182, 212, 0.1)", background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1))" }}>
            <h3 style={{ margin: 0, color: "#06b6d4", fontSize: "16px" }}>🤖 GrantTracker AI</h3>
            <p style={{ margin: "4px 0 0 0", color: "#a1a1aa", fontSize: "12px" }}>Your Grant Discovery Assistant</p>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "85%",
                  padding: "10px 14px",
                  borderRadius: msg.sender === "user" ? "12px 0 12px 12px" : "0 12px 12px 12px",
                  background: msg.sender === "user" ? "linear-gradient(135deg, #06b6d4, #a855f7)" : "rgba(255, 255, 255, 0.08)",
                  color: "#e5e7eb",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  border: msg.sender === "user" ? "none" : "1px solid rgba(6, 182, 212, 0.2)",
                  wordWrap: "break-word",
                }}>
                  {formatText(msg.text)}
                  {msg.suggestions && (
                    <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {msg.suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestion(s)}
                          style={{
                            padding: "6px 12px",
                            background: "rgba(6, 182, 212, 0.2)",
                            border: "1px solid rgba(6, 182, 212, 0.4)",
                            borderRadius: "6px",
                            color: "#06b6d4",
                            fontSize: "12px",
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(6, 182, 212, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(6, 182, 212, 0.2)";
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
            {isLoading && <div style={{ padding: "10px", color: "#06b6d4", fontSize: "12px" }}>Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px", borderTop: "1px solid rgba(6, 182, 212, 0.1)", display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about grants..."
              style={{
                flex: 1,
                padding: "10px 12px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(6, 182, 212, 0.2)",
                borderRadius: "8px",
                color: "#e5e7eb",
                fontSize: "14px",
                outline: "none",
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              style={{
                padding: "10px 16px",
                background: inputValue.trim() ? "linear-gradient(135deg, #06b6d4, #a855f7)" : "rgba(6, 182, 212, 0.2)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                cursor: inputValue.trim() ? "pointer" : "not-allowed",
                opacity: inputValue.trim() ? 1 : 0.5,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
