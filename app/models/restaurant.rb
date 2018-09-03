# == Schema Information
#
# Table name: restaurants
#
#  id                :bigint(8)        not null, primary key
#  name              :string
#  cuisine_id        :bigint(8)
#  accepts_10bis     :boolean          default(FALSE)
#  address           :string
#  coordinates       :json
#  max_delivery_time :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Restaurant < ApplicationRecord
  belongs_to :cuisine
  has_many :reviews
  validates :name,
            :cuisine_id,
            :address,
            :coordinates,
            :max_delivery_time, presence: true
end
