# CityPulse — AI Development Rules

## Team Context

The CityPulse team consists of beginner programmers using AI-assisted development.

AI tools are acting as coding assistants.

AI tools do not make product architecture decisions independently.

## Before Coding

AI must:

1. Inspect the existing project.
2. Understand existing components/functions.
3. Explain the proposed change.
4. Identify files that will be modified.
5. Avoid unrelated changes.

## Coding Rules

Do not:

- rewrite the entire project
- delete working functionality
- change the database schema without approval
- expose API keys
- add unnecessary dependencies
- create duplicate components unnecessarily
- modify unrelated files
- invent APIs
- invent database tables
- introduce advanced architecture unnecessarily

## API Keys

Never commit:

- Gemini API keys
- Supabase secret keys
- private credentials

Use environment variables.

## AI Output

AI-generated data must be validated before being stored.

Gemini should return structured data.

The application must handle:

- invalid AI responses
- missing fields
- low confidence
- API errors
- network errors

## Git Rules

Do not directly push experimental work to main.

Changes should be tested before merging.

Commit messages should describe the change.

Examples:

- Add report form UI
- Add Gemini report analysis
- Add Mapbox issue markers
- Add Supabase report storage

## MVP Rule

Do not add a new feature while the core flow is broken.

Priority:

Report
→ AI
→ Save
→ Map
→ Living Issue
→ Timeline
→ Resolution

Everything else is secondary.