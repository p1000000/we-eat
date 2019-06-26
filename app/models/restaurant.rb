# == Schema Information
#
# Table name: restaurants
#
#  id                :integer          not null, primary key
#  name              :string
#  is10bis           :boolean
#  address           :string
#  max_delivery_time :integer
#  longitude         :decimal(, )
#  latitude          :decimal(, )
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  cuisine_id        :integer
#

class Restaurant < ApplicationRecord
  has_many :reviews
  has_one :cuisine

  validates :name, :cuisine, presence: true
  validates :name, uniqueness: true
  validates :max_delivery_time, :longitude, :latitude, numericality: { greater_than_or_equal_to: 0 }
end
