# Bug description

VirtualBox seems to hang when running in multicore mode
while many disk operations are occurring (on shared folders?).
Single-core vm's do not suffer from this issue.
 
This repository has been crafted to trigger that bug as a means
of reliable reproduction and as a way to ensure the environments
used for testing are as similar as possible. Two environments are
provided: multicore and singlecore. VBox will hang in the multicore
environment, but not in the singlecore environment.

The `files` folder contains a high amount (1200) of empty files.
The reproduction method consists of running `chokidar` in node.js
in polling mode (which is a common use case, vboxsf does not support inotify).
This causes a large load of constant disk I/O. While using multicore,
VBox will hang after a small amount of time (usually less than 2 minutes).

This bug was tested on an Ubuntu 16.10 host machine.

# How to reproduce

* Install Vagrant. Vagrant is used to deploy the testing environment.
* Open `htop` on the host machine in a separate terminal.
* `vagrant up multicore`
* `vagrant ssh multicore`
* In the vagrant environment, start the test with `npm start`.
* At first you will see a decent load spread over all cores on the host
  machine. This is chokidar checking files. The guest machine is now still
  responsive.
* Wait a bit. It usually takes less than 2 minutes for the bug to present itself.
* At a certain point you will see that the load on the host machine changed to
  a 100% load on a single core. VirtualBox is now unresponsive. SSH'ing into
  the machine doesn't work anymore. Attempts to terminate node.js have no effect.

You can try opening htop on the guest in a separate terminal. It will
also become unresponsive once VirtualBox hangs.

These steps can be retraced on the singlecore vm definition (with
`vagrant up singlecore` and `vagrant ssh singlecore`. In the single
core environment, VirtualBox will not hang.

