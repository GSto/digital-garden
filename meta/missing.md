---
layout: note
---
# Missing Links ({{brokenLinks | size}})

A list of broken internal links. can serve as inspiration for parts of the graph that may call for further information.

{% for link in brokenLinks %}
- {{ link[0] }} ({% for source in link[1] %}[{{source.data.title}}]({{source.data.url}}), {% endfor %})
{% endfor %}
