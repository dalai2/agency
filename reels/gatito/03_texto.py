"""Compone el reel: escala a 1080x1920 y superpone texto de marca (Exo 2 / Poppins, #2E4354 / #F0F7F7)."""
import subprocess, sys
from PIL import Image, ImageDraw, ImageFont

clip, out = sys.argv[1], sys.argv[2]
audio = sys.argv[3] if len(sys.argv) > 3 else None
W, H = 1080, 1920
DARK, LIGHT = (46, 67, 84), (240, 247, 247)

def exo(size, weight="ExtraBold"):
    f = ImageFont.truetype("fonts/Exo2.ttf", size); f.set_variation_by_name(weight); return f

def block(lines, size, name, y, fill=LIGHT, color=DARK, pad=34):
    """Texto centrado sobre una tarjeta sólida: legible sobre cualquier fondo."""
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img); f = exo(size)
    sizes = [d.textbbox((0, 0), l, font=f) for l in lines]
    lh = int(size * 1.18); bw = max(b[2] - b[0] for b in sizes) + pad * 2; bh = lh * len(lines) + pad * 2 - int(size * .1)
    x0 = (W - bw) // 2
    d.rounded_rectangle([x0, y, x0 + bw, y + bh], radius=26, fill=fill)
    for i, l in enumerate(lines):
        w = sizes[i][2] - sizes[i][0]
        d.text(((W - w) // 2 - sizes[i][0], y + pad + i * lh - sizes[i][1] + int(size * .08)), l, font=f, fill=color)
    img.save(name); return name

def url_bar(name):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    d.rounded_rectangle([90, 1560, W - 90, 1700], radius=24, fill=LIGHT)
    f1 = exo(52, "ExtraBold"); f2 = ImageFont.truetype("fonts/Poppins-Medium.ttf", 44)
    t1, t2 = "VELANT", "  agenciavelant.mx"
    w = d.textlength(t1, font=f1) + d.textlength(t2, font=f2); x = (W - w) / 2
    d.text((x, 1597), t1, font=f1, fill=DARK); d.text((x + d.textlength(t1, font=f1), 1607), t2, font=f2, fill=DARK)
    img.save(name); return name

def sticker(name):
    """Letrero inclinado, donde estaba el celular: invita al comentario."""
    img = block(["¿DÓNDE QUEDÓ", "EL CEL?"], 66, name, 0, fill=(255, 214, 10), color=(20, 20, 20), pad=30)
    im = Image.open(name).convert("RGBA").crop((0, 0, W, 330))
    box = im.getbbox(); im = im.crop(box).rotate(7, expand=True, resample=Image.BICUBIC)
    out = Image.new("RGBA", (W, H), (0, 0, 0, 0)); out.paste(im, (36, 1090), im); out.save(name); return name

a = block(["UN GATITO ACABA DE", "COMPRAR EN LÍNEA"], 76, "gatito/t1.png", 230, fill=DARK, color=LIGHT)
b = block(["¿Y TU NEGOCIO?"], 84, "gatito/t2.png", 230)
c = block(["VÉNDELE AL GATITO"], 84, "gatito/t3.png", 400, fill=DARK, color=LIGHT)
u = url_bar("gatito/t4.png")
st = sticker("gatito/t5.png")

dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", clip]).decode())
s1, s2 = dur * 0.5, dur * 0.62
fc = (f"[0:v]scale={W}:{H}:flags=lanczos,setsar=1[v];"
      f"[v][1:v]overlay=enable='lt(t,{s1:.2f})'[a];"
      f"[a][2:v]overlay=enable='gte(t,{s1:.2f})'[b];"
      f"[b][3:v]overlay=enable='gte(t,{s2:.2f})'[c];"
      f"[c][4:v]overlay=enable='gte(t,{dur-1.8:.2f})'[d];"
      f"[d][5:v]overlay=enable='between(t,1.5,3.1)'[o]")
cmd = ["ffmpeg", "-y", "-v", "error", "-i", clip, "-i", a, "-i", b, "-i", c, "-i", u, "-i", st]
if audio: cmd += ["-i", audio]
cmd += ["-filter_complex", fc, "-map", "[o]"] + (["-map", "6:a", "-c:a", "aac", "-b:a", "192k", "-shortest"] if audio else [])
cmd += ["-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out]
subprocess.check_call(cmd)
print("OK", out, f"{dur:.1f}s")
