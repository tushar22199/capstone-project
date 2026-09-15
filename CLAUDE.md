# CLAUDE.md

## Project Overview

This repository contains my capstone project for the AI-assisted development track.

The project will be developed using AI-assisted workflows while maintaining clear, readable, and maintainable code.

## Technology

- HTML
- CSS
- JavaScript
- Node.js
- Git
- GitHub
- Cursor

## Development Conventions

- Keep code simple, readable, and maintainable.
- Use clear and descriptive names for variables, functions, and files.
- Keep HTML semantic and accessible.
- Keep CSS organized and avoid unnecessary duplication.
- Use modern JavaScript where appropriate.
- Avoid unnecessary dependencies.
- Do not commit API keys, passwords, tokens, or other secrets.
- Test changes before committing them.

## Git Conventions

Use Conventional Commits for all commits.

Examples:

- `feat:` — new functionality
- `fix:` — bug fixes
- `docs:` — documentation changes
- `style:` — formatting/style changes
- `refactor:` — code restructuring
- `test:` — tests
- `chore:` — maintenance and configuration

## AI-Assisted Development

When making changes:

1. Inspect the existing project before modifying files.
2. Explain the proposed approach when the change is substantial.
3. Make focused changes rather than unnecessary rewrites.
4. Verify that the changes work.
5. Summarize the changes made.

## Learned Project Rules

- Keep validation logic in pure, reusable functions in `js/validation.js`; cover validation behavior with tests in `tests/validation.test.js`.
- Every form control must have an associated accessible label. Validation errors must use `aria-invalid` and `aria-describedby`, and form-level status messages must use an appropriate live region.
- Test boundary and edge cases explicitly, including minimum/maximum lengths, optional fields, password confirmation, and invalid input.
- Run `npm test` and confirm all tests pass before committing changes to form validation.
- Never log passwords or other sensitive credential values. Log only sanitized information such as whether a password was updated.
- Review user-facing text for Unicode/encoding corruption before committing; generated text must display readable characters such as en dashes correctly.