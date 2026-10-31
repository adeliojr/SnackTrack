// Audio synthesizer using Web Audio API (reliable, zero external file dependencies)

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/** Beep de confirmação do caixa */
export function playCashierBeep() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08); // E6

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    console.warn('Audio play error:', e);
  }
}

/** Sino de restaurante da cozinha ("Ding!" para novo pedido na chapa) */
export function playKitchenBell() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(1400, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2100, now);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.8);
    osc2.stop(now + 0.8);
  } catch (e) {
    console.warn('Kitchen bell audio error:', e);
  }
}

/** Melodia "Ding-Dong" clássica de painel de chamada de senhas */
export function playCallChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Primeiro tom: E5 (659 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.5);

    // Segundo tom: C5 (523 Hz) após 250ms
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(523.25, now + 0.25);
    gain2.gain.setValueAtTime(0.35, now + 0.25);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.25);
    osc2.stop(now + 0.9);
  } catch (e) {
    console.warn('Call chime audio error:', e);
  }
}

/** Chamada por voz (Síntese de fala pt-BR) */
export function speakOrder(orderNumber: number, customerName: string) {
  if (!('speechSynthesis' in window)) return;

  try {
    // Cancela falas anteriores para não acumular
    window.speechSynthesis.cancel();

    const formattedNumber = String(orderNumber).padStart(2, '0');
    const text = `Senha ${formattedNumber}! ${customerName}, seu pedido está pronto para retirada no balcão!`;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    // Tentar selecionar voz em português se disponível
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find((v) => v.lang.startsWith('pt'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    // Delay de 500ms para tocar após o Ding-Dong
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 400);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
}
