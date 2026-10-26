import sys, time; sys.path.insert(0, "..")
from comfy import run, fetch, upload

src = sys.argv[1]; seed = int(sys.argv[2]); w, h, length = int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5])
name = upload(src)
prompt = ("an adorable orange kitten looks at a smartphone held in front of it, then taps the screen "
          "with its tiny paw, pauses, tilts its head curiously and blinks, ears twitching, soft natural "
          "movement, warm window light, gentle slow camera push-in, realistic fur, cinematic")
neg = ("blurry, distorted face, extra limbs, extra paws, deformed, morphing, static, jitter, "
       "text, watermark, low quality, human face")
wf = {
 "1": {"class_type": "UNETLoader", "inputs": {"unet_name": "Wan2_2-TI2V-5B_fp8_e4m3fn_scaled_KJ.safetensors", "weight_dtype": "default"}},
 "2": {"class_type": "CLIPLoader", "inputs": {"clip_name": "umt5_xxl_fp8_e4m3fn_scaled.safetensors", "type": "wan"}},
 "3": {"class_type": "VAELoader", "inputs": {"vae_name": "wan2.2_vae.safetensors"}},
 "4": {"class_type": "ModelSamplingSD3", "inputs": {"model": ["1", 0], "shift": 8.0}},
 "5": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["2", 0]}},
 "6": {"class_type": "CLIPTextEncode", "inputs": {"text": neg, "clip": ["2", 0]}},
 "7": {"class_type": "LoadImage", "inputs": {"image": name}},
 "8": {"class_type": "ImageScale", "inputs": {"image": ["7", 0], "upscale_method": "lanczos", "width": w, "height": h, "crop": "center"}},
 "9": {"class_type": "Wan22ImageToVideoLatent", "inputs": {"vae": ["3", 0], "width": w, "height": h, "length": length, "batch_size": 1, "start_image": ["8", 0]}},
 "10": {"class_type": "KSampler", "inputs": {"model": ["4", 0], "seed": seed, "steps": 20, "cfg": 5.0,
        "sampler_name": "uni_pc", "scheduler": "simple", "positive": ["5", 0], "negative": ["6", 0],
        "latent_image": ["9", 0], "denoise": 1.0}},
 "11": {"class_type": "VAEDecode", "inputs": {"samples": ["10", 0], "vae": ["3", 0]}},
 "12": {"class_type": "CreateVideo", "inputs": {"images": ["11", 0], "fps": 24.0}},
 "13": {"class_type": "SaveVideo", "inputs": {"video": ["12", 0], "filename_prefix": f"video/velant_gatito_{seed}", "format": "mp4", "codec": "h264"}},
}
t0 = time.time()
out = run(wf, timeout=3300, label="wan")
vid = (out["13"].get("images") or out["13"].get("videos"))[0]
dest = f"gatito/clip_{seed}_{w}x{h}.mp4"
fetch(vid, dest); print("OK", dest, f"{time.time()-t0:.0f}s")
