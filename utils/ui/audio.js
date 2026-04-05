export function setupAudio() {
  const backgroundSound = new Audio("/music.mp3");
  backgroundSound.loop = true;
  backgroundSound.volume = 0.4;

  const musicToggle = document.getElementById("music-toggle");
  let musicPlaying = false;

  if (!musicToggle) return;

  musicToggle.addEventListener("click", async () => {
    try {
      if (musicPlaying) {
        backgroundSound.pause();
        musicPlaying = false;
        musicToggle.textContent = "▶ Play Music";
      } else {
        await backgroundSound.play();
        musicPlaying = true;
        musicToggle.textContent = "⏸ Mute";
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  });
}