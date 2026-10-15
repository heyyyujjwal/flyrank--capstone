
# Project Instructions

## Project Overview
This is my Flyrank internship capstone repository.
Its purpose is to demonstrate AI-assisted development,
clean Git practices, and maintainable documentation.

## Technology Stack
- Operating system: Windows
- Editor: Visual Studio Code
- Runtime: Node.js LTS
- Version control: Git
- Remote repository: GitHub
- AI coding assistant: Claude Code

## Coding Conventions
- Write clear, readable, and maintainable code.
- Use descriptive names for variables, functions, and files.
- Keep changes focused on the requested task.
- Avoid unnecessary dependencies.
- Explain important changes in simple language.
- Update documentation when project behavior changes.

## Git Conventions
- Use Conventional Commits.
- Keep each commit focused on one logical change.
- Review changes before committing.

## AI-Assisted Development
- Inspect relevant files before modifying them.
- Explain substantial proposed changes.
- Do not overwrite existing work without checking it.
- Never expose API keys, passwords, or other secrets.
- Run relevant checks after making changes.

## FE-03: Frontend Implementation Rules

1. **Validate form inputs consistently.** Display-name validation must trim whitespace and enforce the specified 3–30 character limit. Email validation must reject empty or malformed addresses. When a field has previously shown an error, every subsequent input change must update its validation state correctly.

2. **Connect validation errors accessibly.** Every form control with a validation message must reference that message using `aria-describedby`. Update `aria-invalid` when validation state changes, and use semantic labels and keyboard-visible focus indicators.

3. **Verify behavior before marking work complete.** For form changes, run the relevant automated tests and JavaScript syntax checks. Manually test valid submission, missing required values, and boundary cases in a browser. Clearly report checks that were not performed; do not claim unexecuted tests passed.

4. **Keep implementation scope aligned with the specification.** Do not add unrelated fields, persistence, settings, or dependencies unless the requirements explicitly call for them. Prefer the smallest implementation that satisfies the requested behavior.
