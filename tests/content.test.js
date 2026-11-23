import { test } from "node:test";
import assert from "node:assert/strict";
import {
  copy,
  projects,
  languages,
  readRoute,
  projectRoute,
  roles,
} from "../src/content.js";

test("all supported languages have the same UI keys and nonempty strings", () => {
  const expected = Object.keys(copy.vi).sort();
  for (const lang of languages) {
    assert.deepEqual(Object.keys(copy[lang]).sort(), expected, lang);
    for (const [key, value] of Object.entries(copy[lang])) {
      assert.ok(
        Array.isArray(value)
          ? value.length === 3 && value.every(Boolean)
          : typeof value === "string" && value.trim().length > 0,
        `${lang}.${key}`,
      );
    }
  }
});
test("each project has complete translated details, unique ID, and a verified role", () => {
  assert.equal(new Set(projects.map((p) => p.id)).size, projects.length);
  assert.deepEqual(
    projects.map((p) => p.id),
    ["comichub", "musicbox", "portfolio", "foodgo"],
  );
  for (const p of projects)
    for (const lang of languages) {
      for (const key of ["subtitle", "summary", "description", "next"])
        assert.ok(p[lang][key]?.trim(), `${p.id}.${lang}.${key}`);
      assert.equal(p[lang].highlights.length, 3);
      if (p.period) for (const key of ["challenge", "outcome"]) assert.ok(p[lang][key]?.trim(), `${p.id}.${lang}.${key}`);
      assert.ok(roles[p.id][lang].trim());
      assert.ok(copy[lang][p.status]);
      if (p.repo) assert.equal(new URL(p.repo).protocol, "https:");
    }
});
test("project links round-trip in every language and invalid routes do not open dialogs", () => {
  for (const lang of languages) {
    assert.deepEqual(readRoute(projectRoute(lang)), { lang, project: null });
    for (const p of projects)
      assert.deepEqual(readRoute(projectRoute(lang, p.id)), {
        lang,
        project: p.id,
      });
  }
  assert.equal(readRoute("#projects"), null);
  assert.equal(readRoute("#/fr/projects/comichub"), null);
  assert.equal(readRoute("#/en/projects/comichub/extra"), null);
  assert.deepEqual(readRoute("#/en/projects/not-a-project"), {
    lang: "en",
    project: null,
  });
});

