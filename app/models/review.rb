# == Schema Information
#
# Table name: reviews
#
#  id            :bigint(8)        not null, primary key
#  name          :string
#  rating        :integer          default(0)
#  comment       :text
#  restaurant_id :bigint(8)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Review < ApplicationRecord
  belongs_to :restaurant
  validates :name, :rating, :comment, :restaurant_id, presence: true
  validates :rating, numericality: { greater_than: 0, less_than_or_equal_to: 5 }
end
