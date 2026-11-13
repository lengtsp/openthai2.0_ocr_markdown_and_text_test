import argparse
import sys
from pathlib import Path

cli = argparse.ArgumentParser(description="Read a page image on the CPU.")
cli.add_argument("image", type=Path)
cli.add_argument("--model-dir", type=Path, default=Path("OpenThai2.0-OCR-Text"))
args = cli.parse_args()

model_dir = args.model_dir.resolve()
if not (model_dir / "runtime" / "line_engine.py").is_file():
    cli.error(f"OpenThai Text runtime not found in {model_dir}; download the model first.")

sys.path.insert(0, str(model_dir))
from runtime.line_engine import LineOCR

engine = LineOCR(str(model_dir), threads=1)
result = engine.read(str(args.image))
print(result["text"])
