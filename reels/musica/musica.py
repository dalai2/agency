"""Genera música instrumental con ACE-Step 1.5 turbo (ComfyUI) y la guarda como mp3."""
import sys; sys.path.insert(0, "..")
from comfy import run, fetch

tags, seconds, seed, dest = sys.argv[1], float(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
bpm = int(sys.argv[5]) if len(sys.argv) > 5 else 124
wf = {
 "1": {"class_type": "UNETLoader", "inputs": {"unet_name": "acestep_v1.5_turbo.safetensors", "weight_dtype": "default"}},
 "2": {"class_type": "DualCLIPLoader", "inputs": {"clip_name1": "qwen_0.6b_ace15.safetensors", "clip_name2": "qwen_1.7b_ace15.safetensors", "type": "ace", "device": "default"}},
 "3": {"class_type": "VAELoader", "inputs": {"vae_name": "ace_1.5_vae.safetensors"}},
 "4": {"class_type": "ModelSamplingAuraFlow", "inputs": {"model": ["1", 0], "shift": 3.0}},
 "5": {"class_type": "TextEncodeAceStepAudio1.5", "inputs": {"clip": ["2", 0], "tags": tags, "lyrics": "[Instrumental]",
        "seed": seed, "bpm": bpm, "duration": seconds, "timesignature": "4", "language": "en", "keyscale": "C major",
        "generate_audio_codes": True, "cfg_scale": 2.0, "temperature": 0.85, "top_p": 0.9, "top_k": 0, "min_p": 0.0}},
 "6": {"class_type": "ConditioningZeroOut", "inputs": {"conditioning": ["5", 0]}},
 "7": {"class_type": "EmptyAceStep1.5LatentAudio", "inputs": {"seconds": seconds, "batch_size": 1}},
 "8": {"class_type": "KSampler", "inputs": {"model": ["4", 0], "seed": seed, "steps": 8, "cfg": 1.0, "sampler_name": "euler",
        "scheduler": "simple", "positive": ["5", 0], "negative": ["6", 0], "latent_image": ["7", 0], "denoise": 1.0}},
 "9": {"class_type": "VAEDecodeAudio", "inputs": {"samples": ["8", 0], "vae": ["3", 0]}},
 "10": {"class_type": "SaveAudioMP3", "inputs": {"audio": ["9", 0], "filename_prefix": "audio/velant_musica", "quality": "V0"}},
}
out = run(wf, timeout=1200, label="musica")
info = (out["10"].get("audio") or out["10"].get("images"))[0]
fetch(info, dest); print("OK", dest)
