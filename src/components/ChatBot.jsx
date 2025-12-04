import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// Sample grant database
const GRANT_DATABASE = [
  { id: "AGR-001", name: "PM Kisan Samman Nidhi", sector: "Agriculture", amount: "₹6,000/year", desc: "Annual income support for farmers", keywords: ["kisan", "farmer", "agriculture", "income", "support"] },
  { id: "AGR-002", name: "Soil Health Card Scheme", sector: "Agriculture", amount: "Free testing", desc: "Soil testing and nutrient management", keywords: ["soil", "testing", "health", "nutrients", "agriculture"] },
  { id: "EDU-001", name: "Mid Day Meal Scheme", sector: "Education", amount: "Free meals", desc: "Nutrition support for school children", keywords: ["midday", "meal", "school", "student", "education", "nutrition"] },
  { id: "EDU-002", name: "National Scholarship Scheme", sector: "Education", amount: "Varies", desc: "Scholarships for meritorious students", keywords: ["scholarship", "student", "merit", "education", "financial"] },
  { id: "HEL-001", name: "Ayushman Bharat", sector: "Health", amount: "₹5 Lakh/family", desc: "Health insurance for poor families", keywords: ["ayushman", "health", "insurance", "medical", "hospital", "free"] },
  { id: "INF-001", name: "Pradhan Mantri Gram Sadak Yojana", sector: "Infrastructure", amount: "Full funding", desc: "Road connectivity in rural areas", keywords: ["gram sadak", "road", "rural", "infrastructure", "connectivity"] },
  { id: "ENV-001", name: "Swachh Bharat Mission", sector: "Environment", amount: "Full funding", desc: "Sanitation and cleanliness drive", keywords: ["swachh", "clean", "sanitation", "environment", "toilets"] },
  { id: "TECH-001", name: "Digital India Programme", sector: "Technology", amount: "Full funding", desc: "Digital infrastructure development", keywords: ["digital", "india", "technology", "broadband", "internet"] },
  { id: "WC-001", name: "ICDS Scheme", sector: "Women & Child", amount: "Free services", desc: "Child development and nutrition programs", keywords: ["icds", "child", "development", "nutrition", "women", "mother"] },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm your GrantTracker Assistant. I can help you find grants, answer eligibility questions, explain schemes, or guide you through the website. What are you looking for?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationContext, setConversationContext] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Smart grant search function
  const findRelatedGrants = (query) => {
    const queryLower = query.toLowerCase();
    return GRANT_DATABASE.filter(grant =>
      grant.keywords.some(keyword => queryLower.includes(keyword)) ||
      grant.name.toLowerCase().includes(queryLower) ||
      grant.sector.toLowerCase().includes(queryLower)
    ).slice(0, 3);
  };

  // Calculate eligibility based on keywords
  const assessEligibility = (message) => {
    const lower = message.toLowerCase();
    const indicators = {
      farmer: "You might be eligible for agricultural schemes like PM Kisan",
      student: "You might be eligible for education scholarships and meal schemes",
      child: "Your child might benefit from ICDS programs",
      elderly: "You might be eligible for senior citizen benefits",
      woman: "You might be eligible for women-specific schemes",
      poor: "You might be eligible for subsidized/free government services",
      rural: "You might be eligible for rural development schemes",
      unemployed: "You might be eligible for skill development and employment schemes",
    };

    for (const [keyword, message] of Object.entries(indicators)) {
      if (lower.includes(keyword)) {
        return message;
      }
    }
    return null;
  };

  // Enhanced bot response with even more intelligence
  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Handle follow-up grant questions
    const mentionedGrant = GRANT_DATABASE.find(g => 
      lowerMessage.includes(g.name.toLowerCase()) || 
      g.keywords.some(k => lowerMessage.includes(k))
    );
    
    if (mentionedGrant && (
      lowerMessage.includes("tell me") || 
      lowerMessage.includes("details") || 
      lowerMessage.includes("more about") ||
      lowerMessage.includes("info") ||
      lowerMessage.includes("benefit")
    )) {
      return {
        text: `✅ **${mentionedGrant.name}**\n\n📌 **Sector:** ${mentionedGrant.sector}\n💰 **Benefit:** ${mentionedGrant.amount}\n📝 **Description:** ${mentionedGrant.desc}\n\n**Key Benefits:**\n• Direct benefit transfer\n• No repayment required\n• Government backed\n• Transparent process\n\nWould you like to:\n1. Check if you're eligible?\n2. See similar grants?\n3. Explore the sector?`,
        suggestions: ["Check Eligibility", "Similar Grants", `Explore ${mentionedGrant.sector}`],
        action: null,
      };
    }
    
    // Check for eligibility questions
    if (
      lowerMessage.includes("eligible") ||
      lowerMessage.includes("am i") ||
      lowerMessage.includes("can i") ||
      lowerMessage.includes("qualify") ||
      lowerMessage.includes("eligible for")
    ) {
      const eligibility = assessEligibility(userMessage);
      const relatedGrants = findRelatedGrants(userMessage);
      
      let text = eligibility || "To check eligibility, please tell me more about:\n• Your profession (farmer, student, etc.)\n• Your age group\n• Your location (rural/urban)\n• Any special circumstances";
      
      if (relatedGrants.length > 0) {
        text += "\n\n💡 **Matching Schemes:**\n";
        relatedGrants.forEach(g => {
          text += `• ${g.name} (${g.amount})\n`;
        });
      }
      
      return {
        text,
        suggestions: relatedGrants.length > 0 ? 
          relatedGrants.map(g => `Learn: ${g.name.substring(0, 20)}`) : 
          ["Farmer", "Student", "Business Owner", "Other"],
        action: null,
      };
    }

    // Smart sector-based responses
    const sectorKeywords = {
      agriculture: ["agriculture", "farming", "farmer", "crop", "soil", "pm kisan", "rural", "agri"],
      education: ["education", "school", "student", "midday", "scholarship", "learning", "college"],
      health: ["health", "ayushman", "medical", "healthcare", "hospital", "disease", "insurance"],
      infrastructure: ["infrastructure", "road", "gram sadak", "city", "smart", "construction"],
      environment: ["environment", "swachh", "clean", "pollution", "eco", "sustainable"],
      technology: ["technology", "digital", "india", "e-governance", "broadband", "internet"],
      "women & child": ["women", "child", "ujjwala", "icds", "mother", "girl", "pregnant"],
    };

    for (const [sector, keywords] of Object.entries(sectorKeywords)) {
      if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
        const sectorGrants = GRANT_DATABASE.filter(g => g.sector === sector.charAt(0).toUpperCase() + sector.slice(1));
        let text = `🎯 **${sector.toUpperCase()} SECTOR**\n\n`;
        
        if (sectorGrants.length > 0) {
          text += `Found ${sectorGrants.length} grants:\n`;
          sectorGrants.forEach(g => {
            text += `\n• **${g.name}**\n  Benefit: ${g.amount}\n`;
          });
        }
        
        text += `\n\nWould you like to know more about any of these or check eligibility?`;
        
        return {
          text,
          suggestions: [
            `Explore ${sector}`,
            "Check Eligibility",
            "All Sectors"
          ],
          action: sector,
        };
      }
    }

    // Search grants by keyword
    const relatedGrants = findRelatedGrants(userMessage);
    if (relatedGrants.length > 0 && !lowerMessage.includes("how")) {
      let text = `🔍 Found ${relatedGrants.length} matching grant(s):\n\n`;
      relatedGrants.forEach((g, idx) => {
        text += `${idx + 1}. **${g.name}**\n   💰 ${g.amount} | 📍 ${g.sector}\n`;
      });
      
      return {
        text,
        suggestions: relatedGrants.map(g => `Details: ${g.name}`),
        action: null,
      };
    }

    // General questions about grants
    if (lowerMessage.includes("what is") || lowerMessage.includes("what are")) {
      if (lowerMessage.includes("grant")) {
        return {
          text: "💰 **What are Grants?**\n\nGrants are financial aids provided by government that:\n✓ Don't need to be repaid\n✓ Support specific purposes\n✓ Help individuals & communities\n✓ Are transparent & accountable\n\n**Types of Grants:**\n• Individual assistance (farmers, students)\n• Infrastructure development\n• Social welfare & health\n• Environmental initiatives\n• Technology & digital services",
          suggestions: ["View All Grants", "Check Eligibility", "Dashboard"],
          action: null,
        };
      }
    }

    // Navigation suggestions
    if (
      lowerMessage.includes("dashboard") ||
      lowerMessage.includes("chart") ||
      lowerMessage.includes("all sectors")
    ) {
      return {
        text: "📊 **Dashboard Features:**\n\n📈 Visual grant distribution\n🎯 Sector-wise allocation\n💰 Total funding information\n🔍 Interactive charts\n📋 Detailed grant listings\n\nThe dashboard helps you understand where government funds are allocated and which schemes might benefit you!",
        suggestions: ["View Dashboard", "Agriculture", "Education"],
        action: "dashboard",
      };
    }

    // How to use guide
    if (
      lowerMessage.includes("how") &&
      (lowerMessage.includes("work") || lowerMessage.includes("use") || lowerMessage.includes("navigate"))
    ) {
      return {
        text: "🗺️ **GrantTracker Guide:**\n\n**Step 1:** Explore the Dashboard\n• See all available grants\n• Understand sector distribution\n\n**Step 2:** Find Your Grant\n• Search by sector\n• Ask about eligibility\n• Compare benefits\n\n**Step 3:** Get Details\n• View full grant information\n• Check application process\n• Understand benefits\n\n**Step 4:** Apply\n• Follow the outlined process\n• Contact relevant authorities\n• Track your application\n\nI'm here to guide you at every step!",
        suggestions: ["View Dashboard", "Search Grants", "Check Eligibility"],
        action: null,
      };
    }

    // About page
    if (lowerMessage.includes("about")) {
      return {
        text: "ℹ️ **About GrantTracker**\n\n✓ Transparent grant distribution platform\n✓ Real-time government scheme information\n✓ Accountability & verification\n✓ Easy navigation & search\n✓ Public feedback system\n✓ Multi-sector coverage\n\n**Our Mission:** Connect citizens with government grants through transparency and accountability!",
        suggestions: ["Learn More", "View Dashboard", "Submit Feedback"],
        action: "about",
      };
    }

    // Feedback
    if (lowerMessage.includes("feedback") || lowerMessage.includes("suggest")) {
      return {
        text: "💬 **Share Your Feedback**\n\nHelp us improve by sharing:\n• Grant information updates\n• Website improvements\n• New scheme suggestions\n• Eligibility clarifications\n• General feedback\n\nYour input directly impacts the platform!",
        suggestions: ["Submit Feedback", "View Dashboard"],
        action: "suggestions",
      };
    }

    // Login options
    if (lowerMessage.includes("creator") || lowerMessage.includes("official") || lowerMessage.includes("login")) {
      return {
        text: "🔐 **Login Options:**\n\n👨‍💻 **Creator Portal**\n• Create new grants\n• Manage submissions\n• Track applications\n\n👔 **Official Dashboard**\n• Administrative access\n• Monitor allocations\n• Verify grants\n\nWhich portal do you need?",
        suggestions: ["Creator Login", "Official Login", "Public Dashboard"],
        action: null,
      };
    }

    // Greeting and help
    if (
      lowerMessage.includes("hi") || 
      lowerMessage.includes("hello") || 
      lowerMessage.includes("help") ||
      lowerMessage.includes("?") ||
      lowerMessage.includes("start") ||
      lowerMessage.includes("hey")
    ) {
      return {
        text: "👋 **Welcome to GrantTracker AI!**\n\nI can help you:\n✅ Find government grants\n✅ Check eligibility for schemes\n✅ Explore by sector\n✅ Navigate the website\n✅ Answer grant questions\n\n**Quick Start:**\nTell me about yourself or the grant you're looking for!",
        suggestions: [
          "I'm a Farmer",
          "Student Looking for Grants",
          "View Dashboard",
          "Tell Me About Grants"
        ],
        action: null,
      };
    }

    // Intelligent catch-all
    return {
      text: `📚 I understand you're interested in: "${userMessage.substring(0, 40)}..."\n\nI can help by:\n• Searching our grant database\n• Assessing your eligibility\n• Explaining schemes\n• Navigating the site\n• Answering your questions\n\nCould you provide more details or ask more specifically?`,
      suggestions: ["Find Grants", "Check Eligibility", "View Dashboard", "Ask Me Anything"],
      action: null,
    };
  };

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const response = generateBotResponse(text);

      const botMessage = {
        id: messages.length + 2,
        text: response.text,
        sender: "bot",
        suggestions: response.suggestions,
        timestamp: new Date(),
        action: response.action,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  const handleSuggestionClick = (suggestion) => {
    // Comprehensive action map with all variations
    const actionMap = {
      "View Dashboard": "/chart",
      "Dashboard": "/chart",
      "Search Grants": "/chart",
      "Chart": "/chart",
      "About Us": "/about",
      "About": "/about",
      "Learn More": "/about",
      "Submit Feedback": "/suggestions",
      "Feedback": "/suggestions",
      "Suggestions": "/suggestions",
      "Creator Login": "/creator-login",
      "Official Login": "/gov-login",
      "Public Dashboard": "/chart",
      "Back to Home": "/",
      "Home": "/",
    };

    // Sector mapping
    const sectorMap = {
      "agriculture": "/sectors/Agriculture",
      "education": "/sectors/Education",
      "health": "/sectors/Health",
      "infrastructure": "/sectors/Infrastructure",
      "environment": "/sectors/Environment",
      "technology": "/sectors/Technology",
      "women & child": "/sectors/Women & Child",
    };

    // Check for direct action mapping
    if (actionMap[suggestion]) {
      navigate(actionMap[suggestion]);
      handleSendMessage(suggestion);
      return;
    }

    // Check for sector-based suggestions
    const suggestionLower = suggestion.toLowerCase();
    for (const [sector, path] of Object.entries(sectorMap)) {
      if (suggestionLower.includes(sector) || suggestionLower.includes("explore")) {
        navigate(path);
        handleSendMessage(suggestion);
        return;
      }
    }

    // Check for grant-specific suggestions
    const grant = GRANT_DATABASE.find(g => 
      suggestion.toLowerCase().includes(g.name.toLowerCase().split(" ")[0])
    );
    if (grant) {
      handleSendMessage(`Tell me more about ${grant.name}`);
      return;
    }

    // Default: treat as a message
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Chat Bot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #06b6d4, #a855f7)",
          border: "none",
          color: "white",
          fontSize: "28px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(6, 182, 212, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
          transition: "all 0.3s ease",
          transform: isOpen ? "scale(1.1)" : "scale(1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.15)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(6, 182, 212, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(6, 182, 212, 0.4)";
        }}
      >
        {isOpen ? "✕" : "💬"}
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
            animation: "slideUp 0.3s ease",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid rgba(6, 182, 212, 0.1)",
              background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1))",
              borderRadius: "16px 16px 0 0",
            }}
          >
            <h3 style={{ margin: 0, color: "#06b6d4", fontSize: "16px" }}>
              🤖 GrantTracker Assistant
            </h3>
            <p style={{ margin: "4px 0 0 0", color: "#a1a1aa", fontSize: "12px" }}>
              Online • Always here to help
            </p>
          </div>

          {/* Messages Container */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              scrollBehavior: "smooth",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  animation: "fadeIn 0.3s ease",
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "10px 14px",
                    borderRadius: msg.sender === "user" ? "12px 0 12px 12px" : "0 12px 12px 12px",
                    background:
                      msg.sender === "user"
                        ? "linear-gradient(135deg, #06b6d4, #a855f7)"
                        : "rgba(255, 255, 255, 0.08)",
                    color: "#e5e7eb",
                    fontSize: "14px",
                    lineHeight: "1.4",
                    wordWrap: "break-word",
                    border:
                      msg.sender === "user"
                        ? "none"
                        : "1px solid rgba(6, 182, 212, 0.2)",
                  }}
                >
                  {msg.text}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {msg.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          style={{
                            padding: "6px 12px",
                            background: "rgba(6, 182, 212, 0.2)",
                            border: "1px solid rgba(6, 182, 212, 0.4)",
                            borderRadius: "6px",
                            color: "#06b6d4",
                            fontSize: "12px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(6, 182, 212, 0.4)";
                            e.currentTarget.style.transform = "translateX(4px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(6, 182, 212, 0.2)";
                            e.currentTarget.style.transform = "translateX(0)";
                          }}
                        >
                          → {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: "flex", gap: "4px", paddingLeft: "8px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#06b6d4",
                    animation: "bounce 1.4s infinite",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#06b6d4",
                    animation: "bounce 1.4s infinite",
                    animationDelay: "0.2s",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#06b6d4",
                    animation: "bounce 1.4s infinite",
                    animationDelay: "0.4s",
                  }}
                />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: "12px",
              borderTop: "1px solid rgba(6, 182, 212, 0.1)",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                padding: "10px 12px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(6, 182, 212, 0.2)",
                borderRadius: "8px",
                color: "#e5e7eb",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.4)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.2)";
              }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              style={{
                padding: "10px 16px",
                background: inputValue.trim()
                  ? "linear-gradient(135deg, #06b6d4, #a855f7)"
                  : "rgba(6, 182, 212, 0.2)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "16px",
                cursor: inputValue.trim() ? "pointer" : "not-allowed",
                transition: "all 0.2s ease",
                opacity: inputValue.trim() ? 1 : 0.5,
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim()) {
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            opacity: 0.5;
            transform: translateY(0);
          }
          40% {
            opacity: 1;
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  );
}
