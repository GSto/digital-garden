---
layout: note
---

# Missing Links ({{brokenLinks | size}})

A list of broken internal links. can serve as inspiration for parts of the graph that may call for further information.
Some links may be misspelled or mis-termed versions of existing links. These should be fixed.

missing links with multiple instances are a sign they should be fixed.

some of these links will never exist, but that doesn't mean you should remove them. missing links are a feature not a bug.

{% for link in brokenLinks %}

- {{ link[0] }} {% for source in link[1] %}
  - [{{source.data.title}}]({{source.url | replace: " ", "%20"}}){% endfor %}
    {% endfor %}
