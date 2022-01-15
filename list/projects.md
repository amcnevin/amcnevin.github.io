---
title: Pet Projects
narrow: true
permalink: list/projects.html
show_tags: true
---

{% for project in site.projects %}
- [{{ project.title }}]({{ site.baseurl }}{{ project.url }})
{% endfor %}
