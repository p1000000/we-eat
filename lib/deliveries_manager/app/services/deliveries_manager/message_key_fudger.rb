# frozen_string_literal: true

module DeliveriesManager
  class MessageKeyFudger
    def perform(statuses)
      msg = statuses.sample
      key = msg.keys.sample

      msg[key + '1'] = msg[key]
      msg.delete(key) if SecureRandom.rand > 0.5
    end
  end
end
