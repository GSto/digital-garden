---
layout: default
---

# Digital Garden

My place to nourish notes, quotes, links, and other resources. Part of practicing [[prolific creation]] and a way to [[learn in public]].

It is a constant work in progress. Pages may be incomplete, incorrect, or just plain silly.

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
