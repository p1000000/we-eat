# frozen_string_literal: true

module DeliveriesManager
  class ChaosGenerator
    NORMAL = [
      [100, NoOp],
    ].freeze
    ADVANCED = [
      [10, MessageDropper],
      [10, MessageReorder],
      [10, MessageDuplicator],
      [100, NoOp],
    ].freeze
    EXTREME = [
      [4, MessageDropper],
      [4, MessageReorder],
      [4, MessageDuplicator],
      [4, MessageTimeFudger],
      [2, MessageKeyFudger],
      [4, MessageContentFudger],
      [1, MessageStructureFudger],
      [100, NoOp],
    ].freeze

    def initialize
      @probability_sum = cumulative_probability_sum
    end

    def perform(statuses)
      select_operation.new.perform(statuses)
      statuses
    end

    private

    def select_operation
      random_value = SecureRandom.rand
      @probability_sum.select { |item| item[0] >= random_value }.first[1]
    end

    def cumulative_probability_sum
      sum = 0.0
      probabilities = NORMAL
      probabilities = ADVANCED if ENV['ADVANCED']
      probabilities = EXTREME if ENV['EXTREME']
      res = probabilities.map do |item|
        sum += item[0]
        [sum, item[1]]
      end
      res.map { |item| [item[0] / sum, item[1]] }
    end
  end
end
