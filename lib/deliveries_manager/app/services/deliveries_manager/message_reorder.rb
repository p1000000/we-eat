# frozen_string_literal: true

module DeliveriesManager
  class MessageReorder
    def perform(statuses)
      a = statuses.sample
      b = statuses.sample

      b_time = b['publish_time']
      b['publish_time'] = a['publish_time']
      a['publish_time'] = b_time
    end
  end
end
