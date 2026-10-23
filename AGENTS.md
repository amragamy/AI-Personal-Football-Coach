# Codex Instructions — PITCH AI

## Mission and phase
Build the PITCH AI frontend only after the user approves the roadmap and relevant task. The agreed direction is React + TypeScript + Vite + Tailwind CSS, with React Router only where needed. Use mock data and clearly simulated analysis results. The future backend and real AI inference are not part of the current phase.

## Read before acting
- `README.md`
- `PLAN.md`
- `docs/01-project-scope.md`
- `docs/02-requirements.md`
- `docs/03-screen-inventory.md`
- `docs/05-design-system.md`
- The specific task in `docs/10-codex-task-list.md` and any documents it references.

## Repository safety
- Inspect the actual repository, existing files, package manager, scripts, dependencies, and conventions before changing anything.
- Do not assume the repository is empty or replace configuration wholesale.
- Before editing, state the task objective, intended approach, likely affected files, and blockers.
- Make only the changes required by the approved task. Avoid unrelated refactors.

## Design compliance
- Treat `system design.pdf` as the primary authority for documented visual tokens and component rules.
- Treat `pages.pdf` as the primary visual reference for visible screen content and layout.
- Treat `Interactive.pdf` as evidence for the described click-through flow.
- Use documented values; do not invent exact values for missing tokens. Record gaps and use a consistent, explicitly provisional choice only when necessary.
- Do not redesign the app into a generic dashboard or add arbitrary gradients, colors, fonts, spacing, or decorative effects.
- No verified standalone responsive-design PDF was supplied. Implement responsive behavior from documented requirements and report where mobile design evidence is missing.

## Engineering rules
- Prefer simple, feature-oriented React components and clear TypeScript types.
- Reuse existing project patterns and components when appropriate.
- Avoid unnecessary dependencies, premature abstractions, and global state libraries without a demonstrated need.
- Keep mock data separate from presentation where useful.
- Represent loading, empty, error, success, and validation states where relevant to the approved task.
- Make controls functional if they are presented as interactive; do not create inert buttons that imply functionality.

## Scope and approval
- Do not add unapproved features.
- Do not implement Express, MongoDB, Mongoose, real authentication APIs, backend endpoints, real AI inference, deployment, or infrastructure.
- **Never implement the backend until the user explicitly writes: `ابدأ تنفيذ الباك إند`.**
- Stop and ask for approval before significant architecture changes, new dependencies, or scope expansion.
- Approval gates are defined in `PLAN.md`.

## Verification and completion report
- Inspect available scripts before choosing checks.
- Run relevant checks when possible and report the actual commands and outcomes. Never claim a test ran if it did not.
- Report changed files, acceptance-criteria status, design-reference comparison, known issues, and untested behavior.
- Recommend the next task, but do not automatically start it where an approval gate applies.
