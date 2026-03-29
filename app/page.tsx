"use client";

import { useState } from "react";

type Tab = "classify" | "analyze" | "qualify";

interface ResultData {
  [key: string]: unknown;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("classify");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);

  const tabs = {
    classify: {
      title: "Email Classifier",
      icon: "📧",
      description: "AI automatically classifies emails by category, priority, and sentiment",
      placeholder: "Paste an email here...\n\nExample:\nHi, I've been trying to reach your support team for 3 days about a billing issue. My invoice #4521 was charged twice and I need an immediate refund. This is unacceptable service. - John",
      endpoint: "/api/classify",
    },
    analyze: {
      title: "Document Analyzer",
      icon: "📄",
      description: "Extract key information, dates, amounts, and action items from any document",
      placeholder: "Paste a document here...\n\nExample:\nSERVICE AGREEMENT between SUYD LLC and TechCorp Inc.\nDate: March 15, 2026\nProject: AI Chatbot Development\nTotal Budget: $45,000 USD\nDeadline: June 30, 2026\nPayment: 50% upfront ($22,500), 50% on delivery.",
      endpoint: "/api/analyze",
    },
    qualify: {
      title: "Lead Qualifier",
      icon: "🎯",
      description: "AI scores and qualifies potential clients to prioritize your sales pipeline",
      placeholder: "Paste a client message or lead info...\n\nExample:\nHi SUYD team, we're a hotel chain with 12 locations in the Caribbean. We need a custom booking platform with AI chatbot integration ASAP. Our budget is around $50-80K and we want to launch before peak season in December. Can we schedule a call this week?",
      endpoint: "/api/qualify",
    },
  };

  const current = tabs[activeTab];

  async function handleSubmit() {
    if (!input.trim() || loading) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(current.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (data && typeof data === "object") {
          setResult(data);
        } else {
          setResult({ result: String(data) });
        }
      } catch {
        setResult({ result: text });
      }
    } catch {
      setResult({ error: "Failed to process. Please try again." });
    }

    setLoading(false);
  }

  function renderValue(value: unknown): string {
    try {
      if (value === null || value === undefined) return "N/A";
      if (Array.isArray(value)) return value.map(v => String(v)).join(", ");
      if (typeof value === "object") return JSON.stringify(value);
      return String(value);
    } catch {
      return "N/A";
    }
  }

  function getBadgeColor(key: string, value: string): string {
    const v = String(value || "").toLowerCase();
    if (key === "priority" || key === "urgency") {
      if (v === "high" || v === "immediate") return "bg-red-500/20 text-red-400 border-red-500/30";
      if (v === "medium" || v === "short-term") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      return "bg-green-500/20 text-green-400 border-green-500/30";
    }
    if (key === "qualification") {
      if (v === "hot") return "bg-red-500/20 text-red-400 border-red-500/30";
      if (v === "warm") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
    if (key === "sentiment") {
      if (v === "positive") return "bg-green-500/20 text-green-400 border-green-500/30";
      if (v === "negative") return "bg-red-500/20 text-red-400 border-red-500/30";
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
    return "bg-purple-500/20 text-purple-400 border-purple-500/30";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">SUYD Workflow AI</h1>
            <p className="text-gray-400 text-xs">Business Automation Platform</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-green-400 text-xs">3 workflows active</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">
            Automate Your Business with AI
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Powered by Qwen 2.5 72B. Classify emails, analyze documents, and qualify leads — all automatically.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 justify-center flex-wrap">
          {(Object.keys(tabs) as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setResult(null); setInput(""); }}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab
                  ? "bg-white/15 text-white border border-white/20"
                  : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10"
              }`}
            >
              <span className="text-lg">{tabs[tab].icon}</span>
              {tabs[tab].title}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{current.icon}</span>
              <div>
                <h3 className="text-white font-semibold">{current.title}</h3>
                <p className="text-gray-400 text-xs">{current.description}</p>
              </div>
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={current.placeholder}
              rows={12}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm resize-none focus:outline-none focus:border-blue-500/50 mb-4"
            />

            <button
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : (
                "Run Workflow"
              )}
            </button>
          </div>

          {/* Output */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              AI Analysis Result
            </h3>

            {!result && !loading && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <span className="text-5xl mb-4 opacity-30">🤖</span>
                <p className="text-gray-500 text-sm">
                  Paste your content and click &quot;Run Workflow&quot; to see AI results
                </p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-64">
                <span className="w-8 h-8 border-2 border-white/20 border-t-orange-500 rounded-full animate-spin mb-4"></span>
                <p className="text-gray-400 text-sm">AI is analyzing...</p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {Object.entries(result).map(([key, value]) => {
                  try {
                    if (value === null || value === undefined) return null;
                    const displayKey = key.replace(/_/g, " ").split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                    const strValue = renderValue(value);
                    const isBadge = ["category", "priority", "sentiment", "qualification", "urgency", "budget_indicator", "document_type"].includes(key);
                    const isScore = key === "score" && typeof value === "number";
                    const scoreNum = isScore ? Math.min(100, Math.max(0, Number(value))) : 0;

                    return (
                      <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-3">
                        <span className="text-gray-400 text-xs uppercase tracking-wide">
                          {displayKey}
                        </span>

                        {isScore ? (
                          <div className="mt-1 flex items-center gap-3">
                            <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
                                style={{ width: `${scoreNum}%` }}
                              ></div>
                            </div>
                            <span className="text-white font-bold text-lg">{scoreNum}</span>
                          </div>
                        ) : isBadge ? (
                          <div className="mt-1">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getBadgeColor(key, strValue)}`}>
                              {strValue}
                            </span>
                          </div>
                        ) : (
                          <p className="text-white text-sm mt-1 leading-relaxed">{strValue}</p>
                        )}
                      </div>
                    );
                  } catch {
                    return null;
                  }
                })}
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-xs text-center mt-10">
          Built by SUYD — Software Development &amp; AI Solutions | Powered by Qwen 2.5 72B
        </p>
      </div>
    </div>
  );
}
