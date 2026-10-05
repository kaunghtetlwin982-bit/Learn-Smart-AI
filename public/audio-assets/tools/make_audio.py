"""Procedural audio generator for Learn Smart AI (all sounds are original, synthesized from scratch)."""
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR = 44100
rng = np.random.default_rng(11)  # fixed seed -> reproducible output

def hz(note):  # MIDI note number -> frequency
    return 440.0 * 2 ** ((note - 69) / 12)

def lowpass(x, cutoff, order=2):
    sos = butter(order, cutoff, btype="low", fs=SR, output="sos")
    return sosfilt(sos, x)

def highpass(x, cutoff, order=2):
    sos = butter(order, cutoff, btype="high", fs=SR, output="sos")
    return sosfilt(sos, x)

def bell(freq, dur, amp=1.0, decay=4.0, bright=0.35, attack=0.004):
    """Soft bell/pluck: sine + gentle harmonics (2x, 3x, slightly inharmonic 4.2x) with exponential decay."""
    t = np.arange(int(dur * SR)) / SR
    sig = (np.sin(2 * np.pi * freq * t)
           + bright * 0.5 * np.sin(2 * np.pi * freq * 2 * t) * np.exp(-t * decay * 1.6)
           + bright * 0.25 * np.sin(2 * np.pi * freq * 3 * t) * np.exp(-t * decay * 2.2)
           + bright * 0.12 * np.sin(2 * np.pi * freq * 4.2 * t) * np.exp(-t * decay * 3.0))
    env = np.exp(-t * decay)
    atk = np.minimum(t / attack, 1.0)
    rel = np.minimum((dur - t) / 0.03, 1.0)  # short fade-out to avoid clicks
    return amp * sig * env * atk * rel

def soft_tone(freq, dur, amp=1.0, attack=0.02, decay=5.0):
    """Rounded sine tone (pure, warm) for the gentle 'try again' sound."""
    t = np.arange(int(dur * SR)) / SR
    sig = np.sin(2 * np.pi * freq * t) + 0.12 * np.sin(2 * np.pi * freq * 2 * t)
    env = np.exp(-t * decay) * np.minimum(t / attack, 1.0) * np.minimum((dur - t) / 0.04, 1.0)
    return amp * sig * env

def place(buf, sig, start):
    i = int(start * SR)
    n = min(len(sig), len(buf) - i)
    if n > 0:
        buf[i:i + n] += sig[:n]

def make_ir(length=1.2, decay=3.2, damp=5500):
    n = int(length * SR)
    t = np.arange(n) / SR
    ir = rng.standard_normal(n) * np.exp(-t * decay)
    ir = lowpass(ir, damp)
    ir[0] = 0
    return ir / np.sqrt(np.sum(ir ** 2))

def reverb(x, wet=0.18, length=1.2, decay=3.2):
    ir = make_ir(length, decay)
    wetsig = fftconvolve(x, ir)[:len(x)]
    return x * (1 - wet * 0.5) + wetsig * wet

def finish(x, peak, fade_in=0.004, fade_out=0.05):
    x = x - np.mean(x)
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    fi, fo = int(fade_in * SR), int(fade_out * SR)
    x[:fi] *= np.linspace(0, 1, fi)
    x[-fo:] *= np.linspace(1, 0, fo)
    return x

def save(name, x):
    stereo = np.stack([x, x], axis=1)
    wavfile.write(f"/home/claude/audio/{name}.wav", SR, (stereo * 32767).astype(np.int16))

# Shared palette: C major pentatonic (C D E G A) so every sound sits in the same key.
C4, D4, E4, G4, A4 = 60, 62, 64, 67, 69
C5, D5, E5, G5, A5 = 72, 74, 76, 79, 81
C6, E6, G6 = 84, 88, 91

# 1) Quiz start: soft rising "ready" figure, ~1.2 s
def quiz_start():
    buf = np.zeros(int(1.5 * SR))
    for i, (n, a) in enumerate([(G4, 0.55), (C5, 0.65), (E5, 0.75)]):
        place(buf, bell(hz(n), 0.6, a, decay=6), 0.0 + i * 0.12)
    # final open dyad, slightly longer, "ready" feeling
    place(buf, bell(hz(G5), 0.9, 0.7, decay=4.2), 0.36)
    place(buf, bell(hz(C6), 0.9, 0.5, decay=4.2), 0.36)
    # airy rising swoosh underneath (very quiet)
    t = np.arange(int(0.4 * SR)) / SR
    sw = highpass(lowpass(rng.standard_normal(len(t)), 3500), 800) * np.sin(np.pi * t / 0.4) ** 2 * 0.05
    place(buf, sw, 0.0)
    buf = reverb(buf, wet=0.22, length=0.9, decay=4.0)
    return finish(buf[:int(1.3 * SR)], 0.45, fade_out=0.12)

# 2) Correct: two-note bright chime, ~0.9 s
def correct():
    buf = np.zeros(int(1.1 * SR))
    place(buf, bell(hz(G5), 0.8, 0.8, decay=5.0), 0.0)
    place(buf, bell(hz(C6), 0.9, 0.9, decay=4.2), 0.09)
    place(buf, bell(hz(E6), 0.7, 0.22, decay=6.0), 0.09)  # soft sparkle on top
    buf = reverb(buf, wet=0.2, length=0.8, decay=4.5)
    return finish(buf[:int(0.95 * SR)], 0.38, fade_out=0.1)

# 3) Wrong: very soft descending two-note "try again", ~0.7 s (no buzzer, no dissonance)
def wrong():
    buf = np.zeros(int(0.9 * SR))
    place(buf, soft_tone(hz(E4), 0.45, 0.8, attack=0.015, decay=6.0), 0.0)
    place(buf, soft_tone(hz(C4), 0.55, 0.8, attack=0.015, decay=5.5), 0.17)
    buf = lowpass(buf, 2200)
    buf = reverb(buf, wet=0.15, length=0.6, decay=5.0)
    return finish(buf[:int(0.75 * SR)], 0.28, fade_out=0.15)

# 4) Quiz complete: ascending arpeggio resolving into a soft major chord, ~1.8 s
def quiz_complete():
    buf = np.zeros(int(2.4 * SR))
    for i, n in enumerate([C5, E5, G5, C6]):
        place(buf, bell(hz(n), 0.7, 0.7, decay=5.5), i * 0.11)
    t0 = 0.5
    for n, a in [(C5, 0.55), (G5, 0.55), (E6, 0.5), (C6, 0.65)]:
        place(buf, bell(hz(n), 1.4, a, decay=2.8, bright=0.3), t0)
    # light sparkle trail
    for k, n in enumerate([G6, E6, C6, G6]):
        place(buf, bell(hz(n), 0.5, 0.16, decay=7.0), 0.62 + k * 0.1)
    buf = reverb(buf, wet=0.28, length=1.3, decay=3.0)
    return finish(buf[:int(1.9 * SR)], 0.45, fade_out=0.3)

# 5) Background: calm ambient pad loop (seamless, circular), 36 bars @ 72 BPM = 120 s
def background():
    bpm = 72
    beat = 60 / bpm
    bar = 4 * beat
    bars = 36
    total = bars * bar
    N = int(round(total * SR))
    L = np.zeros(N)
    R = np.zeros(N)

    def wrap_add(buf, sig, start_s):
        i = int(start_s * SR)
        idx = (np.arange(len(sig)) + i) % N  # wrap-around keeps the loop seamless
        np.add.at(buf, idx, sig)

    def pad(notes, dur, detune=0.0):
        t = np.arange(int(dur * SR)) / SR
        out = np.zeros_like(t)
        for n in notes:
            f = hz(n) * (1 + detune)
            out += np.sin(2 * np.pi * f * t) + 0.18 * np.sin(2 * np.pi * f * 2 * t) \
                   + 0.06 * np.sin(2 * np.pi * f * 3 * t)
        a, r = 0.45 * dur / 2, 0.5 * dur
        env = np.minimum(t / min(a, 1.8), 1) * np.minimum((dur - t) / min(r, 2.0), 1)
        env = np.sin(np.clip(env, 0, 1) * np.pi / 2)
        return out * env / len(notes)

    # 4-chord cycle (Cmaj9 / Am9 / Fmaj9 / Gsus-ish), each 2 bars, repeated 4.5x ... = 36 bars
    chords = [
        [48, 55, 59, 64, 71],   # Cmaj9-ish  (C3 G3 B3 E4 B4)
        [45, 52, 55, 64, 72],   # Am9-ish
        [41, 48, 57, 64, 69],   # Fmaj9-ish
        [43, 50, 57, 62, 71],   # G6/9-ish
    ]
    for b in range(0, bars, 2):
        ch = chords[(b // 2) % 4]
        dur = 2 * bar + 1.5  # slight overlap into next chord
        wrap_add(L, pad(ch, dur, -0.0015) * 0.8, b * bar)
        wrap_add(R, pad(ch, dur, +0.0015) * 0.8, b * bar)
        # soft sub bass root
        t = np.arange(int(2 * bar * SR)) / SR
        bass = np.sin(2 * np.pi * hz(ch[0] - 12) * t) * np.minimum(t / 0.8, 1) * np.minimum((2 * bar - t) / 1.2, 1)
        wrap_add(L, bass * 0.35, b * bar)
        wrap_add(R, bass * 0.35, b * bar)

    # very sparse, quiet high bell tones on chord tones (texture, not a melody)
    pent = [C5, D5, E5, G5, A5, C6]
    positions = np.arange(0, bars * 4, 1.0)
    for p in positions:
        if rng.random() < 0.22:
            n = pent[rng.integers(0, len(pent))]
            s = bell(hz(n), 3.0, 0.07, decay=1.8, bright=0.2, attack=0.01)
            pan = rng.uniform(0.25, 0.75)
            wrap_add(L, s * (1 - pan) * 1.4, p * beat)
            wrap_add(R, s * pan * 1.4, p * beat)

    # gentle soft pulse (muted tick every 2 beats) for subtle tech feel
    for p in np.arange(0, bars * 4, 2.0):
        t = np.arange(int(0.25 * SR)) / SR
        tick = np.sin(2 * np.pi * hz(E5 + 12) * t) * np.exp(-t * 40) * 0.025
        wrap_add(L, tick, p * beat)
        wrap_add(R, tick, p * beat)

    # circular reverb (FFT, wrapped) so the tail flows from the end back to the start
    ir = make_ir(2.5, 1.6, damp=4000)
    def circ_rev(x):
        X = np.fft.rfft(x)
        H = np.fft.rfft(ir, n=len(x))
        return np.fft.irfft(X * H, n=len(x))
    L = L * 0.7 + circ_rev(L) * 0.55
    R = R * 0.7 + circ_rev(R) * 0.55

    # slow filter-ish warmth + gentle low-pass so nothing is sharp
    # filter a 3x tiled copy and keep the middle copy so the filter is continuous across the loop point
    def loop_lp(x, c):
        return lowpass(np.concatenate([x, x, x]), c)[len(x):2 * len(x)]
    L = loop_lp(L, 5000); R = loop_lp(R, 5000)
    peak = max(np.max(np.abs(L)), np.max(np.abs(R)))
    L, R = L / peak * 0.30, R / peak * 0.30
    return np.stack([L, R], axis=1)

if __name__ == "__main__":
    for name, fn in [("quiz-start", quiz_start), ("correct", correct), ("wrong", wrong), ("quiz-complete", quiz_complete)]:
        save(name, fn())
    bg = background()
    wavfile.write("/home/claude/audio/quiz-background.wav", SR, (bg * 32767).astype(np.int16))
    print("loop boundary jump:", np.abs(bg[0] - bg[-1]).max(), "len s:", len(bg) / SR)
