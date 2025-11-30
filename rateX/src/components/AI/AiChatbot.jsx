import React, { useState, useRef, useEffect } from "react";
import { Bot, X, StepForward, LoaderPinwheel } from "lucide-react";
import OpenAI from "openai";

const AiChatbot = ({ coinData }) => {
  const [openChat, setOpenChat] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi 👋, how can I help you today?" }
  ]);

  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    const prompt = userMessage;
    setUserMessage("");
    setLoading(true);

    try {
      const response = await client.chat.completions.create({
        model: "z-ai/glm-4.5-air:free",
        messages: [
          {
            role: "system",
            content: "You are RateX AI, an assistant that provides meaningful crypto insights based ONLY on the given dataset."
          },
          { 
            role: "user", 
            content: `User query: ${prompt}\n\nCrypto Data: ${JSON.stringify(coinData)}`
          }
        ]
      });

      const aiReply = response.choices[0].message.content.trim();
      setMessages(prev => [...prev, { sender: "ai", text: aiReply }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "Sorry, something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Chat Window */}
      {openChat && (
        <div className="w-80 h-96 flex flex-col bg-[#F7F3F1] border border-[#E5D9D2] rounded-xl shadow-lg mb-3 overflow-hidden">

          {/* Header */}
          <div className="p-3 flex items-center justify-between border-b bg-[#FFEDD4]">
            <h2 className="text-sm font-semibold text-[#3A2F3B]">RateX AI Assistant</h2>
            <X 
              size={18} 
              className="cursor-pointer text-[#6D4E57] hover:text-red-500 transition" 
              onClick={() => setOpenChat(false)} 
            />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 bg-[#F7F3F1]">

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`px-3 py-2 text-sm rounded-lg shadow-sm max-w-[70%] ${
                    msg.sender === "user"
                      ? "bg-[#3A2F3B] text-white"
                      : "bg-white border border-neutral-300 text-[#3A2F3B]"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-neutral-500">
                <LoaderPinwheel className="animate-spin" size={16} />
                <span className="text-xs">RateX AI is thinking...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t bg-[#FFEDD4]">
            <div className="relative w-full">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="w-full pr-10 px-4 py-2 bg-white text-sm border border-[#E0D5C8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A3C7]"
                placeholder="Ask something..."
              />
              <button
                type="submit"
                className="absolute top-1/2 -translate-y-1/2 right-2 p-1.5 rounded-lg bg-[#6D4E57] hover:bg-[#7b6068] transition-all duration-200"
              >
                <StepForward className="text-white" size={18} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpenChat(prev => !prev)}
        className="bg-[#3A2F3B] shadow-lg p-3 rounded-full cursor-pointer hover:bg-[#7b6068] transition transform hover:scale-101"
      >
        <Bot className="text-white" size={30} />
      </button>
    </div>
  );
};

export default AiChatbot;
