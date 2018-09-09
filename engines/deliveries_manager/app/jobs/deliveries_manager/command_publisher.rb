# frozen_string_literal: true

module DeliveriesManager
  class CommandPublisher
    def perform
      conn = Bunny.new
      conn.start
      ch = conn.create_channel
      queue = ch.queue('delivery.create', auto_delete: true)
      exchange = ch.default_exchange
      exchange.publish({ name: Faker::Name.name }.to_json, routing_key: queue.name)
    ensure
      begin
        conn.close
      rescue
      end
    end
  end
end
