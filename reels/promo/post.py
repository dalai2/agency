"""Post de la promo $699 (1080x1350): marca Velant + gatito fantasma."""
from PIL import Image, ImageDraw, ImageFont
import numpy as np

W, H = 1080, 1350
DARK, LIGHT, GOLD = (46, 67, 84), (240, 247, 247), (255, 176, 0)

def exo(size, w="ExtraBold"):
    f = ImageFont.truetype("fonts/Exo2.ttf", size); f.set_variation_by_name(w); return f
pop = lambda s: ImageFont.truetype("fonts/Poppins-Medium.ttf", s)

def logo_claro(h):
    """Escudo claro con V oscura (el original es oscuro, no se lee sobre fondo oscuro)."""
    a = np.array(Image.open("../public/logo.png").convert("RGBA"))
    rgb, al = a[..., :3].astype(int), a[..., 3]
    es_v = (rgb.sum(-1) > 600) & (al > 0)
    out = np.zeros_like(a); out[..., 3] = al
    out[(al > 0)] [:, :3] = 0
    out[..., :3][(al > 0) & ~es_v] = LIGHT
    out[..., :3][es_v] = DARK
    im = Image.fromarray(out); box = im.getbbox(); im = im.crop(box)
    return im.resize((int(im.width * h / im.height), h), Image.LANCZOS)

img = Image.new("RGB", (W, H), DARK); d = ImageDraw.Draw(img)

# cabecera
lg = logo_claro(64); img.paste(lg, (64, 56), lg)
d.text((64 + lg.width + 18, 52), "VELANT", font=exo(40), fill=LIGHT)
d.text((64 + lg.width + 20, 98), "AGENCIA DIGITAL", font=pop(15), fill=LIGHT)
pill = "PROMO DE MUERTOS"; f = exo(26)
tw = d.textlength(pill, font=f); px = W - 64 - tw - 56
d.rounded_rectangle([px, 54, W - 64, 118], radius=32, fill=GOLD)
d.text((px + 28, 66), pill, font=f, fill=DARK)

# foto del gatito
ph = Image.open("spooky/fant_19.png").convert("RGB")
ph = ph.resize((952, int(ph.height * 952 / ph.width)), Image.LANCZOS)
cy = int(ph.height * 0.36); crop = ph.crop((0, cy - 285, 952, cy + 285))
mask = Image.new("L", crop.size, 0); ImageDraw.Draw(mask).rounded_rectangle([0, 0, crop.width, crop.height], 36, fill=255)
img.paste(crop, (64, 156), mask)

# titular + precio
y = 760
d.text((64, y), "TU SITIO WEB", font=exo(54), fill=LIGHT)
d.text((64, y + 56), "POR SOLO", font=exo(54), fill=LIGHT)
f_big = exo(230, "Black"); d.text((60, y + 84), "$699", font=f_big, fill=GOLD)
bx = 64 + d.textlength("$699", font=f_big) + 24
d.text((bx, y + 214), "MXN", font=exo(44), fill=LIGHT)
old = "ANTES $2,500"; fo = exo(40, "SemiBold")
d.text((bx, y + 276), old, font=fo, fill=(190, 205, 212))
ow = d.textlength(old, font=fo); d.line([bx, y + 302, bx + ow, y + 302], fill=(190, 205, 212), width=4)

d.text((64, 1112), "Landing page profesional · Entrega en 3–5 días", font=pop(28), fill=LIGHT)
d.text((64, 1156), "Promo válida hasta el 2 de noviembre", font=pop(28), fill=GOLD)

# llamada
d.rounded_rectangle([64, 1218, W - 64, 1306], radius=22, fill=LIGHT)
f1, f2 = exo(40), pop(34); t1, t2 = "COTIZA POR DM", "  ·  agenciavelant.mx"
w = d.textlength(t1, font=f1) + d.textlength(t2, font=f2); x = (W - w) / 2
d.text((x, 1236), t1, font=f1, fill=DARK); d.text((x + d.textlength(t1, font=f1), 1244), t2, font=f2, fill=DARK)

img.save("promo/post-699.png"); print("OK")
