# frozen_string_literal: true

module Sidekiq
  module Middleware
    class TaggedLogger
      def call(worker, item, queue)
        tag = "#{SecureRandom.uuid}"
        ::Rails.logger.tagged(tag) do
          ::Rails.logger.info("#{worker.class}")
          yield
        end
      end
    end
  end
end

Sidekiq.configure_server do |config|
  config.server_middleware do |chain|
    chain.add Sidekiq::Middleware::TaggedLogger
  end
end
