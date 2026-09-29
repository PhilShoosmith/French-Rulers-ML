import { getCustomBGM, saveCustomBGM, deleteCustomBGM } from './bgmStorage';

export interface BGMState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  trackName: string;
  isCustom: boolean;
}

const DEFAULT_TRACK_URL = '/audio/french-classical-opening.mp3';
const DEFAULT_TRACK_NAME = 'Erik Satie: Gymnopédie No. 1 (French Modern Classical)';

class BGMService {
  private audio: HTMLAudioElement | null = null;
  private currentObjectUrl: string | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.35;
  private trackName: string = DEFAULT_TRACK_NAME;
  private isCustom: boolean = false;
  private initialized: boolean = false;
  private pendingAutoplay: boolean = false;
  private listeners: Set<(state: BGMState) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const storedMute = localStorage.getItem('bgm_audio_muted');
        if (storedMute !== null) {
          this.isMuted = storedMute === 'true';
        }
        const storedVol = localStorage.getItem('bgm_audio_volume');
        if (storedVol !== null) {
          const parsed = parseFloat(storedVol);
          if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
            this.volume = parsed;
          }
        }
      } catch (_) {}
    }
  }

  public async init(): Promise<void> {
    if (typeof window === 'undefined' || this.initialized) return;
    this.initialized = true;

    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.volume = this.volume;
    this.audio.muted = this.isMuted;
    this.audio.preload = 'auto';

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.notify();
    });

    // Check if custom user uploaded file exists in IndexedDB
    try {
      const custom = await getCustomBGM();
      if (custom && custom.blob) {
        if (this.currentObjectUrl) {
          URL.revokeObjectURL(this.currentObjectUrl);
        }
        this.currentObjectUrl = URL.createObjectURL(custom.blob);
        this.audio.src = this.currentObjectUrl;
        this.trackName = custom.name || 'Custom French Music Track';
        this.isCustom = true;
      } else {
        this.audio.src = DEFAULT_TRACK_URL;
        this.trackName = DEFAULT_TRACK_NAME;
        this.isCustom = false;
      }
    } catch (e) {
      this.audio.src = DEFAULT_TRACK_URL;
      this.trackName = DEFAULT_TRACK_NAME;
      this.isCustom = false;
    }

    this.notify();
  }

  private notify() {
    const state: BGMState = {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      trackName: this.trackName,
      isCustom: this.isCustom,
    };
    this.listeners.forEach(fn => fn(state));
  }

  public subscribe(fn: (state: BGMState) => void): () => void {
    this.listeners.add(fn);
    fn(this.getState());
    return () => this.listeners.delete(fn);
  }

  public getState(): BGMState {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      trackName: this.trackName,
      isCustom: this.isCustom,
    };
  }

  /**
   * Start playing background music automatically on the opening screen.
   * Gracefully handles browser autoplay constraints by attaching a one-time gesture listener.
   */
  public async play(): Promise<void> {
    if (!this.audio) {
      await this.init();
    }
    if (!this.audio) return;

    try {
      await this.audio.play();
      this.isPlaying = true;
      this.pendingAutoplay = false;
      this.notify();
    } catch (err: any) {
      // Browser blocked autoplay due to user gesture requirement
      if (!this.pendingAutoplay && typeof window !== 'undefined') {
        this.pendingAutoplay = true;
        const startOnGesture = async () => {
          window.removeEventListener('pointerdown', startOnGesture);
          window.removeEventListener('keydown', startOnGesture);
          window.removeEventListener('touchstart', startOnGesture);
          if (this.pendingAutoplay && this.audio) {
            try {
              await this.audio.play();
              this.isPlaying = true;
              this.pendingAutoplay = false;
              this.notify();
            } catch (_) {}
          }
        };
        window.addEventListener('pointerdown', startOnGesture, { once: true });
        window.addEventListener('keydown', startOnGesture, { once: true });
        window.addEventListener('touchstart', startOnGesture, { once: true });
      }
    }
  }

  public pause(): void {
    this.pendingAutoplay = false;
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.notify();
  }

  public stop(): void {
    this.pendingAutoplay = false;
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.isPlaying = false;
    this.notify();
  }

  public togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.muted = this.isMuted;
    }
    try {
      localStorage.setItem('bgm_audio_muted', this.isMuted ? 'true' : 'false');
    } catch (_) {}
    this.notify();
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
    try {
      localStorage.setItem('bgm_audio_volume', this.volume.toString());
    } catch (_) {}
    this.notify();
  }

  /**
   * Upload and activate a custom MP3 file (e.g. modern-classical-french-music-02-481005.mp3)
   */
  public async uploadCustomTrack(file: File): Promise<void> {
    if (!this.audio) {
      await this.init();
    }
    await saveCustomBGM(file, file.name);

    if (this.currentObjectUrl) {
      URL.revokeObjectURL(this.currentObjectUrl);
    }
    this.currentObjectUrl = URL.createObjectURL(file);
    if (this.audio) {
      this.audio.src = this.currentObjectUrl;
      this.audio.currentTime = 0;
    }
    this.trackName = file.name;
    this.isCustom = true;
    this.notify();

    await this.play();
  }

  /**
   * Revert to the default classical French track
   */
  public async resetToDefault(): Promise<void> {
    await deleteCustomBGM();
    if (this.currentObjectUrl) {
      URL.revokeObjectURL(this.currentObjectUrl);
      this.currentObjectUrl = null;
    }
    if (this.audio) {
      this.audio.src = DEFAULT_TRACK_URL;
      this.audio.currentTime = 0;
    }
    this.trackName = DEFAULT_TRACK_NAME;
    this.isCustom = false;
    this.notify();

    await this.play();
  }
}

export const bgmService = new BGMService();
