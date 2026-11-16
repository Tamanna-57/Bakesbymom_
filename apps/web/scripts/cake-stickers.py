"""Die-cut stickers of our own cakes, for the home hero.

The cake photos in the R2 bucket are already cut out on a clear background, so unlike collage.py
there is nothing to flood-fill here: we trim the clear margin, put the same white sticker border
round it, and write a WebP next to the painted stickers.

    python scripts/cake-stickers.py

Run it again when the hero should show different cakes — change HERO below. The keys are the
photo keys in the bucket, which the catalog's cover_url points at.
"""

from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image

import sys

sys.path.insert(0, str(Path(__file__).parent))
from collage import sticker  # the same white die-cut border the painted stickers use

API = "https://bakesbymom.snehagupta.workers.dev/api/photos/uploads"
OUT = Path(__file__).resolve().parent.parent / "public" / "collage"

# The cakes on the hero arch, and what each is, so the next person knows what they are looking at.
HERO = {
    "tiers": ("IMG-20260913-WA0005", "the two-tier anniversary cake in mint and lilac"),
    "bride": ("IMG-20251128-WA0019", "the bride-to-be cake, cream with roses"),
    "lotus": ("IMG-20260913-WA0013", "the Janmashtami cake with its pink lotuses"),
}


def fetch(key: str) -> Image.Image:
    # The bucket is behind Cloudflare, which turns away the default urllib agent.
    request = Request(f"{API}/{key}.png", headers={"User-Agent": "bakesbymom-build"})
    with urlopen(request, timeout=60) as response:
        img = Image.open(BytesIO(response.read()))
        img.load()
    # The cut-outs carry a wide clear margin; the sticker border should hug the cake itself.
    return img.convert("RGBA").crop(img.convert("RGBA").getbbox())


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (key, what) in HERO.items():
        out = sticker(fetch(key))
        out.thumbnail((900, 900))
        out.save(OUT / f"sticker-cake-{name}.webp", "WEBP", quality=88, method=6)
        print(f"sticker-cake-{name}.webp  {out.size}  — {what}")


if __name__ == "__main__":
    main()
