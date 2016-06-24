# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end

  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update -y
    sudo apt-get install -y postgresql-9.3-postgis-2.1 nodejs-legacy
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - 
    apt-get -y install nodejs
    psql -U postgres
    sudo sed -i -- 's/peer/trust/g' /etc/postgresql/9.3/main/pg_hba.conf
    sudo sed -i -- 's/md5/trust/g' /etc/postgresql/9.3/main/pg_hba.conf
    sudo service postgresql restart
    psql -U postgres -c "CREATE DATABASE lovebip"
    psql -U postgres -c "CREATE USER lovebip"
    psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE lovebip to lovebip"
    psql -U postgres -c "CREATE DATABASE lovebiptest"
    psql -U postgres -c "CREATE USER lovebiptest"
    psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE lovebiptest to lovebiptest"
    psql -U postgres -d lovebip -c "CREATE EXTENSION postgis"
    psql -U postgres -d lovebiptest -c "CREATE EXTENSION postgis"
  SHELL
end
