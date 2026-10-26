"""Cliente mínimo de la API de ComfyUI (puerto 8000)."""
import json, time, urllib.request, urllib.parse, uuid

BASE = "http://127.0.0.1:8000"

def _req(path, data=None):
    r = urllib.request.Request(BASE + path, data=json.dumps(data).encode() if data else None,
                               headers={"Content-Type": "application/json"})
    return json.load(urllib.request.urlopen(r, timeout=60))

def run(workflow, timeout=3600, label=""):
    pid = _req("/prompt", {"prompt": workflow, "client_id": uuid.uuid4().hex})["prompt_id"]
    t0 = time.time()
    while time.time() - t0 < timeout:
        h = _req(f"/history/{pid}")
        if pid in h:
            st = h[pid]["status"]
            if st.get("status_str") == "error":
                raise RuntimeError(json.dumps(st["messages"][-2:], ensure_ascii=False)[:1500])
            return h[pid]["outputs"]
        time.sleep(3)
    raise TimeoutError(label)

def fetch(info, dest):
    q = urllib.parse.urlencode({"filename": info["filename"], "subfolder": info.get("subfolder", ""), "type": info.get("type", "output")})
    with urllib.request.urlopen(f"{BASE}/view?{q}", timeout=120) as r, open(dest, "wb") as f:
        f.write(r.read())

def upload(path):
    """Sube una imagen a input/ de ComfyUI y devuelve su nombre."""
    import mimetypes, os
    name = os.path.basename(path); b = uuid.uuid4().hex
    body = (f'--{b}\r\nContent-Disposition: form-data; name="image"; filename="{name}"\r\n'
            f'Content-Type: image/png\r\n\r\n').encode() + open(path, "rb").read() + \
           (f'\r\n--{b}\r\nContent-Disposition: form-data; name="overwrite"\r\n\r\ntrue\r\n--{b}--\r\n').encode()
    r = urllib.request.Request(BASE + "/upload/image", data=body,
                               headers={"Content-Type": f"multipart/form-data; boundary={b}"})
    return json.load(urllib.request.urlopen(r, timeout=60))["name"]
