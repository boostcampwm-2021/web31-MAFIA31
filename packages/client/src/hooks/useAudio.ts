import { useEffect, useRef, useState } from 'react';

const useAudio = (src: string = '') => {
  const audio = useRef(new Audio(src));
  const [playing, setPlaying] = useState<boolean>(false);

  const load = () => audio.current?.load();
  const play = () => audio.current?.play();
  const pause = () => audio.current?.pause();

  const updateAudio = (src: string) => {
    audio.current.src = src;
  };
  const updateLoop = (isLoop: boolean) => {
    audio.current.loop = isLoop;
  };
  const toggle = () => {
    setPlaying((prev) => !prev);
  };
  const toggleSound = () => {
    if (playing) {
      play();
    } else {
      pause();
    }
  };

  useEffect(() => {
    audio.current.volume = 0.1;
  }, []);

  useEffect(() => {
    toggleSound();
  }, [playing]);

  return { playing, updateAudio, updateLoop, toggle, load, play, pause };
};

export default useAudio;
