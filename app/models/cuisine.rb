class Cuisine < ApplicationRecord
  belongs_to :restaurant

  validates :name, presence: true
end
