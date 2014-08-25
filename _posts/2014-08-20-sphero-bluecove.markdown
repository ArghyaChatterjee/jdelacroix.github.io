---
layout: post
modal-id: 1
title: sphero-bluecove
date: 2014-07-18
img: sphero.jpg
alt: image-alt
project-date: August 2014
client: Start Bootstrap
type: project
language: Java
category: Projects
description: A Java SDK for Orbotix's Sphero using BlueCove.
repository: sphero-bluecove
---

My GitHub page features a Java SDK for <a href="http://www.gosphero.com/" title="Orbotix's Sphero">Orbotix's Sphero</a>, a robotic ball. This package uses <a href="http://bluecove.org/" title="BlueCove">BlueCove</a> for connecting to the Sphero from a computer via Bluetooth. For example, this code snippet rotates the Sphero's RGB LED through a four color sequence (CMYK):

{% highlight java %}
Sphero s = new Sphero("00066644239C", "Sphero-OYW", Sphero.SPP_DEFAULT_CHANNEL);

String[] colorSequence = { "00B7EB", "FF0090", "FFEF00", "000000" };

s.connect();
for(String color : colorSequence) {
	s.setRgbLedColor(color, true);
	Thread.sleep(200);
}
s.disconnect();

System.out.println("Done.");
{% endhighlight %}

You can find the source code and a (for now, short) list of supported features in <a href="https://github.com/jdelacroix/sphero-bluecove" title="sphero-bluecove">this Git repository</a>.
