# Refactor Plan

Baseline: `v1.0.0` (commit `6f888c1`, 2024-12-12) — templatemo Lavish-based single page, no build step, served by GitHub Pages from `main`.

Each phase is a separate PR and ends with a version tag, so any phase can be rolled back independently.

## Open decisions

| # | Decision | Options | Recommendation |
|---|---|---|---|
| D1 | `archived/version_0/` | (a) delete · (b) keep + `noindex`, drop analytics · (c) migrate unique projects (ROBOCON, wave energy, Katak Detector, Streamlit validator) then delete | (c) |
| D2 | Long-term stack | (a) keep jQuery/Bootstrap 3, upgrade only · (b) plain HTML/CSS/vanilla JS, no framework · (c) static site generator (Astro / Jekyll) | Decide after Phase 2; (b) if content stays one page |
| D3 | Analytics | (a) keep GA4 + consent banner · (b) cookieless (GoatCounter / Plausible) · (c) remove | (b) |
| D4 | Rewrite git history to drop ~98 MB of old images | (a) yes, `git filter-repo` + force-push · (b) no | (b) — tag `v1.0.0` would no longer match, low benefit |

## Phase 1 — Quick fixes → `v1.1.0`

No visual change except faster loading. Est. ~1–2 h.

1. **Images** (audit #1)
   - Resize portfolio thumbnails to max 800 px wide, hero `ai-landscape.jpg` to 1920 px.
   - Convert to WebP (keep JPEG fallback via `<picture>` only if needed).
   - Add `loading="lazy"`, `width`/`height` attributes to `<img>`.
   - Target: total `images/` < 1 MB (currently ~22 MB).
2. **Link checker** (#3): replace placeholder workflow with `lycheeverse/lychee-action`, run on push to `main`, PRs, and weekly `schedule`; check `index.html` locally rather than the live URL so PRs are validated before deploy.
3. **Mixed content** (#5): Google Fonts `http://` → `https://`, add `preconnect`.
4. **HTML validity** (#6): remove stray `</i>`, duplicate charset meta, `X-UA-Compatible`.
5. **Accessibility basics** (#7): `aria-label` on contact icon links, descriptive `alt` per image, fix `aria-valuenow` to match widths.
6. **CSS bug** (#8): `#portfolio h4 h5` → `#portfolio h4, #portfolio h5`.
7. **Hygiene** (#12): delete `fonts/.DS_Store`, `js/.DS_Store`; replace Node `.gitignore` with one covering `.DS_Store`, editor files.
8. **D1** applied here (archive handling).

**Verify:** Lighthouse (mobile) before/after; `html-validate index.html`; lychee passes; visual diff via Playwright screenshots at 375 px and 1440 px.

## Phase 2 — Maintenance → `v1.2.0`

Est. ~half day.

1. **Mobile portfolio** (#2)
   - Replace `font-size: 1vw` / `1%` with `clamp()` / `rem`.
   - Below 768 px: show caption beneath image instead of hover overlay.
   - Add `:focus-within` so keyboard users can reveal overlay links.
2. **Dependency upgrade** (#4): jQuery 1.10.2 → 3.7.x, Bootstrap 3.3.4 → 3.4.1 (clears listed CVEs, same API). Check fullPage 2.6.2 and text-rotator against jQuery 3; add jQuery Migrate temporarily if anything breaks.
3. **Remove unused deps** (#9): `smoothscroll.js` + `smoothScroll` class; Glyphicons fonts; evaluate replacing fullPage.js (only used for nav dots with `autoScrolling: false`) with a small IntersectionObserver script.
4. **SEO / sharing** (#14): proper `<title>`, Open Graph + Twitter card tags with a 1200×630 preview image, canonical link, `sitemap.xml`, `robots.txt`; drop meta keywords (#15).
5. **Analytics** (#10): apply D3.
6. **Content**: footer year (#15); review "About" copy and skills bars for currency.

**Verify:** as Phase 1, plus manual test on a real phone (tap to open project links) and keyboard-only navigation.

## Phase 3 — Tooling → `v1.3.0`

Est. ~1–2 h.

1. Add `package.json` (dev-only) with `prettier`, `html-validate`, `stylelint`; normalise indentation (#16).
2. CI workflow: format check + HTML/CSS lint + lychee on every PR.
3. `.editorconfig`.
4. README (#17): what it is, how to run locally (`python3 -m http.server`), how it deploys, credits/licence for templatemo and vendored libraries.

## Phase 4 — Optional rewrite → `v2.0.0`

Only if D2 = (b) or (c). Est. 1–3 days.

- Rebuild layout in semantic HTML + modern CSS (grid, custom properties, `prefers-color-scheme`, `prefers-reduced-motion`), no jQuery/Bootstrap.
- Move project data to a single JSON/YAML source so adding a project is a one-line change.
- Keep URL structure and section anchors (`#home`, `#work`, `#about`, `#portfolio`, `#contact`) so existing links still work.
- If SSG: deploy via GitHub Actions Pages workflow instead of branch deploy.

**Verify:** Lighthouse ≥ 95 in all four categories on mobile; zero console errors; feature parity checklist against `v1.0.0`.

## Out of scope

- History rewrite (unless D4 changes).
- New sections/content beyond what is migrated from `archived/`.
