---
layout: defaults/page
permalink: index.html
narrow: true
title:
---

### Recent Posts

{% for post in site.posts limit:3 %}
{% include components/post-card.html %}
{% endfor %}
