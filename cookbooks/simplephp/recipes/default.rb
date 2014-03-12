#
# Cookbook Name:: simplephp
# Recipe:: default
#
# Copyright 2013, Ryan J. Geyer <me@ryangeyer.com>
#
# All rights reserved - Do Not Redistribute
#

include_recipe "apache2::default"
include_recipe "apache2::mod_php5"
include_recipe "apache2::mod_rewrite"
include_recipe "mysql::server"

package "php-pdo"
package "php-mysql"

web_app "simplephp" do
  # This is not used, but is required for the provider
  server_name "0.0.0.0"
  docroot "/vagrant"
end

service "httpd" do
  action :restart
end