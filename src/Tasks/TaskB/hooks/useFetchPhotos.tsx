import axios from 'axios';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Photo } from '../types';


export const useFetchPhotos = () => {
  const [photos, setPhotos] = useState<Array<Photo>>([]);
  const [loading, setLoading] = useState(false);
  const fetchPhotosRef = useRef<() => void>();

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/photos?_start=0&_limit=1'
      );
      setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  fetchPhotosRef.current = fetchPhotos;

  useEffect(() => {
    fetchPhotosRef.current?.();
  }, []);

  return { photos, fetchPhotos: fetchPhotosRef.current, loading };
};
