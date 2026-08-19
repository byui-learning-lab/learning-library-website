# Learning Library Website — Build Checklist

Last updated: 2026-08-19

**Companion docs:** `spec_sheet.docx` (what the site must do) and `Technical Implementation Outline` (how it maps to Sanity schemas and Next.js routes). This checklist is the step-by-step execution layer on top of both.

**How to use this:** Each item is sized to fit in a single 30–50 minute session and is written to be safe to stop in the middle of — either it's a single atomic action, or the "stop here" note tells you where a safe pause point is. Work top to bottom; later phases depend on earlier ones. Check items off as you go (`[ ]` → `[x]`) and this doc stays your source of truth across sessions.

**Confirmed defaults baked into this plan** (revisit anytime):
- No fixed launch deadline — phase-by-phase pacing.
- NotebookLM links = plain text link/button per topic (not a styled card).
- Canvas sandbox delivery = undecided, placeholder only.
- Analytics tool = undecided, placeholder only, revisit before Phase 9.
- Some real content already exists — placeholder phases will note where real content can slot in instead.
- Attribution Document = **its own Sanity document type** (not fields embedded in Project), with a required-reference validation rule so a Project can't publish without one. Reversible later; cheapest to change before Phase 10.
- Color palette (Phase 3.1) = finalized, real hex values: `primary` `#006EB6` (main brand blue), `primary-dark` `#214491` (deep navy), `primary-medium` `#4F9ACF`, `primary-light` `#A0D4ED`, `neutral` `#949598` (gray), `neutral-black` `#000000`, `neutral-white` `#FFFFFF`. No distinct accent color — everything supplied is blue-family + neutrals; a non-blue accent (e.g. for CTAs or gauge fills) is a future decision, not implied by the current palette. **Implementation note:** the repo scaffolded onto Tailwind v4, which uses CSS-first config (`@theme` blocks) rather than `tailwind.config.js` — a JS config file isn't read automatically in v4, so the palette was implemented as `app/theme.css` (a `@theme` block imported into `globals.css`) instead of a `tailwind.config.js` at the repo root.

**Access note (added during Phase 1):** the GitHub repo lives under the `byui-learning-lab` org, but everyday work happens from personal/school GitHub accounts (e.g. `pal24032`), not the lab account's own login. Add each student staff member as a collaborator/org member on their own account rather than sharing the lab account credentials — better for tracking who did what, and matches the per-`teamMember` model already planned in Phase 2.3/2.5. **Vercel is the opposite pattern on purpose:** the project itself is owned by the lab account (confirmed in Phase 1.3) so deploy/domain settings survive student turnover — add individual accounts as team members on Vercel if/when more than one person needs deploy access, same continuity logic as GitHub. **Sanity project is also owned by the lab account** (organization "Learning Lab", created via Google login as `byui.learning.lab@gmail.com`) — same continuity logic. Important nuance: Sanity treats Google-login and GitHub-login as separate identities even for the same email address, so always log into Studio with **Google**, not GitHub, using the lab Gmail — logging in via GitHub with the same email will show "Not authorized" even though it's technically the same person.

**npm audit note (added during Phase 1.4):** a fresh scaffold showed 9 vulnerabilities (5 moderate, 4 high) via `npm audit` — normal for a new project, almost always nested dev dependencies. Do NOT run `npm audit fix --force` reflexively, it can introduce breaking changes. Revisit during a QA pass (Phase 9 or 13) if it still seems relevant then.

---

## Phase 0: Accounts & Environment Setup — ✅ Complete

- [x] **0.1** Create a GitHub account (or confirm you have one) and create a new empty repo called `learning-library-website`.
- [x] **0.2** Create a Vercel account, sign in with GitHub. Don't connect the repo yet — just confirm the account exists.
- [x] **0.3** Create a Sanity.io account (sanity.io), sign in with GitHub. Don't create a project yet — just confirm the account exists.
- [x] **0.4** Install Node.js locally if not already installed (`node -v` to check; need v18+). Confirmed: v24.19.0 LTS installed (exceeds the v18+ requirement).
- [x] **0.5** Clone the empty GitHub repo to your machine. Confirm you can open it in a code editor (VS Code recommended).

*Note: a Docker path was briefly followed by mistake while on the Node.js download page — resolved, no lingering effect. Docker isn't part of this stack.*

---

## Phase 1: Project Scaffold — ✅ Complete

- [x] **1.1** In the repo folder, run the Next.js create command (`npx create-next-app@latest`) with TypeScript + App Router + Tailwind CSS. Commit immediately after it finishes. *(Note: hit a Windows PowerShell execution-policy block on npx — fixed with `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` as admin. Scaffold completed and committed successfully. Scaffolded onto Next.js 16 / Tailwind v4 — relevant for Phase 3.1, see the implementation note above.)*
- [x] **1.2** Push the initial scaffold to GitHub. Confirm it shows up in the repo online. *(Note: first push hit a 403 — repo lives under the `byui-learning-lab` org but local git was authenticated as personal account `pal24032`, which wasn't yet a collaborator. Fixed by adding `pal24032` as a collaborator on the repo; push succeeded after accepting the invite.)*
- [x] **1.3** Connect the GitHub repo to Vercel (import project). Deploy once with zero customization just to confirm the pipeline works — you should see the default Next.js starter page live on a `*.vercel.app` URL. *(Confirmed: Vercel project created under the lab account, imported from the `byui-learning-lab` org, deployed successfully.)*
- [x] **1.4** In the same repo, run the Sanity init command (`npm create sanity@latest`) to scaffold a Sanity Studio, either embedded in the same repo (recommended for a small non-technical team) or as a sibling folder. Choose the "clean project with no predefined schema" option. *(Confirmed: embedded in the same repo, route left at default `/studio`, project ID + dataset added to `.env.local` (git-ignored by default, not committed), clean/no-schema template used, logged in via Google as the lab Gmail, organization "Learning Lab" created. Committed successfully.)*
- [x] **1.5** Confirm you can run the Sanity Studio locally (`npm run dev` in the studio folder) and log in with your Sanity account. Commit. *(Confirmed: `npm run dev` → `/studio` loads, logged in via Google as lab Gmail, Studio shows empty "no document types" — expected, since no schemas exist yet.)*

*Stop here anytime between numbered items — each is a single command + commit.*

---

## Phase 2: Content Model in Sanity (Schema Design) — ✅ Complete

Full design rationale for every schema lives in the project doc `Phase 2 Schema Decisions`. Two things changed from the original wording below during design, both explained in full there: `document` was renamed to **`libDoc`** (name collision with Sanity's reserved type), and `project`'s "team members + roles" field was dropped in favor of pulling that from `attributionDocument` instead, to avoid entering the same fact twice.

All 11 schema files were committed together in `a5c317a — Add Phase 2 content model schemas`, verified running locally in Studio afterward.

- [x] **2.1** Schema: `libDoc` (type: deep dive / critical review / research report / protocol summary / editorial, tags for theme + research agenda, associated discussant, front-facing protocol field).
- [x] **2.2** Schema: `project` (title, description, associated documents [reference], required `attributionDocument` reference, research agenda/theme tags). *(Team members + roles now come from `attributionDocument`, not a separate field — see decisions doc.)*
- [x] **2.3** Schema: `teamMember` (name, bio, role(s), links: LinkedIn/resume/portfolio, photo, plus a `rank` field added during design — Associate/Fellow/Senior Fellow).
- [x] **2.4** Schema: `researchAgenda` (simple tag/taxonomy type — used by `libDoc`, `project`, and also reused by `canvasSandboxItem` and `protocol` as their topic tag).
- [x] **2.5** Schema: `attributionDocument` — its own document type, one per project. Records who did what + role; source of truth for attribution reports. Fields: reference to `project`, and a repeating list of (reference to `teamMember` + role + plain-language description).
- [x] **2.5b** Validation rule on `project`: the `attributionDocument` reference is **required**, so a Project cannot be published without one. Inline "create new" enabled from the reference field.
- [x] **2.6** Schema: `quickDive` (derived from a `libDoc`; gauge/scale ratings 1–5 for consensus, assumptions, evidence, disagreement; reference back to source document).
- [x] **2.7** Schema: `practiceGuide` (short plain-language statement, visual 1–5 rating field, reference to source document(s)).
- [x] **2.8** Schema: `canvasSandboxItem` (title, topic tag; delivery-method field left as a simple placeholder string for now since delivery mechanism is undecided).
- [x] **2.9** Schema: `protocol` (**placeholder only** — the standalone Protocols product isn't scoped yet). Minimal fields: title, description, topic tag. Exists so the nav placeholder has something behind it; expand later once the product is defined.
- [x] **2.10** Schema: `workflow` (internal-only, never queried on the public site — code comment block + a ⚠ warning in the Studio title/preview noting this; the actual "never published" rule still needs to be enforced at the query level in Phase 5.4 — this schema-level flagging is a second line of defense, not the enforcement itself).
- [x] **2.11** Review pass: open Sanity Studio, manually create one dummy entry of each type, and confirm references between them work (e.g. a `project` can pull in a `teamMember` and a `libDoc`, and an `attributionDocument` can pull in both). Delete the dummy entries when done, or keep them as your first placeholder content — your call.

---

## Phase 3: Design Foundations — 🔵 In progress (3.1–3.5 built, 3.6 needs a manual look)

- [x] **3.1** Gather the finalized color palette (from the reference images) into actual hex codes. Create a `theme` or `tailwind.config` entry with them named semantically (e.g. `primary`, `accent`, `background`, not `blue1`/`blue2`). *(Done — real hex values, see "Confirmed defaults" above. Implemented as `app/theme.css`, a Tailwind v4 `@theme` block imported into `globals.css`, rather than `tailwind.config.js` — see the implementation note above for why.)*
- [x] **3.2** Pick fonts (or confirm defaults) and add them to the Next.js project. *(Chosen: Inter for body/UI text, Source Serif 4 for headings — a functional/credible pairing matching the Burning Glass Institute (functional) + STRADA (inspiring, credible) tone from the spec. Wired up via `next/font/google` in `app/layout.tsx`, replacing the default Geist fonts from the scaffold. This is a default choice, not a locked one — easy to swap in `layout.tsx` and `theme.css` if you want something else.)*
- [x] **3.3** Build the global layout shell: header with top-level nav (Home / Researchers / Practitioners / Stakeholders / Protocols), footer. No BYU-Idaho logo anywhere — use a text wordmark or placeholder mark instead. *(Done — `components/Header.tsx` and `components/Footer.tsx`, wired into `app/layout.tsx` so they wrap every page. Header uses a plain text wordmark ("Learning Library"), no logo.)*
- [x] **3.4** Build a reusable `Card` or `DocumentCard` component (used across Researchers/Practitioners/Stakeholders listings) — title, type badge, short excerpt. *(Done — `components/DocumentCard.tsx`. Takes `href`, `title`, `typeLabel`, optional `excerpt`; not yet wired to real Sanity data since the listing pages themselves are Phase 5–7.)*
- [x] **3.5** Build a reusable gauge/scale visualization component (used by Quick Dives and Practice Guides) — start with a simple horizontal bar/meter; refine visually later. *(Done — `components/GaugeMeter.tsx`. Simple 1–5 horizontal meter with a label, numeric readout, and `role="meter"` for accessibility. Visual refinement intentionally deferred per the item's own note.)*
- [ ] **3.6** Quick pass: confirm the layout doesn't visually break at a narrow (mobile) width. It doesn't need to be optimized, just not broken. *(Header/Footer/DocumentCard were built with responsive Tailwind classes — the header nav wraps and stacks under the wordmark on narrow screens instead of overflowing — but this hasn't been visually confirmed in an actual browser yet. Worth a quick `npm run dev` + resize check before checking this off for real.)*

*Stop here anytime — each item is one component/file.*

---

## Phase 4: Home Page

*Route: `/`*

- [ ] **4.1** Build the home page skeleton: hero section with mission/purpose framing (per spec: inspiring + credible, STRADA-style).
- [ ] **4.2** Add three audience-entry cards/sections linking to Researchers / Practitioners / Stakeholders.
- [ ] **4.3** Wire up a "recent updates / newest publications" feed pulling the latest `libDoc` entries from Sanity (this same component gets reused on the Stakeholders Impact page in Phase 7).

*Stop here anytime.*

---

## Phase 5: Researchers Section

*Routes: `/researchers`, `/researchers/[document]`*

- [ ] **5.1** Build the Researchers landing page: library-style layout grouping documents by type (Cochrane Library-style).
- [ ] **5.2** Build the document listing/filter view — filter by document type (deep dive, critical review, trial, protocol, editorial).
- [ ] **5.3** Build the individual document detail page — full content, front-facing protocol section attached inline (not full workflow/methodology).
- [ ] **5.4** Add the Sanity query-level guard that excludes `workflow` documents from ever being fetched on any public-facing page. Write this as a shared query helper so every future query reuses it (single point of enforcement, not per-page discipline).
- [ ] **5.5** Test: confirm a `workflow` entry created in Studio never appears anywhere on the live/dev site, even if directly linked by ID.

*Stop here anytime; 5.4–5.5 are best done together in one sitting since they're a single safety check.*

---

## Phase 6: Practitioners Section

*Routes: `/practitioners`, `/practitioners/quick-dives/[slug]`, `/practitioners/canvas-sandbox`*

- [ ] **6.1** Build the Practitioners landing page.
- [ ] **6.2** Build Practice Guide listing + detail view (short statement + gauge visualization + link back to source document).
- [ ] **6.3** Build Quick Dive listing + detail view (15-min-max summaries, gauge/scale for consensus/assumptions/evidence/disagreement).
- [ ] **6.4** Add the NotebookLM plain-text link/button on each topic page (per your decision — simple outbound link, opens in new tab, no embedding).
- [ ] **6.5** Build the Canvas Sandbox listing page using the placeholder delivery field from schema 2.8. Keep it simple (title + topic + a link if one exists) until the delivery-method decision is made.

*Stop here anytime.*

---

## Phase 7: Stakeholders Section

*Routes: `/stakeholders`, `/stakeholders/team`, `/stakeholders/team/[member]`, `/stakeholders/research`*

- [ ] **7.1** Build the Stakeholders landing page (STRADA-style storytelling: mission/values up front, big-picture wins).
- [ ] **7.2** Build the Impact / recent-updates feed page (reuse the Phase 4.3 feed component, expand with more entries + filtering if needed).
- [ ] **7.3** Build the Team page: searchable list of team members by name.
- [ ] **7.4** Build the individual Team Member page: bio, role(s), LinkedIn/resume/portfolio links, and the auto-generated attribution report pulled from linked `attributionDocument` + `project` entries.
- [ ] **7.5** Build the Research browse page: browse by agenda/theme or project, filter by role.
- [ ] **7.6** Wire up the cross-linking: a project page links to its team members' individual pages, and a team member's page links to their associated project pages. Test both directions.

- [ ] **7.7** Build the `/protocols` placeholder page — a simple "coming soon" page explaining that Protocols is a forthcoming standalone product. Small item, good filler for a short session.

*7.4 and 7.6 are the trickiest data-wiring — good candidates to do at the start of a session when you're fresh, not the tail end.*

---

## Phase 8: Attribution Reporting Logic

- [ ] **8.1** Define the attribution taxonomy: list out each role name + a plain-language description of what that role does (this is content work, not code — can be done as a doc first, then entered into Sanity). *(Real taxonomy already drafted — see the `role` section of the `Phase 2 Schema Decisions` doc, six roles ready to enter.)*
- [ ] **8.2** Enter the taxonomy into Sanity as reference data (or hardcode if the list is small and stable). *(Just needs the six `role` documents created in Studio now that the `role` schema (2.3-adjacent) is built.)*
- [ ] **8.3** Build the logic that assembles a Team Member's attribution report text from their linked projects/roles using the taxonomy descriptions.
- [ ] **8.4** Test with 2–3 real or placeholder team members with multiple projects/roles to confirm the report reads correctly.

*Stop here anytime.*

---

## Phase 9: Analytics, Search/Filter Polish, Group/Sort Controls

- [ ] **9.1** Decide the analytics tool (Vercel Analytics is the free/bundled default if you haven't decided by now) and add it — this is a single package install + one line of code on Vercel Analytics.
- [ ] **9.2** Add group-by and sort-by controls to the Team browse view (per spec).
- [ ] **9.3** Add group-by and sort-by controls to the Research/Project browse view.
- [ ] **9.4** General QA pass on all filter/search/sort controls across Researchers, Practitioners, and Stakeholders sections.

*Stop here anytime.*

---

## Phase 10: Real Content Migration

You mentioned some real content already exists — use this phase to start swapping it in wherever schemas are stable.

- [ ] **10.1** Inventory what real content exists today (documents, bios, project write-ups) vs. what's still placeholder-only. A simple checklist/spreadsheet is fine.
- [ ] **10.2** Enter real Team Member bios + links into Sanity.
- [ ] **10.3** Enter real Project + Attribution Document data into Sanity.
- [ ] **10.4** Enter real Documents (deep dives, critical reviews, etc.) into Sanity, one batch at a time.
- [ ] **10.5** Spot-check the live site with real content in place — does anything look broken or read oddly with real (vs. placeholder) text lengths?

*Each sub-item here is naturally session-sized already — pure data entry, easy to stop mid-batch.*

---

## Phase 11: Non-Technical Editing Experience

- [ ] **11.1** Walk through Sanity Studio as if you were a non-technical lab student: are field labels clear? Add helper text/descriptions to any confusing fields.
- [ ] **11.2** Write a short internal "how to add content" guide (one page) for lab student staff — this can be a simple doc, not part of the website itself.
- [ ] **11.3** (Optional) Set up Sanity role-based permissions if multiple student staff will edit simultaneously.

*Stop here anytime.*

---

## Phase 12: Domain & Production Deploy

- [ ] **12.1** Once the ~$12–15/yr domain purchase is approved (or you decide to self-fund it), register the domain through a registrar of your choice.
- [ ] **12.2** Connect the custom domain to the Vercel project (DNS setup) and confirm HTTPS works.
- [ ] **12.3** Final production deploy from the `main` branch. Confirm the live custom-domain URL works end to end.

*This phase is naturally blocked until the domain approval lands — everything before it doesn't depend on this.*

---

## Phase 13: Pre-Launch QA

- [ ] **13.1** Full click-through of all three audience sections on desktop — every link, filter, and cross-reference.
- [ ] **13.2** Mobile check: confirm nothing is actually broken (not optimized, just usable) on a phone-width screen.
- [ ] **13.3** Confirm no BYU-Idaho logo appears anywhere on the site.
- [ ] **13.4** Confirm `workflow` documents are genuinely unreachable from the public site (repeat the Phase 5.5 test as a final sanity check).
- [ ] **13.5** Beta launch 🎉 — share the live URL.

---

## Still-Open Decisions to Revisit (not blocking, but tracked)

- [ ] Protocols product scope — the standalone Protocols product isn't defined yet. Placeholder schema (2.9) and placeholder page (7.7) exist; actual scoping is a separate future project.
- [ ] Canvas sandbox delivery mechanism (direct Canvas links vs. downloadable files vs. both) — needed before Phase 6.5 gets fully built out, placeholder is fine until then.
- [ ] Analytics tool — needed before Phase 9.1, Vercel Analytics is the default if no other preference emerges.
- [ ] Domain registration — blocked on hosting-proposal approval, needed before Phase 12.
- [ ] Accent color — the palette that came through is blue-family + neutrals only, no distinct accent. Not blocking anything yet, but worth a look before Quick Dive/Practice Guide gauges (Phase 6) need a color that isn't just "more blue."
