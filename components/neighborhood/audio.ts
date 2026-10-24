/**
 * Procedural Web Audio API Sound Generator for HalloweenVerse.
 * Requires 0 external audio files, completely immune to 404s, works reliably offline.
 */

class NeighborhoodAudioManager {
    private ctx: AudioContext | null = null;
    private isMuted: boolean = true;
    private masterGain: GainNode | null = null;

    // Ambient nodes
    private ambientGain: GainNode | null = null;
    private windSource: AudioBufferSourceNode | null = null;

    // Party music nodes
    private partyGain: GainNode | null = null;
    private partyInterval: number | null = null;
    private partyBeat: number = 0;

    // Throttle for footsteps
    private lastFootstepTime: number = 0;

    private initContext() {
        if (!this.ctx && typeof window !== "undefined") {
            const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = this.isMuted ? 0 : 0.8;
                this.masterGain.connect(this.ctx.destination);

                this.setupAmbience();
                this.setupPartySynth();
            }
        }
    }

    private setupAmbience() {
        if (!this.ctx || !this.masterGain) return;

        // Generate 4 seconds of looping filtered wind noise
        const bufferSize = this.ctx.sampleRate * 4;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + 0.02 * white) / 1.02; // Pink-ish filter
            lastOut = output[i];
        }

        this.windSource = this.ctx.createBufferSource();
        this.windSource.buffer = noiseBuffer;
        this.windSource.loop = true;

        // Filter to make it sound like night wind rustling through trees
        const filter = this.ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 320;
        filter.Q.value = 2.5;

        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.value = 0.18;

        this.windSource.connect(filter);
        filter.connect(this.ambientGain);

        // Subtle eerie sub-drone for horror Halloween atmosphere
        try {
            const droneOsc = this.ctx.createOscillator();
            const droneGain = this.ctx.createGain();
            const droneFilter = this.ctx.createBiquadFilter();

            droneOsc.type = "sawtooth";
            droneOsc.frequency.value = 55; // Low A1 note
            droneFilter.type = "lowpass";
            droneFilter.frequency.value = 110;
            droneGain.gain.value = 0.08;

            droneOsc.connect(droneFilter);
            droneFilter.connect(droneGain);
            droneGain.connect(this.ambientGain);
            droneOsc.start();
        } catch {
            // Ignore if oscillator blocked
        }

        this.ambientGain.connect(this.masterGain);

        try {
            this.windSource.start();
        } catch {
            // Ignore if already started
        }
    }

    private setupPartySynth() {
        if (!this.ctx || !this.masterGain) return;

        this.partyGain = this.ctx.createGain();
        this.partyGain.gain.value = 0; // Starts silent until near party
        this.partyGain.connect(this.masterGain);

        // Funky spooky bassline notes (Hz)
        const bassLine = [110, 110, 130.81, 110, 146.83, 130.81, 123.47, 98]; // A2, A2, C3, A2, D3, C3, B2, G2

        // Looping spooky party beat
        if (typeof window !== "undefined") {
            this.partyInterval = window.setInterval(() => {
                if (this.isMuted || !this.ctx || this.partyGain!.gain.value < 0.01) {
                    this.partyBeat = (this.partyBeat + 1) % bassLine.length;
                    return;
                }

                const now = this.ctx.currentTime;

                // Bass synth pluck
                const osc = this.ctx.createOscillator();
                const noteGain = this.ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(bassLine[this.partyBeat], now);

                // Low-pass filter for funky rounded bass
                const filter = this.ctx.createBiquadFilter();
                filter.type = "lowpass";
                filter.frequency.setValueAtTime(600, now);
                filter.frequency.exponentialRampToValueAtTime(150, now + 0.18);

                noteGain.gain.setValueAtTime(0.12, now);
                noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

                osc.connect(filter);
                filter.connect(noteGain);
                noteGain.connect(this.partyGain!);

                osc.start(now);
                osc.stop(now + 0.24);

                // Hi-hat / shaker on every other beat
                if (this.partyBeat % 2 === 1) {
                    this.playHiHat(now);
                }

                this.partyBeat = (this.partyBeat + 1) % bassLine.length;
            }, 240); // ~125 BPM
        }
    }

    private playHiHat(time: number) {
        if (!this.ctx || !this.partyGain) return;
        const bufferSize = this.ctx.sampleRate * 0.04;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 7000;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.04, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.partyGain);

        noise.start(time);
        noise.stop(time + 0.04);
    }

    /**
     * Updates party music volume based on player distance to party center (0, 0).
     */
    public updatePartyDistance(playerX: number, playerZ: number) {
        if (!this.partyGain || !this.ctx) return;
        const dist = Math.hypot(playerX, playerZ);
        // Full volume inside 6 units, fades to 0 at 26 units
        const maxDist = 26;
        const minDist = 6;
        let volume = 0;
        if (dist <= minDist) {
            volume = 0.35;
        } else if (dist < maxDist) {
            volume = 0.35 * (1 - (dist - minDist) / (maxDist - minDist));
        }

        const now = this.ctx.currentTime;
        this.partyGain.gain.setTargetAtTime(this.isMuted ? 0 : volume, now, 0.2);
    }

    public playFootstep() {
        this.initContext();
        if (this.isMuted || !this.ctx || !this.masterGain) return;

        const now = Date.now();
        if (now - this.lastFootstepTime < 280) return;
        this.lastFootstepTime = now;

        const time = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Subtle soft leafy thud
        osc.type = "triangle";
        const pitch = 90 + Math.random() * 25;
        osc.frequency.setValueAtTime(pitch, time);
        osc.frequency.exponentialRampToValueAtTime(35, time + 0.08);

        gain.gain.setValueAtTime(0.09, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + 0.09);
    }

    public playJump() {
        this.initContext();
        if (this.isMuted || !this.ctx || !this.masterGain) return;

        const time = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(180, time);
        osc.frequency.exponentialRampToValueAtTime(420, time + 0.15);

        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + 0.17);
    }

    public playDoorbell() {
        this.initContext();
        if (this.isMuted || !this.ctx || !this.masterGain) return;

        const time = this.ctx.currentTime;
        const chime = (freq: number, start: number) => {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();
            osc.type = "sine";
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(0.2, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);

            osc.connect(gain);
            gain.connect(this.masterGain!);

            osc.start(start);
            osc.stop(start + 0.65);
        };

        // Two-tone bell "Ding-Dong"
        chime(659.25, time); // E5
        chime(523.25, time + 0.3); // C5
    }

    public playTreatCollect() {
        this.initContext();
        if (this.isMuted || !this.ctx || !this.masterGain) return;

        const time = this.ctx.currentTime;
        // Ascending sparkly magical arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();
            osc.type = "triangle";
            osc.frequency.value = freq;

            const noteTime = time + idx * 0.08;
            gain.gain.setValueAtTime(0.18, noteTime);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);

            osc.connect(gain);
            gain.connect(this.masterGain!);

            osc.start(noteTime);
            osc.stop(noteTime + 0.45);
        });
    }

    public playSpookyChime() {
        this.initContext();
        if (this.isMuted || !this.ctx || !this.masterGain) return;

        const time = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, time);
        osc.frequency.linearRampToValueAtTime(430, time + 0.8);

        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.9);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + 0.95);
    }

    public toggleMute(): boolean {
        this.initContext();
        if (this.ctx && this.ctx.state === "suspended") {
            this.ctx.resume();
        }

        this.isMuted = !this.isMuted;
        if (this.masterGain && this.ctx) {
            const target = this.isMuted ? 0 : 0.8;
            this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
        }
        return this.isMuted;
    }

    public getMuted(): boolean {
        return this.isMuted;
    }

    /**
     * Smoothly fades out audio when player exits the 3D neighborhood.
     */
    public fadeAndStop(durationMs: number = 400): Promise<void> {
        return new Promise((resolve) => {
            if (!this.ctx || !this.masterGain || this.isMuted) {
                this.isMuted = true;
                resolve();
                return;
            }

            const now = this.ctx.currentTime;
            const durSec = durationMs / 1000;
            this.masterGain.gain.cancelScheduledValues(now);
            this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
            this.masterGain.gain.linearRampToValueAtTime(0.0001, now + durSec);

            setTimeout(() => {
                this.isMuted = true;
                if (this.masterGain && this.ctx) {
                    this.masterGain.gain.value = 0;
                }
                resolve();
            }, durationMs + 20);
        });
    }

    public dispose() {
        if (this.partyInterval) {
            clearInterval(this.partyInterval);
        }
        if (this.ctx) {
            this.ctx.close();
            this.ctx = null;
        }
    }
}

export const neighborhoodAudio = new NeighborhoodAudioManager();
