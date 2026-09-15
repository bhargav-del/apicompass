# API Compass

A fast, private JSON formatter and API payload toolbox that runs entirely in the browser.

API Compass is designed for the small moments developers lose time on: making payloads readable, spotting malformed JSON, understanding nesting, and copying a clean request body.

## Highlights
- Pretty-print and minify JSON
- Local validation with useful error feedback
- Key count, size, depth, and line metrics
- Sample payload loader
- Copy formatted JSON to clipboard
- Zero network requests for payload processing
- Responsive, no-build static app

## Run locally

```bash
python3 -m http.server 4173
```

Open http://localhost:4173.

## Privacy
Your JSON is processed in the browser. The app does not send payload contents to a server.

## License
MIT © 2026 Yuin

## Desktop release

The repository includes a portable Windows desktop build. Every push to `main` runs the Windows packaging workflow and publishes a `.exe` to the repository's **Releases** section. The desktop shell loads the same app locally, so it works without an API key or server.

## Android release

An Android 7.0+ build (API 24+) is scheduled for **September 16, 2026 at 10:00 IST**. The same responsive product is packaged with Capacitor as an installable APK and published to the repository's **Releases** section as `v1.0.0`.
