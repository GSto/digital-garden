---
layout: default
---

# Digital Garden

This is a [[digital garden]] of content that isn't quite ready for prime time. It's a place to collect notes, quotes, links, and other resources. Part of practicing [[prolific creation]]. It's also a way of [[learn in public]].

This site is a constant work in progress. Pages may be in progress, contain errors, or be stupid. Feedback always welcome.
y
<div class="indexGrid">
<div class="indexColumn">
{% for topic in noteIndex.leftColumn %}
{% include topic.html %}
{% endfor %}
</div>

<div class="indexColumn">
{% for topic in noteIndex.centerColumn %}
{% include topic.html %}
{% endfor %}
</div>

<div class="indexColumn">
{% for topic in noteIndex.rightColumn %}
{% include topic.html %}
{% endfor %}
</div>
</div>

For updates, View the commit log on [Github](https://github.com/GSto/digital-garden).
