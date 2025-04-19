document.addEventListener('DOMContentLoaded', () => {
  const samples = document.querySelectorAll('.sample');
  const stopAllBtn = document.getElementById('stopAll');
  const shuffleBtn = document.getElementById('shuffle');
  let currentlyPlaying = null;
  
  // Play sample function
  function playSample(sample) {
    // Stop currently playing sample
    if (currentlyPlaying) {
      const currentAudio = document.getElementById(currentlyPlaying.dataset.sound);
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentlyPlaying.classList.remove('active');
    }
    
    // Play new sample
    const soundId = sample.dataset.sound;
    const audio = document.getElementById(soundId);
    
    audio.currentTime = 0;
    audio.play()
      .then(() => {
        sample.classList.add('active');
        currentlyPlaying = sample;
      })
      .catch(error => {
        console.error('Error playing audio:', error);
      });
    
    // Remove active class when audio ends
    audio.onended = () => {
      sample.classList.remove('active');
      currentlyPlaying = null;
    };
  }
  
  // Add click event to all samples
  samples.forEach(sample => {
    sample.addEventListener('click', () => {
      playSample(sample);
    });
  });
  
  // Stop all audio
  stopAllBtn.addEventListener('click', () => {
    samples.forEach(sample => {
      const audio = document.getElementById(sample.dataset.sound);
      audio.pause();
      audio.currentTime = 0;
      sample.classList.remove('active');
    });
    currentlyPlaying = null;
  });
  
  // Shuffle samples
  shuffleBtn.addEventListener('click', () => {
    const soundboard = document.querySelector('.soundboard');
    const samplesArray = Array.from(samples);
    
    // Fisher-Yates shuffle algorithm
    for (let i = samplesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [samplesArray[i], samplesArray[j]] = [samplesArray[j], samplesArray[i]];
    }
    
    // Reattach shuffled samples
    samplesArray.forEach(sample => {
      soundboard.appendChild(sample);
    });
  });
  
  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && currentlyPlaying) {
      e.preventDefault();
      const audio = document.getElementById(currentlyPlaying.dataset.sound);
      audio.pause();
      audio.currentTime = 0;
      currentlyPlaying.classList.remove('active');
      currentlyPlaying = null;
    }
  });
});
