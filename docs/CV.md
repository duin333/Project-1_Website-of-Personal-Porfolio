# Downloadable CV

The English CV is generated from owner-confirmed profile facts and the reviewed project details. It uses the supplied reference CV's two-column hierarchy, with a photo/contact/profile sidebar and education/technical skills/projects in the main column. No employment, awards, phone number or date of birth were invented.

- Website asset: `public/cv/Nguyen-Thai-Ky-Duyen-CV-EN.pdf`
- Generator: `scripts/generate_cv.py`
- Requirements: Python with `reportlab`; Arial regular and bold TTF fonts are embedded.
- Regenerate on Windows: `python scripts/generate_cv.py`
- Elsewhere set `CV_FONT_DIR` to a directory containing `arial.ttf` and `arialbd.ttf`.

After regeneration, render the PDF and visually inspect it. Confirm one page, complete Vietnamese name, working links, and no overlap. The generator checks column height to prevent accidental overflow.

The website labels the download as English in all three UI languages. Vietnamese navigation now uses “Kỹ năng”.
