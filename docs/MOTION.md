# Motion & typography review

## Reference observations

Observed in the live pages, 23 November 2026. These are interface patterns, not copied assets or source code.

| Reference                               | Observed treatment                                                                        | Adaptation here                                                                        |
| --------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| https://portfolio.ngocdn07.workers.dev/ | Cursor dot/ring, spotlight, tilted cards, scroll reveal, moving technology strip          | Blue cursor follower, subtle paper glare, folder tilt and scroll reveal                |
| https://origiri.id.vn/                  | Contextual cursor label, top scroll progress, title line entrance and section transitions | Localized MỞ/VIEW/見る cursor over folders, reading progress, editorial title entrance |
| https://phamhoangvu.me/                 | Cursor ring/spotlight, magnetic wrappers, perspective card glare                          | Magnetic primary controls and 3D cover tilt                                            |

## Implemented

- Cursor follower: direct dot + ring interpolated with requestAnimationFrame. Becomes a localized label over project folders.
- Mouse trail: a bounded pool of seven star elements, animated with the Web Animations API. No unbounded particle list or React renders per move.
- Magnetic buttons: small CSS `translate` offsets on primary actions and selected icon controls.
- Folder tilt: pointer coordinates drive perspective rotation and the glare origin. Pointer leave resets all axes.
- Scroll reveal: IntersectionObserver reveals sections once as they enter the viewport. If unavailable, content remains visible.
- Scroll progress and subtle parallax, title/folder entrance, dialog opening and decorative star rotation.

## FX preferences

- **AUTO**: follows `prefers-reduced-motion`. Default; reduced-motion users retain static readable content.
- **ON**: explicit per-site override enabling motion even if the system requests reduced motion.
- **OFF**: disables decorative motion and custom cursor. Ordinary control hover feedback remains.
- Pointer effects always require a fine, hover-capable pointer; touch input keeps native behavior.
- The native cursor returns while a project dialog is open (native dialogs use the browser top layer).
- Preferences persist in `duyen-motion`. The ON option never changes operating-system settings.

## Fonts

- Be Vietnam Pro: body, navigation and labels (400/500/600/700).
- Playfair Display: editorial headings and italic accents (400 normal and true italic).
- Noto Sans JP: Japanese content (400); language-specific rules avoid simulated Japanese italic.
- Fontsource packages ship the font files with the build, including Vietnamese subsets. No runtime Google Fonts CSS request.
- Font licenses are included in `public/font-licenses/` and copied into the deployed site.
