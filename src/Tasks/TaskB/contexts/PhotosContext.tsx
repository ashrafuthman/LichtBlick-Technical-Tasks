import React, { createContext, ReactNode } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import { Photo } from '../types';


interface PhotosContextType {
  photos: Array<Photo>;
  fetchPhotos: () => void;
  loading: boolean;
}

const PhotosContext = createContext<PhotosContextType | null>(null);

interface PhotosProviderProps {
  children: ReactNode;
}

const PhotosProvider = ({ children }: PhotosProviderProps) => {
  const { photos, fetchPhotos, loading } = useFetchPhotos();

  return (
    <PhotosContext.Provider value={{ photos, fetchPhotos, loading }}>
      {children}
    </PhotosContext.Provider>
  );
};

export default PhotosContext;
export { PhotosProvider };

