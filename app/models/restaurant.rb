class Restaurant < ApplicationRecord
  has_many :reviews

  validates :name, :cuisine, presence: true
  validates :name, uniqueness: true
  validates :max_delivery_time, :longitude, :latitude, numericality: {greater_than_or_equal_to: 0}
  
end
