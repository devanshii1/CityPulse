# CityPulse — Product Definition

## What is CityPulse?

CityPulse is a civic-tech platform that allows citizens to report urban problems and helps organize those reports into meaningful, trackable community issues.

Examples of civic problems:

- Waterlogging
- Flooding
- Potholes
- Road blockages
- Garbage
- Broken streetlights

## Core idea

A single citizen report is useful.

Multiple related reports about the same real-world problem are much more useful.

CityPulse turns related reports into a "Living Issue".

A Living Issue can change over time as new reports and evidence appear.

## Golden User Flow

Citizen
→ Reports a problem
→ Provides description/photo/location
→ AI analyzes the report
→ User reviews and confirms the analysis
→ Report is saved
→ System checks for related nearby reports
→ Existing Issue is updated OR a new Issue is created
→ Issue appears on the map
→ Citizens can view evidence and timeline
→ Issue status can change
→ New reports can continue updating the Issue

## Main Pages

### Home

Purpose:
Introduce CityPulse and encourage citizens to report problems or explore existing issues.

### Explore

Purpose:
Show civic issues on an interactive map.

### Report

Purpose:
Allow a citizen to submit a civic issue.

### My Reports

Purpose:
Show reports submitted by the current user.

### Profile

Purpose:
Show basic user information and account settings.

### Issue Detail

Purpose:
Show a Living Issue, including:

- Title
- Category
- Severity
- Number of reports
- Location
- AI summary
- Evidence
- Timeline
- Current status
- Recent updates

## Initial Categories

- waterlogging
- flooding
- pothole
- road_blockage
- garbage
- streetlight
- other

## Severity

1 = Low
2 = Moderate
3 = Significant
4 = High
5 = Critical

## Issue Status

- reported
- verified
- in_progress
- resolved
- reopened

## MVP Principle

The most important end-to-end experience is:

Report
→ AI analysis
→ Confirmation
→ Save
→ Map
→ Related reports
→ Living Issue

Do not build advanced features before this flow works.