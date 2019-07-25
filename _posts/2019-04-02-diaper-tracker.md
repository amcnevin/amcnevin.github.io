---
layout: post
title: Diaper Tracker Part 1
categories:
- python
- RPi
- GPIO
- parenting
feature_image: "https://picsum.photos/2560/600?image=691"
feature_text: |
  Crappy data set approaching..
---

Since becoming a father, the desire to involve the little guy in some of my hobbies and interests has been at an all time high.
A big part of our routine at the moment is to track the number of diaper changes daily so we can report back to his pediatrician.
At the moment my wife is tracking from an app on her smart phone but I wanted to take a supplemental approach and collect a data set to analyze later.
It's also worth noting that due to tiredness and late night changes, we sometimes forget to the log or tag the change appropriately.

Enter in the [Diaper Tracker](https://github.com/amcnevin/diaper-tracker). A simple Raspberry Pi setup where 3 buttons communicate to a
shared slack channel where my wife and I can monitor when and what has transpired. I intend to place this either in the nursery or
near the changing table for ease of use.

![](/assets/images/diaper_tracker/prototype_board.jpg){:height="100px" width="250px"}


I'll be following up with a post about the time series data I've collected overtime...for science.
