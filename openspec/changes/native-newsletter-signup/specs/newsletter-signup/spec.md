# Spec Delta

## Purpose

Lets readers subscribe to the State Transition newsletter from the site, through a signup form that looks like the rest of the site in both colour schemes.

## ADDED Requirements

### Requirement: Signup form availability
The site SHALL show the same newsletter signup form on the home page, the newsletter page, and every note page, and SHALL NOT embed a third-party signup iframe on any of them.

#### Scenario: Form on each page type
- **WHEN** a reader opens the home page, the newsletter page, or a note page
- **THEN** the page shows one signup form with an email field and a Subscribe button

#### Scenario: No signup iframe remains
- **WHEN** the site is built
- **THEN** no generated page contains an iframe pointing at the State Transition embed

### Requirement: Subscription submission
Submitting a valid email address SHALL send a subscription request for that address to the State Transition publication, without requiring JavaScript on the site.

#### Scenario: Valid email address
- **WHEN** a reader enters a valid email address and selects Subscribe
- **THEN** the address is submitted to State Transition and the reader sees Substack's response to the request

#### Scenario: Reader's place on the site is kept
- **WHEN** a reader submits the form
- **THEN** the page they were reading stays open

#### Scenario: Email address kept out of URLs
- **WHEN** a reader submits the form
- **THEN** the email address does not appear in any URL

### Requirement: Email address validation
The form SHALL use browser validation to require an email address in a valid format before it submits.

#### Scenario: Empty email field
- **WHEN** a reader selects Subscribe with the email field empty
- **THEN** the browser blocks the submission and prompts for an email address

#### Scenario: Malformed email address
- **WHEN** a reader selects Subscribe after entering text that is not a valid email address
- **THEN** the browser blocks the submission and prompts for a valid email address

### Requirement: Site styling
The form SHALL use the site's typeface and the colours of the active colour scheme, and SHALL stay within the page's content column without horizontal scrolling at any supported width.

#### Scenario: Light mode
- **WHEN** a reader's system prefers a light colour scheme
- **THEN** the form uses the site's typeface and light mode colours

#### Scenario: Dark mode
- **WHEN** a reader's system prefers a dark colour scheme
- **THEN** the form, including its field, placeholder, button, and links, uses dark mode colours with readable contrast

#### Scenario: Narrow screen
- **WHEN** the page is viewed at a phone width of 375 pixels
- **THEN** the whole form is visible and usable without horizontal scrolling

### Requirement: Accessible form controls
The email field SHALL have a programmatic label, and all form controls SHALL be operable by keyboard with a visible focus indicator in both colour schemes.

#### Scenario: Screen reader
- **WHEN** a screen reader reaches the email field
- **THEN** it announces the field's label

#### Scenario: Keyboard use
- **WHEN** a reader tabs through the form in either colour scheme
- **THEN** the focused control has a visible focus indicator

### Requirement: Terms disclosure
The form SHALL display the same terms notice as Substack's embed, with working links to the Terms of Use, Privacy Policy, and Information collection notice.

#### Scenario: Notice shown with the form
- **WHEN** a reader views the signup form
- **THEN** the notice and its three links are visible with the form

### Requirement: Subscribe fallback link
The form SHALL include a direct link to the State Transition subscribe page on Substack, so readers can subscribe if the form submission fails.

#### Scenario: Reader uses the fallback
- **WHEN** a reader selects the fallback link
- **THEN** the State Transition subscribe page opens
