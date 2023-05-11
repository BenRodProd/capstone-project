import { Howl, Howler } from "howler";
export function fightSound() {
  const fightSounds = [
    "/assets/audio/fx/fight01.mp3",
    "/assets/audio/fx/fight02.mp3",
    "/assets/audio/fx/fight03.mp3",
    "/assets/audio/fx/fight04.mp3",
    "/assets/audio/fx/fight05.mp3",
    "/assets/audio/fx/fight06.mp3",
    "/assets/audio/fx/fight07.mp3",
    "/assets/audio/fx/fight08.mp3",
  ];

  const randomFightSound = new Howl({
    src: [fightSounds[Math.floor(Math.random() * fightSounds.length)]],
  });

  const randomVolume = Math.random() * 0.3;
  randomFightSound.volume(randomVolume);

  randomFightSound.play();
}

export function hurtSound() {
  const hurtSounds = [
    "/assets/audio/fx/hurt01.mp3",
    "/assets/audio/fx/hurt02.mp3",
    "/assets/audio/fx/hurt03.mp3",
  ];
  const randomHurtSound = new Howl({
    src: [hurtSounds[Math.floor(Math.random() * hurtSounds.length)]],
  });

  const randomVolume = Math.random() * 0.3;
  randomHurtSound.volume(randomVolume);

  randomHurtSound.play();
}
