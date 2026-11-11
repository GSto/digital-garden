# newsletter-signup Specification

## Purpose

Lets readers reach the State Transition newsletter's subscribe page from the site, through a link that looks like the rest of the site in both colour schemes.

## Requirements

### Requirement: Subscribe link availability
The site SHALL show the same labelled subscribe link on the home page, the newsletter page, every note page, and every blog post page, and SHALL NOT embed a third-party signup iframe on any of them.

#### Scenario: Link on each page type
- **WHEN** a reader opens the home page, the newsletter page, a note page, or a blog post page
- **THEN** the page shows one subscribe link with a label naming State Transition

#### Scenario: No signup iframe remains
- **WHEN** the site is built
- **THEN** no generated page contains an iframe pointing at the State Transition embed

### Requirement: Subscribe destination
The subscribe link SHALL open the State Transition subscribe page on Substack and SHALL leave the reader's current page open.

#### Scenario: Reader selects the link
- **WHEN** a reader selects the subscribe link
- **THEN** the State Transition subscribe page opens in a new tab and the page they were reading stays open

### Requirement: Site styling
The subscribe link and its label SHALL use the site's typeface and the colours of the active colour scheme, and SHALL stay within the page's content column without horizontal scrolling.

#### Scenario: Light mode
- **WHEN** a reader's system prefers a light colour scheme
- **THEN** the link and label use the site's typeface and light mode colours

#### Scenario: Dark mode
- **WHEN** a reader's system prefers a dark colour scheme
- **THEN** the link and label use dark mode colours with readable contrast

#### Scenario: Narrow screen
- **WHEN** the page is viewed at a phone width of 375 pixels
- **THEN** the whole link is visible and usable without horizontal scrolling

### Requirement: Accessible subscribe link
The subscribe link SHALL be a standard link with descriptive text, operable by keyboard, with a visible focus indicator in both colour schemes.

#### Scenario: Keyboard use
- **WHEN** a reader tabs to the subscribe link in either colour scheme
- **THEN** the link shows a visible focus indicator
