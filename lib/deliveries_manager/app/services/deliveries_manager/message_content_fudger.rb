# frozen_string_literal: true

module DeliveriesManager
  class MessageContentFudger
    def perform(statuses)
      msg = statuses.sample
      key = msg.keys.sample
      msg[key] = case ['String', 'Number', nil].sample
                 when 'String'
                   Faker::Lorem.word
                 when 'Number'
                   SecureRandom.rand
                 when nil
                   nil
                 end
    end
  end
end
