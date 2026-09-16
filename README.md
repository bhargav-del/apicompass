# API Compass

> A fast, private JSON formatter and API payload toolbox.

[![Quality checks](https://github.com/bhargav-del/apicompass/actions/workflows/quality.yml/badge.svg)](https://github.com/bhargav-del/apicompass/actions/workflows/quality.yml)
[![Latest release](https://img.shields.io/github/v/release/bhargav-del/apicompass?display_name=tag&sort=semver)](https://github.com/bhargav-del/apicompass/releases)
[![License](https://img.shields.io/github/license/bhargav-del/apicompass)](https://github.com/bhargav-del/apicompass/blob/main/LICENSE)

A fast, private JSON formatter and API payload toolbox. Built as a local-first, dependency-light product experience with a self-contained Windows desktop app, a portable Windows build, and a scheduled Android APK release.

## What it demonstrates

- Pretty-print and minify JSON
- Local validation with error feedback
- Key count, size, depth, and line metrics
- Copy formatted payloads without sending data to a server

## Run locally

This is a zero-build static app for the browser:

```bash
git clone https://github.com/bhargav-del/apicompass.git
cd apicompass
python3 -m http.server 4173
```

Open <http://localhost:4173>.

For syntax and metadata checks:

```bash
node --check app.js
```

## Project structure

```text
├── index.html                 Product UI
├── styles.css                 Responsive visual system
├── app.js                    Product interactions
├── desktop/main.cjs           Windows Electron shell
├── capacitor.config.json      Android shell configuration
├── .github/workflows/         Quality, Pages, Windows, and Android automation
└── CHANGELOG.md               Release history
```

## Releases

The Windows release is fully self-contained: download the portable `.exe` and run it directly. The app bundles its HTML, CSS, JavaScript, and runtime inside the executable package, so users do not need separate web files.

- [Windows downloads](https://github.com/bhargav-del/apicompass/releases/tag/v1.0.5)
- Portable: `API Compass-Portable-1.0.5.exe`
- Android 7+ (API 24+) `v1.0.0` APK remains scheduled for **September 16, 2026 at 08:00 IST**.

## Privacy and security

The core experience runs locally in the browser. No credentials are required. See [SECURITY.md](SECURITY.md) for responsible disclosure guidance.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, testing, and pull-request expectations.

## Roadmap

- Add richer empty and error states
- Expand keyboard navigation
- Add end-to-end browser coverage for the highest-value flows
- Keep the product lightweight before adding network dependencies

## License

MIT © 2026 Yuin
