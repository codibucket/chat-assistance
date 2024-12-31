import { useState, useEffect, useRef } from "react";
import "../App.css";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";



const ChatAssistance = ({headerText, inputPlaceholder}) => {
  const chatBodyRef = useRef();
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleChatbot = () => setShowChatbot((prev) => !prev);

  const clearChatHistory = () => {
    setChatHistory([]);
  };

  const callChatAPI = async (inputText) => {
    try {
      const response = await fetch("https://localhost:7130/Chat/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputText), 
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
       return data?.answer;
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  const generateBotResponse = async (history) => {
    try {
      const updateHistory = (text) => {
        setChatHistory((prev) => [
          ...prev.filter((msg) => msg.text !== "..."),
          { role: "model", text },
        ]);
      };

      history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

      var res = await callChatAPI(history);
      setTimeout(() => {
        updateHistory(
          res
        );
      }, 1000);
    } catch (error) {
      console.error("Error generating bot response:", error);
      setChatHistory((prev) => [
        ...prev,
        { role: "model", text: "Something went wrong. Please try again!" },
      ]);
    }
  };
  

const toggleChatExpansion = () => {
  setIsExpanded((prev) => !prev);
};

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);
    return (
      <div className={`container ${showChatbot ? "show-chatbot" : ""} ${isExpanded ? "expanded" : ""}`}>
          <button id="chatbot-toggler" onClick={toggleChatbot}>
            <span className="material-symbols-outlined">mode_comment</span>
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="chat-bot-popup">
            <div className="chat-bot-header">
              <div className="header-info">
                <ChatbotIcon />
                <h2 className="logo-text">{headerText}</h2>
              </div>
              <div className="header-actions">
              <button 
            className="material-symbols-outlined expand-btn" 
            onClick={toggleChatExpansion} 
            title="Expand Chat Window">
  open_in_full
</button>
                <button
                  className="material-symbols-outlined clear-btn"
                  onClick={clearChatHistory}
                  title="Clear Chat"
                >
                  delete
                </button>
                <button
                  className="material-symbols-outlined"
                  onClick={toggleChatbot}
                  title="Close"
                >
                  arrow_drop_down
                </button>
              </div>
            </div>
            <div ref={chatBodyRef} className="chat-body">
              <div className="message bot-message">
                <ChatbotIcon />
                <p className="message-text">Hey!!! How can I help you??</p>
              </div>
              {chatHistory.map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))}
            </div>
            <div className="chat-footer">
              <ChatForm
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                generateBotResponse={generateBotResponse}
                inputPlaceholder={inputPlaceholder}
              />
            </div>
          </div>
        </div>
      );
}

export default ChatAssistance;