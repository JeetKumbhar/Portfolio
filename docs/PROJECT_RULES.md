# Project rules (standing instructions from Jeet)

These rules apply to every phase. Where they conflict with `PORTFOLIO_PLAN.md`
(for example its TypeScript preference or its ZIP rules), **these rules win**.

## 1. Repository

- The canonical repository is **https://github.com/JeetKumbhar/Portfolio**. Jeet created it new and empty.
- It is the only source of truth. Nothing else is referred to or assumed.
- Producing a ZIP does **not** update Jeet's local files or GitHub. Jeet extracts the ZIP, then commits and pushes.

## 2. JavaScript only

- React components use `.jsx`. All other source files use `.js`.
- No `.ts` or `.tsx` files, no TypeScript syntax, no TypeScript dependencies or config.
- Vite, ESLint and the npm scripts are configured for JavaScript (`jsconfig.json` only helps the editor with the `@/` import alias).
- Code should be clean, modern, readable and beginner-friendly: small components, plain names, short comments that explain *why*.
- TypeScript is only used if Jeet explicitly approves it.

## 3. ZIP delivery policy

| Phase | ZIP type | Contents |
|---|---|---|
| 1 | Full project | Every project file and folder |
| 2 | Full project | The entire updated project (everything from Phase 1 plus all Phase 2 changes) |
| 3 onward | Delta | ONLY new or modified files and folders, with exact relative paths, to extract into the existing project root |

- A delta ZIP includes `DELETE_FILES.txt` whenever existing files must be deleted.
- Every ZIP includes `PHASE_DELIVERY_NOTES.md`, `PROJECT_PROGRESS.md` and `DELETE_FILES.txt`.
- Every ZIP is verified before delivery: integrity, file count, folder structure, prohibited files, secret scan.
- Never included: `node_modules`, `.git`, `.env` files, API keys, passwords, credentials, secrets, caches, logs, build output.
- Every delivery states: full or delta, extraction destination, install commands, tests actually run, remaining manual steps.

## 4. Phase management

- Do not start the next phase without Jeet's explicit approval.
- Do not invent experience, achievements, testimonials, metrics or project features. Use clearly labelled placeholders.
- If a usage limit is reached, `PROJECT_PROGRESS.md` records the exact state, and work resumes from the last incomplete task without restarting.
