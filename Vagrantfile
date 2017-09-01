require 'etc'

Vagrant.configure("2") do |config|
  config.vm.define "multicore" do |c|
    c.vm.box = "bento/ubuntu-16.04"
    c.vm.provider "virtualbox" do |v|
      v.cpus = Etc.nprocessors
    end
    c.vm.provision "shell", inline: <<-SHELL
      curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
      sudo apt-get install -y nodejs
      sudo apt-get install -y htop
    SHELL
    c.vm.provision "shell", privileged: false, inline: <<-SHELL
      echo 'cd /vagrant' >> /home/vagrant/.profile
      cd /vagrant
      npm install
    SHELL
  end

  config.vm.define "singlecore" do |c|
    c.vm.box = "bento/ubuntu-16.04"
    c.vm.provision "shell", inline: <<-SHELL
      curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
      sudo apt-get install -y nodejs
      sudo apt-get install -y htop
    SHELL
    c.vm.provision "shell", privileged: false, inline: <<-SHELL
      echo 'cd /vagrant' >> /home/vagrant/.profile
      cd /vagrant
      npm install
    SHELL
  end
end

