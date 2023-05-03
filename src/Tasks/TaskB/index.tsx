import React, { useContext } from 'react';
import PhotosContext from './contexts/PhotosContext';
import { ThemeContext } from './contexts/ThemeContext';

const PhotosList = () => {
  const { photos, fetchPhotos } = useContext(PhotosContext)!;
  const { theme, toggleTheme } = useContext(ThemeContext)!;

  const containerStyle = {
    background: theme === 'light' ? 'white' : 'black',
  };

  const titleStyle = {
    color: theme === 'light' ? 'black' : 'white',
  };

  return (
    <div id="photos-list-container" style={containerStyle}>
      <ul id="photos-list">
        {photos.map((photo, index) => (
          <li key={index + 1}>
            <h3 style={titleStyle}>{photo.title}</h3>
            <img src={photo.thumbnailUrl} alt={photo.title} />
          </li>
        ))}
      </ul>
      <button id="fetch-photos" onClick={fetchPhotos}>
        Fetch more photos
      </button>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </div>
  );
}

export default PhotosList;
