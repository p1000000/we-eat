# frozen_string_literal: true

module DeliveriesManager
  class MessageStructureFudger
    def perform(statuses)
      msg = statuses.sample
      statuses[delivery.statuses.index(msg)] = 'This is not a json'
    end
  end
end
