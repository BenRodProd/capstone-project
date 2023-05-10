import { useState, useEffect, useRef } from "react";

const musicVolume = 0.5;
const backgroundVolume = 0.4;
export default function AudioHandler({ level }) {
  const [backgroundAudioFile, setBackgroundAudioFile] = useState("");
  const [musicFile, setMusicFile] = useState("");

  const backgroundSound = useRef();
  const music = useRef();

  useEffect(() => {
    if (level === "library") {
      music.current.volume = 0;
      backgroundSound.current.volume = backgroundVolume - 0.05;
      setBackgroundAudioFile("/assets/audio/back/library.mp3");
      setMusicFile("");
    }
    if (level.level === 1) {
      music.current.volume = musicVolume;
      backgroundSound.current.volume = backgroundVolume;
      setBackgroundAudioFile("/assets/audio/back/meadows.mp3");
      setMusicFile("/assets/audio/music/orchestra3.mp3");
    }
    if (level.level === 2) {
      music.current.volume = musicVolume - 0.4;
      backgroundSound.current.volume = backgroundVolume - 0.25;
      setBackgroundAudioFile("assets/audio/back/blackforest.mp3");
      setMusicFile("/assets/audio/music/orchestra4.mp3");
    }
    if (level === "intro") {
      backgroundSound.current.volume = 0;
      music.current.volume = musicVolume + 0.2;
      setMusicFile("/assets/audio/music/intro.mp3");
      setBackgroundAudioFile("");
    }
    if (level.level === 8) {
      backgroundSound.current.volume = backgroundVolume;
      setBackgroundAudioFile("/assets/audio/back/cavesounds.mp3");
    }
    if (level.level === 3) {
      setBackgroundAudioFile("");
      setMusicFile("assets/audio/music/orchestra1.mp3");
      music.current.volume = musicVolume;
    }
    if ((level.level === 1) & (level.stage >= 3)) {
      backgroundSound.current.volume = backgroundVolume;
      setMusicFile("assets/audio/music/orchestra2.mp3");
      music.current.volume = musicVolume;
    }
    if ((level.level === 2) & (level.stage === 3 || level.stage === 5)) {
      backgroundSound.current.volume = backgroundVolume - 0.25;
      setMusicFile("assets/audio/music/orchestra2.mp3");
      music.current.volume = musicVolume;
    }
  }, [level]);
  return (
    <>
      <audio
        src={backgroundAudioFile}
        ref={backgroundSound}
        autoPlay
        loop
      ></audio>
      <audio src={musicFile} ref={music} autoPlay loop></audio>
    </>
  );
}
