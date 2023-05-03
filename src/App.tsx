import React from 'react';
import { PhotosProvider } from "./Tasks/TaskB/contexts/PhotosContext";
import PhotosList from './Tasks/TaskB';
import AutoComplete from './Tasks/TaskA';
import { ThemeProvider } from './Tasks/TaskB/contexts/ThemeContext';

function App() {
  return (
    <>
      <AutoComplete onSelectItem={(country) => alert(country)} />
      <hr/>
      <PhotosProvider>
        <ThemeProvider>
          <PhotosList />
        </ThemeProvider>
      </PhotosProvider>
    </>
  );
}

export default App;
