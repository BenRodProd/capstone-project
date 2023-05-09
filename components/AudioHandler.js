import { useState, useEffect, useRef } from "react";

const musicVolume = 0.2;

export default function AudioHandler({ level }) {
  const [volumeState, setVolumeState] = useState(0);

  console.log(level);
  const [backgroundAudioFile, setBackgroundAudioFile] = useState("");
  const [musicFile, setMusicFile] = useState("");

  const backgroundSound = useRef();
  const music = useRef();

  useEffect(() => {
    if (level === "library") {
      music.current.volume = 0;

      console.log(music.current);
      setBackgroundAudioFile("/assets/audio/back/library.mp3");

      setMusicFile("");
    }
    if (level.level === 1) {
      setBackgroundAudioFile("/assets/audio/back/meadows.mp3");
      setMusicFile("/assets/audio/music/orchestra3.mp3");
    }
    if (level.level === 2) {
      setBackgroundAudioFile("assets/audio/back/blackforest.mp3");
      music.current.volume = 0;
      setMusicFile("/assets/audio/music/orchestra4.mp3");
      music.current.volume = musicVolume;
    }
    if (level === "intro") {
      music.current.volume = musicVolume;
      setMusicFile("/assets/audio/music/intro.mp3");
      backgroundSound.current.pause();
      setBackgroundAudioFile("");

      console.log(music.current.volume);
      // fadeOutMusic(music.current, 0.3);
    }
    if (level.level === 8) {
      setBackgroundAudioFile("/assets/audio/back/cavesounds.mp3");
    }
    if (level.level === 3) {
      setMusicFile("assets/audio/music/orchestra1.mp3");
    }
    if ((level.level === 1) & (level.stage >= 3)) {
      music.current.volume = 0;
      setMusicFile("assets/audio/music/orchestra2.mp3");
      music.current.volume = musicVolume;
    }
    if ((level.level === 2) & (level.stage === 3 || level.stage === 5)) {
      music.current.volume = 0;
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
