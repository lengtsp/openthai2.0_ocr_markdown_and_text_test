# Run the three OCR models on one page

Run the commands from the repository root. Replace `page.png` with your own page image. To compare the models on a PDF, render the same page once and send that image to all three. For example, with Poppler installed, this renders page 2 at the benchmark's 200 DPI.

```sh
pdftoppm -f 2 -l 2 -r 200 -png -singlefile document.pdf page
```

## OpenThai OCR Text

Runs on the CPU and prints plain text. The runtime also provides line boxes and confidence scores in `result["lines"]`.

```sh
python -m pip install openvino opencv-python-headless pyclipper numpy pillow huggingface_hub
hf download iapp/OpenThai2.0-OCR-Text --local-dir OpenThai2.0-OCR-Text
python examples/openthai_text.py page.png
```

[Python example](openthai_text.py) · [Official model card](https://huggingface.co/iapp/OpenThai2.0-OCR-Text#use)

## OpenThai OCR Markdown

Set up the Nemotron Parse runtime and vLLM for your GPU using the [iApp installation guide](https://iapp.co.th/en/blog/openthai2p0-ocr-how-to-run). The following commands assume the weights are in `OpenThai2.0-OCR-Markdown` and you have activated that Python environment.

```sh
vllm serve ./OpenThai2.0-OCR-Markdown --served-model-name nemotron-parse --host 127.0.0.1 --port 8005 --trust-remote-code
```

With the server running, open a second terminal in the same environment and run the client. The parser uses the full-page prompt at temperature 0 and prints Markdown with HTML tables.

```sh
python examples/openthai_markdown.py page.png
```

[Python example](openthai_markdown.py) · [Official model card](https://huggingface.co/iapp/OpenThai2.0-OCR-Markdown#use)

## Typhoon OCR V2 2B

With vLLM 0.30 or later installed, serve Typhoon. If the GPU has limited memory, stop the Markdown server before starting Typhoon.

```sh
vllm serve typhoon-ai/typhoon-ocr2-2b --served-model-name typhoon-ocr2 --host 127.0.0.1 --port 8002 --max-model-len 40960
```

Run the client in a second terminal. The standard prompt requests layout blocks, text, and HTML tables. The focused example uses the prompt from test 6 to return the six numbers on the dashboard in reading order. Use the original dashboard page image for that example.

```sh
python examples/typhoon_ocr.py page.png
python examples/typhoon_ocr.py dashboard.png --prompt-file examples/typhoon-dashboard.txt
```

[Python example](typhoon_ocr.py) · [Standard prompt](typhoon-layout.txt) · [Dashboard prompt](typhoon-dashboard.txt) · [Official model card](https://huggingface.co/typhoon-ai/typhoon-ocr2-2b)
