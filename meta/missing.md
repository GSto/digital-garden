---
layout: note
---

# Missing Links ({{brokenLinks | size}})

A list of broken internal links. can serve as inspiration for parts of the graph that may call for further information.
Some links may be misspelled or mis-termed versions of existing links. These should be fixed. links to basic terms may be better if replaced with a link to an external source.

Missing links with multiple instances are a sign they should be fixed.



{% for link in brokenLinks %}

- {{ link[0] }} {% for source in link[1] %}
  - [{{source.data.title}}]({{source.url | replace: " ", "%20"}}){% endfor %}
    {% endfor %}
