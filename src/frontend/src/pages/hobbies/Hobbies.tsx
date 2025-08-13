import React, { useEffect, useState } from 'react';
import api from '../../api/service';
import { Hobby } from '../../types/hobby';
import './styles.css';

/**
 * Hobbies page - displays a form to add/edit hobbies and a list of all hobbies
 */
const Hobbies: React.FC = () => {
  return (
    <div className="hobbies-container">
      <h1 className="hobbies-header">Hobbies Page</h1>
    </div>
  );
};

export default Hobbies;
