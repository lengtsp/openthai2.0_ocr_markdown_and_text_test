import argparse
import base64
import json
from pathlib import Path
from urllib.request import Request, urlopen

cli = argparse.ArgumentParser(description="Read a page image with Typhoon OCR V2 2B.")
cli.add_argument("image", type=Path)
cli.add_argument("--base-url", default="http://127.0.0.1:8002/v1")
cli.add_argument("--model", default="typhoon-ocr2")
cli.add_argument("--prompt-file", type=Path, default=Path(__file__).with_name("typhoon-layout.txt"))
args = cli.parse_args()

mime = {".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg"}.get(
    args.image.suffix.lower()
)
if mime is None:
    cli.error("Use a PNG or JPEG page image.")
encoded = base64.b64encode(args.image.read_bytes()).decode("ascii")
prompt = args.prompt_file.read_text(encoding="utf-8-sig").strip()
payload = {
    "model": args.model,
    "messages": [{"role": "user", "content": [
        {"type": "image_url", "image_url": {"url": f"data:{mime};base64,{encoded}"}},
        {"type": "text", "text": prompt},
    ]}],
    "temperature": 0,
    "seed": 42,
    "max_tokens": 16384,
    "chat_template_kwargs": {"enable_thinking": False},
}
request = Request(
    args.base_url.rstrip("/") + "/chat/completions",
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json"},
    method="POST",
)
with urlopen(request, timeout=360) as response:
    choice = json.load(response)["choices"][0]

if choice["finish_reason"] != "stop":
    cli.exit(1, f"OCR did not finish: {choice['finish_reason']}\n")
print(choice["message"]["content"])
