# frozen_string_literal: true

module DeliveriesManager
  class MessageDropper
    def perform(statuses)
      statuses.delete(statuses.sample)
    end
  end
end
