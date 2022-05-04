---
layout: note
---

# Colophon ({{ externalLinks.length}})

A collection of links that are present in the garden

{% for link in externalLinks %}

- {{ link }}

{% endfor %}
