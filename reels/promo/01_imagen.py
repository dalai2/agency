import sys; sys.path.insert(0, "..")
from comfy import run, fetch

seed = int(sys.argv[1]) if len(sys.argv) > 1 else 7
prompt = ("photo of a tiny baby orange tabby kitten, about 8 weeks old, big round head, huge ears, "
          "wearing a small crown of bright orange marigold flowers on its head, sitting among marigold petals, "
          "glowing candles and colorful papel picado banners in the background, Mexican day of the dead altar, "
          "night scene with deep blue shadows and warm orange candlelight, cinematic teal-blue color grading, "
          "shallow depth of field, sharp focus on the kitten, vertical composition, high detail")
neg = "text, watermark, logo, open eyes, awake, adult cat, grown cat, large cat, fat cat, deformed paws, extra limbs, blurry, cartoon, illustration, low quality"
wf = {
 "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": "realvisxlV50_v50Bakedvae.safetensors"}},
 "2": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["1", 1]}},
 "3": {"class_type": "CLIPTextEncode", "inputs": {"text": neg, "clip": ["1", 1]}},
 "4": {"class_type": "EmptyLatentImage", "inputs": {"width": 768, "height": 1344, "batch_size": 1}},
 "5": {"class_type": "KSampler", "inputs": {"model": ["1", 0], "seed": seed, "steps": 30, "cfg": 5.5,
        "sampler_name": "dpmpp_2m", "scheduler": "karras", "positive": ["2", 0], "negative": ["3", 0],
        "latent_image": ["4", 0], "denoise": 1.0}},
 "6": {"class_type": "VAEDecode", "inputs": {"samples": ["5", 0], "vae": ["1", 2]}},
 "7": {"class_type": "SaveImage", "inputs": {"images": ["6", 0], "filename_prefix": f"velant_muertos_{seed}"}},
}
out = run(wf, label="imagen")
img = out["7"]["images"][0]
dest = f"promo/muertos_{seed}.png"
fetch(img, dest); print("OK", dest)
