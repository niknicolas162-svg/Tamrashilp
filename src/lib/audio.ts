// Web Audio API ambient chime synthesizer (no external audio files needed)

class AtelierAudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playChime(528, 0.15); // gentle 528Hz Solfeggio frequency
    }
    return !this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playHammerChime() {
    if (this.isMuted) return;
    // Harmonic metallic resonance mimicking a brass hammer tap on pure copper
    this.playChime(852, 0.12, 1.2);
    setTimeout(() => this.playChime(1280, 0.08, 0.8), 60);
  }

  public playAnvilStrike() {
    if (this.isMuted) return;
    this.playChime(432, 0.2, 1.8);
    setTimeout(() => this.playChime(648, 0.1, 1.4), 40);
  }

  public playChime(freq: number, volume: number = 0.15, decay: number = 1.0) {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + decay);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + decay);
    } catch {
      // Audio not permitted yet
    }
  }
}

export const atelierAudio = new AtelierAudioService();

