"""Efectos de sonido sintetizados (numpy): se montan en post, no salen de la generación."""
import wave, sys
import numpy as np

SR = 44100
rng = np.random.default_rng(3)

def env(n, atk=0.002, dec=0.1):
    t = np.arange(n) / SR
    return np.minimum(t / atk, 1.0) * np.exp(-t / dec)

def tap(dur=0.12):
    n = int(SR * dur); t = np.arange(n) / SR
    thump = np.sin(2 * np.pi * (170 - 400 * t) * t) * env(n, 0.001, 0.035)
    click = rng.standard_normal(n) * env(n, 0.0005, 0.006) * 0.5
    return 0.8 * (thump + click)

def key(dur=0.06):
    n = int(SR * dur)
    return rng.standard_normal(n) * env(n, 0.0003, 0.008) * 0.4

def ping(dur=1.0):
    """Notificación de compra: dos campanitas ascendentes."""
    out = np.zeros(int(SR * dur))
    for i, f in enumerate((988, 1480)):
        n = int(SR * 0.7); t = np.arange(n) / SR
        s = (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t)) * env(n, 0.003, 0.18)
        o = int(SR * 0.11 * i); out[o:o + n] += 0.5 * s[: len(out) - o]
    return out

def whoosh(dur=0.35):
    n = int(SR * dur); x = rng.standard_normal(n)
    k = np.cumsum(x); k -= np.convolve(k, np.ones(60) / 60, "same")   # ruido filtrado
    t = np.arange(n) / SR
    return 0.5 * k / np.abs(k).max() * np.sin(np.pi * t / dur) ** 2

def pop(dur=0.1):
    n = int(SR * dur); t = np.arange(n) / SR
    return 0.6 * np.sin(2 * np.pi * (500 + 900 * t / dur) * t) * env(n, 0.001, 0.025)

def render(total, events, out):
    mix = np.zeros(int(SR * total))
    for at, snd, gain in events:
        o = int(SR * at); s = snd[: len(mix) - o] * gain; mix[o:o + len(s)] += s
    mix /= max(1.0, np.abs(mix).max() / 0.9)
    with wave.open(out, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((mix * 32767).astype(np.int16).tobytes())

def kick(dur=0.22):
    n = int(SR * dur); t = np.arange(n) / SR
    return 1.0 * np.sin(2 * np.pi * (45 + 110 * np.exp(-t * 28)) * t) * env(n, 0.001, 0.09)

def hat(dur=0.05):
    n = int(SR * dur); x = rng.standard_normal(n); x = x - np.convolve(x, np.ones(8) / 8, "same")
    return 0.35 * x * env(n, 0.0003, 0.012)

def bass(f0, dur=0.2):
    n = int(SR * dur); t = np.arange(n) / SR
    return 0.45 * np.sign(np.sin(2 * np.pi * f0 * t)) * np.sin(2 * np.pi * f0 * t) ** 0 * env(n, 0.004, 0.12) * 0.6

def coin(dur=0.6):
    out = np.zeros(int(SR * dur))
    for i, f in enumerate((2637, 3136, 3951)):
        n = int(SR * 0.4); t = np.arange(n) / SR
        o = int(SR * 0.05 * i); out[o:o + n] += 0.3 * np.sin(2 * np.pi * f * t) * env(n, 0.001, 0.09)
    return out

if __name__ == "__main__":
    total, out = float(sys.argv[1]), sys.argv[2]
    bpm = 124; beat = 60 / bpm
    ev = [(0.15, ping(), 1.0), (0.15, coin(), 0.9), (0.35, pop(), 0.8),
          (total * 0.5 - 0.05, whoosh(), 0.8), (total * 0.62 - 0.05, whoosh(), 0.8), (total - 1.85, pop(), 0.7)]
    notes = (55, 55, 82, 73)
    k = 0; t = 0.0
    while "--solo-efectos" not in sys.argv and t < total - 0.2:
        ev.append((t, kick(), 0.9)); ev.append((t + beat / 2, hat(), 0.7))
        ev.append((t + beat * .75, bass(notes[k % 4]), 0.5)); t += beat; k += 1
    render(total, ev, out); print("OK", out)
