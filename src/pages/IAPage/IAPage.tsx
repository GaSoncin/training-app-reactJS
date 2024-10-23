import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IAPage.css";
import iaImage from "../../assets/iaImage.jpg";
import Background from "../../components/Background/Background";

const IApage: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { speaker: "IA", message: "Como posso ajudar?" },
  ]);
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const newChatHistory = [
      ...chatHistory,
      { speaker: "user", message: userInput },
    ];
    setChatHistory(newChatHistory);
    setUserInput("");
    setLoading(true); // Ativa o carregamento

    const messages = newChatHistory.map((chat) => ({
      role: chat.speaker === "IA" ? "assistant" : "user",
      content: chat.message,
    }));

    try {
      const response = await fetch("/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llmstudio-community/Llama-3.2-3B-Instruct-GGUF/Llama-3.2-3B-Instruct-Q4_K_M.gguf",
          messages: messages,
        }),
      });

      const data = await response.json();
      setLoading(false); // Desativa o carregamento

      if (data.choices && data.choices.length > 0) {
        const iaMessage = data.choices[0].message.content;
        setChatHistory([...newChatHistory, { speaker: "IA", message: iaMessage }]);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setLoading(false); // Desativa o carregamento mesmo em caso de erro
    }
  };

  return (
    <div className="IA-page">
      <Background />
      <div className="header">
        <div className="menu" onClick={toggleMenu}>
          <span className="menu-icon">≡</span>
          <span className="menu-text">menu</span>
          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/")}>Sair</button>
              <button onClick={() => navigate("/trainings")}>Perfil</button>
              <button onClick={() => navigate("/journey")}>Jornada</button>
            </div>
          )}
        </div>
      </div>
      <img src={iaImage} alt="IA foto" className="ia-image" />
      <h1 className="username">GALLI-IA</h1>
      <div className="chat-box">
        <div className="chats">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={chat.speaker === "IA" ? "IaChat" : "user-chat"}
            >
              {chat.message}
            </div>
          ))}
          {loading && (
            <div className="loading">Carregando...</div> /* Animação de carregamento */
          )}
        </div>
        <input
          className="text-bar"
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
      </div>
    </div>
  );
};

export default IApage;
