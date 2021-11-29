import { useEffect, useRef } from 'react';

const useAudio = () => {
  const audio = useRef(new Audio());

  const updateAudio = (src: string) => {
    audio.current.src = src;
  };

  const load = () => audio.current?.load();
  const play = () => audio.current?.play();
  const pause = () => audio.current?.pause();

  useEffect(() => {
    audio.current.volume = 0.1;
  }, []);

  return { updateAudio, load, play, pause };
};

export default useAudio;
