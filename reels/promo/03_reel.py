"""Compone el reel de la promo $699: precio fijo abajo, cambia la línea de apoyo y cierra con WhatsApp."""
import subprocess, sys
from PIL import Image, ImageDraw, ImageFont

clip, out = sys.argv[1], sys.argv[2]
audio = sys.argv[3] if len(sys.argv) > 3 else None
W, H = 1080, 1920
DARK, LIGHT, GOLD, GREY = (46, 67, 84), (240, 247, 247), (255, 176, 0), (190, 205, 212)

def exo(size, w="ExtraBold"):
    f = ImageFont.truetype("fonts/Exo2.ttf", size); f.set_variation_by_name(w); return f
pop = lambda s: ImageFont.truetype("fonts/Poppins-Medium.ttf", s)

def center(d, text, font, y, fill):
    w = d.textlength(text, font=font); d.text(((W - w) / 2, y), text, font=font, fill=fill)

def card(name, sub, strike=False):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    d.rounded_rectangle([70, 1120, W - 70, 1590], radius=44, fill=DARK + (235,))
    center(d, "TU SITIO WEB POR SOLO", exo(50), 1160, LIGHT)
    center(d, "$699", exo(250, "Black"), 1210, GOLD)
    f = exo(44, "SemiBold") if strike else pop(38)
    w = d.textlength(sub, font=f); x = (W - w) / 2
    d.text((x, 1500), sub, font=f, fill=GREY if strike else LIGHT)
    if strike: d.line([x, 1527, x + w, 1527], fill=GREY, width=4)
    img.save(name); return name

def bar(name):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    d.rounded_rectangle([70, 1640, W - 70, 1760], radius=26, fill=LIGHT)
    f1, f2 = exo(46), pop(38); t1, t2 = "COTIZA POR DM", "  ·  agenciavelant.mx"
    w = d.textlength(t1, font=f1) + d.textlength(t2, font=f2); x = (W - w) / 2
    d.text((x, 1668), t1, font=f1, fill=DARK); d.text((x + d.textlength(t1, font=f1), 1678), t2, font=f2, fill=DARK)
    img.save(name); return name

a = card("promo/c1.png", "ANTES $2,500", strike=True)
b = card("promo/c2.png", "PROMO DE MUERTOS · HASTA EL 2 DE NOV")
c = bar("promo/c3.png")

dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", clip]).decode())
fc = (f"[0:v]scale={W}:{H}:flags=lanczos,setsar=1[v];"
      f"[v][1:v]overlay=enable='lt(t,2.4)'[a];"
      f"[a][2:v]overlay=enable='gte(t,2.4)'[b];"
      f"[b][3:v]overlay=enable='gte(t,{dur-1.8:.2f})'[o]")
cmd = ["ffmpeg", "-y", "-v", "error", "-i", clip, "-i", a, "-i", b, "-i", c]
if audio: cmd += ["-i", audio]
cmd += ["-filter_complex", fc, "-map", "[o]"] + (["-map", "4:a", "-c:a", "aac", "-b:a", "192k", "-shortest"] if audio else [])
cmd += ["-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out]
subprocess.check_call(cmd); print("OK", out, f"{dur:.1f}s")
