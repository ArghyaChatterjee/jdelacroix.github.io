---
layout: post
title: Installing ROS Indigo Igloo on Gentoo Linux
date: 2014-08-23
project-date: August 2014
category: Tutorials
description: Installation instructions for ROS Indigo Igloo on Gentoo Linux.
type: post
---

Since the new [ROS](http://ros.org) release, [Indigo Igloo](http://wiki.ros.org/indigo), does not include installation instructions for [Gentoo Linux](http://www.gentoo.org) yet, I have used the instructions to [build from source](http://wiki.ros.org/indigo/Installation/Source) to create a tutorial for installing the newest ROS release on my favorite Linux distribution.


00. All commands in these instructions will be executed as `root` (or prefixed with `sudo` if preferred).

01. ROS Indigo Igloo (henceforth just Indigo) has to be built using Python 2.7, so use `eselect` to select the Python 2.7 interpreter. Currently, make.defaults defines `PYTHON_TARGETS="python2_7 python3_3"`, so the Python 2.7 interpreter should be listed.

        $ eselect python list
        Available Python interpreters:
        [1]   python2.7 *
        [2]   python3.3
        [3]   python3.4
        $ eselect python set 1

02. A few of the dependencies require specific USE flags that are not automatically enabled.

        $ mkdir -p /etc/portage/package.use/
        $ echo "sys-libs/zlib minizip" >> /etc/portage/package.use/ros
        $ echo "dev-libs/boost python" >> /etc/portage/package.use/ros

03. Next, use `emerge` to install a few support packages.

        $ emerge -qvu zlib pyyaml git cmake subversion gentoolkit setuptools layman

04. Some of the dependencies for Indigo are not in the standard portage tree, so add and use an overlay.

        $ layman -a lorelei
        $ echo "source /var/lib/layman/make.conf" >> /etc/portage/make.conf

05. Next, the bulk of the dependencies for Indigo that can be found in portage and the overlay will be installed.

        $ emerge -qvu dev-cpp/eigen media-gfx/assimp media-libs/freeimage dev-libs/poco dev-python/nose dev-cpp/gtest dev-libs/tinyxml app-arch/lz4 media-libs/opencv media-libs/qhull dev-libs/log4cxx dev-python/shiboken dev-python/pyside dev-games/ogre dev-cpp/yaml-cpp dev-python/netifaces dev-python/empy dev-libs/boost

06. I noticed that Indigo would only compile against the stable version of `dev-python/sip`, which consequently requires the stable version of `dev-python/PyQt4`. If you are using the unstable portage tree (for example, `~amd64`), then make sure to specify the stable versions of these two packages. Otherwise, emerge these two packages normally.

        $ emerge -qv =dev-python/sip-4.15.3 =dev-python/PyQt4-4.10.3-r2

07. Next, fetch collada-dom, console-bridge, urdfdom, and urdfdom-headers from external repositories.

        $ cd /usr/local/src
        $ svn co https://collada-dom.svn.sourceforge.net/svnroot/collada-dom/trunk collada-dom
        $ git clone https://github.com/ros/console_bridge.git console-bridge
        $ git clone https://github.com/ros/urdfdom_headers.git urdfdom-headers
        $ git clone https://github.com/ros/urdfdom.git urdfdom

08. For each of the above packages, use `cmake` the build and install the package to the system

        $ cd collada-dom
        $ mkdir build
        $ cd build
        $ cmake ../ -DCMAKE_INSTALL_PREFIX=/usr
        $ make && make install

09. Use `pip` to install the ROS installation tools.

        $ pip install -U catkin_pkg rosdep rosinstall_generator wstool rosinstall

10. Choose a installation directory (prefix) for Indigo.

        $ mkdir /opt/ros
        $ export ROS_INSTALL_PREFIX=/opt/ros

11. Next, create a catkin workspace and generate the .install file for the Indigo Desktop Install (or alternatively choose Full-Desktop or Barebones Install).

        $ mkdir ${ROS_INSTALL_PREFIX}/ros_catkin_ws
        $ cd ${ROS_INSTALL_PREFIX}/ros_catkin_ws
        $ rosinstall_generator desktop --rosdistro indigo --deps --wet-only > indigo-desktop-wet.rosinstall
        $ wstool init -j8 src indigo-desktop-wet.rosinstall

12. The next step in the standard installation document is to use `rosdep install --from-paths src --ignore-src --rosdistro indigo -y` to install all the system dependencies, but all dependencies have been installed in steps 3-9  ; therefore, this step can be skipped.

13. Set up `PYTHONPATH` for use with Indigo.

        $ echo "export PYTHONPATH=$PYTHONPATH:${ROS_INSTALL_PREFIX}/ROS/indigo/lib64/python2.7/site-packages:${ROS_INSTALL_PREFIX}/ROS/indigo/lib/python2.7/site-packages" >> /etc/profile.d/ros-indigo.sh

14. Use catkin to build and install Indigo and its packages.

        $ ./src/catkin/bin/catkin_make_isolated --install --install-space ${ROS_INSTALL_PREFIX}/indigo -DCMAKE_BUILD_TYPE=Release -DSETUPTOOLS_ARG_EXTRA="" -DSETUPTOOLS_DEB_LAYOUT=OFF

15. Now that Indigo is installed, proceed with the standard documentation to add your own ROS packages.
