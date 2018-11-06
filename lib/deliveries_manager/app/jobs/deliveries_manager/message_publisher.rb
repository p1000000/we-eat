# frozen_string_literal: true

module DeliveriesManager
  class MessagePublisher
    include Sidekiq::Worker
    sidekiq_options backtrace: true, queue: :deliveries

    def perform(message)
      conn = Bunny.new(ENV['RABBIT_URL'])
      conn.start
      ch = conn.create_channel
      queue = ch.queue('delivery.status_updated', auto_delete: true)
      exchange = ch.default_exchange
      exchange.publish(message, routing_key: queue.name)
    ensure
      begin
        conn.close
      rescue
      end
    end
  end
end
