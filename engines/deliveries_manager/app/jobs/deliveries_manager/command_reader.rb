# frozen_string_literal: true

module DeliveriesManager
  class CommandReader
    def perform
      conn = Bunny.new
      conn.start
      channel = conn.create_channel
      queue = channel.queue('delivery.create', auto_delete: true)

      queue.subscribe(block: true) do |delivery_info, metadata, payload|
        delivery = Delivery.create(name: payload['name'])
        DeliveryPublisher.perform_async(delivery.id)
      end
    ensure
      begin
        conn.close
      rescue
      end
    end
  end
end
