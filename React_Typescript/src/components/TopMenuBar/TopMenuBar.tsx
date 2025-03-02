import React from 'react';
import '../../css/TopMenuBar/TopMenuBar.css';

const TopMenuBar: React.FC = () => {
  return (
    <div className="tmb-container">
      <div className="tmb-logo">ChatBot</div>
      <div className="tmb-avatar">
        <img
          src="/images/user_profile.png"
          alt="User Avatar"
          className="tmb-avatar-circle"
        />
      </div>
    </div>
  );
};

export default TopMenuBar;