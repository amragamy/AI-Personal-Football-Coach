# PITCH AI — Frontend Implementation Documentation

## Project overview
PITCH AI is a football-training application concept that helps players inspect technique, receive coaching guidance, follow drills, and review progress. The initial delivery is a frontend-only implementation using mock data and simulated analysis. Simulated results must never be presented as genuine AI predictions.

## Core features in the supplied references
- Player account entry and profile setup (visible in `pages.pdf`, pp. 1–2).
- Dashboard and skill selection (`pages.pdf`, p. 3; `system design.pdf`, p. 3).
- Video upload and analysis configuration (`pages.pdf`, pp. 4–6; `system design.pdf`, pp. 4–6).
- Shooting comparison and coaching feedback (`pages.pdf`, pp. 7–8; `Interactive.pdf`, p. 1).
- Personalized training plan and drill detail (`pages.pdf`, pp. 9, 14).
- Progress overview and recent analyses (`pages.pdf`, p. 10).
- Pose/keypoint detection and reference match screens (`pages.pdf`, pp. 11–13).

## Technology direction
**Frontend:** React, TypeScript, Vite, Tailwind CSS; React Router if confirmed navigation requires it.
**Future backend only:** Node.js, TypeScript, Express, MongoDB, Mongoose.
**Future AI subsystem:** separate analysis service, with an integration boundary to be agreed later.

Do not assume any dependency or repository structure already exists. Codex must inspect the actual repository first.

## Current phase
Planning and documentation. The next coding step is repository inspection only. Do not implement the application in this documentation task.

## Documentation map
- `AGENTS.md` — persistent instructions for Codex.
- `PLAN.md` — milestones and approval gates.
- `docs/01-project-scope.md` — scope and boundaries.
- `docs/02-requirements.md` — traceable functional and non-functional requirements.
- `docs/03-screen-inventory.md` — observed screens and gaps.
- `docs/04-user-flows.md` — supported navigation flows.
- `docs/05-design-system.md` — extracted design tokens and gaps.
- `docs/06-frontend-architecture.md` — proposed frontend architecture.
- `docs/07-data-contracts.md` — frontend mock types and future API boundary.
- `docs/08-mock-data-and-ui-states.md` — mock content and states.
- `docs/09-implementation-roadmap.md` — dependency-aware sequence.
- `docs/10-codex-task-list.md` — small, verifiable Codex tasks.
- `docs/11-testing-and-quality.md` — checks and quality criteria.
- `docs/12-risks-and-open-questions.md` — uncertainties and decisions needed.
- `docs/DECISIONS.md` — decision log.

## How to use these documents in VS Code
1. Open the existing project repository in VS Code.
2. Place these documents at the specified paths, without overwriting existing project work blindly.
3. Ask Codex to follow `AGENTS.md` and execute only `FE-001` from `docs/10-codex-task-list.md`.
4. Review Codex's inspection report and approve the next milestone before implementation begins.
5. Give Codex one task ID at a time. Do not ask it to implement the entire roadmap in one prompt.

## Evidence labels
- **Confirmed:** explicitly specified in the supplied project brief.
- **Observed:** visible or textually identifiable in a supplied PDF.
- **Inferred:** reasonable interpretation not confirmed by the materials.
- **Proposed:** recommended implementation choice awaiting approval.
- **Open:** requires clarification.
- **Out of scope:** excluded from this frontend phase.
