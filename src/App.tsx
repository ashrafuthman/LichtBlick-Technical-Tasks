import React from 'react';
import { PhotosProvider } from "./Tasks/TaskB/contexts/PhotosContext";
import PhotosList from './Tasks/TaskB';
import { ThemeProvider } from './Tasks/TaskB/contexts/ThemeContext';

function App() {
  return (
    <PhotosProvider>
      <ThemeProvider>
        <PhotosList />
      </ThemeProvider>
    </PhotosProvider>
  );
}

export default App;
