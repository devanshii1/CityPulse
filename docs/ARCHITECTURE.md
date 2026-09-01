# CityPulse — Architecture

## Technology

Frontend:
Next.js + TypeScript + Tailwind CSS

Backend:
Supabase

AI:
Gemini API

Map:
Mapbox

Version control:
GitHub

## High-Level Architecture

Browser
↓
Next.js application
↓
Server-side/API logic
↓
Gemini / Supabase
↓
Mapbox for geographic visualization

## Core Flow

USER
↓
REPORT FORM
↓
DESCRIPTION + IMAGE + LOCATION
↓
AI ANALYSIS
↓
CATEGORY + SEVERITY + SUMMARY + CONFIDENCE
↓
USER CONFIRMS
↓
SUPABASE
↓
REPORT
↓
RELATED ISSUE CHECK
↓
EXISTING ISSUE OR NEW ISSUE
↓
MAP
↓
LIVING ISSUE

## Responsibilities

### UI / Frontend

Owns:

- visual design
- pages
- reusable components
- navigation
- responsive behavior
- loading states
- error states

### AI / Report Intelligence

Owns:

- Gemini integration
- report classification
- severity estimation
- AI summary
- confidence
- AI response validation

### Map / Issue System

Owns:

- Mapbox
- issue markers
- map interactions
- geographic issue discovery
- related issue matching logic

### Backend / Integration

Owns:

- Supabase
- database
- authentication
- storage
- API/server integration
- connecting the modules
- deployment

## Important Rule

The architecture must remain simple.

Do not introduce microservices, complex AI agents, vector databases, event queues, or other advanced infrastructure unless the team explicitly decides it is necessary.

## MVP

The application should first make this work:

Citizen submits report
→ AI analyzes
→ User confirms
→ Report saved
→ Report appears on map
→ Related reports can form a Living Issue