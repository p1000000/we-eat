# frozen_string_literal: true

namespace :delivery do
  desc 'listen to delivery creation commands'
  task subscribe: :environment do
    DeliveriesManager::CommandReader.new.perform
  end
end
