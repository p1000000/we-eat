# frozen_string_literal: true

$LOAD_PATH.push File.expand_path('../lib', __FILE__)

# Maintain your gem's version:
require 'deliveries_manager/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'deliveries_manager'
  s.version     = DeliveriesManager::VERSION
  s.authors     = ['OmerGertel', 'RonaTross']
  s.email       = ['omer.gertel@wework.com', 'rona.tross@wework.com']
  s.summary     = 'Service to publish deliveries for the Delivery exercise'
  s.description = ''
  s.license     = 'MIT'

  s.files = Dir['{app,config,db,lib}/**/*', 'MIT-LICENSE', 'Rakefile', 'README.md']

  s.add_dependency 'rails', '~> 5.1.5'

  s.add_development_dependency 'sqlite3'
end
