import ChatbotIcon from "./ChatbotIcon";
import Loading from "./Loading";

const ChatMessage = ({ chat: { role, text } }) => {
  const isBot = role === "model";

  return (
    <div className={`message ${isBot ? "bot" : "user"}-message`}>
      {isBot && <ChatbotIcon />}
      {text === "..." ? <Loading /> : <p className="message-text">{text}</p>}
    </div>
  );
};

export default ChatMessage;
