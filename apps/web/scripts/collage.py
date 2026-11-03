"""Builds the collage art in public/collage from the stock photos (python apps/web/scripts/collage.py).

- Die-cut stickers: the bake cut out of its plain background, a white sticker border round it.
- Halftone prints: a dot screen in cherry ink, like the stippled cherries on the SugarLace board pin, made from
  the cut-outs and from two shapes drawn here (a pair of cherries and an egg).

Needs Pillow and NumPy, and opencv-python for the watercolour stickers. The outputs are committed; run this again only when a source photo changes.
"""

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1] / "public"
OUT = ROOT / "collage"
CHERRY_INK = (148, 25, 57)  # --bbm-color-cherry-700
COCOA_INK = (50, 24, 11)  # --bbm-color-brown-900


def flood_background(a: np.ndarray, tol: int) -> np.ndarray:
    """True where a pixel is part of the plain background touching the edges."""
    h, w, _ = a.shape
    border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    bg = np.median(border, axis=0)
    cand = np.abs(a - bg).max(axis=2) < tol
    mask = np.zeros((h, w), bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if cand[y, x]:
                mask[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if cand[y, x] and not mask[y, x]:
                mask[y, x] = True
                q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and cand[ny, nx] and not mask[ny, nx]:
                mask[ny, nx] = True
                q.append((ny, nx))
    return mask


def keep_large(fg: np.ndarray, min_share: float) -> np.ndarray:
    """Drops specks: keeps connected pieces at least `min_share` of the biggest one."""
    h, w = fg.shape
    labels = np.zeros((h, w), np.int32)
    sizes = [0]
    n = 0
    for y in range(h):
        for x in range(w):
            if fg[y, x] and not labels[y, x]:
                n += 1
                size = 0
                q = deque([(y, x)])
                labels[y, x] = n
                while q:
                    cy, cx = q.popleft()
                    size += 1
                    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        ny, nx = cy + dy, cx + dx
                        if 0 <= ny < h and 0 <= nx < w and fg[ny, nx] and not labels[ny, nx]:
                            labels[ny, nx] = n
                            q.append((ny, nx))
                sizes.append(size)
    if n == 0:
        return fg
    biggest = max(sizes)
    keep = {i for i, s in enumerate(sizes) if i and s >= biggest * min_share}
    return np.isin(labels, list(keep))


def cutout(src: str, crop=(0, 0, 1, 1), tol=24, min_share=0.08, size=900) -> Image.Image:
    im = Image.open(ROOT / src).convert("RGB")
    w, h = im.size
    im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
    im.thumbnail((size, size))
    a = np.asarray(im).astype(np.int16)
    fg = ~flood_background(a, tol)
    fg_img = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(7))
    fg = keep_large(np.asarray(fg_img) > 128, min_share)
    alpha = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.1))
    alpha = alpha.point(lambda v: 255 if v > 120 else 0).filter(ImageFilter.GaussianBlur(0.7))
    rgba = im.convert("RGBA")
    rgba.putalpha(alpha)
    return rgba.crop(rgba.getbbox())


def sticker(cut: Image.Image, border=14) -> Image.Image:
    """A white die-cut border round the cut-out, rounded like a real sticker."""
    pad = border * 2
    w, h = cut.size
    canvas = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
    canvas.paste(cut, (pad, pad), cut)
    alpha = canvas.getchannel("A").point(lambda v: 255 if v > 40 else 0)
    grown = alpha.filter(ImageFilter.MaxFilter(border * 2 + 1)).filter(ImageFilter.GaussianBlur(border / 3))
    grown = grown.point(lambda v: 255 if v > 110 else 0).filter(ImageFilter.GaussianBlur(0.8))
    white = Image.new("RGBA", canvas.size, (255, 253, 246, 0))
    white.putalpha(grown)
    white.alpha_composite(canvas)
    return white.crop(white.getbbox())


def halftone(img: Image.Image, cell=9, ink=CHERRY_INK, angle=45, gamma=0.9, floor=0.06) -> Image.Image:
    """A dot screen: each dot's size follows how dark the picture is there."""
    rgba = img.convert("RGBA")
    w, h = rgba.size
    lum = np.asarray(rgba.convert("L")).astype(np.float32) / 255
    alpha = np.asarray(rgba.getchannel("A")).astype(np.float32) / 255
    scale = 3
    out = Image.new("RGBA", (w * scale, h * scale), (0, 0, 0, 0))
    d = ImageDraw.Draw(out)
    t = np.deg2rad(angle)
    ct, st = np.cos(t), np.sin(t)
    diag = int(np.hypot(w, h)) + cell
    for gy in range(-diag, diag, cell):
        for gx in range(-diag, diag, cell):
            x = gx * ct - gy * st + w / 2
            y = gx * st + gy * ct + h / 2
            if not (0 <= x < w and 0 <= y < h):
                continue
            ix, iy = int(x), int(y)
            if alpha[iy, ix] < 0.5:
                continue
            dark = (1 - lum[iy, ix]) ** gamma
            if dark < floor:
                continue
            r = min(cell * 0.62, cell * 0.66 * np.sqrt(dark)) * scale
            cx, cy = x * scale, y * scale
            d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=ink + (255,))
    return out.resize((w, h), Image.LANCZOS)


def shaded_ball(size: int, cx: float, cy: float, r: float, light=(-0.45, -0.55)) -> np.ndarray:
    """Brightness of a lit sphere (1 = white), and 0 alpha outside it."""
    yy, xx = np.mgrid[0:size, 0:size].astype(np.float32)
    nx = (xx - cx) / r
    ny = (yy - cy) / r
    inside = nx**2 + ny**2 <= 1
    nz = np.sqrt(np.clip(1 - nx**2 - ny**2, 0, 1))
    lx, ly = light
    lz = np.sqrt(max(0.0, 1 - lx**2 - ly**2))
    shade = np.clip(nx * lx + ny * ly + nz * lz, 0, 1)
    return np.where(inside, 0.12 + 0.88 * shade**1.6, np.nan)


def drawn_cherries(size=900) -> Image.Image:
    """A pair of cherries on joined stems, shaded, ready for the dot screen."""
    lum = np.full((size, size), np.nan, np.float32)
    for cx, cy, r in ((size * 0.36, size * 0.66, size * 0.2), (size * 0.66, size * 0.7, size * 0.18)):
        ball = shaded_ball(size, cx, cy, r)
        lum = np.where(np.isnan(lum), ball, np.where(np.isnan(ball), lum, np.minimum(lum, ball)))
    alpha = (~np.isnan(lum)).astype(np.uint8) * 255
    lum = np.nan_to_num(lum, nan=1.0)
    img = Image.fromarray((lum * 255).astype(np.uint8)).convert("RGBA")
    img.putalpha(Image.fromarray(alpha))
    # Stems and a leaf, drawn dark so they print solid
    d = ImageDraw.Draw(img)
    stem = int(size * 0.018)
    d.line([(size * 0.38, size * 0.47), (size * 0.47, size * 0.28), (size * 0.6, size * 0.12)], fill=(30, 30, 30, 255), width=stem, joint="curve")
    d.line([(size * 0.64, size * 0.53), (size * 0.62, size * 0.3), (size * 0.6, size * 0.12)], fill=(30, 30, 30, 255), width=stem, joint="curve")
    d.ellipse((size * 0.57, size * 0.09, size * 0.63, size * 0.15), fill=(30, 30, 30, 255))
    d.polygon([(size * 0.6, size * 0.12), (size * 0.78, size * 0.04), (size * 0.88, size * 0.1), (size * 0.72, size * 0.17)], fill=(90, 90, 90, 255))
    return img


def drawn_egg(size=600) -> Image.Image:
    yy, xx = np.mgrid[0:size, 0:size].astype(np.float32)
    cx, cy = size / 2, size * 0.54
    rx, ry = size * 0.3, size * 0.4
    ny = (yy - cy) / ry
    # Narrower at the top, like an egg
    rx_at = rx * (1 - 0.18 * np.clip(-ny, 0, 1))
    nx = (xx - cx) / rx_at
    inside = nx**2 + ny**2 <= 1
    nz = np.sqrt(np.clip(1 - nx**2 - ny**2, 0, 1))
    shade = np.clip(nx * -0.45 + ny * -0.5 + nz * 0.74, 0, 1)
    lum = np.where(inside, 0.3 + 0.7 * shade**1.3, 1)
    img = Image.fromarray((lum * 255).astype(np.uint8)).convert("RGBA")
    img.putalpha(Image.fromarray(inside.astype(np.uint8) * 255))
    return img


def save(img: Image.Image, name: str, max_side=900):
    img = img.copy()
    img.thumbnail((max_side, max_side))
    img.save(OUT / f"{name}.webp", "WEBP", quality=88, method=6)
    print(f"{name}.webp", img.size)


# Mom's own cakes, already cut out in photos/thumbs, painted as watercolour stickers for Our story (story.tsx)
MOMS_CAKES = {
    "papa": "IMG-20260808-WA0045",
    "yatharth": "IMG-20260913-WA0002",
    "maa": "IMG-20260913-WA0007",
    "janmashtami": "IMG-20260913-WA0013",
    "teacher": "IMG-20260913-WA0014",
    "wifey": "IMG-20260913-WA0009",
    "heart": "IMG-20260206-WA0062",
}


rng = np.random.default_rng(7)  # the same paper grain every run


def paper(h, w, scale=1.0):
    import cv2

    """Cold-press paper grain: soft blotches plus fine tooth, ~1.0 mean."""
    big = cv2.GaussianBlur(rng.normal(0, 1, (h, w)).astype(np.float32), (0, 0), 18 * scale)
    mid = cv2.GaussianBlur(rng.normal(0, 1, (h, w)).astype(np.float32), (0, 0), 4 * scale)
    fine = cv2.GaussianBlur(rng.normal(0, 1, (h, w)).astype(np.float32), (0, 0), 0.8)
    t = big / (big.std() + 1e-6) * 0.06 + mid / (mid.std() + 1e-6) * 0.035 + fine / (fine.std() + 1e-6) * 0.02
    return 1 + t


def watercolour(rgba: Image.Image) -> Image.Image:
    """A cut-out bake painted in watercolour (flat washes, pooled edges, paper grain, a sepia pencil line), on a
    white die-cut sticker like the watercolour stickers on the reference menu."""
    import cv2  # only the watercolour stickers need OpenCV

    rgba = rgba.convert("RGBA")
    rgba = rgba.crop(rgba.getchannel("A").point(lambda v: 255 if v > 40 else 0).getbbox())
    rgba.thumbnail((620, 620))
    w, h = rgba.size
    pad = 40
    canvas = Image.new("RGBA", (w + 2 * pad, h + 2 * pad), (255, 253, 246, 0))
    canvas.paste(rgba, (pad, pad), rgba)
    a = np.asarray(canvas).astype(np.float32)
    alpha = a[..., 3] / 255
    rgb = a[..., :3]
    # Composite on paper white so the washes fade out, not to black
    rgb = rgb * alpha[..., None] + 250 * (1 - alpha[..., None])
    bgr = cv2.cvtColor(rgb.astype(np.uint8), cv2.COLOR_RGB2BGR)

    # 1. Flatten into washes
    flat = cv2.pyrMeanShiftFiltering(bgr, 13, 36)
    flat = cv2.edgePreservingFilter(flat, flags=cv2.RECURS_FILTER, sigma_s=40, sigma_r=0.35)
    flat = cv2.cvtColor(flat, cv2.COLOR_BGR2RGB).astype(np.float32) / 255

    # 2. Translucent pigment: lift toward paper, keep hue; a little more saturation
    hsv = cv2.cvtColor((flat * 255).astype(np.uint8), cv2.COLOR_RGB2HSV).astype(np.float32)
    hsv[..., 1] = np.clip(hsv[..., 1] * 1.15, 0, 255)
    hsv[..., 2] = np.clip(hsv[..., 2] * 0.86 + 255 * 0.17, 0, 255)
    col = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2RGB).astype(np.float32) / 255

    # 3. Edge darkening where washes meet (pigment pools at the rim)
    lum = cv2.cvtColor((col * 255).astype(np.uint8), cv2.COLOR_RGB2GRAY).astype(np.float32)
    soft = cv2.GaussianBlur(lum, (0, 0), 3)
    rim = np.clip((soft - lum) / 30, 0, 1)
    col = col * (1 - rim[..., None] * 0.45)

    # 4. Granulation: paper grain, stronger in darker pigment
    g = paper(*col.shape[:2])
    dark = 1 - col.mean(axis=2, keepdims=True)
    col = np.clip(col * (1 - (1 - g[..., None]) * (0.6 + dark)), 0, 1)

    # 5. A soft sepia pencil line from the photo's edges
    edges = cv2.Canny(cv2.GaussianBlur(bgr, (0, 0), 1.6), 40, 110).astype(np.float32) / 255
    edges = cv2.GaussianBlur(edges, (0, 0), 0.7)
    ink = np.array([0.42, 0.25, 0.17])
    col = col * (1 - edges[..., None] * 0.45) + ink * edges[..., None] * 0.45

    # 6. A painted, slightly ragged edge: blur the mask, wobble it with noise, threshold
    m = cv2.GaussianBlur(alpha, (0, 0), 3)
    wob = cv2.GaussianBlur(rng.normal(0, 1, m.shape).astype(np.float32), (0, 0), 6)
    wob = wob / (wob.std() + 1e-6) * 0.12
    mask = np.clip((m + wob - 0.45) * 6, 0, 1)
    # Only the bake itself: drop stray flecks the wobble cut loose
    n, labels, stats, _ = cv2.connectedComponentsWithStats((mask > 0.5).astype(np.uint8))
    if n > 2:
        biggest = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
        keep = stats[:, cv2.CC_STAT_AREA] >= stats[biggest, cv2.CC_STAT_AREA] * 0.04
        keep[0] = False
        mask = mask * cv2.dilate(keep[labels].astype(np.uint8), np.ones((5, 5), np.uint8))
    # Wash bleeds a little lighter at the very edge
    feather = cv2.GaussianBlur(mask, (0, 0), 4)
    col = col * feather[..., None] + (1 - feather[..., None]) * np.array([1, 0.99, 0.965])

    out = np.dstack([col * 255, mask * 255]).astype(np.uint8)
    painted = Image.fromarray(out, "RGBA")

    # 7. White die-cut sticker border, like the reference stickers
    al = painted.getchannel("A").point(lambda v: 255 if v > 60 else 0)
    grown = al.filter(ImageFilter.MaxFilter(23)).filter(ImageFilter.GaussianBlur(4)).point(lambda v: 255 if v > 110 else 0)
    grown = grown.filter(ImageFilter.GaussianBlur(0.8))
    base = Image.new("RGBA", painted.size, (255, 253, 246, 0))
    base.putalpha(grown)
    base.alpha_composite(painted)
    return base.crop(base.getbbox())



def watercolour_stickers():
    for name, photo in MOMS_CAKES.items():
        save(watercolour(Image.open(ROOT / "photos" / "thumbs" / f"{photo}.webp")), f"wc-{name}", 560)
    save(watercolour(cutout("stock/home-hero.webp", crop=(0.12, 0, 1, 0.93), tol=24, min_share=0.05)), "wc-cherry-cake", 560)
    save(watercolour(cutout("stock/treat-jar-cakes.webp", tol=26, min_share=0.2)), "wc-jar-cakes", 560)


def main():
    OUT.mkdir(exist_ok=True)
    cuts = {
        "cherry-cake": cutout("stock/home-hero.webp", crop=(0.12, 0, 1, 0.93), tol=24, min_share=0.05),
        "gift-box": cutout("stock/home-gift.webp", tol=24, min_share=0.05),
        "drip-cake": cutout("stock/home-about.webp", crop=(0, 0, 1, 0.76), tol=22, min_share=0.2),
        "jar-cakes": cutout("stock/treat-jar-cakes.webp", tol=26, min_share=0.2),
    }
    for name, cut in cuts.items():
        save(sticker(cut), f"sticker-{name}")
    save(halftone(cuts["cherry-cake"], cell=8), "halftone-cake")
    save(halftone(drawn_cherries(), cell=12), "halftone-cherries", 700)
    save(halftone(drawn_cherries(), cell=12, ink=(243, 197, 200)), "halftone-cherries-pink", 700)
    save(halftone(drawn_egg(), cell=10, ink=COCOA_INK), "halftone-egg", 500)
    watercolour_stickers()


if __name__ == "__main__":
    import sys

    # `python scripts/collage.py watercolour` makes only the watercolour stickers (needs opencv-python)
    watercolour_stickers() if sys.argv[1:] == ["watercolour"] else main()
