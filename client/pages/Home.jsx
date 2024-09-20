import React from 'react';
import '../assets/styles.scss';
import GalleryView from '../components/GalleryView.jsx';
const Home = () => {
  return (
    <div id='pageView'>
      <h1 id='title'>Custom Furniture</h1>
      <GalleryView />
    </div>
  );
};

export default Home;
