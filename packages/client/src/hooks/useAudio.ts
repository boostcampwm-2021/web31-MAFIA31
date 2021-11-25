import { useEffect, useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useAudio = (src: string) => {
  const [audio] = useState(new Audio(src));
  const [playing, setPlaying] = useState(true);
  const history = useHistory();

  const toggleAudio = () => setPlaying((prev) => !prev);

  useLayoutEffect(() => {
    audio.volume = 0.1;
    audio.loop = true;
    audio.play();
  }, []);

  useEffect(() => {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        if (!playing) {
          audio.pause();
        }
      });
    }
  }, [playing]);

  useEffect(() => {
    const unlisten = history.listen(() => setPlaying(false));
    return unlisten;
  }, []);

  useEffect(
    () =>
      history.listen(() => {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          audio.pause();
        }
      }),
    [history],
  );

  return { playing, toggleAudio };
};

export default useAudio;
