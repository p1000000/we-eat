# frozen_string_literal: true

module DeliveriesManager
  class DeliveryMessageReader
    def perform
      conn = Bunny.new
      conn.start
      channel = conn.create_channel
      queue = channel.queue('delivery.status_updated', auto_delete: true)

      queue.subscribe do |delivery_info, metadata, payload|
        puts "Received #{payload}"
      end
    ensure
      begin
        conn.close
      rescue
      end
    end
  end
end
