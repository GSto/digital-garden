# Digital Garden Architecture

## Overview
This is a digital garden built using Eleventy (11ty), a static site generator. The project is designed to create a personal knowledge management system where notes and ideas can be interconnected through wiki-style links.

## Technology Stack
- **Static Site Generator**: Eleventy (11ty)
- **Markdown Processing**: markdown-it with custom plugins
- **Package Manager**: Yarn/npm
- **Version Control**: Git

## Project Structure
```
.
├── _data/           # Data files for Eleventy
├── _scripts/        # Custom build and utility scripts
├── _site/          # Generated static site (output)
├── assets/         # Static assets (images, CSS, etc.)
├── includes/       # Reusable template components
├── layouts/        # Page layout templates
├── lib/           # Custom JavaScript modules
├── library/       # External library files
├── meta/          # Metadata and configuration
├── notes/         # Main content directory for notes
└── specs/         # Project documentation and specifications
```

## Key Features

### 1. Markdown Processing
- Custom markdown-it configuration with extensions:
  - Footnotes support
  - Custom attributes
  - Section wrapping
  - Sidenotes
  - Subtitles
  - Wiki-style links ([[note-name]])

### 2. Content Organization
- Notes are stored in the `notes/` directory
- Support for wiki-style linking between notes using double-bracket syntax
- Automatic generation of note collections

### 3. Build Process
- Development server: `yarn start`
- Production build: `yarn compile`
- Random note generator: `yarn random`

### 4. Custom Plugins
- `markdownSectionWrapper`: Wraps sections in custom HTML
- `markdownSidenote`: Adds support for sidenotes
- `markdownSubtitle`: Handles subtitle formatting

### 5. Asset Management
- Static assets in `assets/` directory
- Library files in `library/` directory
- Automatic copying of assets during build

## Development Workflow
1. Create new notes in the `notes/` directory using Markdown
2. Use wiki-style links to connect related notes
3. Run development server with `yarn start`
4. Build for production with `yarn compile`

## Dependencies
- @11ty/eleventy: Static site generator
- markdown-it: Markdown parser
- markdown-it-attrs: Custom attributes support
- markdown-it-footnote: Footnote support
- title-case: Title case formatting
- glob: File pattern matching

## Configuration
The project is configured through:
- `.eleventy.js`: Main Eleventy configuration
- `package.json`: Project dependencies and scripts
- `.eleventyignore`: Files to exclude from processing

## Output
The generated site is built to the `_site/` directory, containing:
- HTML pages
- Processed assets
- Generated collections
- Interconnected note structure
