class Review < ApplicationRecord
  belongs_to :restaurant

  validates :reviewer_name, :rating, presence: true
  validates :rating, numericality: {greater_than_or_equal_to: 0}

end
