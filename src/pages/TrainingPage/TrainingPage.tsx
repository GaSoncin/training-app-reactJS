import React from 'react';
import TrainingList from '../../components/TrainingList/TrainingList';
import './TrainingPage.css';
import profileImage from '../../assets/user.png';
import Background from "../../components/Background/Background"; // Importe o novo componente


const TrainingPage: React.FC = () => {
  return (
    
    <div className="training-page">
      <Background /> 
      <div className="header">
        <div className="menu">
          <span className="menu-icon">≡</span>
          <span className="menu-text">menu</span>
        </div>
      </div>
      <div className="profile-section">
        <h1 className="username">NOME<br />USUÁRIO</h1>
        <img src={profileImage} alt="User Profile" className="profile-image" />
      </div>
      <div className="training-list-container">
        <TrainingList />
      </div>
    </div>
  );
};

export default TrainingPage;
