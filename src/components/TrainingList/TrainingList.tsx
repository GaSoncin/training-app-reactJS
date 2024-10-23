import React, { useState } from "react";
import TrainingCard from "../TrainingCard/TrainingCard";
import "./TrainingList.css";
import certificadoImg from "../../assets/certificado.jpg"; // Certifique-se de que o caminho está correto

const trainings = [
  { title: "Treinamento de produção", date: "21/10/2022" },
  { title: "Treinamento de liderança", date: "11/09/2022" },
  { title: "Treinamento em vendas", date: "10/05/2022" },
  { title: "Treinamento de ti", date: "23/03/2022" },
  { title: "Treinamento em gestão", date: "04/01/2022" },
  { title: "Treinamento de ética", date: "08/12/2021" },
  { title: "Treinamento em segurança", date: "24/10/2021" },
];

const TrainingList: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupImage, setPopupImage] = useState<string | null>(null);

  const handleCardClick = () => {
    setPopupImage(certificadoImg);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupImage(null);
  };

  return (
    <div className="training-list">
      {trainings.map((training, index) => (
        <TrainingCard
          key={index}
          title={training.title}
          date={training.date}
          onClick={handleCardClick}
        />
      ))}

      {isPopupOpen && popupImage && (
        <div className="popup">
          <div className="popup-content">
            <img src={popupImage} alt="Certificado" />
            <button onClick={closePopup}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingList;
