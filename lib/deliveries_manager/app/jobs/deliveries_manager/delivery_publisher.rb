# frozen_string_literal: true

module DeliveriesManager
  class DeliveryPublisher
    include Sidekiq::Worker
    sidekiq_options backtrace: true, queue: :deliveries

    def perform(uuid)
      delivery = Delivery.delivery_statuses(uuid: uuid || Delivery.create.id)
      statuses = apply_noise_to_delivery(delivery)

      statuses.sort_by { |message| message['publish_time'] }.each do |message|
        sleep_time = ((DateTime.parse(message['publish_time']) - DateTime.current) * 24 * 60 * 60).to_i
        MessagePublisher.perform_in([sleep_time, 0].max, message.to_json)
      end
    end

    def apply_noise_to_delivery(delivery)
      ChaosGenerator.new.perform(delivery)
    end
  end
end
