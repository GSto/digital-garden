---
layout: default
---

# Public Notebook

This is a [[digital garden]] of content that isn't quite ready for prime time. It's a place to collect notes, quotes, links, and other resources. Part of practicing [[prolific creation]]. It's also a way of [[learn in public]].

I hope that if I get everything out of my head and onto the internet I'll have more room for new stuff. 

This site is a constant work in progress. Pages may be in progress, contain errors, or be stupid. Feedback always welcome unless you're an asshole about it.

For updates, check out the [Update Thread](https://twitter.com/GSto/status/1410238607684780032) on Twitter, or view the source on [Github](https://github.com/GSto/digital-garden).

Current count: **{{collections.notes.length}}**

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
