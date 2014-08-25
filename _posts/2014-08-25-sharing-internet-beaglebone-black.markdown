---
layout: post
title: Sharing Internet with a BeagleBone Black
date: 2014-08-25
project-date: August 2014
category: Tutorials
description: A quick tutorial on giving a BeagleBone Black Internet access from a computer.
type: post
---

This is a quick tutorial on how to tether the [BeagleBone Black](http://beagleboard.org/black) (and other Linux devices) to a Linux computer for Internet connectivity. By default, the BeagleBone Black will take `192.168.7.2` as its IP address when connected to a computer via USB. We need to assign `192.168.7.1` to the USB Ethernet device (`enp0s25` in this tutorial) and route all outbound packets to this device from the BeagleBone Black to the Internet via the wireless device (`wlp3s0`). As `root` (or using `sudo`) on the computer,

{% highlight bash %}
$ ifconfig enp0s25 192.168.7.1
$ sysctl net.ipv4.ip_forward=1
$ iptables --table nat --append POSTROUTING --out-interface wlp3s0 -j MASQUERADE
$ iptables --append FORWARD --in-interface enp0s25 -j ACCEPT
{% endhighlight %}

As `root` on the BeagleBone Black,

{% highlight bash %}
$ route add default gw 192.168.7.1
$ echo "nameserver 8.8.8.8" >> /etc/resolv.conf
{% endhighlight %}

This tutorial can also be adapted for tethering other Linux devices to an Internet-connected Linux device, but IP addresses and device names may be different.
