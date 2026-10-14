# Flyrank Capstone

A starter repository for learning AI-assisted software engineering, disciplined version control, and modern development workflows during the Flyrank internship.

---

## Project Overview

This repository serves as the foundation for the Flyrank internship capstone project. At this stage, the project focuses on establishing professional engineering practices, developing practical skills with AI-assisted software development tools (specifically Claude Code), and mastering collaborative Git and GitHub workflows.

As the internship progresses, this repository will evolve from its initial setup and configuration into incremental application development, adhering to industry-standard engineering conventions throughout.

## Goals

- **Master AI-Assisted Workflows**: Learn to collaborate effectively with AI coding assistants (such as Claude Code) for planning, code generation, refactoring, and documentation while maintaining rigorous human oversight and verification.
- **Practice Disciplined Version Control**: Establish strong Git and GitHub habits, including logical branching strategies, clean pull requests, and thorough pre-commit reviews.
- **Adopt Conventional Commits**: Adhere strictly to the [Conventional Commits](https://www.conventionalcommits.org/) specification (e.g., `feat:`, `fix:`, `docs:`, `chore:`) to ensure a structured, searchable, and professional commit history.
- **Produce Maintainable Documentation**: Maintain high-quality, up-to-date documentation that accurately reflects project architecture, conventions, and status.
- **Build Professional Engineering Standards**: Develop strong habits regarding code cleanliness, consistent formatting, dependency management, and security hygiene (such as preventing secrets or unnecessary files from entering version control).

## Technology Stack

| Category | Technology | Purpose / Role |
| :--- | :--- | :--- |
| **Operating System** | Windows | Primary local development environment |
| **Runtime & Tooling** | Node.js (LTS) & npm | Execution runtime and package management for planned project tooling |
| **Version Control** | Git & GitHub | Distributed version control, history tracking, and remote repository hosting |
| **Editor** | Visual Studio Code | Integrated development environment (IDE) |
| **AI Assistant** | Claude Code | AI pair-programming assistant for workflow acceleration and guided development |

## Repository Structure

```text
flyrank-capstone/
├── .git/              # Git version control repository metadata
├── .gitignore         # Specifies untracked files (node_modules, environment variables, build outputs)
├── CLAUDE.md          # Project instructions, coding conventions, and AI interaction rules
├── LICENSE            # Open-source license terms (MIT)
└── README.md          # Project documentation, setup guide, and status tracking
```

### Key Files
- **`CLAUDE.md`**: Outlines operational guidelines, coding conventions, Git commit standards, and AI assistance instructions.
- **`README.md`**: Provides the main project overview, onboarding instructions, and progress tracking for mentors and contributors.
- **`.gitignore`**: Configured to prevent accidental tracking of dependencies (`node_modules/`), secrets (`.env`), build outputs (`dist/`, `build/`), and OS/editor artifacts.
- **`LICENSE`**: Houses the MIT open-source license governing the project.

## Setup Instructions

### Prerequisites

Ensure the following tools are installed on your system:
- **Git**: [Download and install Git](https://git-scm.com/) (verify installation with `git --version`)
- **Node.js LTS**: [Download and install Node.js LTS](https://nodejs.org/) (includes `npm`; verify with `node -v` and `npm -v`)
- **Visual Studio Code**: [Download VS Code](https://code.visualstudio.com/) (recommended code editor)
- **Claude Code**: AI assistant CLI configured per project guidelines (if using AI-assisted workflows)

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/heyyyujjwal/flyrank--capstone.git
   cd flyrank--capstone
   ```

2. **Open in Visual Studio Code**:
   ```bash
   code .
   ```

3. **Verify local environment**:
   Confirm that your CLI environment has the required tools available:
   ```bash
   git --version
   node -v
   npm -v
   ```

4. **Review project conventions**:
   Inspect `CLAUDE.md` before making contributions to ensure familiarity with commit message formatting, coding guidelines, and AI safety practices.

## Current Status

- **Current Phase**: Foundation & Setup (Starter Project)
- **Completed**:
  - Initialized Git repository and connected remote origin on GitHub.
  - Added repository license (MIT).
  - Configured comprehensive `.gitignore` for Node.js, secrets, and environment artifacts.
  - Defined developer instructions and AI interaction guidelines in `CLAUDE.md`.
  - Established project documentation and setup instructions in `README.md`.
- **Next Steps**:
  - Complete the initial internship assignment review and validation.
  - Set up project dependencies and build configuration as required by forthcoming assignment briefs.
  - Begin feature implementation following Conventional Commits and AI-assisted workflow guidelines.
