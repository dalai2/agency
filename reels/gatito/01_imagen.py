import sys; sys.path.insert(0, "..")
from comfy import run, fetch

seed = int(sys.argv[1]) if len(sys.argv) > 1 else 7
prompt = ("photo of an adorable fluffy orange tabby kitten sitting at a wooden desk, "
          "tapping the screen of a smartphone propped upright with its tiny paw, "
          "the phone screen shows an online shop with a shopping cart, a credit card lies beside it, "
          "warm soft window light, shallow depth of field, cozy home, sharp focus on the kitten, "
          "vertical composition, high detail, natural colors")
neg = "text, watermark, logo, deformed paws, extra limbs, blurry, cartoon, illustration, low quality"
wf = {
 "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": "realvisxlV50_v50Bakedvae.safetensors"}},
 "2": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["1", 1]}},
 "3": {"class_type": "CLIPTextEncode", "inputs": {"text": neg, "clip": ["1", 1]}},
 "4": {"class_type": "EmptyLatentImage", "inputs": {"width": 768, "height": 1344, "batch_size": 1}},
 "5": {"class_type": "KSampler", "inputs": {"model": ["1", 0], "seed": seed, "steps": 30, "cfg": 5.5,
        "sampler_name": "dpmpp_2m", "scheduler": "karras", "positive": ["2", 0], "negative": ["3", 0],
        "latent_image": ["4", 0], "denoise": 1.0}},
 "6": {"class_type": "VAEDecode", "inputs": {"samples": ["5", 0], "vae": ["1", 2]}},
 "7": {"class_type": "SaveImage", "inputs": {"images": ["6", 0], "filename_prefix": f"velant_gatito_{seed}"}},
}
out = run(wf, label="imagen")
img = out["7"]["images"][0]
dest = f"gatito/start_{seed}.png"
fetch(img, dest); print("OK", dest)
