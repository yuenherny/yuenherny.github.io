# yuenherny.github.io

Personal portfolio of Yu Yuen Hern, live at https://yuenherny.github.io/

## Stack

Plain HTML, CSS and vanilla JavaScript; no framework or build step. Dev-only npm tooling for linting (Prettier, html-validate, Stylelint).

## Run locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000

## Lint

```sh
npm ci
npm run lint
npm run format:check
```

## Deploy

GitHub Pages builds from the `main` branch automatically on push. CI (`.github/workflows/ci.yml`) lints and checks links on pull requests.

## Versions

- `v1.0.0` — original templatemo-based site (jQuery/Bootstrap).
- `v2.0.0` — plain HTML/CSS rewrite.

## Credits

Original layout based on the [Lavish template by templatemo](https://templatemo.com/tm-458-lavish). Icons are inline SVGs derived from [Font Awesome 4](https://fontawesome.com/v4/license/) (SIL OFL 1.1). Photos in `images/` from their respective sources.

## Licence

Apache License 2.0, see [`LICENSE`](LICENSE).
