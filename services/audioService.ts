// Audio service providing synthesised Web Audio API sound effects
// Includes:
// 1. 30-second timer countdown music/audio that eventuates as the clock progresses towards zero
// 2. Positive triumphant chime when correct
// 3. Negative buzzer sound when incorrect
// 4. Global mute/unmute control with persistent localStorage state

class AudioService {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private listeners: Set<(muted: boolean) => void> = new Set();
  private timerActive: boolean = false;
  private pendingTimeouts: number[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('game_audio_muted');
        if (stored !== null) {
          this.muted = stored === 'true';
        }
      } catch (_) {}
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return null;
        this.ctx = new AudioContextClass();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch (e) {
      console.warn('AudioContext not available:', e);
      return null;
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    try {
      localStorage.setItem('game_audio_muted', muted ? 'true' : 'false');
    } catch (_) {}
    if (muted) {
      this.stopTimer();
    }
    this.listeners.forEach(fn => fn(this.muted));
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  public subscribe(fn: (muted: boolean) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  public resumeAudio() {
    this.getContext();
  }

  /**
   * Start or reset the 30-second timer soundscape
   */
  public startTimer(durationSeconds: number = 30) {
    this.stopTimer();
    this.timerActive = true;
    this.tickTimer(durationSeconds);
  }

  /**
   * Stop timer audio immediately (e.g. when answering or leaving play mode)
   */
  public stopTimer() {
    this.timerActive = false;
    this.clearPendingTimeouts();
  }

  private clearPendingTimeouts() {
    this.pendingTimeouts.forEach(id => clearTimeout(id));
    this.pendingTimeouts = [];
  }

  /**
   * Called on each second tick of the timer (from 30 down to 0).
   * Eventuates the tension as the timer progresses to zero:
   * - 30s to 16s: Steady, rhythmic clock tick and subtle deep metronome pulse
   * - 15s to 6s: Rising tension, crisp dual tick-tock rhythm and overtone
   * - 5s to 1s: Urgent, escalating countdown warning pings with ascending pitch
   * - 0s: Timeout buzzer
   */
  public tickTimer(timeLeft: number) {
    if (this.muted || !this.timerActive) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (timeLeft > 15) {
      // Steady ticking phase (30 to 16):
      // Woodblock clock tick + subtle sub-bass tension pulse
      this.playClockTick(ctx, now, 520, 0.14);
      this.playBassPulse(ctx, now, 75, 0.12, 0.09);
    } else if (timeLeft > 5) {
      // Building tension phase (15 to 6):
      // Higher clock tick with a syncopated secondary tick ("tick-tock")
      const urgencyFactor = (16 - timeLeft) / 10; // 0.1 to 1.0
      const tickFreq = 600 + urgencyFactor * 180;
      this.playClockTick(ctx, now, tickFreq, 0.18);
      this.playBassPulse(ctx, now, 90 + urgencyFactor * 25, 0.16, 0.12);

      // Add second "tock" 160ms later
      const tockId = window.setTimeout(() => {
        if (!this.timerActive || this.muted) return;
        const ctxLater = this.getContext();
        if (ctxLater) {
          this.playClockTick(ctxLater, ctxLater.currentTime, tickFreq * 0.8, 0.12);
        }
      }, 160);
      this.pendingTimeouts.push(tockId);
    } else if (timeLeft > 0) {
      // Climax countdown phase (5, 4, 3, 2, 1):
      // Urgent escalating chime pings matching game-show countdowns
      const pitches: Record<number, number> = {
        5: 659.25, // E5
        4: 739.99, // F#5
        3: 830.61, // G#5
        2: 987.77, // B5
        1: 1174.66, // D6
      };
      const pitch = pitches[timeLeft] || 880;
      this.playUrgentPing(ctx, now, pitch, 0.28);
      // Double quick ping on the final second
      if (timeLeft === 1) {
        const pingId = window.setTimeout(() => {
          if (!this.timerActive || this.muted) return;
          const ctxLater = this.getContext();
          if (ctxLater) {
            this.playUrgentPing(ctxLater, ctxLater.currentTime, 1318.51, 0.26);
          }
        }, 220);
        this.pendingTimeouts.push(pingId);
      }
    } else if (timeLeft === 0) {
      // Time is up sound
      this.playTimeoutBuzzer(ctx, now);
    }
  }

  private playClockTick(ctx: AudioContext, time: number, freq: number, gainValue: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, time + 0.04);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 2.2, time);

    gain.gain.setValueAtTime(gainValue, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.05);
  }

  private playBassPulse(ctx: AudioContext, time: number, freq: number, gainValue: number, duration: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.7, time + duration);

    gain.gain.setValueAtTime(gainValue, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + duration + 0.01);
  }

  private playUrgentPing(ctx: AudioContext, time: number, freq: number, gainValue: number) {
    // Primary resonant ping
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    // Overtone harmonic
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, time);

    gain.gain.setValueAtTime(gainValue, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + 0.19);
    osc2.stop(time + 0.19);
  }

  private playTimeoutBuzzer(ctx: AudioContext, time: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, time);
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.28);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, time);
    filter.frequency.exponentialRampToValueAtTime(200, time + 0.28);

    gain.gain.setValueAtTime(0.24, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.31);
  }

  /**
   * Positive triumphant sound when an answer is correct
   * Upbeat ascending major chord arpeggio (C5 -> E5 -> G5 -> C6) with warm bell harmonics
   */
  public playCorrectSound() {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.stopTimer();

    const notes = [
      { freq: 523.25, timeOffset: 0.00 }, // C5
      { freq: 659.25, timeOffset: 0.07 }, // E5
      { freq: 783.99, timeOffset: 0.14 }, // G5
      { freq: 1046.50, timeOffset: 0.21 }, // C6
    ];

    const startTime = ctx.currentTime + 0.02;

    notes.forEach(({ freq, timeOffset }) => {
      const noteTime = startTime + timeOffset;

      const oscPrimary = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const noteGain = ctx.createGain();

      oscPrimary.type = 'sine';
      oscPrimary.frequency.setValueAtTime(freq, noteTime);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 2, noteTime);

      noteGain.gain.setValueAtTime(0.0001, noteTime);
      noteGain.gain.linearRampToValueAtTime(0.3, noteTime + 0.015);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.38);

      oscPrimary.connect(noteGain);
      oscHarmonic.connect(noteGain);
      noteGain.connect(ctx.destination);

      oscPrimary.start(noteTime);
      oscHarmonic.start(noteTime);
      oscPrimary.stop(noteTime + 0.4);
      oscHarmonic.stop(noteTime + 0.4);
    });
  }

  /**
   * Negative buzzer sound when an answer is incorrect
   * Two descending dissonant brassy buzzes (185Hz -> 130Hz)
   */
  public playIncorrectSound() {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.stopTimer();

    const startTime = ctx.currentTime + 0.02;

    const buzzes = [
      { baseFreq: 185, timeOffset: 0.00, duration: 0.16 }, // F#3
      { baseFreq: 130, timeOffset: 0.18, duration: 0.28 }, // C3 (tritone / deep interval)
    ];

    buzzes.forEach(({ baseFreq, timeOffset, duration }) => {
      const noteTime = startTime + timeOffset;

      // Two slightly detuned oscillators for authentic game-show buzzer bite
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const noteGain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(baseFreq, noteTime);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(baseFreq * 1.025, noteTime); // slight detune

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, noteTime);
      filter.frequency.exponentialRampToValueAtTime(350, noteTime + duration);

      noteGain.gain.setValueAtTime(0.0001, noteTime);
      noteGain.gain.linearRampToValueAtTime(0.24, noteTime + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(ctx.destination);

      osc1.start(noteTime);
      osc2.start(noteTime);
      osc1.stop(noteTime + duration + 0.02);
      osc2.stop(noteTime + duration + 0.02);
    });
  }
}

export const audioService = new AudioService();
