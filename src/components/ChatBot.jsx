import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// Comprehensive grant database from your website
const GRANTS = [
  // Agriculture
  { id: "AGR-001", name: "PM Kisan Samman Nidhi", sector: "Agriculture", amount: "₹6,000/year", description: "Annual income support to farmers", details: "Provides ₹6,000 annually. Over 11 crore farmer families registered. ₹2.8 lakh crore disbursed.", yearLaunched: "2019", beneficiaries: "11 crore farmers", coverage: "National", keywords: ["kisan", "farmer", "agriculture", "income"] },
  { id: "AGR-002", name: "Soil Health Card Scheme", sector: "Agriculture", amount: "Free testing", description: "Soil testing and nutrient management", details: "22 crore soil health cards issued. Improves balanced fertilizer use", yearLaunched: "2015", beneficiaries: "22 crore farmers", coverage: "National", keywords: ["soil", "health", "testing", "agriculture"] },
  { id: "AGR-003", name: "Pradhan Mantri Fasal Bima Yojana", sector: "Agriculture", amount: "Premium coverage", description: "Crop insurance against crop failure", details: "Protects farmers from natural calamities. Government subsidizes premium.", yearLaunched: "2016", beneficiaries: "Millions of farmers", coverage: "National", keywords: ["crop insurance", "fasal bima", "protection"] },
  
  // Education
  { id: "EDU-001", name: "Mid Day Meal Scheme", sector: "Education", amount: "Free meals", description: "Nutritious meals to school children", details: "10 crore children receive daily meals. Improves attendance and learning.", yearLaunched: "1995", beneficiaries: "10 crore children", coverage: "National", keywords: ["midday meal", "education", "school", "nutrition", "student"] },
  { id: "EDU-002", name: "National Scholarship Scheme", sector: "Education", amount: "Varies by merit", description: "Scholarships for meritorious students", details: "Supports talented students from weaker sections. Covers tuition and maintenance.", yearLaunched: "2006", beneficiaries: "Lakh of students", coverage: "National", keywords: ["scholarship", "student", "education", "merit"] },
  { id: "EDU-003", name: "Samagra Shiksha", sector: "Education", amount: "Full funding", description: "Comprehensive education program", details: "Integrates RMSA and SSA. Focuses on quality education and infrastructure.", yearLaunched: "2018", beneficiaries: "Millions of students", coverage: "National", keywords: ["samagra shiksha", "education", "school"] },
  
  // Health
  { id: "HEL-001", name: "Ayushman Bharat", sector: "Health", amount: "₹5 Lakh/family/year", description: "Cashless health insurance scheme", details: "11 crore families covered. Cashless treatment at 24,000+ hospitals. ₹5 lakh annual coverage per family.", yearLaunched: "2018", beneficiaries: "11 crore families", coverage: "National", keywords: ["ayushman bharat", "health insurance", "medical", "hospital"] },
  { id: "HEL-002", name: "National Health Mission", sector: "Health", amount: "Full funding", description: "Aims to improve health outcomes", details: "Strengthens healthcare delivery. Focuses on maternal and child health.", yearLaunched: "2013", beneficiaries: "Entire population", coverage: "National", keywords: ["health mission", "healthcare", "medical"] },
  { id: "HEL-003", name: "COVID-19 Vaccination Drive", sector: "Health", amount: "Free vaccination", description: "Nationwide vaccination program", details: "Free vaccines. Largest vaccination drive globally. Achieved crores of vaccinations.", yearLaunched: "2021", beneficiaries: "Entire eligible population", coverage: "National", keywords: ["covid vaccine", "vaccination", "immunization"] },
  
  // Infrastructure
  { id: "INF-001", name: "Pradhan Mantri Gram Sadak Yojana", sector: "Infrastructure", amount: "Full funding", description: "Roads connecting rural habitations", details: "All-weather roads to unconnected villages. Improves rural connectivity and development.", yearLaunched: "2000", beneficiaries: "Rural populations", coverage: "National", keywords: ["gram sadak", "road", "rural", "infrastructure"] },
  { id: "INF-002", name: "Smart Cities Mission", sector: "Infrastructure", amount: "₹98,000 crore", description: "Modern infrastructure for 100 cities", details: "Smart transportation, water, waste management. 100 selected cities transformation.", yearLaunched: "2015", beneficiaries: "Urban populations", coverage: "100 cities", keywords: ["smart city", "infrastructure", "urban", "technology"] },
  
  // Environment
  { id: "ENV-001", name: "Swachh Bharat Mission", sector: "Environment", amount: "Full funding", description: "National sanitation campaign", details: "11 crore toilets built. Aims for open defecation free India and waste management.", yearLaunched: "2014", beneficiaries: "Entire population", coverage: "National", keywords: ["swachh bharat", "sanitation", "clean", "environment"] },
  { id: "ENV-002", name: "National Clean Air Programme", sector: "Environment", amount: "Full funding", description: "Address air pollution", details: "20-30% reduction in PM2.5 and PM10. Covers 102 cities nationwide.", yearLaunched: "2019", beneficiaries: "Urban populations", coverage: "102 cities", keywords: ["clean air", "pollution", "environment"] },
  
  // Technology
  { id: "TECH-001", name: "Digital India Programme", sector: "Technology", amount: "Full funding", description: "Digital empowerment of India", details: "Broadband to all villages. Digital literacy and e-governance promotion.", yearLaunched: "2015", beneficiaries: "Entire population", coverage: "National", keywords: ["digital india", "technology", "broadband", "internet"] },
  { id: "TECH-002", name: "E-Governance Initiative", sector: "Technology", amount: "Full funding", description: "Online government services", details: "Efficient government service delivery. Online portals for citizens. Reduces corruption.", yearLaunched: "2006", beneficiaries: "Entire population", coverage: "National", keywords: ["e-governance", "technology", "online", "digital"] },
  
  // Women & Child
  { id: "WC-001", name: "ICDS - Integrated Child Development Services", sector: "Women & Child", amount: "Full funding", description: "Services for children under 6", details: "8 crore children and mothers covered. Health checkups, nutrition, preschool education.", yearLaunched: "1975", beneficiaries: "8 crore people", coverage: "National", keywords: ["icds", "child development", "nutrition", "children"] },
  { id: "WC-002", name: "Ujjwala - Women's Safety Programme", sector: "Women & Child", amount: "Full funding", description: "Women's safety and empowerment", details: "Legal aid, shelter homes, counseling. Addresses violence against women.", yearLaunched: "2016", beneficiaries: "Millions of women", coverage: "National", keywords: ["ujjwala", "women", "safety", "empowerment"] },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm your **GrantTracker AI Assistant**. I have comprehensive knowledge about **18+ major government grants** across India. Ask me anything about grants, eligibility, schemes, or how to apply!",
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

  // Find grant by name or keyword
  const findGrant = (query) => {
    const q = query.toLowerCase();
    return GRANTS.find(g => 
      g.name.toLowerCase().includes(q) ||
      g.keywords.some(k => q.includes(k)) ||
      q.includes(g.name.toLowerCase().split(" ")[0])
    );
  };

  // Find multiple grants
  const searchGrants = (query) => {
    const q = query.toLowerCase();
    return GRANTS.filter(g =>
      g.keywords.some(k => q.includes(k)) ||
      g.sector.toLowerCase().includes(q) ||
      g.name.toLowerCase().includes(q)
    );
  };

  // Get grants by sector
  const getGrantsByS ector = (sector) => {
    return GRANTS.filter(g => g.sector.toLowerCase().includes(sector.toLowerCase()));
  };

  // Generate ChatGPT-like response
  const generateResponse = (msg) => {
    const lower = msg.toLowerCase();

    // Specific grant query
    const grant = findGrant(msg);
    if (grant && (lower.includes("tell") || lower.includes("about") || lower.includes("what") || lower.includes("how") || lower.includes("?"))) {
      return {
        text: `✅ **${grant.name}**\n\n💰 **Benefit:** ${grant.amount}\n📍 **Sector:** ${grant.sector}\n📝 **Description:** ${grant.description}\n\n**Details:** ${grant.details}\n\n**Key Info:**\n• Year Launched: ${grant.yearLaunched}\n• Beneficiaries: ${grant.beneficiaries}\n• Coverage: ${grant.coverage}\n\n💡 Would you like to check eligibility or see similar grants?`,
        suggestions: ["Check Eligibility", "Similar Grants", `All ${grant.sector}`],
      };
    }

    // Eligibility
    if (lower.includes("eligible") || lower.includes("am i") || lower.includes("qualify")) {
      const related = searchGrants(msg);
      let text = "✅ **Eligibility Check:**\n\n";
      
      if (lower.includes("farmer")) {
        text += "As a farmer, you're eligible for:\n• **PM Kisan Samman Nidhi** (₹6,000/year)\n• **Soil Health Card Scheme** (free testing)\n• **Pradhan Mantri Fasal Bima Yojana** (crop insurance)\n";
      } else if (lower.includes("student")) {
        text += "As a student, you're eligible for:\n• **Mid Day Meal Scheme** (free meals)\n• **National Scholarship Scheme** (merit-based)\n• **Samagra Shiksha** (education support)\n";
      } else if (lower.includes("woman")) {
        text += "As a woman, you're eligible for:\n• **Ujjwala Program** (safety & empowerment)\n• **ICDS** (if you have children)\n• **Ayushman Bharat** (health insurance)\n";
      } else {
        text += "Tell me more about yourself:\n• Profession (farmer, student, etc.)\n• Age group\n• Location (rural/urban)\n• Income level\n\nI'll find matching grants!";
      }

      return {
        text,
        suggestions: related.length > 0 ? related.slice(0, 3).map(g => `About ${g.name}`) : ["Tell More About Yourself"],
      };
    }

    // Sector search
    for (const sector of ["Agriculture", "Education", "Health", "Infrastructure", "Environment", "Technology", "Women & Child"]) {
      if (lower.includes(sector.toLowerCase())) {
        const grants = getGrantsBySector(sector);
        let text = `📊 **${sector.toUpperCase()} GRANTS** (${grants.length} schemes)\n\n`;
        grants.forEach(g => {
          text += `**${g.name}**\n• ${g.description}\n• Benefit: ${g.amount}\n\n`;
        });
        return {
          text,
          suggestions: grants.map(g => `Details: ${g.name}`),
        };
      }
    }

    // General questions
    if (lower.includes("total grants") || lower.includes("how many")) {
      return {
        text: `📊 **GrantTracker has ${GRANTS.length} Major Grants** across 7 sectors:\n\n• Agriculture: 3 grants\n• Education: 3 grants\n• Health: 3 grants\n• Infrastructure: 2 grants\n• Environment: 2 grants\n• Technology: 2 grants\n• Women & Child: 2 grants\n\nEach includes full details on eligibility, benefits, and application!`,
        suggestions: ["View Dashboard", "Agriculture Grants", "Health Grants"],
      };
    }

    // Multiple results
    const results = searchGrants(msg);
    if (results.length > 0) {
      let text = `🔍 **Found ${results.length} Matching Grant(s):**\n\n`;
      results.forEach(g => {
        text += `**${g.name}** (${g.sector})\n${g.description}\n\n`;
      });
      return {
        text,
        suggestions: results.map(g => `About ${g.name}`),
      };
    }

    // Default helpful response
    return {
      text: `💡 **I can help you with:**\n\n✅ Find any government grant\n✅ Check your eligibility\n✅ Compare schemes\n✅ Get detailed information\n✅ Navigate the website\n\n**Try asking me:**\n• "Tell me about PM Kisan"\n• "I'm a student, what grants?"\n• "Show health sector grants"\n• "How many grants total?"\n\nWhat can I help with?`,
      suggestions: ["Search Grants", "Check Eligibility", "View Dashboard"],
    };
  };

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), text, sender: "user", timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const response = generateResponse(text);
      const botMsg = {
        id: Date.now() + 1,
        text: response.text,
        sender: "bot",
        suggestions: response.suggestions,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);
    }, 300);
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

  return (
    <>
      {/* Toggle Button */}
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
          }}
        >
          {/* Header */}
          <div style={{ padding: "16px", borderBottom: "1px solid rgba(6, 182, 212, 0.1)", background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1))" }}>
            <h3 style={{ margin: 0, color: "#06b6d4", fontSize: "16px" }}>🤖 GrantTracker AI</h3>
            <p style={{ margin: "4px 0 0 0", color: "#a1a1aa", fontSize: "12px" }}>Powered by 18+ Grants Database</p>
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
                  lineHeight: "1.4",
                  border: msg.sender === "user" ? "none" : "1px solid rgba(6, 182, 212, 0.2)",
                  wordWrap: "break-word",
                }}>
                  {msg.text}
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
