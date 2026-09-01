# CityPulse — Database

## Profiles

Table: profiles

Fields:

- id
- name
- email
- created_at

## Reports

Table: reports

Fields:

- id
- user_id
- description
- image_url
- latitude
- longitude
- category
- severity
- ai_summary
- ai_confidence
- issue_id
- created_at

## Issues

Table: issues

Fields:

- id
- title
- category
- latitude
- longitude
- status
- severity
- report_count
- first_reported_at
- last_confirmed_at
- created_at
- updated_at

## Issue Updates

Table: issue_updates

Fields:

- id
- issue_id
- type
- description
- created_at

## Relationships

A profile can create many reports.

A report can belong to one issue.

An issue can contain many reports.

An issue can have many issue updates.

Conceptually:

Profile
↓
Reports
↓
Issue
↓
Issue Updates

## Categories

Allowed category values:

- waterlogging
- flooding
- pothole
- road_blockage
- garbage
- streetlight
- other

## Severity

Allowed values:

1
2
3
4
5

## Status

Allowed values:

- reported
- verified
- in_progress
- resolved
- reopened

## Important

Do not add database fields casually.

If a new field is needed, discuss it with the team first and update this document.