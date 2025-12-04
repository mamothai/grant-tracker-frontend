import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm your GrantTracker Assistant. I can help you find grants, navigate the website, and answer questions about different sectors. What can I help you with?",
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

  // Grant sectors and keywords for routing
  const sectorKeywords = {
    agriculture: ["agriculture", "farming", "farmer", "crop", "soil", "pm kisan"],
    education: ["education", "school", "student", "midday", "scholarship"],
    health: ["health", "ayushman", "medical", "healthcare", "hospital"],
    infrastructure: ["infrastructure", "road", "gram sadak", "city", "smart"],
    environment: ["environment", "swachh", "clean", "pollution", "sustainability"],
    technology: ["technology", "digital", "india", "e-governance"],
    "women & child": ["women", "child", "ujjwala", "icds", "mother"],
  };

  // Generate bot response based on user input
  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Navigation suggestions
    if (
      lowerMessage.includes("dashboard") ||
      lowerMessage.includes("chart") ||
      lowerMessage.includes("sectors")
    ) {
      return {
        text: "📊 I can take you to the dashboard to view grant distribution across sectors. Would you like me to navigate you there? You can also explore individual sectors to see detailed grant information.",
        suggestions: ["View Dashboard", "Back to Home"],
        action: "dashboard",
      };
    }

    if (lowerMessage.includes("grant") && lowerMessage.includes("details")) {
      return {
        text: "📋 To view detailed grant information, you can either explore the dashboard or search for specific sectors. Which sector interests you? (Agriculture, Education, Health, Infrastructure, Environment, Technology, Women & Child)",
        suggestions: [
          "Agriculture Grants",
          "Education Grants",
          "Health Grants",
          "More Options",
        ],
        action: null,
      };
    }

    if (
      lowerMessage.includes("how") &&
      (lowerMessage.includes("work") || lowerMessage.includes("use"))
    ) {
      return {
        text: "🔍 GrantTracker helps you find and track government grants! Here's how to use it:\n\n1. 📊 **Dashboard**: View all grants by sector\n2. 🔎 **Search**: Find specific grants\n3. 📄 **Details**: Get comprehensive grant information\n4. 💬 **Feedback**: Share your suggestions\n\nWould you like to explore any specific area?",
        suggestions: ["View Dashboard", "Search Grants", "About Us"],
        action: null,
      };
    }

    if (lowerMessage.includes("about")) {
      return {
        text: "ℹ️ GrantTracker is a transparent digital platform connecting officials, creators, and the public with verified grant activity. We ensure accountability and trust in the grant distribution system.\n\nWant to learn more about our mission?",
        suggestions: ["About Us", "Dashboard", "Submit Feedback"],
        action: "about",
      };
    }

    if (lowerMessage.includes("feedback") || lowerMessage.includes("suggest")) {
      return {
        text: "💭 Your feedback is valuable! You can submit suggestions about any grant to help improve transparency and accountability in our system.",
        suggestions: ["Submit Feedback", "View Dashboard"],
        action: "suggestions",
      };
    }

    // Sector-specific responses
    for (const [sector, keywords] of Object.entries(sectorKeywords)) {
      if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
        return {
          text: `🎯 Great! You're interested in ${sector} grants. I can show you all grants in this sector with details about funding, benefits, and eligibility.\n\nWould you like to explore ${sector} grants?`,
          suggestions: [`Explore ${sector}`, "Other Sectors", "Dashboard"],
          action: sector,
        };
      }
    }

    if (lowerMessage.includes("creator") || lowerMessage.includes("login")) {
      return {
        text: "🔐 Are you a grant creator or government official? You can log in to your dedicated portal to manage and create grants.",
        suggestions: ["Creator Login", "Official Login", "Back to Home"],
        action: null,
      };
    }

    if (
      lowerMessage.includes("help") ||
      lowerMessage.includes("support") ||
      lowerMessage.includes("?")
    ) {
      return {
        text: "📞 How can I help you today?\n\n• 📊 View grant dashboard\n• 🔍 Search specific sectors\n• 📚 Learn about grants\n• 💬 Submit feedback\n• 🔐 Login options\n\nJust ask me anything!",
        suggestions: [
          "View Dashboard",
          "About Grants",
          "Submit Feedback",
          "Login",
        ],
        action: null,
      };
    }

    if (lowerMessage.includes("hi") || lowerMessage.includes("hello")) {
      return {
        text: "👋 Hello! I'm here to help you navigate GrantTracker and find the grants you're looking for. What would you like to explore?",
        suggestions: [
          "View Dashboard",
          "Search Grants",
          "About Us",
          "Submit Feedback",
        ],
        action: null,
      };
    }

    // Default response
    return {
      text: "I can help you with:\n• 📊 Dashboard & sector information\n• 🔍 Grant details by category\n• 🔐 Login options\n• 💬 Feedback submission\n\nWhat would you like to do?",
      suggestions: ["View Dashboard", "Search Grants", "Submit Feedback"],
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
    // Route based on suggestion
    const actionMap = {
      "View Dashboard": "/chart",
      "Dashboard": "/chart",
      "Search Grants": "/chart",
      "About Us": "/about",
      "About": "/about",
      "Submit Feedback": "/suggestions",
      "Suggestions": "/suggestions",
      "Creator Login": "/creator-login",
      "Official Login": "/gov-login",
      "Back to Home": "/",
    };

    // Handle sector navigation
    for (const sector of Object.keys(sectorKeywords)) {
      if (suggestion.toLowerCase().includes(sector.toLowerCase())) {
        navigate(`/sectors/${sector}`);
        setInputValue("");
        return;
      }
    }

    if (actionMap[suggestion]) {
      navigate(actionMap[suggestion]);
      setInputValue("");
    } else {
      handleSendMessage(suggestion);
    }
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
