# Spec Delta

## MODIFIED Requirements

### Requirement: Subscribe link availability
The site SHALL show the same labelled subscribe link on the home page, the newsletter page, every note page, and every blog post page, and SHALL NOT embed a third-party signup iframe on any of them.

#### Scenario: Link on each page type
- **WHEN** a reader opens the home page, the newsletter page, a note page, or a blog post page
- **THEN** the page shows one subscribe link with a label naming State Transition

#### Scenario: No signup iframe remains
- **WHEN** the site is built
- **THEN** no generated page contains an iframe pointing at the State Transition embed
