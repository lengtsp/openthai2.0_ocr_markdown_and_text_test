import argparse
from pathlib import Path

from nemotron_parse.inference import DocumentParser, GenerationError, GenerationSettings

cli = argparse.ArgumentParser(description="Read a page image into Markdown and HTML tables.")
cli.add_argument("image", type=Path)
cli.add_argument("--base-url", default="http://127.0.0.1:8005/v1")
cli.add_argument("--model", default="nemotron-parse")
args = cli.parse_args()

try:
    with DocumentParser(
        base_url=args.base_url,
        model=args.model,
        api_key="EMPTY",
        timeout=240,
        fullpage=GenerationSettings(temperature=0),
    ) as parser:
        result = parser.parse(args.image, mode="single")
except GenerationError as error:
    cli.exit(1, f"Page OCR failed: {error}\n")

print(result["markdown"])
