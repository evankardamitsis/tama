# Contentful — phase 2

Phases 1 and 2 of the [migration plan](../README.md#phase-2--contentful): the
content model, and the import that fills it. Neither needs a Contentful space
to run or to review.

```
contentful/
  migrations/01-initial-model.cjs   the content model, as a versioned script
  lib/plan.ts                       src/content → a flat graph of assets + entries
  import.ts                         validates the graph, then pushes it
  verify.ts                         round-trips the graph back and diffs it
```

## Commands

```bash
npm run cf:plan       # build the graph, validate it, print a summary. No network.
npm run cf:verify     # reconstruct every page from the graph and diff it. No network.
npm run cf:migrate    # create the content model in a space
npm run cf:import -- --apply   # upload the assets and publish the entries
```

`cf:plan` and `cf:verify` are the ones that matter before access exists.
`cf:verify` is the guarantee: it rebuilds all eleven pages out of the planned
entries and compares them with `src/content`. If it passes, a getter reading
these entries hands components exactly what they receive today.

## Credentials

Copy `.env.example` to `.env.local` and fill it in. The management token is
write access to the whole space — it belongs only in the shell running the
import, never in the app bundle or in git.

## Running it for real

```bash
cp .env.example .env.local        # then fill it in
CONTENTFUL_ENVIRONMENT=staging npm run cf:migrate       # model first
CONTENTFUL_ENVIRONMENT=staging npm run cf:import -- --apply
```

Both read `.env.local`. The import checks the space's locales before it
writes anything: every field is keyed on the locale code, so a space created
as `en` rather than `en-US` would otherwise fail on all 450 records one at a
time.

Do it on `staging`, check it, then alias `master` to that environment. The
import is safe to re-run: every id is derived from the content, so a second
pass updates the same entries rather than creating a second copy.

## Decisions baked into the model

**Films are referenced by URL, not uploaded.** Contentful caps assets at 50 MB
on the Free and Lite plans and `villa-film.mp4` is 60 MB, so it cannot be
uploaded at all below Premium. `mediaItem.videoUrl` is a plain string, so the
films can stay where they are or move to a video host without the model
changing.

**One `mediaItem` per file *and framing*.** A focal point is a property of a
placement, not of a photograph: the same image in a 3:4 box and a 16:9 box
needs different framing. Two framings of one file are two media items pointing
at one asset.

**Alt text and captions are canonical per file.** They had drifted during the
correction rounds — sixty-five photographs and nine films were described
differently on different pages. The source now carries one description each,
which is both better for screen readers and the reason the round-trip is exact.

**Paragraphs are long text, blank-line separated**, not rich text. It preserves
the `\n` hard breaks the copy relies on and keeps the editing box plain.

**Page fields are flat** rather than nested text blocks. A few more fields per
type, but whoever edits the site gets one form per page instead of a trail of
linked entries.
