---
layout: post
title: matlab-sdl-joystick
date: 2014-10-05
img: joystick.png
alt: image-alt
project-date: October 2014
type: project
language: MATLAB, C++
category: Software
description: MEX code for using SDL joysticks and game controllers in MATLAB.
repository: jdelacroix/matlab-sdl-joystick
---

If you're looking to use joysticks or game controllers in MATLAB, you can use the MEX files in <a href="https://github.com/jdelacroix/matlab-sdl-joystick" title="matlab-sdl-joystick">matlab-sdl-joystick</a> to get access to all axes and buttons. If you need to build the MEX files yourself, then you need to compile both C++ files using `mex` in MATLAB. <a href="http://libsdl.org">SDL2</a> is a depedency, so make sure to install it first on your platform. Then, use these two commands build the MEX files:

{% highlight matlab %}
>> mex Joystick.cpp -lSDL2
>> mex GameController.cpp -lSDL2
{% endhighlight %}

The MEX files need to be compiled only once. To access the axes and button data of the first available joystick, use the following code snippet:

{% highlight matlab %}
[axes, btns] = Joystick();
{% endhighlight %}

All source code can be found in <a href="https://github.com/jdelacroix/matlab-sdl-joystick" title="matlab-sdl-joystick">this Git repository</a>.
