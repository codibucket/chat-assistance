import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse, inputPlaceholder }) => {
 const inputRef = useRef();
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const userMessage = inputRef.current.value.trim();

        if(!userMessage) return;

        inputRef.current.value = "";
        setChatHistory(history => [...history, { role: "user", text: userMessage}]);

        setTimeout(() => {
            setChatHistory(history => [...history, { role: "model", text: "..."}]);

            generateBotResponse([...chatHistory, { role: "user", text: userMessage}]);

        }, 600);

        
    }
  return (<form action="#" className="chat-form" onSubmit={handleFormSubmit}>
    <input ref={inputRef} type="text" placeholder={inputPlaceholder} className="message-input" required></input>
    <button className="material-symbols-outlined">
        arrow_upward
    </button>
  </form>);
};


export default ChatForm;