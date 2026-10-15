# Workflow Drill: Comparing AI Prompting Strategies

## Overview
This document evaluates two development approaches for Flyrank assignment FE-03: an open-ended vague prompt versus a constrained, test-driven specification. Exact time measurements for both rounds were not recorded.

## Round 1: Open-Ended Prompting (`fe03-round1-vague`, commit `a65ebd7`)
Prompted only with "Build a settings form for my website," the assistant generated an over-scoped form spanning username, email, bio, theme/language dropdowns, multiple checkboxes, reset/save actions, and `localStorage` caching. While `node -c settings-form/script.js` passed, no browser verification was initially executed.

Reviewing this output required substantial effort because the generated feature surface was wide. Critical defects were uncovered:
- **State Desynchronization**: Clicking "Reset" cleared the DOM inputs back to default attributes, but left stale values in `localStorage`.
- **Non-functional UI**: The theme dropdown persisted a string to storage, but applied no CSS classes to actually change the page theme.
- **Accessibility & UX**: Controls lacked `aria-describedby` associations for error spans, and status-banner dismissal lacked `clearTimeout`, risking timer collisions on rapid saves.

## Round 2: Constrained, Test-Driven Specification (`fe03-round2-precise`, commit `847ddb1`)
Round 2 provided strict constraints: a minimal four-control form (display name, email, notification checkbox, Save button), explicit display-name boundaries (3–30 characters), email format requirements, accessibility rules, responsive styling, automated tests, and zero external dependencies.

This resulted in four focused files: `index.html`, `style.css`, `script.js`, and `tests/validation.test.js`. Node’s native test runner (`node:test`) reported 24 passing tests across 8 suites, and syntax checks passed. Manual browser verification confirmed that valid submissions, blank required fields, and short names (`Al`) behaved as expected.

## Comparison & Review Findings
- **Correctness & Edge Cases**: Round 1 made arbitrary assumptions, producing half-implemented features. Round 2 adhered to explicit boundaries tested at lower (3), upper (30), and whitespace-padded limits.
- **Accessibility**: Round 2 properly linked error messages via `aria-describedby` and set `aria-invalid` dynamically, whereas Round 1 omitted description linkage entirely.
- **Review Effort & Verification**: Round 1 shifted significant cognitive burden to post-generation review to spot unrequested logic and subtle bugs. Round 2 required more upfront effort to specify requirements and test assertions, but yielded faster, higher-confidence verification.

### Defect and Limitations Caught During Review
Review of Round 2 identified an asymmetric live validation defect: when an invalid input is corrected, the `.invalid` class is removed, causing subsequent `input` events to skip validation. Consequently, backspacing back into an invalid state fails to trigger error feedback until `blur` or `submit`. Additionally, automated tests validated only the Node-exported logic; full assistive-technology (screen-reader) and cross-browser testing was not performed.
