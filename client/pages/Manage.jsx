import React from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles.scss';
import Gallery from '../components/Gallery.jsx';

const Manage = () => {
  const { userId } = useParams();
  console.log(userId);
  return (
    <div>
      <Gallery />
    </div>
  );
};

export default Manage;
