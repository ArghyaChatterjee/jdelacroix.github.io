---
layout: post
title: matlab-code-kit
date: 2014-10-05
img: quadtree.gif
alt: image-alt
project-date: October 2014
type: project
language: MATLAB
category: Software
description: A kit of various, (hopefully) useful pieces of MATLAB code.
repository: jdelacroix/matlab_code_kit
---

My MATLAB codekit features classes for algorithms and data structures like extended kalman filters, rapidly exploring random trees, and collision detectors. For example, this code snippet creates a quad tree of randomly generated points to quickly find all neighbors in some limited range around a point:

{% highlight matlab %}
function test_quad_tree()

q = mcodekit.tree.quad_tree([0 0 10 10], 4, 8);
n = 500;
x = 10.*rand(n,1);
y = 10.*rand(n,1);


for i=1:n
    q.insert_point([x(i) y(i)]);
    drawnow;
end

j = randi(n);

q.find_fixed_radius_neighbors([x(j) y(j)], 2);
{% endhighlight %}

The output in MATLAB will look similar to this animation:

<p><img class="img-responsive img-centered" src="{{ site.url }}/img/portfolio/quadtree.gif"></p>

You can find the source code and a list of all algorithms and data structures in <a href="https://github.com/jdelacroix/matlab_code_kit" title="matlab_code_kit">this Git repository</a>.
