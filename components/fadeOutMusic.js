import { useState } from "react";

export default function fadeOutMusic(musicRef, volume) {
  const [volumeState, setVolumeState] = useState(volume);

  for (let i = volume; i === 0; i - 0.01) {
    setVolumeState(i);
    musicRef.volume = volumeState;
  }
}
