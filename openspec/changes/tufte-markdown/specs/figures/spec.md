# Spec Delta

## Purpose

Turns standard Markdown images into Tufte figures (regular, full-width or in the margin, with captions) and groups related images into image quilts.

## ADDED Requirements

### Requirement: Solitary images become figures
An image that is the only content of its paragraph SHALL render as a figure in the main text column, and not as an image inside a paragraph. An image that shares a paragraph with text SHALL stay inline.

#### Scenario: Image on its own line
- **WHEN** a note contains a paragraph that is only `![Dreyfus model](/assets/images/dreyfus_model.png)`
- **THEN** the page shows a figure with that image and alt text "Dreyfus model", in the main text column

#### Scenario: Image inside a sentence
- **WHEN** a paragraph contains text and an image
- **THEN** the image renders inline in that paragraph and no figure is created

### Requirement: Captions from the image title
A figure's caption SHALL be the image's title text, rendered beside or below the figure as Tufte CSS places it. A figure whose image has no title SHALL have no caption element.

#### Scenario: Image with a title
- **WHEN** a figure's source is `![Pyramid](/p.png "The McLeod hierarchy")`
- **THEN** the figure shows the caption "The McLeod hierarchy" and keeps "Pyramid" as the alt text

#### Scenario: Image without a title
- **WHEN** a figure's source is `![](/p.png)`
- **THEN** the figure has no caption

### Requirement: Full-width figures
A solitary image followed by `{.fullwidth}` SHALL render as a figure spanning the text and margin columns, with its caption below.

#### Scenario: Full-width chart
- **WHEN** a note contains `![](/chart.png "Exports by year"){.fullwidth}` on its own line
- **THEN** the figure spans the full content width and the caption sits below it

### Requirement: Margin figures
A solitary image followed by `{.margin}` SHALL render in the margin beside the following text, with its caption below it, and SHALL use the same small-screen toggle as margin notes.

#### Scenario: Margin figure on desktop
- **WHEN** a note contains `![](/icon.png "Tufte's sparkline"){.margin}` on its own line before a paragraph
- **THEN** on a wide screen the image and caption appear in the margin beside that paragraph

#### Scenario: Margin figure on a phone
- **WHEN** a reader with a viewport narrower than 760px views the same note
- **THEN** a ⊕ toggle appears in place of the figure and selecting it reveals the image

### Requirement: Image quilts
A fenced code block with the info string `quilt` SHALL render as an image quilt: a grid figure of the images listed in the block, each with its title as its own caption. The info string `quilt fullwidth` SHALL make the quilt span the full content width.

#### Scenario: Three-image quilt
- **WHEN** a note contains a ```` ```quilt ```` block with three image lines, each with a title
- **THEN** the page shows the three images in a grid inside the text column, each captioned with its title, and no code block

#### Scenario: Full-width quilt
- **WHEN** the block opens with ```` ```quilt fullwidth ````
- **THEN** the grid spans the full content width

#### Scenario: Quilt on a phone
- **WHEN** a reader with a viewport narrower than 760px views a quilt
- **THEN** the images stack in fewer columns without horizontal scrolling

### Requirement: Quilt content limited to images
Lines in a quilt block that are not images SHALL be ignored, and a quilt block with no images SHALL render nothing.

#### Scenario: Stray text in a quilt
- **WHEN** a quilt block contains two image lines and one line of plain text
- **THEN** the quilt shows the two images and the text does not appear

### Requirement: Figures in both colour schemes
Figure captions and quilt captions SHALL be readable in light and dark mode.

#### Scenario: Dark mode caption
- **WHEN** a reader with a dark colour-scheme preference views a captioned figure
- **THEN** the caption text uses the dark-mode text colour on the dark background
