# bocere.app

The marketing site for Bōcere's three desktop apps: **Student** (essays), **Scribe** (books) and **Scholar** (books, blogs and newsletters). Published by H.D. Publishing.

Plain HTML, CSS and a little JavaScript. No build step, no packages, nothing to install.

## What's where

| Path | What it is | Published? |
| --- | --- | --- |
| `site/` | **The website.** Everything in here goes live at bocere.app | Yes |
| `site/index.html` | Home page | Yes |
| `site/student.html`, `scribe.html`, `scholar.html` | One page per app | Yes |
| `site/privacy.html`, `site/404.html` | Privacy page, "page not found" page | Yes |
| `site/assets/css/site.css` | Every colour, font and size (the `:root` block at the top) | Yes |
| `site/assets/img/` | The official Bōcere logo and H.D. seal (copied from the H.D. Publishing brand folder), plus the curtain and valance artwork | Yes |
| `site/assets/js/site.js` | The curtain opening, the footlight that follows the cast, the trim-size switcher, the Accept/Reject scene, the Play buttons | Yes |
| `site/assets/video/` | Screen recordings of the real app | Yes |
| `site/assets/fonts/` | IM Fell English and IM Fell English SC (the 17th-century Fell types) and EB Garamond (SIL Open Font License, licences included) | Yes |
| `.github/workflows/publish.yml` | Publishes `site/` to GitHub Pages on every push to `main` | No |
| `.gitignore` | Keeps internal notes (product facts, design notes, audits, the publishing guide) on the owner's computer only | No |

## Preview it on your Mac

```bash
cd site && python3 -m http.server 4321 --bind 127.0.0.1
```

Run it from this folder, then open http://127.0.0.1:4321 . Press Ctrl+C in that terminal to stop it.

## Common edits

**Prices** appear in three places. Change all three together:
1. `site/index.html`: each app's act (search for `class="admission"`) and the bill (search for `Prices of admission`).
2. `site/scribe.html`: the top of the page and Scribe's bill (search for `Scribe’s bill`).
3. `site/student.html` / `site/scholar.html`: the price beside the button at the top.

**Turning on the waitlist.** The form at the bottom of the home page (`id="join"`) is switched off on purpose. When you pick a provider:
1. Put the provider's sign-up address in the form's `action="…"`. For Buttondown it is `https://buttondown.com/api/emails/embed-subscribe/YOUR-USERNAME` (verify in your Buttondown settings under "Embedding").
2. Delete the two `disabled` words (on the `<input>` and the `<button>`) and change the note "Sign-ups open soon".
3. Update the "The waitlist" section of `site/privacy.html` to name the provider.
4. If the provider is not Buttondown, add its address to `form-action` in the `Content-Security-Policy` line at the top of every page.

**Colours** live in `site/assets/css/site.css` under `:root`: house ink `--ink`, ivory `--ivory`, claret `--claret` (the brand's colours). Each app's act has its own ground: Student on ivory, Scribe on claret, Scholar on ink. Claret is kept for the logo's ō, the main button and the curtain.

**The logo** is the official file from the brand folder; replace it there and copy it again rather than editing the SVG here.

## Rules this site keeps

- Nothing loads from another website: no trackers, no analytics, no outside fonts or scripts. Keep it that way, or update the privacy page first.
- No testimonials, customer counts or "best" claims until they are real and provable.
- No secrets (API keys, tokens) anywhere in this folder. The site is public.
