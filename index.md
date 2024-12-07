---
layout: default
---

# Glenn Stovall's Notebook

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
