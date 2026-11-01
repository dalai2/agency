"""Genera las fotos del showroom con ComfyUI (puerto 8000, RealVisXL).

Plan: por vertiente, 1 hero (retrato 4:5) + 6 imagenes de oferta (cuadradas; el
componente las recorta a 4:3, 4:5 o 1:1 con object-cover). Se comparten entre los
3 estilos. Sin texto en ninguna imagen (el texto de SDXL sale ilegible).

Uso:  python scripts/showroom_imagenes.py                 # todas las que falten
      python scripts/showroom_imagenes.py tienda          # una vertiente
      python scripts/showroom_imagenes.py tienda/hero 11  # una imagen, otra semilla
Salida: public/showroom/<vertiente>/<hero|0..5>.jpg
"""
import io, sys, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "reels"))
from comfy import run, fetch  # noqa: E402
from PIL import Image  # noqa: E402

CKPT = "realvisxlV50_v50Bakedvae.safetensors"
NEG = ("text, letters, watermark, logo, signature, cartoon, illustration, painting, 3d render, "
       "deformed, extra fingers, bad anatomy, blurry, low quality, oversaturated")
STYLE = "professional commercial photography, soft natural light, sharp focus, high detail, natural colors"

# slug -> [(clave, ancho, alto, prompt)]
PLAN = {
    "tienda": [
        ("hero", 896, 1152, "editorial jewelry still life, delicate silver necklace with a raw quartz pendant and gold-plated rings arranged on cream linen beside a small ceramic dish and dried flowers, warm window light, shallow depth of field"),
        ("0", 1024, 1024, "macro photo of a handmade 925 silver ring with gold plating and a crescent moon motif resting on beige stone, soft light"),
        ("1", 1024, 1024, "delicate thin gold chain necklace with a small raw quartz crystal pendant lying on cream linen fabric"),
        ("2", 1024, 1024, "pair of medium matte gold hoop earrings on a terracotta ceramic dish, warm light"),
        ("3", 1024, 1024, "silver link bracelet with adjustable clasp lying on soft cream fabric, top view"),
        ("4", 1024, 1024, "open gift box with a velvet interior holding a necklace and matching earrings set, satin ribbon, elegant, plain box with no lettering, no branding"),
        ("5", 1024, 1024, "blank cream gift card tied with a ribbon next to a small jewelry box and a dried flower, no text"),
    ],
    "salud": [
        ("hero", 896, 1152, "friendly smiling woman in her thirties with a natural healthy smile, bright modern dental clinic in soft blurred background, portrait, warm daylight"),
        ("0", 1024, 1024, "modern dental clinic treatment room with a dental chair, bright, clean, soft daylight, no people"),
        ("1", 1024, 1024, "tooth whitening shade guide and a white dental teeth model on a clean white table, bright, minimal"),
        ("2", 1024, 1024, "clear dental aligners in an open case next to a dental model, clean mint green background"),
        ("3", 1024, 1024, "neatly arranged dental instruments on a tray, mouth mirror and probe, clean bright clinic, close-up"),
        ("4", 1024, 1024, "bright dental clinic reception desk with a friendly receptionist, plants, soft light, plain wall with no signs, no lettering"),
        ("5", 1024, 1024, "happy little girl holding a colorful toothbrush and smiling in a bright cheerful dental office"),
    ],
    "restaurante": [
        ("hero", 896, 1152, "rustic mexican grill restaurant, long wooden table with grilled meats, blue corn tortillas and mezcal, glowing charcoal fire in the background, warm evening light, moody atmosphere"),
        ("0", 1024, 1024, "smoked beef short rib on a cast iron plate with dark red pasilla chili sauce, charcoal grill, dramatic light, food photography"),
        ("1", 1024, 1024, "three tacos with blue corn tortillas, chopped beef suadero, onion and cilantro on a wooden board, food photography"),
        ("2", 1024, 1024, "charred grilled vegetables, zucchini, onions and peppers with garlic cream on a rustic plate, food photography"),
        ("3", 1024, 1024, "caramel cajeta flan on a ceramic plate, dark moody background, food photography"),
        ("4", 1024, 1024, "mezcal in a clay copita with orange slices and salt on a wooden bar, agave bottle behind, moody lighting"),
        ("5", 1024, 1024, "traditional mexican clay mug of cafe de olla with a cinnamon stick and steam on a rustic wooden table"),
    ],
    "servicios": [
        ("hero", 896, 1152, "confident latina accountant in her thirties smiling in a bright modern office, laptop on the desk, portrait, natural window light"),
        ("0", 1024, 1024, "calculator, laptop and a cup of coffee on a tidy desk, top-down view, soft light"),
        ("1", 1024, 1024, "tidy desk with printed invoices, a tablet and a pen, minimal, soft light, top view"),
        ("2", 1024, 1024, "three colleagues reviewing documents around a table in a bright modern office"),
        ("3", 1024, 1024, "folder with documents, a rubber stamp and a pen on a wooden desk, close-up, soft light"),
        ("4", 1024, 1024, "two professionals in a consultation meeting at a desk, one explaining with a pen, bright office"),
        ("5", 1024, 1024, "organized stack of file folders and binders on a shelf, close-up, soft light"),
    ],
}


def workflow(prompt, w, h, seed):
    return {
        "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CKPT}},
        "2": {"class_type": "CLIPTextEncode", "inputs": {"text": f"photo, {prompt}, {STYLE}", "clip": ["1", 1]}},
        "3": {"class_type": "CLIPTextEncode", "inputs": {"text": NEG, "clip": ["1", 1]}},
        "4": {"class_type": "EmptyLatentImage", "inputs": {"width": w, "height": h, "batch_size": 1}},
        "5": {"class_type": "KSampler", "inputs": {"model": ["1", 0], "seed": seed, "steps": 30, "cfg": 5.5,
              "sampler_name": "dpmpp_2m", "scheduler": "karras", "positive": ["2", 0], "negative": ["3", 0],
              "latent_image": ["4", 0], "denoise": 1.0}},
        "6": {"class_type": "VAEDecode", "inputs": {"samples": ["5", 0], "vae": ["1", 2]}},
        "7": {"class_type": "SaveImage", "inputs": {"images": ["6", 0], "filename_prefix": "velant_showroom"}},
    }


def generar(vert, clave, w, h, prompt, seed):
    dest = ROOT / "public" / "showroom" / vert / f"{clave}.jpg"
    dest.parent.mkdir(parents=True, exist_ok=True)
    out = run(workflow(prompt, w, h, seed), label=f"{vert}/{clave}")
    tmp = dest.with_suffix(".png")
    fetch(out["7"]["images"][0], tmp)
    Image.open(tmp).convert("RGB").save(dest, quality=86, optimize=True)
    tmp.unlink()
    print("OK", dest.relative_to(ROOT), f"{dest.stat().st_size // 1024} KB", flush=True)


if __name__ == "__main__":
    args = sys.argv[1:]
    seed = int(args[1]) if len(args) > 1 else 7
    sel = args[0] if args else None
    for vert, items in PLAN.items():
        for clave, w, h, prompt in items:
            if sel and sel not in (vert, f"{vert}/{clave}"):
                continue
            if not sel and (ROOT / "public" / "showroom" / vert / f"{clave}.jpg").exists():
                continue
            generar(vert, clave, w, h, prompt, seed)
