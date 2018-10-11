# frozen_string_literal: true

require_relative 'boot'

require 'rails'
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'action_cable/engine'
require 'rails/test_unit/railtie'

Bundler.require(*Rails.groups)

module BpWeEat
  class Application < Rails::Application
    config.load_defaults 5.1
    config.api_only = true

    config.generators do |g|
      g.test_framework :rspec
    end

    if ENV['LOGENTRIES_TOKEN'].present?
      config.logger = Le.new(ENV['LOGENTRIES_TOKEN'],
                             local: STDOUT,
                             tag: true,
                             ssl: true,
                             log_level: (ENV['LOG_LEVEL'] || 'info').to_sym)
    else
      config.logger = ActiveSupport::TaggedLogging.new(Logger.new(STDOUT))
      config.log_level = (ENV['LOG_LEVEL'] || 'debug').to_sym
    end

    # Monitoring ruby VM garbage collection
    # This sends data to NewRelic, etc.
    GC::Profiler.enable

    config.active_job.queue_adapter = :sidekiq
  end
end
