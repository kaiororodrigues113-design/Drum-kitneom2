const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Função para criar sons de bateria estilo rock
function playDrum(type) {
  const now = audioCtx.currentTime;

  switch (type) {
    case "A": // Kick
      const kick = audioCtx.createOscillator();
      const kickGain = audioCtx.createGain();
      kick.type = "sine";
      kick.frequency.setValueAtTime(150, now);
      kick.frequency.exponentialRampToValueAtTime(50, now + 0.5);
      kickGain.gain.setValueAtTime(1, now);
      kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      kick.connect(kickGain).connect(audioCtx.destination);
      kick.start();
      kick.stop(now + 0.5);
      break;

    case "S": // Snare
      const snare = audioCtx.createBufferSource();
      const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.2, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1; // White noise
      snare.buffer = buffer;
      const snareGain = audioCtx.createGain();
      snare.connect(snareGain).connect(audioCtx.destination);
      snareGain.gain.setValueAtTime(0.7, now);
      snareGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      snare.start();
      snare.stop(now + 0.2);
      break;

    case "D": // Hi-hat
      const hat = audioCtx.createBufferSource();
      const hatBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.05, audioCtx.sampleRate);
      const hatData = hatBuffer.getChannelData(0);
      for (let i = 0; i < hatData.length; i++) hatData[i] = Math.random() * 2 - 1; // White noise rápido
      hat.buffer = hatBuffer;
      const hatGain = audioCtx.createGain();
      hat.connect(hatGain).connect(audioCtx.destination);
      hatGain.gain.setValueAtTime(0.3, now);
      hatGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      hat.start();
      hat.stop(now + 0.05);
      break;

    case "F": // Tom médio
      const tom = audioCtx.createOscillator();
      const tomGain = audioCtx.createGain();
      tom.type = "sine";
      tom.frequency.setValueAtTime(200, now);
      tom.frequency.exponentialRampToValueAtTime(100, now + 0.4);
      tomGain.gain.setValueAtTime(0.6, now);
      tomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      tom.connect(tomGain).connect(audioCtx.destination);
      tom.start();
      tom.stop(now + 0.4);
      break;

    case "G": // Tom grave
      const lowTom = audioCtx.createOscillator();
      const lowGain = audioCtx.createGain();
      lowTom.type = "sine";
      lowTom.frequency.setValueAtTime(100, now);
      lowTom.frequency.exponentialRampToValueAtTime(50, now + 0.5);
      lowGain.gain.setValueAtTime(0.6, now);
      lowGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      lowTom.connect(lowGain).connect(audioCtx.destination);
      lowTom.start();
      lowTom.stop(now + 0.5);
      break;

    case "H": // Crash (ruído com decaimento longo)
      const crash = audioCtx.createBufferSource();
      const crashBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.5, audioCtx.sampleRate);
      const crashData = crashBuffer.getChannelData(0);
      for (let i = 0; i < crashData.length; i++) crashData[i] = Math.random() * 2 - 1;
      crash.buffer = crashBuffer;
      const crashGain = audioCtx.createGain();
      crash.connect(crashGain).connect(audioCtx.destination);
      crashGain.gain.setValueAtTime(0.5, now);
      crashGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      crash.start();
      crash.stop(now + 0.5);
      break;

    case "J": // Ride (ruído mais curto e suave)
      const ride = audioCtx.createBufferSource();
      const rideBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.15, audioCtx.sampleRate);
      const rideData = rideBuffer.getChannelData(0);
      for (let i = 0; i < rideData.length; i++) rideData[i] = Math.random() * 2 - 1;
      ride.buffer = rideBuffer;
      const rideGain = audioCtx.createGain();
      ride.connect(rideGain).connect(audioCtx.destination);
      rideGain.gain.setValueAtTime(0.3, now);
      rideGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      ride.start();
      ride.stop(now + 0.15);
      break;

    case "K": // Clap
      const clap = audioCtx.createBufferSource();
      const clapBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.2, audioCtx.sampleRate);
      const clapData = clapBuffer.getChannelData(0);
      for (let i = 0; i < clapData.length; i++) clapData[i] = Math.random() * 2 - 1;
      clap.buffer = clapBuffer;
      const clapGain = audioCtx.createGain();
      clap.connect(clapGain).connect(audioCtx.destination);
      clapGain.gain.setValueAtTime(0.6, now);
      clapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      clap.start();
      clap.stop(now + 0.2);
      break;

    case "L": // Percussão adicional (tom curto)
      const perc = audioCtx.createOscillator();
      const percGain = audioCtx.createGain();
      perc.type = "triangle";
      perc.frequency.setValueAtTime(300, now);
      perc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
      percGain.gain.setValueAtTime(0.5, now);
      percGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      perc.connect(percGain).connect(audioCtx.destination);
      perc.start();
      perc.stop(now + 0.1);
      break;

    default:
      console.log("Tecla sem som definido:", type);
  }
}

// Selecionando pads
const pads = document.querySelectorAll('.pad');

pads.forEach(pad => {
  pad.addEventListener('click', () => triggerPad(pad.dataset.key));
});

// Atalho de teclado
window.addEventListener('keydown', e => {
  const key = e.key.toUpperCase();
  triggerPad(key);
});

// Função de trigger com efeito visual
function triggerPad(key) {
  const pad = document.querySelector(`.pad[data-key="${key}"]`);
  if (!pad) return;

  pad.classList.add('active');
  setTimeout(() => pad.classList.remove('active'), 120);

  playDrum(key);
}
