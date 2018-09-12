# frozen_string_literal: true

module DeliveriesManager
  class MessageDuplicator
    def perform(statuses)
      msg = statuses.sample.dup
      msg['publish_time'] = (DateTime.parse(msg['publish_time']) + (SecureRandom.rand * 2 * ENV['TIME_FACTOR'].to_i - ENV['TIME_FACTOR'].to_i).round(0).seconds).to_s
      statuses << msg
    end
  end
end
