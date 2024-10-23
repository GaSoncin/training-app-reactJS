import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrainingJourney.css";
import blockIcon1 from "../../assets/block.png";
import blockIcon2 from "../../assets/block.png";
import blockIcon3 from "../../assets/block.png";
import blockIcon4 from "../../assets/block.png";
import blockIcon5 from "../../assets/block.png";
import characterIcon from "../../assets/character.png";
import trophyIcon from "../../assets/trophy.png";
import Background from "../../components/Background/Background";

const TrainingJourney: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const stages = [
    { id: 0, name: "Introdução a produção", icon: blockIcon1 },
    { id: 1, name: "Conceitos de produção pt1", icon: blockIcon2 },
    { id: 2, name: "Conceitos de produção pt2", icon: blockIcon3 },
    { id: 3, name: "Metas de produção", icon: blockIcon4 },
    { id: 4, name: "Sequência de produção", icon: blockIcon5 },
    { id: 5, name: "Certificação", icon: trophyIcon },
  ];

  const moveLeft = () => {
    setCurrentPosition((prevPosition) => Math.max(prevPosition - 1, 0));
  };

  const moveRight = () => {
    setCurrentPosition((prevPosition) =>
      Math.min(prevPosition + 1, stages.length - 1)
    );
  };

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="training-journey">
      <Background />
      <div className="header">
        <div className="menu" onClick={toggleMenu}>
          <span className="menu-icon">≡</span>
          <span className="menu-text">menu</span>
          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/")}>Sair</button>
              <button onClick={() => navigate("/trainings")}>Perfil</button>
              <button onClick={() => navigate("/iapage")}>GALLI</button>
            </div>
          )}
        </div>
      </div>
      <h1 className="title">JORNADA DO TREINAMENTO</h1>
      <div className="journey-container">
        {stages.map((stage, index) => (
          <div className="stage" key={stage.id}>
            {currentPosition === index && (
              <img
                src={characterIcon}
                alt="Personagem"
                className="stage-icon character"
              />
            )}
            <img src={stage.icon} alt={stage.name} className="stage-icon" />
            <p>{stage.name}</p>
          </div>
        ))}
      </div>
      <div className="controls">
        <button
          onClick={moveRight}
          disabled={currentPosition === stages.length - 1}
        >
          Modulo Concluído
        </button>
      </div>
    </div>
  );
};

export default TrainingJourney;