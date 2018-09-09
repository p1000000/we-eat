# frozen_string_literal: true

module DeliveriesManager
  class MessageTimeFudger
    def perform(statuses)
      statuses.each do |message|
        message['publish_time'] = (DateTime.parse(message['publish_time']) + (SecureRandom.rand * 2 * ENV['TIME_FACTOR'].to_i - ENV['TIME_FACTOR'].to_i).round(0).seconds).to_s
      end
    end
  end
end
